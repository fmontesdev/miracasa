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
            $Dates_autocomplete = $daosearch->search_autocomplete($_POST['complete'], $_POST['op'], $_POST['touristcat']);
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