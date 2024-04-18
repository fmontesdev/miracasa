// Controla el tiempo de expiración de los tokens, y que el username de los tokens y la cookie coincida
function control_user() {
    var accessToken = localStorage.getItem('access_token');
    var refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
        ajaxPromise('module/login/controller/controller_login.php?op=control_user', 'POST', 'JSON', { 'accessToken': accessToken, 'refreshToken': refreshToken })
            .then(function(data) {
                // console.log(data);
                // return;
                
                if (data == "Correct_User") {
                    console.log("CORRECTO -> El usuario coincide con la session");
                } else if (data == "Wrong_User") {
                    console.log("INCORRECTO -> Estan intentando acceder a la cuenta");
                    logout_auto();
                } else if (data == "ExpirationTime_Token") {
                    console.log("INCORRECTO -> El token ha expirado");
                    logout_auto();
                } else {
                    console.log("Update accessToken correctly");
                    localStorage.setItem("access_token", data);
                    load_menu();
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

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
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
    setInterval(function() { control_activity() }, 10*60*1000); //10min= 600000, una tercera parte del tiempo màximo de inactividad
    setInterval(function() { refresh_cookie() }, 10*60*1000); //10min= 600000
});