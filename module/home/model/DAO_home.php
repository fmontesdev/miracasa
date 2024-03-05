<?php
	$path = $_SERVER['DOCUMENT_ROOT'] . '/';
	include($path . "/model/connect.php");
    
	class DAOHome {
		function select_touristcat() {
			$sql= "SELECT * FROM `tourist_cat` ORDER BY id_touristcat";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql); //realiza una consulta a la base de datos
			connect::close($conexion);

			$retrArray = array(); //inicializa array vacio
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) { //obtiene array asociativo de cada fila de resultado
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_type() {
			//$data = 'hola DAO select_type';
            //die("<script>console.log('.json_encode( $data ) .');</script>");
			$sql= "SELECT * FROM `type` WHERE subtype = 'Inmueble' ORDER BY id_type";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql); //realiza una consulta a la base de datos
			connect::close($conexion);

			$retrArray = array(); //inicializa array vacio
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) { //obtiene array asociativo de cada fila de resultado
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_category() {
			$sql= "SELECT * FROM `category` ORDER BY id_cat";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_operation() {
			$sql= "SELECT * FROM `operation` ORDER BY id_op";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_city() {
			$sql= "SELECT * FROM `city` ORDER BY id_city LIMIT 25";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}

		function select_recomendations() {
			$sql= "SELECT r.id_realestate, t.name_type, o.name_op, s.price, c.name_city, r.area, r.rooms, r.bathrooms, i.img_realestate
						FROM `real_estate` r
						INNER JOIN `type` t
						INNER JOIN `belong_to_type` bt
						INNER JOIN `is_traded` s
						INNER JOIN `operation` o
						INNER JOIN `img_realestate` i
						INNER JOIN `city` c
						ON  r.id_realestate=bt.id_realestate
						AND t.id_type=BT.id_type
						AND r.id_realestate=s.id_realestate
						AND o.id_op=s.id_op
						AND r.id_realestate=i.id_realestate
						AND r.id_city=c.id_city
						WHERE o.name_op='Compra' AND t.subtype IN('Piso','Casa')
						GROUP BY r.id_realestate";

			$conexion = connect::con();
			$res = mysqli_query($conexion, $sql);
			connect::close($conexion);

			$retrArray = array();
			if (mysqli_num_rows($res) > 0) {
				while ($row = mysqli_fetch_assoc($res)) {
					$retrArray[] = $row;
				}
			}
			return $retrArray;
		}
	
		
	}