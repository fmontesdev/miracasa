function modal_login() {
    $('#navbarLogin_modal').hide();
    $('.navbarLogin_container').mouseenter(function() {
        $('#navbarLogin_modal').fadeIn(100);
    });
    // verifica si el cursor ha salido de los 2 contenedores y no está moviéndose dentro de ningún elemento relacionado con ellos
    $('.navbarLogin_container, #navbarLogin_modal').mouseleave(function(e) {
        if (!$(e.relatedTarget).closest(".navbarLogin_container, #navbarLogin_modal").length) {
            $('#navbarLogin_modal').fadeOut(100);
          }
    });
}

function load_menu() {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('module/login/controller/controller_login.php?op=data_user', 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                // return;

                // if (data.type_user == "client") {
                //     console.log("Client loged");
                //     $('.opc_CRUD').empty();
                //     $('.opc_exceptions').empty();
                // } else {
                //     console.log("Admin loged");
                //     $('.opc_CRUD').show();
                //     $('.opc_exceptions').show();
                // }

                // $('.log-icon').empty();
                // $('#user_info').empty();
                // $('<img src="' + data.avatar + '"alt="Robot">').appendTo('.log-icon');
                // $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
                //     .html(
                //         '<a id="logout"><i id="icon-logout" class="fa-solid fa-right-from-bracket"></i></a>' +
                //         '<a>' + data.username + '<a/>'

                //     )

                // highlight usuario
                $('.navbarLogin_icon').hide();
                $('<img>').attr('class', 'navbarLogin_avatar').attr('src', data.avatar).appendTo('.navbarLogin_container');
                $('.navbarLogin_text')
                    .html(data.username);
                $('.navbarLogin_container')
                    .css({
                        "background-color": "#f0f0f0",
                    });
                // oculta enlace para login-registro y muestra enlace para logout
                $('.navbarLogin_items.login').hide();
                $('.navbarLogin_items.logout').show();

            }).catch(function() {
                console.log("Error al cargar los datos del user");
                $('.navbarLogin_items.logout').hide();
                $('.navbarLogin_items.login').show();
            });
    } else {
        console.log("No hay token disponible");
        $('.navbarLogin_items.logout').hide();
        $('.navbarLogin_items.login').show();
        // HAY QUE REDIRIGIR AL LOGIN-REGISTRO ???
    }
}

function logout() {
    $('.navbarLogin_items.logout').on('click', function() {
        ajaxPromise('module/login/controller/controller_login.php?op=logout', 'POST', 'JSON')
            .then(function(data) {
                console.log(data);
                // return;

                localStorage.removeItem('token');
                //SweetAlert2
                Swal.fire({
                    // position: "top-end",
                    icon: "error",
                    // title: "Your work has been saved",
                    text: "Sesión finalizada",
                    showConfirmButton: false,
                    timer: 1250
                  });
                setTimeout(" window.location.href = 'index.php?page=home'; ", 1500); // redirigimos al home
            }).catch(function() {
                console.log('Something has occured');
            });
    });
}

$(document).ready(function() {
    modal_login();
    load_menu();
    logout();
});