<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/module/shop/model/DAO_shop.php");

$op = isset($_GET['op']) ? $_GET['op'] : "";

switch ($op) {
    case 'list':
        include('module/shop/view/shop.html');
        break;

    case 'all_realestates':
        try {
            $daoshop = new DAOShop();
            $Dates_realEstates = $daoshop->select_all_realEstates();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_realEstates)) {
            echo json_encode($Dates_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    case 'details_realestate':
        // echo json_encode($_GET['id']);
        // break
        
        $daoshop = new DAOShop();
        $daoshop->insert_visited($_GET['id']);
        
        try {
            $daoshop = new DAOShop();
            $Dates_realEstate = $daoshop->select_one_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        // echo json_encode($Dates_realEstate);
        // break
        try {
            $daoshop_img = new DAOShop();
            $Dates_images = $daoshop_img->select_imgs_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_extra = new DAOShop();
            $Dates_extras = $daoshop_extra->select_extras_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_realEstate || $Dates_images || $Dates_extras)) {
            $rdo = array();
            $rdo[0] = $Dates_realEstate; //introduce objeto con datos de viviendas en posición 0
            $rdo[1][] = $Dates_images; //introduce array de imagenes en posición 1
            $rdo[2][] = $Dates_extras; //introduce array de extras en posición 2
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
    
    case 'filters_home':
        // echo json_encode($_POST['filters']);
        // break;
        try {
            $daoshop_filters = new DAOShop();
            $Dates_realEstates = $daoshop_filters->filters_home($_POST['filters']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_realEstates)) {
            echo json_encode($Dates_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    case 'load_filters';
        // echo json_encode($_POST['filters']);
        // break;
        try {
            $daoshop_filters = new DAOShop();
            $Dates_city = $daoshop_filters->select_filter_city();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        // echo json_encode($Dates_realEstate);
        // break
        try {
            $daoshop_filters = new DAOShop();
            $Dates_cat = $daoshop_filters->select_filter_cat();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_type = $daoshop_filters->select_filter_type();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_type_flat = $daoshop_filters->select_filter_flat();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_type_house = $daoshop_filters->select_filter_house();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_op = $daoshop_filters->select_filter_op();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_extras = $daoshop_filters->select_filter_extras();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $Dates_touristcat = $daoshop_filters->select_filter_touristcat();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_city || $Dates_cat || $Dates_type || $Dates_type_flat || $Dates_type_house || $Dates_op || $Dates_extras || $Dates_touristcat)) {
            $rdo = array();
            $rdo[0][] = $Dates_city;
            $rdo[1][] = $Dates_cat;
            $rdo[2][0] = $Dates_type;
            $rdo[2][1] = $Dates_type_flat;
            $rdo[2][2] = $Dates_type_house;
            $rdo[3][] = $Dates_op;
            $rdo[4][] = $Dates_extras;
            $rdo[5][] = $Dates_touristcat;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;

    case 'filters_shop':
        // echo json_encode($_POST['filters']);
        // break;
        try {
            $daoshop_filters = new DAOShop();
            $Dates_realEstates = $daoshop_filters->filters_shop($_POST['filters']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_realEstates)) {
            echo json_encode($Dates_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    default:
        include("view/inc/error404.php");
        break;
}
