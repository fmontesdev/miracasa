<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/JWT.php");

function decode_token($type, $token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/jwt.ini');

    if ($type == 'access') {
        $secret = $jwt['JWT_SECRET_ACCESS'];
    } else if ($type == 'refresh'){
        $secret = $jwt['JWT_SECRET_REFRESH'];
    }

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_Token($type, $id_user, $username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/jwt.ini');

    $header = '{
        "typ": "'. $jwt['JWT_TYPE'] .'",
        "alg": "'. $jwt['JWT_ALG'] .'"
    }';
    //iat: Tiempo que inició el token
    //exp: Tiempo que expirará el token
    //name: info user
    if ($type == 'access') {
        $payload = '{
            "iat": "'. time() .'", 
            "exp": "'. time() + $jwt['JWT_EXP_ACCESS'] .'",
            "id_user": "'. $id_user .'",
            "username": "'. $username .'"
        }';
        $secret = $jwt['JWT_SECRET_ACCESS'];
    } else if ($type == 'refresh'){
        $payload = '{
            "iat": "'. time() .'", 
            "exp": "'. time() + $jwt['JWT_EXP_REFRESH'] .'",
            "id_user": "'. $id_user .'",
            "username": "'. $username .'"
        }';
        $secret = $jwt['JWT_SECRET_REFRESH'];
    }

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}
