from datetime import datetime
from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
import os
from flask_cors import CORS
import bcrypt
import random

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Genera una clave secreta aleatoria para las sesiones
CORS(app) 


db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'billetera',
    'port': 3306
}

app.secret_key = 'tu_clave_secreta_aqui'


# Ruta principal
@app.route('/')
def index():
    return render_template('index.html')

# Ruta de portal
@app.route('/Portaltuplata')
def Portaltuplata():
    # Verificar si el usuario está logueado
    if 'user_logged_in' in session:
        user_name = session['user_name']
        return render_template('Portaltuplata.html', user_name=user_name)
    else:
        return redirect(url_for('login'))  # Redirigir a login si no está logueado

@app.route('/ayuda')
def ayuda():
    return render_template('ayuda.html')

@app.route('/conocenos')
def conocenos():
    return render_template('conocenos.html')

# Ruta de login
@app.route('/login')
def Login():
    return render_template('login.html')

# Ruta de login (procesamiento)
@app.route('/login', methods=['POST'])
def login():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    data = request.get_json()

    telefono = data['telefono']
    cedula = data['cedula']
    contraseña = data['contraseña']

    try:
        # Primero, obtenemos el usuario de la base de datos
        query = """
        SELECT nombre, Contraseña FROM `usuario` WHERE telefono = %s AND Id_usuario = %s
        """
        cursor.execute(query, (telefono, cedula))
        user = cursor.fetchone()  # Obtener el primer resultado

        if user:
            nombre, contraseña_hash = user
            
            # Verificar la contraseña (asegúrate de hashear la contraseña al registrarla)
            if contraseña == contraseña_hash:  # Aquí deberías usar un método de comparación seguro
                # Si las credenciales son correctas, puedes guardar la sesión o hacer lo que necesites
                session['user_logged_in'] = True
                session['user_name'] = nombre
                session['user_id'] = cedula  # Suponiendo que 'cedula' es el ID del usuario
                
                return jsonify({'success': True, 'userName': nombre}), 200
            else:
                return jsonify({'success': False, 'mensaje': 'Contraseña incorrecta'}), 401
        else:
            return jsonify({'success': False, 'mensaje': 'Usuario no encontrado'}), 404

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'success': False, 'mensaje': 'Error al iniciar sesión', 'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/register', methods=['POST'])
def register():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    data = request.get_json()

    nombre = data['nombre']
    cedula = data['cedula']
    telefono = data['telefono']
    direccion = data['direccion']
    fecha_nacimiento = data['fecha_nacimiento']
    fecha_expedicion = data['fecha_expedicion']
    contraseña = data['contraseña']
    correo = data['correo']
    estato = "ACTIVO"

    try:
        # Registrar usuario
        query = """
        INSERT INTO `usuario`(`Id_usuario`, `nombre`, `telefono`, `correo`, `direccion`, `estado`, `fecha_registro`, `Fecha_nacimiento`, `Fecha_ExpedicionCedula`, `Contraseña`)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (cedula, nombre, telefono, correo, direccion, estato, datetime.now(), fecha_nacimiento, fecha_expedicion, contraseña))
        conn.commit()

        # Crear cuenta
        query_cuenta = """
        INSERT INTO `cuenta`(`saldo`, `d_usuarioFK`, `ClaveSeguirdad`,`Telefono`)
        VALUES (%s, %s, %s, %s)
        """
        saldo_inicial = 0
        cursor.execute(query_cuenta, (saldo_inicial, cedula, contraseña, telefono))
        conn.commit()

        # Obtener el ID de la cuenta recién creada
        cursor.execute("SELECT Id_cuenta FROM cuenta WHERE d_usuarioFK = %s", (cedula,))
        id_cuenta = cursor.fetchone()[0]

        # Generar datos aleatorios para la tarjeta
        id_tarjeta = random.randint(100000, 999999)  # 6 dígitos aleatorios
        num_tarjeta = ''.join([str(random.randint(0, 9)) for _ in range(16)])  # 16 dígitos aleatorios
        cod_seguridad = str(random.randint(100, 999))  # 3 dígitos aleatorios
        fecha_actual = datetime.now().strftime('%Y-%m-%d')

        # Insertar tarjeta
        query_tarjeta = """
        INSERT INTO `tarjeta`(`Id_tarjeta`, `monto`, `id_cuentaFK`, `num_tarjeta`, `fecha_expedicion`, `cog_seguridad`)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_tarjeta, (
            id_tarjeta,          # ID aleatorio
            saldo_inicial,       # Mismo saldo que la cuenta
            id_cuenta,           # ID de la cuenta recién creada
            num_tarjeta,         # Número de tarjeta aleatorio
            fecha_actual,        # Fecha actual
            cod_seguridad        # Código de seguridad aleatorio
        ))
        conn.commit()

        return jsonify({
            'success': True, 
            'mensaje': 'Usuario registrado exitosamente con cuenta y tarjeta'
        }), 200

    except mysql.connector.Error as err:
        conn.rollback()
        print(f"Error: {err}")
        return jsonify({
            'success': False, 
            'mensaje': 'Error al registrar el usuario', 
            'error': str(err)
        }), 500
    finally:
        cursor.close()
        conn.close()



@app.route('/api/send_money', methods=['POST'])
def send_money():
    if not session.get('user_id'):
        return jsonify({
            'success': False,
            'mensaje': 'Usuario no autenticado'
        }), 401

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    try:
        data = request.get_json()
        amount = float(data.get('amount', 0))
        phone = str(data.get('phone', '')).strip()
        message = data.get('message', '')

        # Verificar cuenta destino
        cursor.execute("""
            SELECT Id_cuenta, Telefono, saldo, d_usuarioFK 
            FROM cuenta 
            WHERE Telefono = %s
        """, (phone,))
        receiver_account = cursor.fetchone()

        if not receiver_account:
            return jsonify({
                'success': False,
                'mensaje': f'No se encontró una cuenta con el teléfono {phone}'
            }), 404

        # Verificar saldo del remitente - MODIFICADO para incluir Id_cuenta
        cursor.execute("""
            SELECT Id_cuenta, saldo 
            FROM cuenta 
            WHERE d_usuarioFK = %s
        """, (session['user_id'],))
        sender_account = cursor.fetchone()

        if not sender_account or sender_account['saldo'] < amount:
            return jsonify({
                'success': False,
                'mensaje': f'Fondos insuficientes. Saldo actual: ${sender_account["saldo"]:,.2f}'
            }), 400

        # Realizar la transferencia
        cursor.execute("""
            UPDATE cuenta 
            SET saldo = saldo - %s 
            WHERE Id_cuenta = %s
        """, (amount, sender_account['Id_cuenta']))

        cursor.execute("""
            UPDATE cuenta 
            SET saldo = saldo + %s 
            WHERE Id_cuenta = %s
        """, (amount, receiver_account['Id_cuenta']))

        # Registrar el movimiento
        cursor.execute("""
            INSERT INTO movimiento (
                Id_cuentaOrigen, 
                Id_cuentaDestino, 
                NombreDestino, 
                NombreOrigen, 
                fecha, 
                hora, 
                descripcion, 
                monto, 
                tipo_movimiento, 
                id_cuentaFK
            ) VALUES (%s, %s, %s, %s, CURDATE(), CURTIME(), %s, %s, 'TRANSFERENCIA', %s)
        """, (
            sender_account['Id_cuenta'],
            receiver_account['Id_cuenta'],
            f'Usuario {receiver_account["d_usuarioFK"]}',
            f'Usuario {session["user_id"]}',
            message or 'Transferencia',
            amount,
            sender_account['Id_cuenta']
        ))

        conn.commit()
        return jsonify({
            'success': True,
            'mensaje': 'Transferencia realizada con éxito'
        })

    except Exception as e:
        conn.rollback()
        print(f"Error en transferencia: {str(e)}")
        return jsonify({
            'success': False,
            'mensaje': f'Error al procesar la transferencia: {str(e)}'
        }), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/api/pay_service', methods=['POST'])
def pay_service():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Verificar si el usuario está logueado
    if 'user_logged_in' not in session:
        return jsonify({'success': False, 'mensaje': 'Usuario no logueado'}), 401

    id_usuarioFK = session.get('user_id')

    try:
        # Obtener los datos del formulario
        data = request.get_json()
        tipo_servicio = data.get('tipo_servicio')
        monto = float(data.get('monto', 0))

        # Validar monto
        if monto <= 0:
            return jsonify({'success': False, 'mensaje': 'Monto inválido'}), 400

        # Obtener el ID de la cuenta del usuario
        cursor.execute("SELECT Id_cuenta FROM cuenta WHERE d_usuarioFK = %s", (id_usuarioFK,))
        result = cursor.fetchone()
        if not result:
            return jsonify({'success': False, 'mensaje': 'Cuenta no encontrada'}), 404
        id_cuenta_origen = result[0]

        # Verificar saldo suficiente
        cursor.execute("SELECT saldo FROM cuenta WHERE Id_cuenta = %s", (id_cuenta_origen,))
        saldo_actual = cursor.fetchone()[0]
        if saldo_actual < monto:
            return jsonify({'success': False, 'mensaje': 'Saldo insuficiente'}), 400

        # Determinar la cuenta destino según el tipo de servicio
        if tipo_servicio == 'CELULAR':
            id_cuenta_destino = 5
        elif tipo_servicio == 'HOGAR':
            id_cuenta_destino = 6
        elif tipo_servicio == 'OTROS':
            id_cuenta_destino = 7
        else:
            return jsonify({'success': False, 'mensaje': 'Tipo de servicio no válido'}), 400

        # Actualizar saldo del usuario
        cursor.execute("UPDATE cuenta SET saldo = saldo - %s WHERE Id_cuenta = %s", 
                      (monto, id_cuenta_origen))

        # Actualizar saldo de la cuenta de servicio
        cursor.execute("UPDATE cuenta SET saldo = saldo + %s WHERE Id_cuenta = %s", 
                      (monto, id_cuenta_destino))

        # Registrar el movimiento
        fecha = datetime.now().strftime('%Y-%m-%d')
        hora = datetime.now().strftime('%H:%M:%S')
        descripcion = f'Pago de servicio {tipo_servicio}'

        # Obtener nombres para el registro
        cursor.execute("SELECT nombre FROM usuario WHERE Id_usuario = %s", (id_usuarioFK,))
        nombre_origen = cursor.fetchone()[0]
        nombre_destino = f'Servicio {tipo_servicio}'

        # Insertar movimiento
        query_movimiento = """
        INSERT INTO movimiento (Id_cuentaOrigen, Id_cuentaDestino, NombreDestino, NombreOrigen, 
                              fecha, hora, descripcion, monto, tipo_movimiento, id_cuentaFK)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_movimiento, (
            id_cuenta_origen, id_cuenta_destino, nombre_destino, nombre_origen,
            fecha, hora, descripcion, monto, tipo_servicio, id_cuenta_origen
        ))

        # Confirmar transacción
        conn.commit()
        return jsonify({'success': True, 'mensaje': 'Pago realizado con éxito'}), 200

    except Exception as e:
        conn.rollback()
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'mensaje': 'Error al procesar el pago'}), 500

    finally:
        cursor.close()
        conn.close()


@app.route('/api/get_movements', methods=['GET'])
def get_movements():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Verificar si el usuario está logueado
    if 'user_logged_in' not in session:
        return jsonify({'success': False, 'mensaje': 'Usuario no logueado'}), 401

    id_usuarioFK = session.get('user_id')

    try:
        # Obtener el Id_cuenta del usuario
        query_account_id = "SELECT Id_cuenta FROM cuenta WHERE d_usuarioFK = %s"
        cursor.execute(query_account_id, (id_usuarioFK,))
        account_id = cursor.fetchone()

        if not account_id:
            return jsonify({'success': False, 'mensaje': 'Cuenta no encontrada'}), 404

        # Obtener los movimientos asociados a la cuenta
        query_movements = """
        SELECT Id_movimientos, Id_cuentaOrigen, Id_cuentaDestino, NombreDestino, NombreOrigen, fecha, hora, descripcion, monto, tipo_movimiento, id_cuentaFK 
        FROM movimiento 
        WHERE Id_cuentaOrigen = %s
        """
        cursor.execute(query_movements, (account_id[0],))
        movements = cursor.fetchall()

        # Convertir los movimientos a un formato adecuado para la respuesta
        movements_list = []
        for movement in movements:
            movement_dict = {
                'id': movement[0],
                'id_cuentaOrigen': movement[1],
                'id_cuentaDestino': movement[2],
                'nombreDestino': movement[3],
                'nombreOrigen': movement[4],
                'fecha': movement[5].strftime('%Y-%m-%d') if isinstance(movement[5], datetime) else str(movement[5]),  # Convertir a string
                'hora': movement[6].strftime('%H:%M:%S') if isinstance(movement[6], datetime) else str(movement[6]),  # Convertir a string
                'descripcion': movement[7],
                'monto': movement[8],
                'tipo_movimiento': movement[9],
                'id_cuentaFK': movement[10]
            }
            movements_list.append(movement_dict)

        return jsonify({'success': True, 'movements': movements_list}), 200

    except mysql.connector.Error as err:
        print(f"Error en la base de datos: {str(err)}")
        return jsonify({'success': False, 'mensaje': 'Error en la base de datos', 'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()







@app.route('/logout')
def logout():
    session.pop('user_logged_in', None)
    session.pop('user_name', None)
    return redirect(url_for('login'))

@app.route('/get_balance', methods=['GET'])
def get_balance():
    # Verificar si el usuario está logueado
    if 'user_logged_in' in session:
        user_id = session['user_id']  # Asumiendo que guardas el ID del usuario en la sesión
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        try:
            # Obtener el saldo de la cuenta correspondiente al usuario logueado
            query = """
            SELECT saldo FROM cuenta WHERE d_usuarioFK = %s
            """
            cursor.execute(query, (user_id,))
            result = cursor.fetchone()  # Obtener el primer resultado
            
            if result:
                saldo = result[0]
                return jsonify({'success': True, 'balance': saldo}), 200
            else:
                return jsonify({'success': False, 'mensaje': 'Saldo no encontrado'}), 404

        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return jsonify({'success': False, 'mensaje': 'Error al obtener el saldo', 'error': str(err)}), 500
        
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'success': False, 'mensaje': 'Usuario no logueado'}), 401


@app.route('/api/centro-ayuda', methods=['POST'])
def insert_centro_ayuda():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Verificar si el usuario está logueado
    if 'user_logged_in' not in session:
        return jsonify({'success': False, 'mensaje': 'Usuario no logueado'}), 401

    # Obtener el ID del usuario desde la sesión
    id_usuarioFK = session['user_id']
    
    # Obtener los datos del formulario
    data = request.get_json()
    descripcion = data['descripcion']
    telefono = data['telefono']
    fecha = datetime.now().strftime('%Y-%m-%d')  # Fecha actual
    hora = datetime.now().strftime('%H:%M:%S')  # Hora actual

    try:
        query = """
        INSERT INTO centro_ayuda (descripcion, Telefono, fecha, hora, id_usuarioFK)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (descripcion, telefono, fecha, hora, id_usuarioFK))
        conn.commit()

        return jsonify({'success': True, 'mensaje': 'Datos insertados correctamente', 'id': cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'success': False, 'mensaje': 'Error al insertar datos', 'error': str(err)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/get_card_info', methods=['GET'])
def get_card_info():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Obtener el ID del usuario de la sesión
        id_usuario = session.get('user_id')
        
        # Consulta para obtener la información de la tarjeta
        query = """
        SELECT t.num_tarjeta, t.fecha_expedicion, t.cog_seguridad
        FROM tarjeta t
        INNER JOIN cuenta c ON t.id_cuentaFK = c.Id_cuenta
        WHERE c.d_usuarioFK = %s
        """
        cursor.execute(query, (id_usuario,))
        card_info = cursor.fetchone()
        
        if card_info:
            return jsonify({
                'success': True,
                'num_tarjeta': card_info['num_tarjeta'],
                'fecha_expedicion': card_info['fecha_expedicion'],
                'cog_seguridad': card_info['cog_seguridad']
            })
        else:
            return jsonify({'success': False, 'mensaje': 'Tarjeta no encontrada'})
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'success': False, 'mensaje': 'Error al obtener información de la tarjeta'})
    finally:
        cursor.close()
        conn.close()


# Iniciar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
