<?php
	class connect{
		public static function con(){
			$connect = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/credentials.ini');
			$host = $connect['DB_HOST'];
    		$user = $connect['DB_USER'];                
    		$pass = $connect['DB_PASS'];               
    		$db = $connect['DB_DB'];                  
    		$port = $connect['DB_PORT'];                  
    		//$tabla="real_estate";
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}