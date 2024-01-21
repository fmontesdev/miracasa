<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/';
	include($path . "model/connect.php");
    
	class DAOreal_estate{
		function insert_real_estate($datos){
			// die('<script>console.log('.json_encode( $datos ) .');</script>');
			$feature="";

			$id_cadastre=$datos['id_cadastre'];
        	$trade=$datos['trade'];
			$type=$datos['type'];
			$m2=$datos['m2'];
			foreach ($datos['feature'] as $indice) {
				$feature=$feature."$indice:";
			}
        	$province=$datos['province'];
        	$town=$datos['town'];
        	$price=$datos['price'];
        	$publication_date=$datos['publication_date'];
			$description=$datos['description'];
        	
        	$sql = "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('$id_cadastre','$trade','$type','$m2','$feature','$province','$town','$price','$publication_date','$description')";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql); // realiza una consulta a la base de datos
            connect::close($conexion);
			return $res;
		}
		 
		function select_all_real_estate(){
			// $data = 'hola DAO select_all_real_estate';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "SELECT * FROM real_estates ORDER BY id ASC";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql); // realiza una consulta a la base de datos
			connect::close($conexion);
            return $res;
		}
		
		function select_real_estate($id){
			// $data = 'hola DAO select_real_estate';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "SELECT * FROM real_estates WHERE id='$id'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object(); // crea un objeto con la siguiente fila de un conjunto de resultados
            connect::close($conexion);
            return $res;
		}
		
		function update_real_estate($datos){
			//die('<script>console.log('.json_encode( $datos ) .');</script>');
			$feature="";

			$id=$datos['id'];
        	$id_cadastre=$datos['id_cadastre'];
        	$trade=$datos['trade'];
			$type=$datos['type'];
        	$m2=$datos['m2'];
			if (isset($datos['feature'])) {
				foreach ($datos['feature'] as $indice) {
					$feature=$feature."$indice:";
				}
			}
        	$province=$datos['province'];
        	$town=$datos['town'];
        	$price=$datos['price'];
        	$publication_date=$datos['publication_date'];
			$description=$datos['description'];
        	
        	$sql = "UPDATE real_estates SET `id_cadastre`='$id_cadastre',`trade`='$trade',`type`='$type',`m2`='$m2',
			`feature`='$feature',`province`='$province',`town`='$town',`price`='$price',`publication_date`='$publication_date',
			`description`='$description' WHERE `id`='$id'";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql); // realiza una consulta a la base de datos
            connect::close($conexion);
			return $res;
		}
		
		function delete_real_estate($id){
			// $data = 'hola DAO delete_real_estate';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "DELETE FROM real_estates WHERE id='$id'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}

		function delete_all_real_estate(){
			//$data = 'hola DAO delete_all_real_estate';
            //die('<script>console.log('.json_encode( $data ) .');</script>');
			$sql = "DELETE FROM real_estates";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql); // realiza una consulta a la base de datos
            connect::close($conexion);
            return $res;
		}

		function dummies_real_estate(){
			$sql = "DELETE FROM real_estates;";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('7003051YJ4480S0045AA','Compra','Vivienda',150,'Terraza:Climatización:','Cantabria','Santander',250000,'10-11-2023','Local comercial situado en zona privilegiada para el comercio');";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('8204201YJ5210S0087BB','Alquiler','Garaje',15,'Ascensor:','Barcelona','Badalona',60,'22-07-2021','Plaza de garaje en zona céntrica con inmejorable acceso');";
			
			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('1234201YJ5210S0087CC','Compra','Oficina',150,'Muebles:Climatización:','Sevilla','Dos Hermanas',200000,'27-05-2020','Oficinas en el mismo centro de Dos Hermanas');";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('6845201YJ5210S0087DD','Alquiler','Vivienda',140,'Ascensor:Parking:Terraza:Muebles:Electrodomésticos:Climatización:','Albacete','Almansa',550,'02-12-2022','Piso ubicado en el mismo centro de la ciudad');";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('2666201YJ5210S0087EE','Compra','Vivienda',500,'Terraza:Muebles:Electrodomésticos:Climatización:','Madrid','Madrid',1200000,'02-12-2019','Casa completamente equipada ubicada en zona residencial de lujo');";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('9736201YJ5210S0087FF','Alquiler','Trastero',15,'Ascensor:','Ciudad Real','Puerto Llano',50,'24-02-2023','Trastero ubicado en zona de fácil acceso');";

			$sql.= "INSERT INTO real_estates (`id_cadastre`,`trade`,`type`,`m2`,`feature`,`province`,`town`,`price`,`publication_date`,`description`)
			VALUES ('4852201YJ5210S0087GG','Compra','Terreno',1000,'Parking:','Burgos','Burgos',42000,'01-08-2018','Amplio terreno ubicado en zona residencial fantástica');";
			
			$conexion = connect::con();
            $res = mysqli_multi_query($conexion, $sql); // realiza una o más consultas en la base de datos
            connect::close($conexion);
            return $res;
		}
	}