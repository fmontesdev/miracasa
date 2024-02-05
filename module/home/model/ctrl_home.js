function carouselTypes() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselType','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_type).appendTo('.containerTypes')
                .html(
                    "<div class='card-box-b card-shadow news-box'>" +
                    "<div class='img-box-b'>" +
                    "<img src=" + data[row].img_type + " alt='' class='img-b img-fluid'>" +
                    "</div>" +
                    "<div class='card-overlay'>" +
                    "<div class='card-header-e'>" +
                    "<span class='title-1'>" +
                    "<a href='#'>" + data[row].name_type + "</a>" +
                    "</span>" +                    
                    "</div>" +
                    "</div>" +
                    "</div>"
                )     
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselCategories() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselCategory','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_cat).appendTo('.containerCategories')
                .html(
                    "<div class='card-box-b card-shadow news-box'>" +
                    "<div class='img-box-b'>" +
                    "<img src=" + data[row].img_cat + " alt='' class='img-b img-fluid'>" +
                    "</div>" +
                    "<div class='card-overlay'>" +
                    "<div class='card-header-e'>" +
                    "<span class='title-1'>" +
                    "<a href='#'>" + data[row].name_cat + "</a>" +
                    "</span>" +                    
                    "</div>" +
                    "</div>" +
                    "</div>"
                )     
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselOperations() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselOperation','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_op).appendTo('.containerOperations')
                .html(
                    "<div class='card-box-b card-shadow news-box'>" +
                    "<div class='img-box-b'>" +
                    "<img src=" + data[row].img_op + " alt='' class='img-b img-fluid'>" +
                    "</div>" +
                    "<div class='card-overlay'>" +
                    "<div class='card-header-e'>" +
                    "<span class='title-1'>" +
                    "<a href='#'>" + data[row].name_op + "</a>" +
                    "</span>" +                    
                    "</div>" +
                    "</div>" +
                    "</div>"
                )     
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselCities() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselCity','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_city).appendTo('.containerCities')
                .html(
                    "<div class='card-box-b card-shadow news-box'>" +
                    "<div class='img-box-b'>" +
                    "<img src=" + data[row].img_city + " alt='' class='img-b img-fluid'>" +
                    "</div>" +
                    "<div class='card-overlay'>" +
                    "<div class='card-header-e'>" +
                    "<span class='title-3'>" +
                    "<a href='#'>" + data[row].name_city + "</a>" +
                    "</span>" +                    
                    "</div>" +
                    "</div>" +
                    "</div>"
                )     
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselRecomendations() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselRecomendations','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-b swiper-slide').attr('id', data[row].cadastre).appendTo('.containerRecomendations')
                .html(
                    "<div class='card-box-a card-shadow'>" +
                    "<div class='img-box-a'>" +
                    "<img src=" + data[row].img_realestate + " alt='' class='img-a img-fluid'>" +
                    "</div>" +
                    "<div class='card-overlay'>" +
                    "<div class='card-overlay-a-content'>" +
                    "<div class='card-header-a'>" +
                    "<h2 class='card-title-a'>" +
                    "<a href='#'><span class='color-b'>" + data[row].name_type + "</span> en " + data[row].name_city + "</a>" +
                    "</h2>" +                    
                    "</div>" +
                    "<div class='card-body-a'>" +
                    "<div class='price-box d-flex'>" +
                    "<span class='price-a'>" + data[row].name_op + " | " + new Intl.NumberFormat("es-ES").format(data[row].price) + " €</span>" +
                    "</div>" +
                    "</div>" +
                    "<div class='card-footer-a'>" +
                    "<ul class='card-info d-flex justify-content-around'>" +
                    "<li>" +
                    "<span class='card-info-title'>Area: </span>" +
                    "<span>" + data[row].area + "m<sup>2</sup></span>" +
                    "</li>" +
                    "<li>" +
                    "<span class='card-info-title'>Habitaciones: </span>" +
                    "<span>" + data[row].rooms + "</span>" +
                    "</li>" +
                    "<li>" +
                    "<span class='card-info-title'>Baños: </span>" +
                    "<span>" + data[row].bathrooms + "</span>" +
                    "</li>" +
                    "</ul>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                )     
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

$(document).ready(function() {
    //$data = 'hola JS function';
    //die("<script>console.log('.json_encode( $data ).');</script>");
    carouselTypes();
    carouselCategories();
    carouselOperations();
    carouselCities();
    carouselRecomendations();
});