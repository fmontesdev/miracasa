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
				$row['img_realestate'] = explode(":", $row['img_realestate']);
				$retrArray[] = $row;
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

		if (isset($filters[0]['touristcat'])) {
            $filter_touristcat = $filters[0]['touristcat'][0];
            $sql_whereFilter .= " WHERE c.id_touristcat = '$filter_touristcat'";
        }
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
			$sql_selectFilter .= ", cat.name_cat";
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

		$sql = "SELECT r.id_realestate, t.name_type, t.subtype, o.name_op, s.price, c.name_city, c.province, r.area,
				r.rooms, r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate" . $sql_selectFilter ."
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city "
					. $sql_innerFilter
					. $sql_whereFilter .
					" GROUP BY r.id_realestate";
					
		// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate";
		// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate, o.id_op";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$row['img_realestate'] = explode(":", $row['img_realestate']);
				$retrArray[] = $row;
			}
		}

		return $retrArray;
	}

	function select_filter_city(){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `city` c
				ORDER BY c.id_city";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$cityArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($cityArray, $row);
			}
		}
		return $cityArray;
	}

	function select_filter_cat(){
		$sql = "SELECT c.id_cat, c.name_cat
			    FROM `category` c
				ORDER BY c.id_cat";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$catArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($catArray, $row);
			}
		}
		return $catArray;
	}

	function select_filter_type(){
		$sql = "SELECT t.id_type, t.name_type, t.subtype
			    FROM `type` t
				WHERE t.subtype = 'Inmueble'
				ORDER BY t.id_type";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$typeArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($typeArray, $row);
			}
		}
		return $typeArray;
	}

	function select_filter_flat(){
		$sql = "SELECT t.id_type, t.name_type, t.subtype
			    FROM `type` t
				WHERE t.subtype = 'Piso'
				ORDER BY t.id_type";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$typeArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($typeArray, $row);
			}
		}
		return $typeArray;
	}

	function select_filter_house(){
		$sql = "SELECT t.id_type, t.name_type, t.subtype
			    FROM `type` t
				WHERE t.subtype = 'Casa'
				ORDER BY t.id_type";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$typeArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($typeArray, $row);
			}
		}
		return $typeArray;
	}

	function select_filter_op(){
		$sql = "SELECT o.id_op, o.name_op
			    FROM `operation` o
				ORDER BY o.id_op";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$opArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($opArray, $row);
			}
		}
		return $opArray;
	}

	function select_filter_extras(){
		$sql = "SELECT e.id_extras, e.name_extras
			    FROM `extras` e
				ORDER BY e.id_extras";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$extrasArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($extrasArray, $row);
			}
		}
		return $extrasArray;
	}

	function select_filter_touristcat(){
		$sql = "SELECT c.id_touristcat, c.name_touristcat
			    FROM `tourist_cat` c
				ORDER BY c.id_touristcat";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$touristcatArray = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($touristcatArray, $row);
			}
		}
		return $touristcatArray;
	}

	function filters_shop($filters){
		// return $filters;

		$sql_selectFilter = "";
		$sql_innerFilter = "";
		$sql_whereFilter = "";

		for ($i=0; $i < count($filters); $i++) {
			if ($filters[$i][0] == 'name_cat') {
				$sql_selectFilter .= ", cat." . $filters[$i][0];
				$sql_innerFilter .= " INNER JOIN `belong_to_cat` bcat ON r.id_realestate = bcat.id_realestate
									INNER JOIN `category` cat ON cat.id_cat = bcat.id_cat";
			} else if ($filters[$i][0] == 'name_extras') {
				$sql_innerFilter .= " INNER JOIN `has_extras` hex ON r.id_realestate = hex.id_realestate
									INNER JOIN `extras` ex ON ex.id_extras = hex.id_extras";
			} else if ($filters[$i][0] == 'name_touristcat') {
				$sql_innerFilter .= " INNER JOIN `tourist_cat` toc ON toc.id_touristcat = c.id_touristcat";
			}
			if ($i==0){
				if ($filters[$i][0] == 'name_extras') { // checkbox
					for ($j=0; $j < count($filters[$i][1]); $j++) {
						if ($j==0){
							$sql_whereFilter .= " WHERE (" . $filters[$i][0] . " = '" . $filters[$i][1][$j] . "'";
						} else {
							$sql_whereFilter .= " OR " . $filters[$i][0] . " = '" . $filters[$i][1][$j] . "'";
						}
					}
					$sql_whereFilter .= ")";
				} else if ($filters[$i][0] == 'price') { // rango
					$sql_whereFilter .= " WHERE " . $filters[$i][0] . " BETWEEN " . $filters[$i][1][1] . " AND " . $filters[$i][2][1];
				} else if ($filters[$i][1] == '+5') { // rooms - bathrooms
					$sql_whereFilter .= " WHERE " . $filters[$i][0] . " >= '" . $filters[$i][1] . "'";
				} else {
					$sql_whereFilter .= " WHERE " . $filters[$i][0] . " = '" . $filters[$i][1] . "'";
				}
			}else {
				if ($filters[$i][0] == 'name_extras') { // checkbox
					for ($j=0; $j < count($filters[$i][1]); $j++) {
						if ($j==0){
							$sql_whereFilter .= " AND (" . $filters[$i][0] . " = '" . $filters[$i][1][$j] . "'";
						} else {
							$sql_whereFilter .= " OR " . $filters[$i][0] . " = '" . $filters[$i][1][$j] . "'";
						}
					}
					$sql_whereFilter .= ")";
				} else if ($filters[$i][0] == 'price') { // rango
					$sql_whereFilter .= " AND " . $filters[$i][0] . " BETWEEN " . $filters[$i][1][1] . " AND " . $filters[$i][2][1];
				} else if ($filters[$i][1] == '+5') { // rooms - bathrooms
					$sql_whereFilter .= " AND " . $filters[$i][0] . " >= '" . $filters[$i][1] . "'";
				} else {
					$sql_whereFilter .= " AND " . $filters[$i][0] . " = '" . $filters[$i][1] . "'";
				}
			}        
		}

		$sql = "SELECT r.id_realestate, t.name_type, t.subtype, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms,
				r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate". $sql_selectFilter ."
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city "
					. $sql_innerFilter
					. $sql_whereFilter .
					" GROUP BY r.id_realestate";
					
		// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate, o.id_op";
		// return $sql;

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$row['img_realestate'] = explode(":", $row['img_realestate']);
				$retrArray[] = $row;
			}
		}
		
		return $retrArray;
	}
}