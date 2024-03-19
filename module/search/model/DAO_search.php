<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/connect.php");

class DAOSearch{
    function search_operation(){
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

	function search_touristCategory_null(){
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

	function search_touristCategory($op){
		$sql = "SELECT t.id_touristcat, t.name_touristcat
			    FROM `real_estate` r
				INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
				INNER JOIN `operation` o ON o.id_op = s.id_op
				INNER JOIN `city` c ON r.id_city = c.id_city
				INNER JOIN `tourist_cat` t ON t.id_touristcat = c.id_touristcat
				WHERE o.name_op LIKE '$op'
				ORDER BY t.id_touristcat";

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

	function autocomplete_city_op($complete, $op){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `real_estate` r
				INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
				INNER JOIN `operation` o ON o.id_op = s.id_op
				INNER JOIN `city` c ON r.id_city = c.id_city
				WHERE o.name_op LIKE '$op' AND c.name_city LIKE '$complete%'
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

	function autocomplete_city_op_touristcat($complete, $op, $touristcat){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `real_estate` r
				INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
				INNER JOIN `operation` o ON o.id_op = s.id_op
				INNER JOIN `city` c ON r.id_city = c.id_city
				INNER JOIN `tourist_cat` t ON t.id_touristcat = c.id_touristcat
				WHERE o.name_op LIKE '$op' AND t.name_touristcat LIKE '$touristcat' AND c.name_city LIKE '$complete%'
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

	function autocomplete_city_touristcat($complete, $touristcat){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `real_estate` r
				INNER JOIN `city` c ON r.id_city = c.id_city
				INNER JOIN `tourist_cat` t ON t.id_touristcat = c.id_touristcat
				WHERE t.name_touristcat LIKE '$touristcat' AND c.name_city LIKE '$complete%'
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

	function autocomplete_city($complete){
		$sql = "SELECT c.id_city, c.name_city
			    FROM `real_estate` r
				INNER JOIN `city` c ON r.id_city = c.id_city
				WHERE c.name_city LIKE '$complete%'
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
}