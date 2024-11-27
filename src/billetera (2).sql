-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2024 a las 12:23:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `billetera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_ayuda`
--

CREATE TABLE `centro_ayuda` (
  `Id_centro_ayuda` int(11) NOT NULL,
  `descripcion` varchar(600) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_usuarioFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `centro_ayuda`
--

INSERT INTO `centro_ayuda` (`Id_centro_ayuda`, `descripcion`, `Telefono`, `fecha`, `hora`, `id_usuarioFK`) VALUES
(1, 'vsdvsdvsdv', 300352, '2024-11-26', '10:02:31', 104224),
(2, 'GDFG', 300352, '2024-11-27', '04:49:55', 104224);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `Id_cuenta` int(11) NOT NULL,
  `saldo` int(20) NOT NULL,
  `d_usuarioFK` int(11) NOT NULL,
  `ClaveSeguirdad` int(11) NOT NULL,
  `Telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`Id_cuenta`, `saldo`, `d_usuarioFK`, `ClaveSeguirdad`, `Telefono`) VALUES
(1, 595810, 104224, 8087, 300352),
(5, 18601, 10236598, 123, 3000),
(6, 129353, 124587, 987, 9887654),
(7, 45636, 12363656, 56573, 12032545),
(8, 530000, 6532145, 4345, 124578),
(9, 0, 1048207211, 123, 301),
(10, 0, 698741236, 32147, 32147),
(11, 0, 123654, 456321, 123654),
(12, 0, 741258, 741258, 741258),
(13, 600, 147852, 147852, 147852);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `Id_movimientos` int(11) NOT NULL,
  `Id_cuentaOrigen` int(11) NOT NULL,
  `Id_cuentaDestino` int(11) NOT NULL,
  `NombreDestino` varchar(50) NOT NULL,
  `NombreOrigen` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `monto` int(11) NOT NULL,
  `tipo_movimiento` enum('RECARGAR','ENVIAR','RETIRAR','SERVICIOS') NOT NULL,
  `id_cuentaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`Id_movimientos`, `Id_cuentaOrigen`, `Id_cuentaDestino`, `NombreDestino`, `NombreOrigen`, `fecha`, `hora`, `descripcion`, `monto`, `tipo_movimiento`, `id_cuentaFK`) VALUES
(27, 1, 13, 'luisFelipe', 'Jeremy', '2024-11-27', '05:21:50', 'LK', 5000, '', 1),
(28, 13, 1, 'Jeremy', 'luisFelipe', '2024-11-27', '05:30:25', 'Envío de dinero a 300352', 300, 'ENVIAR', 13),
(29, 13, 1, 'Jeremy', 'luisFelipe', '2024-11-27', '05:34:10', 'Envío de dinero a 300352', 200, 'ENVIAR', 13),
(30, 1, 13, 'Usuario 147852', 'Usuario 104224', '2024-11-27', '05:47:00', 'FVDFV', 100, '', 1),
(31, 1, 5, 'Servicio CELULAR', 'Jeremy', '2024-11-27', '05:47:13', 'Pago de servicio CELULAR', 3000, '', 1),
(32, 1, 6, 'Servicio HOGAR', 'Jeremy', '2024-11-27', '05:47:23', 'Pago de servicio HOGAR', 5353, '', 1),
(33, 1, 7, 'Servicio OTROS', 'Jeremy', '2024-11-27', '05:47:31', 'Pago de servicio OTROS', 636, '', 1),
(34, 13, 1, 'Usuario 104224', 'Usuario 147852', '2024-11-27', '05:48:41', 'BDBDFB', 4000, '', 13),
(35, 1, 5, 'Servicio CELULAR', 'Jeremy', '2024-11-27', '06:07:53', 'Pago de servicio CELULAR', 3000, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `Id_servicio` int(11) NOT NULL,
  `tipo_servicio` enum('HOGAR','CELULAR','OTROS') NOT NULL,
  `monto` int(11) NOT NULL,
  `fecha_servicio` date NOT NULL,
  `Id_cuentaFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`Id_servicio`, `tipo_servicio`, `monto`, `fecha_servicio`, `Id_cuentaFK`) VALUES
(1, '', 1, '2024-11-27', 5),
(2, 'HOGAR', 30000, '2024-11-27', 6),
(3, 'OTROS', 2000, '2024-11-27', 7),
(5, 'CELULAR', 500, '2024-11-27', 5),
(6, 'HOGAR', 90000, '2024-11-27', 6),
(7, 'OTROS', 23000, '2024-11-27', 7),
(8, 'CELULAR', 9000, '2024-11-27', 5),
(9, 'HOGAR', 3000, '2024-11-27', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta`
--

CREATE TABLE `tarjeta` (
  `Id_tarjeta` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `id_cuentaFK` int(11) NOT NULL,
  `num_tarjeta` int(11) NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `cog_seguridad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarjeta`
--

INSERT INTO `tarjeta` (`Id_tarjeta`, `monto`, `id_cuentaFK`, `num_tarjeta`, `fecha_expedicion`, `cog_seguridad`) VALUES
(0, 0, 12, 2147483647, '2024-11-27', 181),
(434372, 0, 11, 2147483647, '2024-11-27', 758),
(851747, 0, 13, 2147483647, '2024-11-27', 222);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id_usuario` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `telefono` int(10) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `estado` enum('INACTIVO','ACTIVO') NOT NULL,
  `fecha_registro` date NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Fecha_ExpedicionCedula` date NOT NULL,
  `Contraseña` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id_usuario`, `nombre`, `telefono`, `correo`, `direccion`, `estado`, `fecha_registro`, `Fecha_nacimiento`, `Fecha_ExpedicionCedula`, `Contraseña`) VALUES
(104224, 'Jeremy', 300352, 'jeremya@gmail.com', 'Villa San Carlos', 'ACTIVO', '2024-11-26', '2024-11-23', '2024-11-14', '8087'),
(123654, 'Jenifer Lopez ', 123654, 'jeniifer@gmail.com', 'galapa', 'ACTIVO', '2024-11-27', '2024-11-06', '2024-11-15', '456321'),
(124587, 'Serviciospublicos', 9887654, 'ServiciosPublicos@gmail.com', 'Soledad', 'ACTIVO', '2024-11-16', '2024-11-10', '2024-11-30', '0987'),
(147852, 'luisFelipe', 147852, 'kokieo@gmail.com', 'loo', 'ACTIVO', '2024-11-27', '2024-11-30', '2024-11-30', '147852'),
(741258, 'luis', 741258, 'lui@gmail.com', 'sdfgsdf', 'ACTIVO', '2024-11-27', '2024-10-30', '2024-10-30', '741258'),
(6532145, 'Karla', 124578, 'KARLA@GMAIL.COM', 'el bosque', 'ACTIVO', '2024-11-26', '2024-11-14', '2024-11-30', '4345'),
(10236598, 'ServiciosCelular', 3000, 'ServiciosCelular@gmail.com', 'Anywhere', 'ACTIVO', '2024-11-01', '2024-11-01', '2024-11-01', '123'),
(12363656, 'ServiciosOtros', 12032545, 'ServiciosOtros@gmail.com', 'elbosque', 'ACTIVO', '2024-11-14', '2024-11-24', '2024-11-15', '56573'),
(698741236, 'PEDRO', 32147, '', 'POPO', 'ACTIVO', '2024-11-27', '2024-11-01', '2024-11-09', '32147'),
(1048207211, 'Jenifer', 301, 'jeni@gmail.com', 'Baranoa', 'ACTIVO', '2024-11-27', '2006-02-14', '2024-11-14', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `centro_ayuda`
--
ALTER TABLE `centro_ayuda`
  ADD PRIMARY KEY (`Id_centro_ayuda`),
  ADD KEY `id_usuarioFK` (`id_usuarioFK`) USING BTREE;

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`Id_cuenta`),
  ADD KEY `d_usuarioFK` (`d_usuarioFK`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`Id_movimientos`),
  ADD KEY `Id_cuentaDestino` (`Id_cuentaDestino`),
  ADD KEY `id_cuentaFK` (`id_cuentaFK`) USING BTREE,
  ADD KEY `Id_cuentaOrigen` (`Id_cuentaOrigen`) USING BTREE;

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`Id_servicio`),
  ADD KEY `Id_cuentaFK` (`Id_cuentaFK`) USING BTREE;

--
-- Indices de la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD PRIMARY KEY (`Id_tarjeta`),
  ADD KEY `id_cuentaFK` (`id_cuentaFK`) USING BTREE;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `centro_ayuda`
--
ALTER TABLE `centro_ayuda`
  MODIFY `Id_centro_ayuda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `Id_cuenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `Id_movimientos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `Id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `centro_ayuda`
--
ALTER TABLE `centro_ayuda`
  ADD CONSTRAINT `centro_ayuda_ibfk_1` FOREIGN KEY (`id_usuarioFK`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `cuenta_ibfk_1` FOREIGN KEY (`d_usuarioFK`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`id_cuentaFK`) REFERENCES `cuenta` (`Id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimiento_ibfk_2` FOREIGN KEY (`Id_cuentaOrigen`) REFERENCES `cuenta` (`Id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movimiento_ibfk_3` FOREIGN KEY (`Id_cuentaDestino`) REFERENCES `cuenta` (`Id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`Id_cuentaFK`) REFERENCES `cuenta` (`Id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarjeta`
--
ALTER TABLE `tarjeta`
  ADD CONSTRAINT `tarjeta_ibfk_1` FOREIGN KEY (`id_cuentaFK`) REFERENCES `cuenta` (`Id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
