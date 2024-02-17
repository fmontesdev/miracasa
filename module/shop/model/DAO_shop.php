<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/connect.php");

class DAOShop{
	function select_all_realEstates(){
		$sql = "SELECT r.id_realestate, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms,
				r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate 
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					WHERE t.name_type != 'Vivienda'	
					GROUP BY r.id_realestate";
					//GROUP BY r.id_realestate, o.id_op";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$retrArray[] = array(
					"id_realestate" => $row["id_realestate"],
					"name_type" => $row["name_type"],
					"name_op" => $row["name_op"],
					"price" => $row["price"],
					"name_city" => $row["name_city"],
					"province" => $row["province"],
					"area" => $row["area"],
					"rooms" => $row["rooms"],
					"bathrooms" => $row["bathrooms"],
					"floor" => $row["floor"],
					"description" => $row["description"],
					"img_realestate" => explode(":", $row['img_realestate'])
				);
			}
		}

		return $retrArray;
	}

	function select_one_realEstate($id){

		// return $id;

		$sql = "SELECT r.id_realestate, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms, r.bathrooms, r.floor, r.description
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

	function filters_home($filters){
		// return $filters;

		$sql_selectFilter = "";
		$sql_innerFilter = "";
		$sql_whereFilter = "";

		if (isset($filters[0]['type'])){
            $filter_type = $filters[0]['type'][0];
			if ($filter_type == 1){
				$sql_whereFilter .= " WHERE t.subtype IN ('Piso', 'Casa')";
			}else {
				$sql_whereFilter .= " WHERE t.id_type = '$filter_type'";
			}
        }
        if (isset($filters[0]['category'])) {
            $filter_cat = $filters[0]['category'][0];
			$sql_selectFilter .= " cat.name_cat,";
			$sql_innerFilter .= " INNER JOIN `belong_to_cat` bcat ON r.id_realestate = bcat.id_realestate
								INNER JOIN `category` cat ON cat.id_cat = bcat.id_cat";
            $sql_whereFilter .= " WHERE cat.id_cat = '$filter_cat'";		
        }
        if (isset($filters[0]['operation'])) {
            $filter_op = $filters[0]['operation'][0];
            $sql_whereFilter .= " WHERE o.id_op = '$filter_op'";
        }
		if (isset($filters[0]['city'])) {
            $filter_city = $filters[0]['city'][0];
            $sql_whereFilter .= " WHERE c.id_city = '$filter_city'";
        }

		$sql = "SELECT r.id_realestate, t.name_type, t.subtype, ". $sql_selectFilter ." o.name_op, s.price, c.name_city, c.province, r.area,
				r.rooms, r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					". $sql_innerFilter ."
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city";
					
		$sql .= $sql_whereFilter . " GROUP BY r.id_realestate";
		//$sql .= $sql_whereFilter . " GROUP BY r.id_realestate, o.id_op";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				if (isset($filters[0]['category'])) {
					$retrArray[] = array(
						"id_realestate" => $row["id_realestate"],
						"name_type" => $row["name_type"],
						"subtype" => $row["subtype"],
						"name_cat" => $row["name_cat"],
						"name_op" => $row["name_op"],
						"price" => $row["price"],
						"name_city" => $row["name_city"],
						"province" => $row["province"],
						"area" => $row["area"],
						"rooms" => $row["rooms"],
						"bathrooms" => $row["bathrooms"],
						"floor" => $row["floor"],
						"description" => $row["description"],
						"img_realestate" => explode(":", $row['img_realestate'])
					);					
				} else {
					$retrArray[] = array(
						"id_realestate" => $row["id_realestate"],
						"name_type" => $row["name_type"],
						"subtype" => $row["subtype"],
						"name_op" => $row["name_op"],
						"price" => $row["price"],
						"name_city" => $row["name_city"],
						"province" => $row["province"],
						"area" => $row["area"],
						"rooms" => $row["rooms"],
						"bathrooms" => $row["bathrooms"],
						"floor" => $row["floor"],
						"description" => $row["description"],
						"img_realestate" => explode(":", $row['img_realestate'])
					);
				}
			}
		}

		return $retrArray;
	}
}
