-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-01-2024 a las 07:00:33
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
-- Estructura de tabla para la tabla `belong_to_cat`
--

DROP TABLE IF EXISTS `belong_to_cat`;
CREATE TABLE IF NOT EXISTS `belong_to_cat` (
  `id_realestate` int NOT NULL,
  `id_cat` int NOT NULL,
  PRIMARY KEY (`id_realestate`,`id_cat`),
  KEY `belong_to_cat_ibfk_2` (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `belong_to_cat`
--

INSERT INTO `belong_to_cat` (`id_realestate`, `id_cat`) VALUES
(2, 1),
(1, 2),
(4, 3),
(5, 4),
(5, 5),
(4, 6),
(7, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `belong_to_type`
--

DROP TABLE IF EXISTS `belong_to_type`;
CREATE TABLE IF NOT EXISTS `belong_to_type` (
  `id_realestate` int NOT NULL,
  `id_type` int NOT NULL,
  PRIMARY KEY (`id_realestate`,`id_type`),
  KEY `belong_to_type_ibfk_2` (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `belong_to_type`
--

INSERT INTO `belong_to_type` (`id_realestate`, `id_type`) VALUES
(4, 1),
(5, 1),
(8, 1),
(2, 3),
(6, 4),
(3, 5),
(1, 6),
(7, 7),
(4, 11),
(8, 15),
(5, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id_cat` int NOT NULL AUTO_INCREMENT,
  `name_cat` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `img_cat` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_cat`, `name_cat`, `img_cat`) VALUES
(1, 'Obra nueva', 'view/img/categories/obra_nueva.jpg'),
(2, 'A reformar', 'view/img/categories/a_reformar.jpg'),
(3, 'De diseño', 'view/img/categories/de_diseño.jpg'),
(4, 'De lujo', 'view/img/categories/de_lujo.jpg'),
(5, 'En zona residencial', 'view/img/categories/en_zona_residencial.jpg'),
(6, 'En la playa', 'view/img/categories/en_la_playa.jpg'),
(7, 'En el campo', 'view/img/categories/en_el_campo.jpg'),
(8, 'En la montaña', 'view/img/categories/en_la_montaña.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

DROP TABLE IF EXISTS `city`;
CREATE TABLE IF NOT EXISTS `city` (
  `id_city` int NOT NULL AUTO_INCREMENT,
  `name_city` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `province` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `id_touristarea` int DEFAULT NULL,
  `img_city` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id_city`, `name_city`, `province`, `img_city`) VALUES
(1, 'Albacete', 'Albacete', 'view/img/cities/albacete.jpg'),
(2, 'Alicante', 'Alicante', 'view/img/cities/alicante.jpg'),
(3, 'Almería', 'Almería', 'view/img/cities/almeria.jpg'),
(4, 'Ávila', 'Ávila', 'view/img/cities/avila.jpg'),
(5, 'Badajoz', 'Badajoz', 'view/img/cities/badajoz.jpg'),
(6, 'Barcelona', 'Barcelona', 'view/img/cities/barcelona.jpg'),
(7, 'Bilbao', 'Bizkaia', 'view/img/cities/bilbao.jpg'),
(8, 'Burgos', 'Burgos', 'view/img/cities/burgos.jpg'),
(9, 'Cáceres', 'Cáceres', 'view/img/cities/caceres.jpg'),
(10, 'Cádiz', 'Cádiz', 'view/img/cities/cadiz.jpg'),
(11, 'Castellón de la Plana', 'Castellón', 'view/img/cities/castellon.jpg'),
(12, 'Ciudad Real', 'Ciudad Real', 'view/img/cities/ciudad_real.jpg'),
(13, 'Córdoba', 'Córdoba', 'view/img/cities/cordoba.jpg'),
(14, 'A Coruña', 'A Coruña', 'view/img/cities/a_coruña.jpg'),
(15, 'Cuenca', 'Cuenca', 'view/img/cities/cuenca.jpg'),
(16, 'Girona', 'Girona', 'view/img/cities/girona.jpg'),
(17, 'Granada', 'Granada', 'view/img/cities/granada.jpg'),
(18, 'Guadalajara', 'Guadalajara', 'view/img/cities/guadalajara.jpg'),
(19, 'Huelva', 'Huelva', 'view/img/cities/huelva.jpg'),
(20, 'Huesca', 'Huesca', 'view/img/cities/huesca.jpg'),
(21, 'Jaén', 'Jaén', 'view/img/cities/jaen.jpg'),
(22, 'León', 'León', 'view/img/cities/leon.jpg'),
(23, 'Lleida', 'Lleida', 'view/img/cities/lleida.jpg'),
(24, 'Logroño', 'La Rioja', 'view/img/cities/logroño.jpg'),
(25, 'Lugo', 'Lugo', 'view/img/cities/lugo.jpg'),
(26, 'Madrid', 'Madrid', 'view/img/cities/madrid.jpg'),
(27, 'Málaga', 'Málaga', 'view/img/cities/malaga.jpg'),
(28, 'Murcia', 'Murcia', 'view/img/cities/murcia.jpg'),
(29, 'Ourense', 'Ourense', 'view/img/cities/ourense.jpg'),
(30, 'Oviedo', 'Asturias', 'view/img/cities/oviedo.jpg'),
(31, 'Palencia', 'Palencia', 'view/img/cities/palencia.jpg'),
(32, 'Palma de Mallorca', 'Illes Balears', 'view/img/cities/palma_de_mallorca.jpg'),
(33, 'Las Palmas de Gran Canari', 'Las Palmas', 'view/img/cities/las_palmas_de_gran_canaria.jpg'),
(34, 'Pamplona', 'Navarra', 'view/img/cities/pamplona.jpg'),
(35, 'Pontevedra', 'Pontevedra', 'view/img/cities/pontevedra.jpg'),
(36, 'Salamanca', 'Salamanca', 'view/img/cities/salamanca.jpg'),
(37, 'San Sebastián', 'Gipuzkoa', 'view/img/cities/san_sebastian.jpg'),
(38, 'Santa Cruz de Tenerife', 'Santa Cruz de Tenerife', 'view/img/cities/santa_cruz_de_tenerife.jpg'),
(39, 'Santander', 'Cantabria', 'view/img/cities/santander.jpg'),
(40, 'Segovia', 'Segovia', 'view/img/cities/segovia.jpg'),
(41, 'Sevilla', 'Sevilla', 'view/img/cities/sevilla.jpg'),
(42, 'Soria', 'Soria', 'view/img/cities/soria.jpg'),
(43, 'Tarragona', 'Tarragona', 'view/img/cities/tarragona.jpg'),
(44, 'Teruel', 'Teruel', 'view/img/cities/teruel.jpg'),
(45, 'Toledo', 'Toledo', 'view/img/cities/toledo.jpg'),
(46, 'Valencia', 'Valencia', 'view/img/cities/valencia.jpg'),
(47, 'Valladolid', 'Valladolid', 'view/img/cities/valladolid.jpg'),
(48, 'Vitoria', 'Álava', 'view/img/cities/vitoria.jpg'),
(49, 'Zamora', 'Zamora', 'view/img/cities/zamora.jpg'),
(50, 'Zaragoza', 'Zaragoza', 'view/img/cities/zaragoza.jpg'),
(51, 'Ceuta', 'Ceuta', 'view/img/cities/ceuta.jpg'),
(52, 'Melilla', 'Melilla', 'view/img/cities/melilla.jpg');

INSERT INTO `city` (`id_city`, `name_city`, `province`, `id_touristarea`, `img_city`) VALUES
(53, 'Canet de Mar', 'Barcelona', 1, 'view/img/cities/canet_de_mar.jpg'),
(54, 'Castelldefels', 'Barcelona', 1, 'view/img/cities/castelldefels.jpg'),
(55, 'Sitges', 'Barcelona', 1, 'view/img/cities/sitges.jpg'),
(56, 'Altea', 'Alicante', 2, 'view/img/cities/altea.jpg'),
(57, 'Benidorm', 'Alicante', 2, 'view/img/cities/benidorm.jpg'),
(58, 'Torrevieja', 'Alicante', 2, 'view/img/cities/torrevieja.jpg'),
(59, 'Lloret de Mar', 'Girona', 3, 'view/img/cities/lloret_de_mar.jpg'),
(60, 'Águilas', 'Murcia', 4, 'view/img/cities/aguilas.jpg'),
(61, 'Cartagena', 'Murcia', 4, 'view/img/cities/cartagena.jpg'),
(62, 'Muros', 'A Coruña', 5, 'view/img/cities/muros.jpg'),
(63, 'Muxía', 'A Coruña', 5, 'view/img/cities/muxia.jpg'),
(64, 'Roquetas de Mar', 'Almería', 6, 'view/img/cities/roquetas_de_mar.jpg'),
(65, 'San Vicente de la Barquera', 'Cantabria', 7, 'view/img/cities/san_vicente_de_la_barquera.jpg'),
(66, 'Oropesa del Mar', 'Castellón', 8, 'view/img/cities/oropesa_del_mar.jpg'),
(67, 'Peñíscola', 'Castellón', 8, 'view/img/cities/penyiscola.jpg'),
(68, 'Vinarós', 'Castellón', 8, 'view/img/cities/vinaros.jpg'),
(69, 'El Puerto de Santa María', 'Cádiz', 9, 'view/img/cities/el_puerto_de_santa_maria.jpg'),
(70, 'Isla Cristina', 'Huelva', 9, 'view/img/cities/isla_cristina.jpg'),
(71, 'Gandía', 'Valencia', 10, 'view/img/cities/gandia.jpg'),
(72, 'Estepona', 'Málaga', 11, 'view/img/cities/estepona.jpg'),
(73, 'Marbella', 'Málaga', 11, 'view/img/cities/marbella.jpg'),
(74, 'Torremolinos', 'Málaga', 11, 'view/img/cities/torremolinos.jpg'),
(75, 'Cambrils', 'Tarragona', 12, 'view/img/cities/cambrils.jpg'),
(76, 'Salou', 'Tarragona', 12, 'view/img/cities/salou.jpg'),
(77, 'Almuñecar', 'Granada', 13, 'view/img/cities/almuñecar.jpg'),
(78, 'Motril', 'Granada', 13, 'view/img/cities/motril.jpg'),
(79, 'Hondarríbia', 'Gipuzkoa', 14, 'view/img/cities/hondarribia.jpg'),
(80, 'Gijón', 'Asturias', 15, 'view/img/cities/gijon.jpg'),
(81, 'Ribadesella', 'Asturias', 15, 'view/img/cities/ribadesella.jpg'),
(82, 'Ribadeo', 'Lugo', 16, 'view/img/cities/ribadeo.jpg'),
(83, 'Viveiro', 'Lugo', 16, 'view/img/cities/viveiro.jpg'),
(84, 'Ferrol', 'A Coruña', 17, 'view/img/cities/ferrol.jpg'),
(85, 'Sanxenxo', 'Pontevedra', 18, 'view/img/cities/sanxenxo.jpg'),
(86, 'Vigo', 'Pontevedra', 18, 'view/img/cities/vigo.jpg');




-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tourist_area`
--

DROP TABLE IF EXISTS `tourist_area`;
CREATE TABLE IF NOT EXISTS `tourist_area` (
  `id_touristarea` int NOT NULL AUTO_INCREMENT,
  `name_touristarea` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `img_touristarea` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_touristarea`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `tourist_area` (`id_touristarea`, `name_touristarea`, `img_touristarea`) VALUES
(1, 'Costa Barcelona', 'view/img/tourist_areas/costa_barcelona.jpg'),
(2, 'Costa Blanca', 'view/img/tourist_areas/costa_blanca.jpg'),
(3, 'Costa Brava', 'view/img/tourist_areas/costa_brava.jpg'),
(4, 'Costa Cálida', 'view/img/tourist_areas/costa_calida.jpg'),
(5, 'Costa da Morte', 'view/img/tourist_areas/costa_da_morte.jpg'),
(6, 'Costa de Almería', 'view/img/tourist_areas/costa_almeria.jpg'),
(7, 'Costa de Cantabria', 'view/img/tourist_areas/costa_cantabria.jpg'),
(8, 'Costa de Castellón', 'view/img/tourist_areas/costa_castellon.jpg'),
(9, 'Costa de la Luz', 'view/img/tourist_areas/costa_de_la_luz.jpg'),
(10, 'Costa de Valencia', 'view/img/tourist_areas/costa_valencia.jpg'),
(11, 'Costa del Sol', 'view/img/tourist_areas/costa_del_sol.jpg'),
(12, 'Costa Dorada', 'view/img/tourist_areas/costa_dorada.jpg'),
(13, 'Costa Tropical', 'view/img/tourist_areas/costa_tropical.jpg'),
(14, 'Costa Vasca', 'view/img/tourist_areas/costa_vasca.jpg'),
(15, 'Costa Verde', 'view/img/tourist_areas/costa_verde.jpg'),
(16, 'Mariña Lucense', 'view/img/tourist_areas/marinya_lucense.jpg'),
(17, 'Rías Altas', 'view/img/tourist_areas/rias_altas.jpg'),
(18, 'Rías Baixas', 'view/img/tourist_areas/rias_baixas.jpg');

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `exceptions`
--

DROP TABLE IF EXISTS `exceptions`;
CREATE TABLE IF NOT EXISTS `exceptions` (
  `id_excep` int NOT NULL,
  `spot` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `current_date_time` varchar(50) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `user_type` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `exceptions`
--

INSERT INTO `exceptions` (`id_excep`, `spot`, `current_date_time`, `user_type`) VALUES
(503, 'Carrusel HOME', '2022-03-18 23:54:35', 'client'),
(503, 'Carrusel HOME', '2022-03-18 23:54:39', 'client'),
(503, 'Carrusel HOME', '2022-03-18 23:54:40', 'admin'),
(404, 'Carrusel HOME', '2022-03-18 23:54:41', 'client'),
(404, 'Carrusel HOME', '2022-03-18 23:55:30', 'admin'),
(404, 'Carrusel HOME', '2022-03-18 23:56:23', 'client'),
(503, 'Categories HOME', '2022-04-01 11:37:16', 'client'),
(503, 'Categories HOME', '2022-04-01 11:38:25', 'client'),
(503, 'Categories HOME', '2022-04-01 11:37:16', 'admin'),
(404, 'Categories HOME', '2022-04-01 11:38:40', 'admin'),
(404, 'Categories HOME', '2022-04-01 11:37:31', 'client'),
(404, 'Categories HOME', '2022-04-02 17:30:31', 'client');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

DROP TABLE IF EXISTS `extras`;
CREATE TABLE IF NOT EXISTS `extras` (
  `id_extras` int NOT NULL AUTO_INCREMENT,
  `name_extras` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `img_extras` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_extras`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `extras`
--

INSERT INTO `extras` (`id_extras`, `name_extras`, `img_extras`) VALUES
(1, 'Ascensor', 'view/img/extras/ascensor.jpg'),
(2, 'Parking', 'view/img/extras/parking.jpg'),
(3, 'Trastero', 'view/img/extras/trastero.jpg'),
(4, 'Balcón', 'view/img/extras/balcon.jpeg'),
(5, 'Terraza', 'view/img/extras/terraza.jpg'),
(6, 'Piscina', 'view/img/extras/piscina.jpg'),
(7, 'Jardín', 'view/img/extras/jardin.jpg'),
(8, 'Amueblado', 'view/img/extras/amueblado.jpg'),
(9, 'Sin amueblar', 'view/img/extras/sin_amueblar.jpg'),
(10, 'Electrodomésticos', 'view/img/extras/electrodomesticos.jpg'),
(11, 'Aire acondicionado', 'view/img/extras/aire_acondicionado.jpg'),
(12, 'Calefacción', 'view/img/extras/calefaccion.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `has_extras`
--

DROP TABLE IF EXISTS `has_extras`;
CREATE TABLE IF NOT EXISTS `has_extras` (
  `id_realestate` int NOT NULL,
  `id_extras` int NOT NULL,
  PRIMARY KEY (`id_realestate`,`id_extras`),
  KEY `has_extras_ibfk_2` (`id_extras`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `has_extras`
--

INSERT INTO `has_extras` (`id_realestate`, `id_extras`) VALUES
(2, 1),
(4, 1),
(6, 1),
(8, 1),
(4, 2),
(4, 3),
(8, 4),
(5, 6),
(5, 7),
(7, 7),
(3, 8),
(4, 8),
(5, 8),
(8, 8),
(4, 10),
(5, 10),
(8, 10),
(1, 11),
(3, 11),
(4, 11),
(5, 11),
(8, 11),
(1, 12),
(3, 12),
(4, 12),
(5, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_realestate`
--

DROP TABLE IF EXISTS `img_realestate`;
CREATE TABLE IF NOT EXISTS `img_realestate` (
  `id_img_re` int NOT NULL AUTO_INCREMENT,
  `img_realestate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `id_realestate` int NOT NULL,
  PRIMARY KEY (`id_img_re`),
  KEY `real_estate` (`id_realestate`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `img_realestate`
--

INSERT INTO `img_realestate` (`id_img_re`, `img_realestate`, `id_realestate`) VALUES
(1, 'view/img/real_estates/real_estate_1_1.jpg', 1),
(2, 'view/img/real_estates/real_estate_1_2.jpg', 1),
(3, 'view/img/real_estates/real_estate_1_3.jpg', 1),
(4, 'view/img/real_estates/real_estate_1_4.jpg', 1),
(5, 'view/img/real_estates/real_estate_2_1.jpg', 2),
(6, 'view/img/real_estates/real_estate_2_2.jpg', 2),
(7, 'view/img/real_estates/real_estate_2_3.jpg', 2),
(8, 'view/img/real_estates/real_estate_2_4.jpg', 2),
(9, 'view/img/real_estates/real_estate_3_1.jpg', 3),
(10, 'view/img/real_estates/real_estate_3_2.jpg', 3),
(11, 'view/img/real_estates/real_estate_3_3.jpg', 3),
(12, 'view/img/real_estates/real_estate_3_4.jpg', 3),
(13, 'view/img/real_estates/real_estate_4_1.jpg', 4),
(14, 'view/img/real_estates/real_estate_4_2.jpg', 4),
(15, 'view/img/real_estates/real_estate_4_3.jpg', 4),
(16, 'view/img/real_estates/real_estate_4_4.jpg', 4),
(17, 'view/img/real_estates/real_estate_5_1.jpg', 5),
(18, 'view/img/real_estates/real_estate_5_2.jpg', 5),
(19, 'view/img/real_estates/real_estate_5_3.jpg', 5),
(20, 'view/img/real_estates/real_estate_5_4.jpg', 5),
(21, 'view/img/real_estates/real_estate_6_1.jpg', 6),
(22, 'view/img/real_estates/real_estate_6_2.jpg', 6),
(23, 'view/img/real_estates/real_estate_6_3.jpg', 6),
(24, 'view/img/real_estates/real_estate_6_4.jpg', 6),
(25, 'view/img/real_estates/real_estate_7_1.jpg', 7),
(26, 'view/img/real_estates/real_estate_7_2.jpg', 7),
(27, 'view/img/real_estates/real_estate_7_3.jpg', 7),
(28, 'view/img/real_estates/real_estate_7_4.jpg', 7),
(29, 'view/img/real_estates/real_estate_8_1.jpg', 8),
(30, 'view/img/real_estates/real_estate_8_2.jpg', 8),
(31, 'view/img/real_estates/real_estate_8_3.jpg', 8),
(32, 'view/img/real_estates/real_estate_8_4.jpg', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `is_traded`
--

DROP TABLE IF EXISTS `is_traded`;
CREATE TABLE IF NOT EXISTS `is_traded` (
  `id_realestate` int NOT NULL,
  `id_op` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id_realestate`,`id_op`),
  KEY `is_traded_ibfk_2` (`id_op`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `is_traded`
--

INSERT INTO `is_traded` (`id_realestate`, `id_op`, `price`) VALUES
(1, 1, 250000),
(2, 2, 80),
(3, 1, 200000),
(4, 1, 225000),
(4, 3, 550),
(5, 1, 1200000),
(6, 2, 50),
(7, 1, 42000),
(8, 4, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

DROP TABLE IF EXISTS `operation`;
CREATE TABLE IF NOT EXISTS `operation` (
  `id_op` int NOT NULL AUTO_INCREMENT,
  `name_op` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `img_op` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_op`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`id_op`, `name_op`, `img_op`) VALUES
(1, 'Compra', 'view/img/operations/compra.jpg'),
(2, 'Alquiler', 'view/img/operations/alquiler.jpg'),
(3, 'Alquiler con opción a compra', 'view/img/operations/alquiler_compra.jpg'),
(4, 'Compartir', 'view/img/operations/compartir.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `real_estate`
--

DROP TABLE IF EXISTS `real_estate`;
CREATE TABLE IF NOT EXISTS `real_estate` (
  `id_realestate` int NOT NULL AUTO_INCREMENT,
  `cadastre` varchar(20) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `id_city` int NOT NULL,
  `area` int NOT NULL,
  `rooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `publication_date` varchar(10) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_realestate`),
  UNIQUE KEY `cadastre` (`cadastre`),
  KEY `city` (`id_city`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `real_estate`
--

INSERT INTO `real_estate` (`id_realestate`, `cadastre`, `id_city`, `area`, `rooms`, `bathrooms`, `description`, `publication_date`) VALUES
(1, '7003051YJ4480S0045AA', 39, 150, 0, 1, 'Local comercial a reformar, situado en zona privilegiada para el comercio', '15-04-2017'),
(2, '8204201YJ5210S0087BB', 6, 15, 0, 0, 'Plaza de garaje en zona céntrica con inmejorable acceso', '10-11-2023'),
(3, '1234201YJ5210S0087CC', 41, 145, 0, 2, 'Oficinas en el mismo centro de la población', '22-07-2010'),
(4, '6845201YJ5210S0087DD', 2, 140, 3, 2, 'Piso de diseño con magníficas vistas al mar', '27-12-2023'),
(5, '2666201YJ5210S0087EE', 26, 500, 5, 4, 'Casa completamente equipada ubicada en zona residencial de lujo', '02-12-2023'),
(6, '9736201YJ5210S0087FF', 12, 15, 0, 0, 'Trastero ubicado en zona de fácil acceso', '02-12-2023'),
(7, '4852201YJ5210S0087GG', 8, 1000, 0, 0, 'Amplio terreno ubicado en una zona con vistas magníficas', '02-12-2023'),
(8, '5928522YJ5210S0496HH', 46, 110, 4, 2, 'Piso para compartir con 4 habitaciones. Ideal para estudiantes.', '12-01-2024');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id_type` int NOT NULL AUTO_INCREMENT,
  `name_type` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `subtype` varchar(25) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  `img_type` varchar(100) COLLATE utf8mb4_es_trad_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_es_trad_0900_ai_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`id_type`, `name_type`, `subtype`, `img_type`) VALUES
(1, 'Vivienda', 'Inmueble', 'view/img/types/vivienda.jpg'),
(2, 'Habitación', 'Inmueble', 'view/img/types/habitacion.jpg'),
(3, 'Garaje', 'Inmueble', 'view/img/types/garaje.jpg'),
(4, 'Trastero', 'Inmueble', 'view/img/types/trastero.jpg'),
(5, 'Oficina', 'Inmueble', 'view/img/types/oficina.jpg'),
(6, 'Local o nave', 'Inmueble', 'view/img/types/local_nave.jpg'),
(7, 'Terreno', 'Inmueble', 'view/img/types/terreno.jpg'),
(8, 'Edificio', 'Inmueble', 'view/img/types/edificio.jpg'),
(9, 'Apartamento', 'Piso', 'view/img/types/apartamento.jpg'),
(10, 'Ático', 'Piso', 'view/img/types/atico.jpg'),
(11, 'Dúplex', 'Piso', 'view/img/types/duplex.jpg'),
(12, 'Estudio', 'Piso', 'view/img/types/estudio.jpg'),
(13, 'Loft', 'Piso', 'view/img/types/loft.jpg'),
(14, 'Planta baja', 'Piso', 'view/img/types/planta_baja.jpg'),
(15, 'Plantas intermedias', 'Piso', 'view/img/types/plantas_intermedias.jpg'),
(16, 'Casa', 'Casa', 'view/img/types/casa.jpg'),
(17, 'Casa adosada', 'Casa', 'view/img/types/casa_adosada.jpg'),
(18, 'Finca rústica', 'Casa', 'view/img/types/finca_rustica.jpg');

-- --------------------------------------------------------

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `belong_to_cat`
--


  ADD CONSTRAINT `belong_to_cat_ibfk_2` FOREIGN KEY (`id_cat`) REFERENCES `category` (`id_cat`);

ALTER TABLE `belong_to_cat`
  DROP FOREIGN KEY `belong_to_cat_ibfk_1`,
  DROP FOREIGN KEY `belong_to_cat_ibfk_2`;

--
-- Filtros para la tabla `belong_to_type`
--
ALTER TABLE `belong_to_type`
  ADD CONSTRAINT `belong_to_type_ibfk_1` FOREIGN KEY (`id_realestate`) REFERENCES `real_estate` (`id_realestate`),
  ADD CONSTRAINT `belong_to_type_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`);

ALTER TABLE `belong_to_type`
  DROP FOREIGN KEY `belong_to_type_ibfk_1`,
  DROP FOREIGN KEY `belong_to_type_ibfk_2`;

--
-- Filtros para la tabla `has_extras`
--
ALTER TABLE `has_extras`
  ADD CONSTRAINT `has_extras_ibfk_1` FOREIGN KEY (`id_realestate`) REFERENCES `real_estate` (`id_realestate`),
  ADD CONSTRAINT `has_extras_ibfk_2` FOREIGN KEY (`id_extras`) REFERENCES `extras` (`id_extras`);

ALTER TABLE `has_extras`
  DROP FOREIGN KEY `has_extras_ibfk_1`,
  DROP FOREIGN KEY `has_extras_ibfk_2`;

--
-- Filtros para la tabla `img_realestate`
--
ALTER TABLE `img_realestate`
  ADD CONSTRAINT `img_realestate_ibfk_1` FOREIGN KEY (`id_realestate`) REFERENCES `real_estate` (`id_realestate`);

ALTER TABLE `img_realestate`
  DROP FOREIGN KEY `img_real-estate_ibfk_1`;

--
-- Filtros para la tabla `is_traded`
--
ALTER TABLE `is_traded`
  ADD CONSTRAINT `is_traded_ibfk_1` FOREIGN KEY (`id_realestate`) REFERENCES `real_estate` (`id_realestate`),
  ADD CONSTRAINT `is_traded_ibfk_2` FOREIGN KEY (`id_op`) REFERENCES `operation` (`id_op`);

ALTER TABLE `is_traded`
  DROP FOREIGN KEY `is_traded_ibfk_1`,
  DROP FOREIGN KEY `is_traded_ibfk_2`;

--
-- Filtros para la tabla `real_estate`
--
ALTER TABLE `real_estate`
  ADD CONSTRAINT `real_estate_ibfk_2` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`);

ALTER TABLE `real_estate`
  DROP FOREIGN KEY `real_estate_ibfk_2`;

--
-- Filtros para la tabla `city`
--

ALTER TABLE `city`
	ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`id_touristarea`) REFERENCES `tourist_area` (`id_touristarea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
