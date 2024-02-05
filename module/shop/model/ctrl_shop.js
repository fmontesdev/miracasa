function loadAllRealestates() {
    ajaxForSearch('module/shop/controller/controller_shop.php?op=all_realestates');
}

function ajaxForSearch(url) {
    // console.log('Hola loadAllRealestates');
    // die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise(url,'GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('.section-intro').empty();
        $('.container_listRealestates').empty(); // antes de iniciar borramos el contenedor de list
        $('.container_detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();

        // Mejora para que cuando no hayan resultados en los filtros aplicados
        if (data == "error") {
            $('<div></div>').appendTo('.container_listRealestates')
                .html(
                    '<h3>¡No se encontaron resultados con los filtros aplicados!</h3>'
                )
        } else {
            $('<div></div>').attr('class', 'intro-single2').appendTo('.section-intro')
                .html(
                    "<div class='container'>" +
                    "<div class='row'>" +
                    "<div class='col-md-12 col-lg-8'>" +
                    "<div class='title-single-box'>" +
                    "<h1 class='title-single'>Nuestros Inmuebles</h1>" +
                    "<span class='color-text-a'>Tu Selección</span>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-md-12 col-lg-4'>" +
                    "<nav aria-label='breadcrumb' class='breadcrumb-box d-flex justify-content-lg-end'>" +
                    "<ol class='breadcrumb'>" +
                    "<li class='breadcrumb-item'>" +
                    "<a href='index.php?page=home'>Inicio</a>" +
                    "</li>" +
                    "<li class='breadcrumb-item active' aria-current='page'>Inmuebles</li>" +
                    "</ol>" +
                    "</nav>" +
                    "</div>" +
                    "</div>" +
                    "</div>" 
                )
            for (row in data) {
                $('<div></div>').attr('class', 'containerList more_info').attr('id', data[row].id_realestate).appendTo('.container_listRealestates')
                    .html(
                        "<div class='containerList_img'>" +
                        "<img src=" + data[row].img_realestate + " alt=" + data[row].name_type + " en " + data[row].name_city + " class='list-img'>" +
                        "</div>" +
                        "<div class='containerList_info'>" +
                        "<div class='listInfo_header'>" +
                        "<span class='listInfo_title'>" + data[row].name_type + " en " + data[row].name_city + "</span>" +
                        "<span class='listInfo_province'>" + data[row].province + "</span>" +
                        "</div>" +
                        "<div class='listInfo_trading'>" +
                        "<span class='listInfo_price'>" + new Intl.NumberFormat("es-ES").format(data[row].price) + " €&nbsp;&nbsp;|&nbsp;&nbsp;" + data[row].name_op + "</span>" +
                        "</div>" +
                        "<p class='listInfo_specs'>" +
                        data[row].area + " m<sup>2</sup>" +
                        (data[row].rooms != 0 ? ("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + data[row].rooms + " habitaciones") : "") +
                        (data[row].bathrooms != 0 ? ("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;" + data[row].bathrooms + " baños") : "") +
                        "</p>" +
                        "<p class='listInfo_desc'>" + data[row].description + "</p>" +
                        "</div>" 
                    )     
            }
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function clicks() {
    $(document).on("click", ".more_info", function() {
        var id_realestate = this.getAttribute('id');
        loadDetails(id_realestate);
    });
}

function loadDetails(id_realestate) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=details_realestate&id=' + id_realestate, 'GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('.section-intro').empty();
        $('.container_listRealestates').empty();
        $('.container_detailsCarousel').empty();
        $('.container_detailsRealestate').empty();

        // Carousel container
        for (row in data[1][0]) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[1][0][row].id_img_re).appendTo('.container_detailsCarousel')
                .html(
                    "<div class='card-box-b card-shadow news-box'>" +
                    "<div class='img-box-b'>" +
                    "<img src=" + data[1][0][row].img_realestate + " alt='' class='img-b img-fluid'>" +
                    "</div>" +
                    "</div>"
                )     
        }

        // Info container
        $('<div></div>').attr('class', 'containerDetails_info').attr('id', data[0].id_realestate).appendTo('.container_detailsRealestate')
            .html(
                "<div class='detailsInfo_trading'>" +
                "<span class='detailsInfo_price'>" + new Intl.NumberFormat("es-ES").format(data[0].price) + " €&nbsp;&nbsp;|&nbsp;&nbsp;" + data[0].name_op + "</span>" +
                "</div>" +
                "<div class='detailsInfo_specs'>" +
                "<div class='detailsInfoSpecs_contents'>" +
                "<img src='view/img/specs/area.png' class='detailsInfoSpecs-img'>" +
                "<span class='detailsInfoSpecs-txt'>" + data[0].area + " m<sup>2</sup></span>" +
                "</div>" +
                "</div>" +
                "<div class='detailsInfo_title'>" +
                "<p class='detailsInfoTitle_property'>" + data[0].name_type + " en " + data[0].name_city + "</p>" +
                "<p class='detailsInfoTitle_province'>" + data[0].province + "</p>" +
                "</div>" +
                "<p class='detailsInfo_desc'>" + data[0].description + "</p>"
            )
        if (data[0].rooms != 0){
            $('<div></div>').attr('class', 'detailsInfoSpecs_contents').appendTo('.detailsInfo_specs')
                .html(
                    "<img src='view/img/specs/rooms.png' class='detailsInfoSpecs-img'>" +
                    "<span class='detailsInfoSpecs-txt'>" + data[0].rooms + " habitaciones</span>"
                )
        }
        if (data[0].bathrooms != 0){
            $('<div></div>').attr('class', 'detailsInfoSpecs_contents').appendTo('.detailsInfo_specs')
                .html(
                    "<img src='view/img/specs/bathrooms.png' class='detailsInfoSpecs-img'>" +
                    "<span class='detailsInfoSpecs-txt'>" + data[0].bathrooms + " baños</span>"
                )
        }
        
        // Extras container
        $('<div></div>').attr('class', 'detailsInfo_extras').appendTo('.container_detailsRealestate')
            .html(
                "<p class='detailsInfoExtras_title'>Características</p>" +
                "<div class='detailsInfoExtras_container'></div>"
            )
        for (row in data[2][0]) { 
            $('<div></div>').attr('class', 'detailsInfoExtras_contents').attr('id', data[2][0][row].id_extras).appendTo('.detailsInfoExtras_container')
                .html(
                    "<img src=" + data[2][0][row].img_extras + " class='detailsInfoExtras-img'</img>" +
                    "<span class='detailsInfoExtras-txt'>" + data[2][0][row].name_extras + "</span>"
                )
        }
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

$(document).ready(function() {
    // console.log('Hola JS document ready');
    loadAllRealestates();
    clicks();
});
