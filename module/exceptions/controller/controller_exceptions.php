<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/';
    include ($path . "module/exceptions/model/DAO_exceptions.php");
    //session_start();

	$op = isset($_GET['op']) ? $_GET['op'] : "";
    
    switch($op){      
        case 'exception';
            // $data = 'hola crtl user create';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            
            if ($_GET){
                // $data = 'hola create post user';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                // die('<script>console.log('.json_encode( $_POST ) .');</script>');

                // die('<script>console.log('.json_encode( $_POST ) .');</script>');
                try{
                    $daoreal_estate = new DAOreal_estate();
                    $rdo = $daoreal_estate->insert_real_estate($_POST);
                    // die('<script>console.log('.json_encode( $rdo ) .');</script>');
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
                
                if($rdo){
                    echo '<script language="javascript">setTimeout(() => {
                        toastr.success("Inmueble creado correctamente");
                    }, 0);</script>';
                    echo '<script language="javascript">setTimeout(() => {
                        window.location.href="index.php?page=controller_real_estate&op=crud";
                    }, 1000);</script>';
                }else{
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
                
            }
            break;
            
        default;
            include("view/inc/error404.php");
            break;
    }