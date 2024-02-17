<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/';
	include($path . "model/connect.php");
    
	class DAOexceptions{
		function insert_exceptions($datos){
			// die('<script>console.log('.json_encode( $datos ) .');</script>');

			$id_excep=$datos['id_excep'];
        	$spot=$datos['spot'];
			$current_date_time=$datos['current_date_time'];
			$user_type=$datos['user_type'];
        	
        	$sql = "INSERT INTO exeptions (`id_excep`,`spot`,`current_date_time`,`user_type`)
			VALUES ('$id_excep','$spot','$current_date_time','$user_type')";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql); // realiza una consulta a la base de datos
            connect::close($conexion);
			return $res;
		}
	}