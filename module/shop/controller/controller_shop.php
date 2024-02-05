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
        try {
            $daoshop = new DAOShop();
            $Dates_realEstate = $daoshop->select_one_realEstate($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error");
        }
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

    default;
        include("view/inc/error404.php");
        break;
}
