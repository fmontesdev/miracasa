<?php
    function validate_cadastre($cadastre){
        $sql = "SELECT * FROM real_estates WHERE id_cadastre='$cadastre'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        $res = $res->num_rows; // devuelve el número de filas de un resultado
        connect::close($conexion);
        return $res;
    }

    function validate_create() {
        // $data = 'hola validate php';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        $check = true;

        $cadastre = $_POST['id_cadastre'];
        $cadastre = validate_cadastre($cadastre);

        if($cadastre !== 0){
            echo '<script language="javascript">setTimeout(() => {
                toastr.error("La Referencia Catastral no puede estar repetida");
            }, 1000);</script>';
            $check = false;
        }

        return $check;
    }

    function validate_id_cadastre($id, $cadastre){
        $sql = "SELECT * FROM real_estates WHERE (id!='$id') AND (id_cadastre='$cadastre')";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        $res = $res->num_rows; // devuelve el número de filas de un resultado
        connect::close($conexion);
        return $res;
    }

    function validate_update() {
        // $data = 'hola validate php';
        // die('<script>console.log('.json_encode( $data ) .');</script>');

        $check = true;
        
        $id = $_POST['id'];
        $cadastre = $_POST['id_cadastre'];
        $id_cadastre = validate_id_cadastre($id, $cadastre);

        if($id_cadastre !== 0){
            echo '<script language="javascript">setTimeout(() => {
                toastr.error("La Referencia Catastral no puede estar repetida");
            }, 1000);</script>';
            $check = false;
        }
        
        return $check;
    }
