<?php
	class connect{
		public static function con(){
			$connect = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/credentials.ini');
			$host = $connect['host'];
    		$user = $connect['user'];                
    		$pass = $connect['pass'];               
    		$db = $connect['db'];                  
    		$port = $connect['port'];                  
    		//$tabla="real_estate";
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}