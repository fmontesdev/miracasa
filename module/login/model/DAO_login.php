<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/';
include($path . "/model/connect.php");

class DAOLogin{
    function select_userReg($username){
        // $data = array($_POST['username_reg'], $_POST['email_reg'], $_POST['passwd1_reg']);
        // return $data;

        $sql = "SELECT u.username
                FROM `user` u
                WHERE u.username = '$username'";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function select_email($email){
        // $data = array($_POST['username_reg'], $_POST['email_reg'], $_POST['passwd1_reg']);
        // return $data;

        $sql = "SELECT u.email
                FROM `user` u
                WHERE u.email = '$email'";
        
        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        return $res;
    }

    function insert_user($username, $password, $email){

        $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]); // password_hash() función para encriptar password muy segura
        // $hashavatar = md5(strtolower(trim($email))); // md5() función para encriptar con menos seguridad
        // $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
        $avatar = "https://api.dicebear.com/8.x/initials/svg?backgroundColor=2eca6a&size=40&scale=110&radius=50&seed=$username";
        $sql = "INSERT INTO `user`(`username`, `password`, `email`, `type_user`, `avatar`) 
                VALUES ('$username','$hashed_pass','$email','client','$avatar')";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        
        return $res;
    }

    function select_userLogin($username){
        $sql = "SELECT u.id_user, u.username, u.password
                FROM `user` u
                WHERE u.username = '$username'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);

        if ($res) {
            $value = get_object_vars($res); //serializa objeto
            return $value;
        }else {
            return "error_user";
        }
    }

    // SIMPLIFICAR LOS DOS ÚLTIMOS DAOS EN UNO ???

    function select_data_user($username){
        $sql = "SELECT u.username, u.password, u.email, u.type_user, u.avatar
                FROM `user` u
                WHERE u.username = '$username'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql)->fetch_object();
        connect::close($conexion);
        return $res;
    }

}
