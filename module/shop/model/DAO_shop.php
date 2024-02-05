<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/connect.php");

class DAOShop{
	function select_all_realEstates(){
		$sql = "SELECT r.id_realestate, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms, r.bathrooms, r.description, i.img_realestate
					FROM `real_estate` r 
					INNER JOIN `type` t 
					INNER JOIN `belong_to_type` bt
					INNER JOIN `is_traded` s 
					INNER JOIN `operation` o
					INNER JOIN `img_realestate` i 
					INNER JOIN `city` c
					ON  r.id_realestate = bt.id_realestate 
					AND t.id_type = BT.id_type
					AND r.id_realestate = s.id_realestate 
					AND o.id_op = s.id_op
					AND r.id_realestate = i.id_realestate 
					AND r.id_city = c.id_city
					WHERE t.name_type != 'Vivienda'	
					GROUP BY r.id_realestate";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$retrArray = array();
		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$retrArray[] = $row; //pasamos cada fila de resultado a un array
			}
		}
		return $retrArray;
	}

	function select_one_realEstate($id){
		$sql = "SELECT r.id_realestate, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms, r.bathrooms, r.description
					FROM `real_estate` r 
					INNER JOIN `type` t 
					INNER JOIN `belong_to_type` bt
					INNER JOIN `operation` o
					INNER JOIN `is_traded` s 
					INNER JOIN `city` c
					ON  r.id_realestate = bt.id_realestate 
					AND t.id_type = bt.id_type
					AND r.id_realestate = s.id_realestate 
					AND o.id_op = s.id_op
					AND r.id_city = c.id_city
					WHERE r.id_realestate = '$id' AND t.name_type != 'Vivienda'
					GROUP BY r.id_realestate";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object(); //fetch_object() devuelve la fila actual de un conjunto de resultados como un objeto
		connect::close($conexion);

		return $res;
	}

	function select_imgs_realEstate($id){
		$sql = "SELECT i.id_img_re, i.img_realestate
			    FROM `img_realestate` i
			    WHERE i.id_realestate = '$id'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$imgArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($imgArray, $row); //array_push() trata array como si fuera una pila y coloca la variable que se le proporciona al final del array. El tamaño del array será incrementado por el número de variables insertados
			}
		}
		return $imgArray;
	}

	function select_extras_realEstate($id){
		$sql = "SELECT e.id_extras, e.name_extras, e.img_extras
			    FROM `extras` e INNER JOIN `has_extras` he
				ON e.id_extras = he.id_extras
			    WHERE he.id_realestate = '$id'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$extraArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($extraArray, $row);
			}
		}
		return $extraArray;
	}
}
