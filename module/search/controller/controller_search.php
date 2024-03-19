<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/module/search/model/DAO_search.php");

$op = isset($_GET['op']) ? $_GET['op'] : "";

switch ($op) {
    case 'search_operation':
        try {
            $daosearch = new DAOSearch();
            $Dates_operation = $daosearch->search_operation();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_operation)) {
            echo json_encode($Dates_operation);
        } else {
            echo json_encode("error");
        }
        break;

    case 'search_touristCategory_null':
        try {
            $daosearch = new DAOSearch();
            $Dates_touristCategory_null = $daosearch->search_touristCategory_null();
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_touristCategory_null)) {
            echo json_encode($Dates_touristCategory_null);
        } else {
            echo json_encode("error");
        }
        break;

    case 'search_touristCategory':
        try {
            $daosearch = new DAOSearch();
            $Dates_touristCategory = $daosearch->search_touristCategory($_POST['operation']);
        } catch (Exception $e) {
            echo json_encode("error");
        }

        if (!empty($Dates_touristCategory)) {
            echo json_encode($Dates_touristCategory);
        } else {
            echo json_encode("error");
        }
        break;

    case 'search_autocomplete';
        try{
            $daosearch = new DAOSearch();

            if (!empty($_POST['op']) && empty($_POST['touristcat'])) {
                $Dates_autocomplete = $daosearch->autocomplete_city_op($_POST['complete'], $_POST['op']);

            } else if (!empty($_POST['op']) && !empty($_POST['touristcat'])) {
                $Dates_autocomplete = $daosearch->autocomplete_city_op_touristcat($_POST['complete'], $_POST['op'], $_POST['touristcat']);

            } else if (empty($_POST['op']) && !empty($_POST['touristcat'])) {
                $Dates_autocomplete = $daosearch->autocomplete_city_touristcat($_POST['complete'], $_POST['touristcat']);

            } else if (empty($_POST['op']) && empty($_POST['touristcat']) && !empty($_POST['complete'])) {
                $Dates_autocomplete = $daosearch->autocomplete_city($_POST['complete']);
            } else {
                $Dates_autocomplete = $daosearch->autocomplete_city('%');
            }
        }catch (Exception $e){
            echo json_encode("error");
        }

        if (!empty($Dates_autocomplete)) {
            echo json_encode($Dates_autocomplete);
        } else {
            echo json_encode("error");
        }
        break;

    default:
        include("view/inc/error404.php");
        break;
}
