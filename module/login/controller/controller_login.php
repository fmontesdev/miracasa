<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/module/login/model/DAO_login.php");
include($path . "/model/middleware_auth.php");

@session_start();

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
            $checkUsername = $daoLog->select_userReg($_POST['username']);
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
                echo json_encode("done");
            }
        } 
        break;

    case 'login':
        try {
            $daoLog = new DAOLogin();
            $rdo = $daoLog->select_userLogin($_POST['username']);

            if ($rdo == "error_user") {
                echo json_encode("error_user");
            } else if (password_verify($_POST['password'], $rdo['password'])) { //compara el password introducido con el password de base de datos
                // echo json_encode($rdo["username"]);
                // break;
                $accessToken= create_token("access", $rdo['id_user'], $rdo['username']);
                $refreshToken= create_token("refresh", $rdo['id_user'], $rdo['username']);
                $token = array("access" => $accessToken, "refresh" => $refreshToken); // array asociativo
                $_SESSION['username'] = $rdo['username']; //guardamos usuario en cookie (servidor)
                $_SESSION['tiempo'] = time(); //guardamos momento exacto del login en cookie (servidor)
                echo json_encode($token);
            } else {
                echo json_encode("error_passwd");
            }
        } catch (Exception $e) {
            echo json_encode("error");
        }
        break;

    case 'data_user':
        $accessToken_dec = decode_token('access', $_POST['token']);
        $daoLog = new DAOLogin();
        $rdo = $daoLog->select_data_user($accessToken_dec['username']);
        echo json_encode($rdo);
        break;

    case 'logout':
        unset($_SESSION['username']); //elimina valor de $_SESSION
        unset($_SESSION['tiempo']); //elimina valor de $_SESSION
        session_destroy();

        echo json_encode("logout done");
        break;

    case 'control_user':
        $accessToken_dec = decode_token('access', $_POST['accessToken']);
        $refreshToken_dec = decode_token('refresh', $_POST['refreshToken']);

        if ($accessToken_dec['exp'] < time() && $refreshToken_dec['exp'] > time()) { // accessToken expirado y refreshToken activo -> actualizamos accessToken
            $new_accessToken = create_token('access', $accessToken_dec['username']);
            $new_accessToken_dec = decode_token('access', $new_accessToken);
            if (isset($_SESSION['username']) && ($_SESSION['username'] == $new_accessToken_dec['username']) && ($_SESSION['username'] == $refreshToken_dec['username'])) {
                echo json_encode($new_accessToken);
            } else {
                echo json_encode("Wrong_User");
            }
        } else if ( ($accessToken_dec['exp'] > time() && $refreshToken_dec['exp'] < time())) { // accessToken activo y refreshToken expirado -> logout
            echo json_encode("ExpirationTime_Token");
        } else if (($accessToken_dec['exp'] < time()) && ($refreshToken_dec['exp'] < time())) { // accessToken expirado y refreshToken expirado -> logout
            echo json_encode("ExpirationTime_Token");
        } else if (isset($_SESSION['username']) && ($_SESSION['username'] == $accessToken_dec['username']) && ($_SESSION['username'] == $refreshToken_dec['username'])) {
            // accessToken activo - refreshToken activo, y username de cookie y tokens valido
            echo json_encode("Correct_User");
        } else { // username de cookie y tokens inválido
            echo json_encode("Wrong_User");
        }
        break;

    case 'control_activity':
        if (!isset($_SESSION['tiempo'])) {
            echo json_encode("inactivo");
        } else {
            if ((time() - $_SESSION['tiempo']) >= 30*60) { //1800s=30min
                echo json_encode("inactivo");
            } else {
                echo json_encode("activo");
            }
        }
        break;

    case 'refresh_cookie':
        session_regenerate_id();
        echo json_encode("Refresh cookie correctly");
        break;

    default;
        include("module/exceptions/views/pages/error404.php");
        break;
}
