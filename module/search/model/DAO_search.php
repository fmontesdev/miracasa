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

	function search_touristCategory($op){
		$sql_innerFilter = "";
		$sql_whereFilter = "";

		if (!empty($op)) {
			$sql_innerFilter .= " INNER JOIN `city` c ON t.id_touristcat = c.id_touristcat
								INNER JOIN `real_estate` r ON r.id_city = c.id_city
								INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
								INNER JOIN `operation` o ON o.id_op = s.id_op";
			$sql_whereFilter .= " WHERE o.name_op LIKE '$op'";
		}
		
		$sql = "SELECT t.id_touristcat, t.name_touristcat
				FROM `tourist_cat`t"
				. $sql_innerFilter
				. $sql_whereFilter .
				" ORDER BY t.id_touristcat";

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

	function search_autocomplete($complete, $op, $touristcat){
		$sql_innerFilter = "";
		$sql_whereFilter = "";

		if (!empty($op)) {
            $sql_innerFilter .= " INNER JOIN `is_traded` s ON r.id_realestate = s.id_realestate 
								INNER JOIN `operation` o ON o.id_op = s.id_op";
            $sql_whereFilter .= " AND o.name_op LIKE '$op'";
        }
		if (!empty($touristcat)) {
            $sql_innerFilter .= " INNER JOIN `tourist_cat` t ON t.id_touristcat = c.id_touristcat";
            $sql_whereFilter .= " AND t.name_touristcat LIKE '$touristcat'";
        }

		$sql = "SELECT c.id_city, c.name_city
			    FROM `real_estate` r
				INNER JOIN `city` c ON r.id_city = c.id_city"
				. $sql_innerFilter .
				" WHERE c.name_city LIKE '$complete%'"
				. $sql_whereFilter .
				" ORDER BY c.name_city";

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