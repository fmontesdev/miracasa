<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/JWT.php");

function decode_token($token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/jwt.ini');
    $secret = $jwt['secret'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_token($username){
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
        "exp": "'. time() + (60*60) .'",
        "name": "'. $username .'"
    }';
    $secret = $jwt['secret'];
    // $secret = 'maytheforcebewithyou';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}
