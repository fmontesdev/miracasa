function highlight_login() {
    var username = localStorage.getItem('user') || undefined;
    if (username != undefined) {
        $('.navbarLogin_text')
            .html(username);
        $('.navbarLogin_container')
            .css({
                "background-color": "#f0f0f0",
            });
        $('.navbarLogin_icon')
            .css({
                "filter": "none",
            });    
    }
}

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

function show_login_logout() {
    var username = localStorage.getItem('user') || undefined;
    if (username != undefined) {
        $('.navbarLogin_items.login').hide();
        $('.navbarLogin_items.logout').show();
    } else {
        $('.navbarLogin_items.logout').hide();
        $('.navbarLogin_items.login').show();
    }
}

function logout() {
    $('.navbarLogin_items.logout').on('click', function() {
        localStorage.removeItem('user');
        location.reload();
    });
}

$(document).ready(function() {
    highlight_login();
    modal_login();
    show_login_logout();
    logout();
});