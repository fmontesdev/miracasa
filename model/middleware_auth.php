<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/JWT.php");

function decode_token($type, $token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/jwt.ini');

    if ($type == 'refresh') {
        $secret = $jwt['secret1'];
    } else if ($type == 'access'){
        $secret = $jwt['secret2'];
    }

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_Token($type, $username, $exp){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/jwt.ini');

    $header = '{
        "typ": "'. $jwt['typ'] .'",
        "alg": "'. $jwt['alg'] .'"
    }';
    //iat: Tiempo que inició el token
    //exp: Tiempo que expirará el token (+1 hora)
    //name: info user
    $payload = '{
        "iat": "'. time() .'", 
        "exp": "'. time() + $exp .'",
        "name": "'. $username .'"
    }';
    if ($type == 'refresh') {
        $secret = $jwt['secret1'];
    } else if ($type == 'access'){
        $secret = $jwt['secret2'];
    }

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}
