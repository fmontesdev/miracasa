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
            $dates_realEstates = $daoshop->select_all_realEstates($_POST['limit'], $_POST['offset']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($dates_realEstates)) {
            echo json_encode($dates_realEstates);
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
            $dates_realEstate = $daoshop->select_one_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        // echo json_encode($Dates_realEstate);
        // break
        try {
            $daoshop_img = new DAOShop();
            $dates_images = $daoshop_img->select_imgs_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_extra = new DAOShop();
            $dates_extras = $daoshop_extra->select_extras_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($dates_realEstate || $dates_images || $dates_extras)) {
            $rdo = array();
            $rdo[0] = $dates_realEstate; //introduce objeto con datos de viviendas en posición 0
            $rdo[1][] = $dates_images; //introduce array de imagenes en posición 1
            $rdo[2][] = $dates_extras; //introduce array de extras en posición 2
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
            $dates_realEstates = $daoshop_filters->filters_home($_POST['filters']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($dates_realEstates)) {
            echo json_encode($dates_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    case 'load_filters';
        // echo json_encode($_POST['filters']);
        // break;
        try {
            $daoshop_filters = new DAOShop();
            $dates_city = $daoshop_filters->select_filter_city();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        // echo json_encode($Dates_realEstate);
        // break
        try {
            $daoshop_filters = new DAOShop();
            $dates_cat = $daoshop_filters->select_filter_cat();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_type = $daoshop_filters->select_filter_type();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_type_flat = $daoshop_filters->select_filter_flat();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_type_house = $daoshop_filters->select_filter_house();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_op = $daoshop_filters->select_filter_op();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_extras = $daoshop_filters->select_filter_extras();
        } catch (Exception $e) {
            echo json_encode("error");
        }
        try {
            $daoshop_filters = new DAOShop();
            $dates_touristcat = $daoshop_filters->select_filter_touristcat();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($dates_city || $dates_cat || $dates_type || $dates_type_flat || $dates_type_house || $dates_op || $dates_extras || $dates_touristcat)) {
            $rdo = array();
            $rdo[0][] = $dates_city;
            $rdo[1][] = $dates_cat;
            $rdo[2][0] = $dates_type;
            $rdo[2][1] = $dates_type_flat;
            $rdo[2][2] = $dates_type_house;
            $rdo[3][] = $dates_op;
            $rdo[4][] = $dates_extras;
            $rdo[5][] = $dates_touristcat;
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
            $dates_realEstates = $daoshop_filters->filters_shop($_POST['filters'], $_POST['limit'], $_POST['offset']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($dates_realEstates)) {
            echo json_encode($dates_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    case 'count_all';
        try {
            $daoshop_count = new DAOShop();
            $count_realEstates = $daoshop_count->select_count_all();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($count_realEstates)) {
            echo json_encode($count_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    case 'count_filtersShop';
        try {
            $daoshop_count = new DAOShop();
            $count_realEstates = $daoshop_count->select_count_filtersShop($_POST['filters']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($count_realEstates)) {
            echo json_encode($count_realEstates);
        } else {
            echo json_encode("error");
        }
        break;

    default:
        include("view/inc/error404.php");
        break;
}