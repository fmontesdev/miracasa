<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/connect.php");

class DAOShop{
	function select_all_realEstates($limit, $offset, $id_user){
		$sql = "SELECT r.id_realestate, r.lat, r.lng, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area, r.rooms, r.bathrooms, r.floor, r.description,
				GROUP_CONCAT(DISTINCT i.img_realestate SEPARATOR ':') AS img_realestate, GROUP_CONCAT(DISTINCT l.id_user SEPARATOR ':') AS 'like'
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate 
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					LEFT JOIN `like` l ON r.id_realestate = l.id_realestate
					WHERE t.name_type != 'Vivienda'	
					GROUP BY r.id_realestate
					LIMIT $limit OFFSET $offset";
					//GROUP BY r.id_realestate, o.id_op";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$row['img_realestate'] = explode(":", $row['img_realestate']);
				$count_like = 0;
				if ($row['like'] != null) {
					$row['like'] = explode(":", $row['like']);
					foreach ($row['like'] as $user) {
						if ($user == $id_user) {
							$count_like = count($row['like']);
						}
					}
				} else {
					$count_like = 0;
				}
				$row['like'] = $count_like;
				$retrArray[] = $row;
			}
		}

		return $retrArray;
	}

	function insert_visited($id_re){
		// return $id;

		$sql = "UPDATE `real_estate` r 
					SET r.visited = (r.visited + 1)
					WHERE r.id_realestate = $id_re";

		$conexion = connect::con();
		mysqli_query($conexion, $sql);
		connect::close($conexion);
	}

	function select_one_realEstate($id_re){
		$sql = "SELECT r.id_realestate, r.lat, r.lng, t.name_type, o.name_op, s.price,
				c.name_city, c.province, r.area, r.rooms, r.bathrooms, r.floor, r.description
					FROM `real_estate` r
                    INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `city` c ON r.id_city = c.id_city
					WHERE r.id_realestate = $id_re AND t.name_type != 'Vivienda'
					GROUP BY r.id_realestate";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object(); //fetch_object() devuelve la fila actual de un conjunto de resultados como un objeto
		connect::close($conexion);

		return $res;
	}

	function select_imgs_realEstate($id_re){
		$sql = "SELECT i.id_img_re, i.img_realestate
			    FROM `img_realestate` i
			    WHERE i.id_realestate = $id_re";

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

	function select_extras_realEstate($id_re){
		$sql = "SELECT e.id_extras, e.name_extras, e.img_extras
			    FROM `extras` e INNER JOIN `has_extras` he
				ON e.id_extras = he.id_extras
			    WHERE he.id_realestate = $id_re";

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

	function select_likes_realEstate($id_re, $id_user){
		$sql = "SELECT l.id_realestate, l.id_user AS user_like
			    FROM `real_estate` r LEFT JOIN `like` l ON r.id_realestate = l.id_realestate
			    WHERE r.id_realestate = $id_re";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$likeArray[] = $row;
			}		
		}

		$count_like = 0;
		foreach ($likeArray as $data) {
			if ($data['user_like'] == $id_user) {
				$count_like = count($likeArray);
			}
		}
		$like['like'] = $count_like;

		return $like;
	}

	function select_realestates_related($id, $operation, $limit, $offset){

		$sql_whereFilter = "";
		if ($operation != null) {
			$sql_whereFilter .= " AND o.name_op = '$operation'";
		}

		$sql = "SELECT r.id_realestate, r.lat, r.lng, t.name_type, o.name_op, s.price, c.name_city, c.province, r.area,
				r.rooms, r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate 
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					WHERE t.name_type != 'Vivienda' AND r.id_realestate NOT IN($id)"
					. $sql_whereFilter .
					" GROUP BY r.id_realestate
					LIMIT $limit OFFSET $offset";
					//GROUP BY r.id_realestate, o.id_op";

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

	// function filters_home($filters){
	// 	// return $filters;

	// 	$sql_selectFilter = "";
	// 	$sql_innerFilter = "";
	// 	$sql_whereFilter = "";

	// 	if (isset($filters[0]['touristcat'])) {
    //         $filter_touristcat = $filters[0]['touristcat'][0];
    //         $sql_whereFilter .= " WHERE c.id_touristcat = '$filter_touristcat'";
    //     }
	// 	if (isset($filters[0]['type'])){
    //         $filter_type = $filters[0]['type'][0];
	// 		if ($filter_type == 1){
	// 			$sql_whereFilter .= " WHERE t.subtype IN ('Piso', 'Casa')";
	// 		}else {
	// 			$sql_whereFilter .= " WHERE t.id_type = '$filter_type'";
	// 		}
    //     }
    //     if (isset($filters[0]['category'])) {
    //         $filter_cat = $filters[0]['category'][0];
	// 		$sql_selectFilter .= ", cat.name_cat";
	// 		$sql_innerFilter .= " INNER JOIN `belong_to_cat` bcat ON r.id_realestate = bcat.id_realestate
	// 							INNER JOIN `category` cat ON cat.id_cat = bcat.id_cat";
    //         $sql_whereFilter .= " WHERE cat.id_cat = '$filter_cat'";		
    //     }
    //     if (isset($filters[0]['operation'])) {
    //         $filter_op = $filters[0]['operation'][0];
    //         $sql_whereFilter .= " WHERE o.id_op = '$filter_op'";
    //     }
	// 	if (isset($filters[0]['city'])) {
    //         $filter_city = $filters[0]['city'][0];
    //         $sql_whereFilter .= " WHERE c.id_city = '$filter_city'";
    //     }

	// 	$sql = "SELECT r.id_realestate, r.lat, r.lng, t.name_type, t.subtype, o.name_op, s.price, c.name_city, c.province, r.area,
	// 			r.rooms, r.bathrooms, r.floor, r.description, GROUP_CONCAT(i.img_realestate SEPARATOR ':') AS img_realestate" . $sql_selectFilter ."
	// 				FROM `real_estate` r
	// 				INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
	// 				INNER JOIN `type` t ON t.id_type = bt.id_type
	// 				INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
	// 				INNER JOIN `operation` o ON o.id_op = s.id_op
	// 				INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
	// 				INNER JOIN `city` c ON r.id_city = c.id_city "
	// 				. $sql_innerFilter
	// 				. $sql_whereFilter .
	// 				" GROUP BY r.id_realestate";
					
	// 	// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate";
	// 	// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate, o.id_op";

	// 	$conexion = connect::con();
	// 	$res = mysqli_query($conexion, $sql);
	// 	connect::close($conexion);

	// 	if (mysqli_num_rows($res) > 0) { //devuelve número de filas
	// 		while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
	// 			$row['img_realestate'] = explode(":", $row['img_realestate']);
	// 			$retrArray[] = $row;
	// 		}
	// 	}

	// 	return $retrArray;
	// }

	function select_filter_city(){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `city` c
				ORDER BY c.name_city";

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

	function filters_shop($filters, $limit, $offset, $id_user){
		// return $filters;

		$sql_selectFilter = "";
		$sql_innerFilter = "";
		$sql_whereFilter = "";
		$sql_orderFilter = "";

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
			} else if ($filters[$i][1] == 'Más baratos') {
				$sql_orderFilter .= " ORDER BY price ASC";
			} else if ($filters[$i][1] == 'Más caros') {
				$sql_orderFilter .= " ORDER BY price DESC";
			} else if ($filters[$i][1] == 'Más grandes') {
				$sql_orderFilter .= " ORDER BY area DESC";
			} else if ($filters[$i][1] == 'Más pequeños') {
				$sql_orderFilter .= " ORDER BY area ASC";
			} else if ($filters[$i][1] == 'Más visitados') {
				$sql_orderFilter .= " ORDER BY visited DESC";
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
				} else if ($filters[$i][0] != 'order'){
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
				} else if ($filters[$i][0] != 'order'){
					$sql_whereFilter .= " AND " . $filters[$i][0] . " = '" . $filters[$i][1] . "'";
				}
			}        
		}

		$sql = "SELECT r.id_realestate, r.lat, r.lng, t.name_type, t.subtype, o.name_op, s.price, c.name_city, c.province, r.area,
				 r.rooms, r.bathrooms, r.floor, r.description, GROUP_CONCAT(DISTINCT i.img_realestate SEPARATOR ':') AS img_realestate,
				 GROUP_CONCAT(DISTINCT l.id_user SEPARATOR ':') AS 'like'". $sql_selectFilter ."
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					LEFT JOIN `like` l ON r.id_realestate = l.id_realestate "
					. $sql_innerFilter
					. $sql_whereFilter .
					" GROUP BY r.id_realestate"
					. $sql_orderFilter .
					" LIMIT $limit OFFSET $offset";
					
		// $sql .= $sql_whereFilter . " GROUP BY r.id_realestate, o.id_op";
		// return $sql;

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		if (mysqli_num_rows($res) > 0) { //devuelve número de filas
			while ($row = mysqli_fetch_assoc($res)) { //devuelve una fila de resultado como un array asociativo
				$row['img_realestate'] = explode(":", $row['img_realestate']);
				$count_like = 0;
				if ($row['like'] != null) {
					$row['like'] = explode(":", $row['like']);
					foreach ($row['like'] as $user) {
						if ($user == $id_user) {
							$count_like = count($row['like']);
						}
					}
				} else {
					$count_like = 0;
				}
				$row['like'] = $count_like;
				$retrArray[] = $row;
			}
		}
		
		return $retrArray;
	}

	function select_count_all(){
		$sql = "SELECT COUNT(DISTINCT r.id_realestate) AS count
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate 
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					WHERE t.name_type != 'Vivienda'";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object(); //fetch_object() devuelve la fila actual de un conjunto de resultados como un objeto
		connect::close($conexion);

		return $res;
	}

	function select_count_filtersShop($filters){
		// return $filters;

		$sql_innerFilter = "";
		$sql_whereFilter = "";

		for ($i=0; $i < count($filters); $i++) {
			if ($filters[$i][0] == 'name_cat') {
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
				} else if ($filters[$i][0] != 'order'){
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
				} else if ($filters[$i][0] != 'order'){
					$sql_whereFilter .= " AND " . $filters[$i][0] . " = '" . $filters[$i][1] . "'";
				}
			}        
		}

		$sql = "SELECT COUNT(DISTINCT r.id_realestate) AS count
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city "
					. $sql_innerFilter
					. $sql_whereFilter;
					
		// return $sql;

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql)->fetch_object(); //fetch_object() devuelve la fila actual de un conjunto de resultados como un objeto
		connect::close($conexion);

		return $res;
	}

	function select_count_related($id, $operation){
		$sql = "SELECT r.id_realestate
					FROM `real_estate` r
					INNER JOIN `belong_to_type` bt ON  r.id_realestate = bt.id_realestate 
					INNER JOIN `type` t ON t.id_type = bt.id_type
					INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
					INNER JOIN `operation` o ON o.id_op = s.id_op
					INNER JOIN `img_realestate` i ON r.id_realestate = i.id_realestate
					INNER JOIN `city` c ON r.id_city = c.id_city
					WHERE t.name_type != 'Vivienda' AND r.id_realestate != $id AND o.name_op = '$operation'
					GROUP BY r.id_realestate";

		$conexion = connect::con();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);

		$countRelated_Array = array();
		if (mysqli_num_rows($res) > 0) {
			foreach ($res as $row) {
				array_push($countRelated_Array, $row);
			}
		}
		return $countRelated_Array;
	}

    function update_like($id_re, $id_user, $count_like){
		if ($count_like > 0) {
			$sql = "DELETE
						FROM `like` l
						WHERE l.id_realestate = $id_re AND l.id_user = $id_user";
		} else {
			$sql = "INSERT INTO `like`(`id_realestate`, `id_user`) 
                VALUES ('$id_re','$id_user')";
		}

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        
        return $res;
    }
}