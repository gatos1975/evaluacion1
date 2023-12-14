-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2023 a las 17:27:07
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sexto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `cod_alumnos` int(11) NOT NULL,
  `ced_alumnos` varchar(10) NOT NULL,
  `nom_alumnos` varchar(100) NOT NULL,
  `fecn_alumnos` date NOT NULL,
  `luz_alumnos` varchar(30) NOT NULL,
  `dom_alumnos` varchar(100) NOT NULL,
  `esp_alumnos` varchar(50) NOT NULL,
  `niv_alumnos` varchar(20) NOT NULL,
  `rep_alumnos` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`cod_alumnos`, `ced_alumnos`, `nom_alumnos`, `fecn_alumnos`, `luz_alumnos`, `dom_alumnos`, `esp_alumnos`, `niv_alumnos`, `rep_alumnos`) VALUES
(1, '1400373583', 'CEVALLOS JUANGA ANGEL ', '2000-12-02', '403568975', 'PARROQUIA SEVILLA - BARRIO CENTRO- JUNTO AL COLISEO', 'CIENCIAS', 'TECERO BACHILLERATO', 'CEVALLOS JAVIER'),
(8, '1400373583', 'ANTONIO AYUY dsds', '1970-05-12', '054856', 'SEVILLA', 'contabilidad', 'Segundo bachillerato', 'JUAN CARLOS'),
(9, '1400593925', 'flore', '0000-00-00', '$luz_alumnos', '$dom_alumnos', 'contabilidad', 'Primero bachillerato', '$rep_alumnos'),
(13, '1400593925', 'ATAMAINT FLORENTINA', '1982-07-10', '1254', 'SEVILLA', 'contabilidad', 'Primero bachillerato', 'DIONICIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuarioId` int(11) NOT NULL,
  `Cedula` varchar(17) NOT NULL,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Telefono` varchar(17) NOT NULL,
  `Correo` varchar(150) NOT NULL,
  `Contrasenia` text NOT NULL,
  `Rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuarioId`, `Cedula`, `Nombres`, `Apellidos`, `Telefono`, `Correo`, `Contrasenia`, `Rol`) VALUES
(1, '1400373583', 'ANTONIO WILMER', 'AYUY AGUANANCHI', '0999122053', 'wilmerayuy@gmail.com', '123456', 'administrador'),
(2, '1400872345', 'Wilmer Stevens', 'Ayuy Atamaint entzacua', '0939237688', '123', 'wilmerstevens@gmail.com', 'Vendedor'),
(3, '1400373583', 'adsfdsfsda', 'fdsdafsad', 'sdfsd', 'wilmerstevens@gmail.com', '123456', 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`cod_alumnos`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `cod_alumnos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
