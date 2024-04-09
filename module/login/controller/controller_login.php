<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/module/login/model/DAO_login.php");

$op = isset($_GET['op']) ? $_GET['op'] : "";

switch ($op) {
    case 'view';
        include("module/login/view/login_register.html");
        break;

    case 'register':
        // echo json_encode($_POST);
        // break;

        // Comprobar que el username no existe
        try {
            $daoLog = new DAOLogin();
            $checkUsername = $daoLog->select_user($_POST['username']);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }

        if ($checkUsername) {
            $check = false;
            echo json_encode("error_user");
            exit;
        } else {
            // Comprobar que el email no existe
            try {
                $daoLog = new DAOLogin();
                $checkEmail = $daoLog->select_email($_POST['email']);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }

            if ($checkEmail) {
                $check = false;
                echo json_encode("error_email");
                exit;
            } else {
                $check = true;
            }
        }

        // Si no existe ni el username ni el email creará el usuario
        if ($check) {
            try {
                $daoLog = new DAOLogin();
                $rdo = $daoLog->insert_user($_POST['username'], $_POST['password'], $_POST['email']);
            } catch (Exception $e) {
                echo json_encode("error");
                exit;
            }
            if (!$rdo) {
                echo json_encode("error");
                exit;
            } else {
                echo json_encode("ok");
            }
        } 
        break;

    case 'login':
        try {
            $daoLog = new DAOLogin();
            $rdo = $daoLog->select_userLog($_POST['username']);

            if ($rdo == "error_user") {
                echo json_encode("error_user");
            } else if (password_verify($_POST['password'], $rdo['password'])) { //compara el password introducido con el password de base de datos
                // $token= create_token($rdo["username"]);
                // $_SESSION['username'] = $rdo['username']; //Guardamos el usuario 
                // $_SESSION['tiempo'] = time(); //Guardamos el tiempo que se logea
                // echo json_encode($token);
                echo json_encode($_POST['username']);
            } else {
                echo json_encode("error_passwd");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;

    // case 'logout':
    //     unset($_SESSION['username']);
    //     unset($_SESSION['tiempo']);
    //     session_destroy();

    //     echo json_encode('Done');
    //     break;

    // case 'data_user':
    //     $json = decode_token($_POST['token']);
    //     $daoLog = new DAOLogin();
    //     $rdo = $daoLog->select_data_user($json['username']);
    //     echo json_encode($rdo);
    //     exit;
    //     break;

    // case 'actividad':
    //     if (!isset($_SESSION["tiempo"])) {
    //         echo json_encode("inactivo");
    //         exit();
    //     } else {
    //         if ((time() - $_SESSION["tiempo"]) >= 1800) { //1800s=30min
    //             echo json_encode("inactivo");
    //             exit();
    //         } else {
    //             echo json_encode("activo");
    //             exit();
    //         }
    //     }
    //     break;

    // case 'controluser':
    //     $token_dec = decode_token($_POST['token']);

    //     if ($token_dec['exp'] < time()) {
    //         echo json_encode("Wrong_User");
    //         exit();
    //     }

    //     if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec['username']) {
    //         echo json_encode("Correct_User");
    //         exit();
    //     } else {
    //         echo json_encode("Wrong_User");
    //         exit();
    //     }
    //     break;

    // case 'refresh_token':
    //     $old_token = decode_token($_POST['token']);
    //     $new_token = create_token($old_token['username']);
    //     echo json_encode($new_token);
    //     break;

    // case 'refresh_cookie':
    //     session_regenerate_id();
    //     echo json_encode("Done");
    //     exit;
    //     break;

    default;
        include("module/exceptions/views/pages/error404.php");
        break;
}
