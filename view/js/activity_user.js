// Controla el tiempo de expiración del token, y que el usuario del token conincida con el usuario de la cookie
function control_user() {
    var refreshToken = localStorage.getItem('refresh_token');
    var accessToken = localStorage.getItem('access_token');

    if (refreshToken && accessToken) {
        ajaxPromise('module/login/controller/controller_login.php?op=control_user', 'POST', 'JSON', { 'refreshToken': refreshToken, 'accessToken': accessToken })
            .then(function(data) {
                // console.log(data);
                // return;
                
                if (data == "Correct_User") {
                    console.log("CORRECTO -> El usuario coincide con la session");
                } else if (data == "Wrong_User") {
                    console.log("INCORRECTO -> Estan intentando acceder a la cuenta");
                    logout_auto();
                }
            }).catch(function() {
                console.log("ANONYMOUS user");
            });
    } else {
        console.log("No hay usuario logeado");
    }
}

// Controla la inactividad del usuario. Al cabo de un tiempo especificado de inactividad, deslogea al usuario a través de la información de sesión (cookie)
function control_activity() {
    var token = localStorage.getItem('refresh_token');
    if (token) {
        ajaxPromise('module/login/controller/controller_login.php?op=control_activity', 'POST', 'JSON')
            .then(function(response) {
                if (response == "inactivo") {
                    console.log("usuario INACTIVO");
                    logout_auto();
                } else {
                    console.log("usuario ACTIVO")
                }
            });
    } else {
        console.log("No hay usuario logeado");
    }
}

// Limita el tiempo de uso del refreshToken en caso de robo
function refresh_token() {
    var token = localStorage.getItem('refresh_token');
    if (token) {
        ajaxPromise('module/login/controller/controller_login.php?op=refresh_token', 'POST', 'JSON', { 'token': token })
            .then(function(data_token) {
                console.log("Refresh token correctly");
                localStorage.setItem("refresh_token", data_token);
                load_menu();
            });
    }
}

// Limita el tiempo de uso del accessToken en caso de robo
function access_token() {
    var token = localStorage.getItem('access_token');
    if (token) {
        ajaxPromise('module/login/controller/controller_login.php?op=access_token', 'POST', 'JSON', { 'token': token })
            .then(function(data_token) {
                console.log("Access token correctly");
                localStorage.setItem("access_token", data_token);
                // load_menu();
            });
    }
}

// Limita el tiempo de uso de la cookie en caso de robo
function refresh_cookie() {
    ajaxPromise('module/login/controller/controller_login.php?op=refresh_cookie', 'POST', 'JSON')
        .then(function(response) {
            console.log(response);
        });
}                                                                     

function logout_auto() {
    ajaxPromise('module/login/controller/controller_login.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            console.log(data);
            // return;

            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            //SweetAlert2
            Swal.fire({
                // position: "top-end",
                icon: "error",
                // title: "Your work has been saved",
                text: "Sesión finalizada por seguridad",
                showConfirmButton: false,
                timer: 1250
                });
            setTimeout(" window.location.href = 'index.php?page=home'; ", 1500); // redirigimos al home
        }).catch(function() {
            console.log('Something has occured');
        }); 
}

$(document).ready(function() {
    control_user();
    setInterval(function() { control_activity() }, 3*60*1000); //10min= 600000, una tercera parte del tiempo màximo de inactividad                                                                                                                                                                                                                                                                        
    setInterval(function() { refresh_token() }, 10*60*1000); // una tercera parte del tiempo de expiración del refreshToken
    setInterval(function() { access_token() }, 3*60*1000); // una tercera parte del tiempo de expiración del accessToken
    setInterval(function() { refresh_cookie() }, 5*60*1000);
});