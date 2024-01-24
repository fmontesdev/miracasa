-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-01-2024 a las 12:25:13
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miracasa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `real_estates`
--

DROP TABLE IF EXISTS `real_estates`;
CREATE TABLE IF NOT EXISTS `real_estates` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cadastre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `trade` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `type` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `m2` int NOT NULL,
  `feature` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `province` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `town` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `price` int NOT NULL,
  `publication_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cadastre` (`id_cadastre`)
) ENGINE=InnoDB AUTO_INCREMENT=492 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `real_estates`
--

INSERT INTO `real_estates` (`id`, `id_cadastre`, `trade`, `type`, `m2`, `feature`, `province`, `town`, `price`, `publication_date`, `description`) VALUES
(485, '7003051YJ4480S0045AA', 'Compra', 'Vivienda', 150, 'Terraza:Climatización:', 'Cantabria', 'Santander', 250000, '10-11-2023', 'Local comercial situado en zona privilegiada para el comercio'),
(486, '8204201YJ5210S0087BB', 'Alquiler', 'Garaje', 15, 'Ascensor:', 'Barcelona', 'Badalona', 60, '22-07-2021', 'Plaza de garaje en zona céntrica con inmejorable acceso'),
(487, '1234201YJ5210S0087CC', 'Compra', 'Oficina', 150, 'Muebles:Climatización:', 'Sevilla', 'Dos Hermanas', 200000, '27-05-2020', 'Oficinas en el mismo centro de Dos Hermanas'),
(488, '6845201YJ5210S0087DD', 'Alquiler', 'Vivienda', 140, 'Ascensor:Parking:Terraza:Muebles:Electrodomésticos:Climatización:', 'Albacete', 'Almansa', 550, '02-12-2022', 'Piso ubicado en el mismo centro de la ciudad'),
(489, '2666201YJ5210S0087EE', 'Compra', 'Vivienda', 500, 'Terraza:Muebles:Electrodomésticos:Climatización:', 'Madrid', 'Madrid', 1200000, '02-12-2019', 'Casa completamente equipada ubicada en zona residencial de lujo'),
(490, '9736201YJ5210S0087FF', 'Alquiler', 'Trastero', 15, 'Ascensor:', 'Ciudad Real', 'Puerto Llano', 50, '24-02-2023', 'Trastero ubicado en zona de fácil acceso'),
(491, '4852201YJ5210S0087GG', 'Compra', 'Terreno', 1000, 'Parking:', 'Burgos', 'Burgos', 42000, '01-08-2018', 'Amplio terreno ubicado en zona residencial fantástica');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
