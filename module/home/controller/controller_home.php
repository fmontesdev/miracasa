<?php
    $path = $_SERVER['DOCUMENT_ROOT'] . '/';
    include($path . "/module/home/model/DAO_home.php");

    $op = isset($_GET['op']) ? $_GET['op'] : "";

    switch ($op) {
        case 'list';
            include ('module/home/view/home.html');
            break;
        
        case 'carouselTouristcat';
            //$data = 'hola CONTROLLER carouselType';
            //die("<script>console.log('.json_encode( $data ) .');</script>");
            try{
                $daohome = new DAOHome();
                $SelectTouristcat = $daohome->select_touristcat();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectTouristcat)){
                echo json_encode($SelectTouristcat); 
            }
            else{
                echo json_encode("error");
            }
            break;
        
        case 'carouselType';
            //$data = 'hola CONTROLLER carouselType';
            //die("<script>console.log('.json_encode( $data ) .');</script>");
            try{
                $daohome = new DAOHome();
                $SelectType = $daohome->select_type();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectType)){
                echo json_encode($SelectType); 
            }
            else{
                echo json_encode("error");
            }
            break;

        case 'carouselCategory';
            try{
                $daohome = new DAOHome();
                $SelectCategory = $daohome->select_category();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectCategory)){
                echo json_encode($SelectCategory); 
            }
            else{
                echo json_encode("error");
            }
            break;

        case 'carouselOperation';
            try{
                $daohome = new DAOHome();
                $SelectOperation = $daohome->select_operation();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectOperation)){
                echo json_encode($SelectOperation); 
            }
            else{
                echo json_encode("error");
            }
            break;
        
        case 'carouselCity';
            try{
                $daohome = new DAOHome();
                $SelectCity = $daohome->select_city();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectCity)){
                echo json_encode($SelectCity); 
            }
            else{
                echo json_encode("error");
            }
            break;

        case 'carouselRecomendations';
            try{
                $daohome = new DAOHome();
                $SelectRecomendations = $daohome->select_recomendations();
            } catch(Exception $e){
                echo json_encode("error");
            }
            
            if(!empty($SelectRecomendations)){
                echo json_encode($SelectRecomendations); 
            }
            else{
                echo json_encode("error");
            }
            break;

        default;
            include("view/inc/error404.php");
            break;
    }