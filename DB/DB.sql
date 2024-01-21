-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-12-2023 a las 12:06:15
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
  `id_cadastre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `trade` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `m2` int NOT NULL,
  `province` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `price` int NOT NULL,
  `publication_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `comments` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cadastre` (`id_cadastre`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `real_estates`
--

INSERT INTO `real_estates` (`id`, `id_cadastre`, `type`, `trade`, `m2`, `province`, `postal_code`, `price`, `publication_date`, `comments`) VALUES
(1, '7503503YJ0070S0022TA', 'Vivienda', 'Compra', 90, 'Valencia', '46870', 125000, '15-04-2017', 'Piso situado en el barrio de El Llombo'),
(2, '7003051YJ4480S0045BG', 'Local', 'Compra', 150, 'Madrid', '28042', 400000, '10-11-2023', 'Local comercial situado en Gran Via'),
(3, '8204201YJ5210S0087JH', 'Garaje', 'Alquiler', 15, 'Barcelona', '8030', 80, '22-07-2010', 'Plaza de garaje en zona céntrica'),
(4, '1234201YJ5210S0087JH', 'Oficina', 'Compra', 150, 'Sevilla', '23402', 350000, '27-12-2023', 'Oficinas en el mismo centro de Sevilla'),
(34, '6234201YJ5210S0087XX', 'Local', 'Alquiler', 75, 'Albacete', '00456', 350, '02-12-2023', 'Local en el centro de Burgos'),
(38, '6666201YJ5210S0087ZZ', 'Edificio', 'Compra', 2000, 'Cantabria', '35436', 1000000, '02-12-2023', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
