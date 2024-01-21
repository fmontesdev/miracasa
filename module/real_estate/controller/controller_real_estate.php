<?php
    // $data = 'hola crtl real_estate';
    // die('<script>console.log('.json_encode( $data ) .');</script>');

    $path = $_SERVER['DOCUMENT_ROOT'] . '/';
    include ($path . "module/real_estate/model/DAOreal_estate.php");
    //session_start();

	$op = isset($_GET['op']) ? $_GET['op'] : "";
    
    switch($op){
        case 'crud';
            // $data = 'hola crtl real_estate';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
              
            try{
                $daoreal_estate = new DAOreal_estate();
            	$rdo = $daoreal_estate->select_all_real_estate();
                //die('<script>console.log('.json_encode( $rdo->num_rows ) .');</script>');
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/real_estate/view/crud_real_estate.php");
    		}
            break;
          
        case 'list';
            // $data = 'hola crtl real_estate';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
              
            try{
                $daoreal_estate = new DAOreal_estate();
            	$rdo = $daoreal_estate->select_all_real_estate();
                //die('<script>console.log('.json_encode( $rdo->num_rows ) .');</script>');
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/real_estate/view/list_real_estate.php");
    		}
            break;
            
        case 'create';
            // $data = 'hola crtl user create';
            // die('<script>console.log('.json_encode( $data ) .');</script>');

            include("module/real_estate/model/validate.php");
            
            $check = true;
            
            if ($_POST){
                // $data = 'hola create post user';
                // die('<script>console.log('.json_encode( $data ) .');</script>');
                // die('<script>console.log('.json_encode( $_POST ) .');</script>');

                $check=validate_create();
                //die('<script>console.log('.json_encode( $check ) .');</script>');

                if ($check){
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
            }
            include("module/real_estate/view/create_real_estate.php");
            break;
            
        case 'update';
            include("module/real_estate/model/validate.php");
            $check = true;
            
            if ($_POST){
                //$data = 'hola update post real estate';
                //die('<script>console.log('.json_encode( $data ) .');</script>');
                $check=validate_update();
                //die('<script>console.log('.json_encode( $check ) .');</script>');
                
                if ($check){
                    //die('<script>console.log('.json_encode( $_POST ) .');</script>');
                    try{
                        $daoreal_estate = new DAOreal_estate();
    		            $rdo = $daoreal_estate->update_real_estate($_POST);
                        //die('<script>console.log('.json_encode( $rdo_upd ) .');</script>');
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">setTimeout(() => {
                            toastr.success("Inmueble actualizado correctamente");
                        }, 0);</script>';
                        echo '<script language="javascript">setTimeout(() => {
                            window.location.href="index.php?page=controller_real_estate&op=crud";
                        }, 1000);</script>';
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }else{
                    echo '<script language="javascript">setTimeout(() => {
                        window.location.href="index.php?page=controller_real_estate&op=crud";
                    }, 1000);</script>';
                }
            } else {
                try{
                    $daoreal_estate = new DAOreal_estate();
                    $rdo = $daoreal_estate->select_real_estate($_GET['id']);
                    $real_estate=get_object_vars($rdo); // crea un array asociativo (indices array son strings) con las propiedades no estáticas del objeto
                    //die('<script>console.log('.json_encode( $real_estate ) .');</script>');
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
                
                if(!$rdo){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }else{
                    include("module/real_estate/view/update_real_estate.php");
                }
            }
            break;
            
        case 'read';
            // $data = 'hola crtl user read';
            // die('<script>console.log('.json_encode( $data ) .');</script>');
            // die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');

            try{
                $daoreal_estate = new DAOreal_estate();
            	$rdo = $daoreal_estate->select_real_estate($_GET['id']);
            	$real_estate=get_object_vars($rdo); // devuelve un array asociativo con las propiedades no estáticas del objeto
                //die('<script>console.log('.json_encode( $real_estate ) .');</script>');
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }

            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/real_estate/view/read_real_estate.php");
    		}
            break;

        case 'read_modal':
            //echo $_GET["modal"]; 
            //exit;

            try{
                $daoreal_estate = new DAOreal_estate();
                $rdo = $daoreal_estate->select_real_estate($_GET['id_modal']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $real_estate=get_object_vars($rdo); // devuelve un array asociativo con las propiedades no estáticas del objeto
                echo json_encode($real_estate);  // pasa datos del array a formato JSON
                //echo json_encode("error");
                exit;
            }
            break;
            
        case 'delete';
            //$data = 'hola crtl real estate delete';
            //die('<script>console.log('.json_encode( $data ) .');</script>');
            //die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');

            if ($_POST){
                //die('<script>console.log('.json_encode( $_GET['id'] ) .');</script>');
                try{
                    $daoreal_estate = new DAOreal_estate();
                	$rdo = $daoreal_estate->delete_real_estate($_GET['id']);
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
    			    die('<script>window.location.href="'.$callback .'";</script>');
                }
            	if($rdo){
                    echo '<script language="javascript">setTimeout(() => {
                        toastr.success("Inmueble eliminado correctamente");
                    }, 0);</script>';
                    echo '<script language="javascript">setTimeout(() => {
                        window.location.href="index.php?page=controller_real_estate&op=crud";
                    }, 1000);</script>';
        		}else{
        			$callback = 'index.php?page=503';
			        die('<script>window.location.href="'.$callback .'";</script>');
        		}
            } else {
                try{
                    $daoreal_estate = new DAOreal_estate();
                    $rdo = $daoreal_estate->select_real_estate($_GET['id']);
                    $real_estate=get_object_vars($rdo); // crea un array asociativo (indices array son strings) con las propiedades no estáticas del objeto
                    //die('<script>console.log('.json_encode( $real_estate ) .');</script>');
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }

                if(!$rdo){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }else{
                    include("module/real_estate/view/delete_real_estate.php");
                }
            }
            break;

        case 'delete_all';
            //$data = 'hola crtl real estate delete_all';
            //die('<script>console.log('.json_encode( $data ) .');</script>');
            if ($_POST){
                //$data = 'hola delete_all post real estate';
                //die('<script>console.log('.json_encode( $data ) .');</script>');
                try{
                    $daoreal_estate = new DAOreal_estate();
                	$rdo = $daoreal_estate->delete_all_real_estate();
                    //die('<script>console.log('.json_encode( $rdo ) .');</script>');
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
                
                if($rdo){
                    echo '<script language="javascript">setTimeout(() => {
                        toastr.success("Lista de inmuebles eliminada correctamente");
                    }, 0);</script>';
                    echo '<script language="javascript">setTimeout(() => {
                        window.location.href="index.php?page=controller_real_estate&op=crud";
                    }, 1000);</script>';
                }else{
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
            }
            
            include("module/real_estate/view/delete_all_real_estate.php");
            break;

        case 'dummies';
            if ($_POST){
                try{
                    $daoreal_estate = new DAOreal_estate();
                	$rdo = $daoreal_estate->dummies_real_estate();
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
    
                if($rdo){
                    echo '<script language="javascript">setTimeout(() => {
                        toastr.success("Lista de Inmuebles creada correctamente");
                    }, 0);</script>';
                    echo '<script language="javascript">setTimeout(() => {
                        window.location.href="index.php?page=controller_real_estate&op=crud";
                    }, 1000);</script>';
                }else{
                    $callback = 'index.php?page=503';
                    die('<script>window.location.href="'.$callback .'";</script>');
                }
            }
            
            include("module/real_estate/view/dummies_real_estate.php");
            break;
        
        default;
            include("view/inc/error404.php");
            break;
    }