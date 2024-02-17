function loadAllRealestates() {
    var validate_filtersHome = localStorage.getItem('filters_home') || undefined; // conseguimos de localStorage filters_home, sinó existe undefined
    var validate_filtersHome_details = localStorage.getItem('filtersHome_details') || undefined; // conseguimos de localStorage filtersHome_details, sinó existe undefined
    
    if (validate_filtersHome != undefined) {
        var filters = JSON.parse(validate_filtersHome); // deserializamos para convertir el string otra vez en un array
        console.log(filters);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_home', 'POST', 'JSON', { 'filters': filters });
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_realestates', 'GET', 'JSON');
    }
    
    if (validate_filtersHome_details != undefined) {
        localStorage.removeItem('filtersHome_details'); // eliminamos de localStorage id_recomendation para no interferir en próximas busquedas
        var id_details = JSON.parse(validate_filtersHome_details); // deserializamos para convertir el string otra vez en un array
        console.log(id_details);
        loadDetails(id_details[0]['recomendation'][0]);
    }
}

function ajaxForSearch(url, type, dataType, sData=undefined) {
    // console.log(url, type, dataType, sData);
    // return;
    // die("<script>console.log('Hola ajaxForSearch');</script>");
    ajaxPromise(url, type, dataType, sData)
    .then(function(data) {
        console.log(data);
        $('.section-intro').empty();
        $('.container_listRealestates').empty(); // antes de iniciar borramos el contenedor de list
        $('.container_detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();

        // Mejora para que cuando no hayan resultados en los filtros aplicados
        if (data == "error") {
            $('<div></div>').attr('class', 'intro-single2').appendTo('.section-intro')
                .html(`
                    <div class='container'>
                        <div class='row'>
                            <div class='col-md-12 col-lg-8'>
                                <div class='title-single-box'>
                                    <h1 class='title-single'>Sin resultados</h1>
                                    <span class='color-text-a'>¡No se encontaron resultados con los filtros aplicados!</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                )
        } else {
            // Título personalizado del list
            var title_filter = "";
            var validate_filters = localStorage.getItem('filters_home') || undefined;

            if (validate_filters != undefined){
                localStorage.removeItem('filters_home'); // eliminamos de localStorage filters_home para no interferir en próximas busquedas
                var filters = JSON.parse(validate_filters); // deserializamos para convertir el string otra vez en un array
                if (filters[0]['type']) {
                    switch (data[0].name_type) {
                        case 'Habitación':    
                            title_filter = "Habitaciones";
                            break;
                        case 'Garaje':    
                            title_filter = "Garajes";
                            break;
                        case 'Trastero':    
                            title_filter = "Trasteros";
                            break;
                        case 'Oficina':    
                            title_filter = "Oficinas";
                            break;
                        case 'Local o nave':    
                            title_filter = "Locales o naves";
                            break;
                        case 'Terreno':    
                            title_filter = "Terrenos";
                            break;
                        case 'Edificio':    
                            title_filter = "Edificios";
                            break;
                        default:    
                            title_filter = "Viviendas";
                            break;
                    }
                }
                if (filters[0]['category']) {
                    title_filter = data[0].name_cat;
                }
                if (filters[0]['operation']) {
                    title_filter = data[0].name_op;
                }
                if (filters[0]['city']) {
                    title_filter = data[0].name_city;
                }
            } else {
                title_filter = "Nuestros Inmuebles";
            }

            $('<div></div>').attr('class', 'intro-single2').appendTo('.section-intro')
                .html(`
                    <div class='container'>
                        <div class='row'>
                            <div class='col-md-12 col-lg-8'>
                                <div class='title-single-box'>
                                    <h1 class='title-single'>${title_filter}</h1>
                                    <span class='color-text-a'>Tu Selección</span>
                                </div>
                            </div>
                            <div class='col-md-12 col-lg-4'>
                                <nav aria-label='breadcrumb' class='breadcrumb-box d-flex justify-content-lg-end'>
                                    <ol class='breadcrumb'>
                                        <li class='breadcrumb-item'>
                                            <a href='index.php?page=home'>Inicio</a>
                                        </li>
                                        <li class='breadcrumb-item active' aria-current='page'>Inmuebles</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>`
                )

            // Bucle para cada una de las viviendas    
            for (row in data) {
                $('<div></div>').attr('class', 'containerList').attr('id', data[row].id_realestate).appendTo('.container_listRealestates')
                    .html(`
                        <div class='containerList_img'>
                            <div id='list-carousel-${data[row].id_realestate}' class='swiper'>
                                <div class='container_listCarousel swiper-wrapper'></div>
                                <div class='swiper-button-prev'></div>
                                <div class='swiper-button-next'></div>
                            </div>
                        </div>
                        <div id='${data[row].id_realestate}' class='containerList_info more_info'>
                            <div class='listInfo_header'>
                                <span class='listInfo_title'>${data[row].name_type} en ${data[row].name_city}</span>
                                <span class='listInfo_province'>${data[row].province}</span>
                            </div>
                            <div class='listInfo_trading'>
                                <span class='listInfo_price'>${new Intl.NumberFormat("es-ES").format(data[row].price)} €&nbsp;&nbsp;|&nbsp;&nbsp;${data[row].name_op}</span>
                            </div>
                            <div class='listInfo_specs'>
                                <div class="listInfoSpecs_contents">
                                    <img src='view/img/specs/area.png' class='listInfoSpecs-img'>
                                    <span class='listInfoSpecs-txt'>
                                        ${data[row].area} m<sup>2</sup>
                                    </span>
                                </div>
                                ${(data[row].rooms != 0 ? (`
                                    <div class="listInfoSpecs_contents">
                                        <img src='view/img/specs/rooms.png' class='listInfoSpecs-img'>
                                        <span class='listInfoSpecs-txt'>
                                        ${data[row].rooms} habitaciones
                                        </span>
                                    </div>
                                `) : "")}
                                ${(data[row].bathrooms != 0 ? (`
                                    <div class="listInfoSpecs_contents">
                                        <img src='view/img/specs/bathrooms.png' class='listInfoSpecs-img'>
                                        <span class='listInfoSpecs-txt'>
                                            ${data[row].bathrooms} baños
                                        </span>
                                    </div>
                                `) : "")}
                                ${(data[row].floor != 0 ? (`
                                    <div class="listInfoSpecs_contents">
                                        <img src='view/img/specs/floor.png' class='listInfoSpecs-img'>
                                        <span class='listInfoSpecs-txt'>
                                            ${data[row].floor}
                                        </span>
                                    </div>
                                `) : "")}
                            </div>
                            <p class='listInfo_desc'>${data[row].description}</p>
                        </div>`
                    );

                // Recorremos las imágenes de cada vivienda y las agregamos al carrusel
                // Para apuntar al div donde creamos los slides, indicamos div del carrousel + div slide
                for (img in data[row].img_realestate) {
                    $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].img_realestate[img]).appendTo(`#list-carousel-${data[row].id_realestate} .container_listCarousel`)
                        .html(`
                            <div class='card-box-b card-shadow news-box'>
                                <div class='img-box-b'>
                                    <img src='${data[row].img_realestate[img]}' alt='' class='img-b img-fluid'>
                                </div>
                            </div>`
                        );
                }

                // Inicializar el carrusel después de agregar todas las imágenes
                // El div del carrousel necesita un id único
                new Swiper(`#list-carousel-${data[row].id_realestate}`, {
                    speed: 600,
                    loop: true,
                    slidesPerView: 1,
                    navigation: {
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    },
                });
            }
        }
    }).catch(function() {
        localStorage.removeItem('filters_home'); // eliminamos de localStorage filters_home para no interferir en próximas busquedas
        $('<div></div>').attr('class', 'intro-single2').appendTo('.section-intro')
            .html(`
                <div class='container'>
                    <div class='row'>
                        <div class='col-md-12 col-lg-8'>
                            <div class='title-single-box'>
                                <h1 class='title-single'>Sin resultados</h1>
                                <span class='color-text-a'>¡No se encontaron resultados con los filtros aplicados!</span>
                            </div>
                        </div>
                    </div>
                </div>`
            )
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
        $('<div></div>').attr('class', 'swiper').attr('id', 'details-carousel').appendTo('.section-detailsCarousel')
            .html(`
                <div class='container_detailsCarousel swiper-wrapper'></div>
                <div class='swiper-button-prev'></div>
                <div class='swiper-button-next'></div>
                <div class='details-carousel-pagination carousel-pagination'></div>`
            )
        for (row in data[1][0]) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[1][0][row].id_img_re).appendTo('#details-carousel .container_detailsCarousel')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[1][0][row].img_realestate}' alt='' class='img-b img-fluid'>
                        </div>
                    </div>`
                )     
        }

        // Inicializar el carrusel después de agregar todas las imágenes
        new Swiper('#details-carousel', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            pagination: {
                el: '.details-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {slidesPerView: 1,},
                576: {slidesPerView: 2,},
                768: {slidesPerView: 2,},
                992: {slidesPerView: 3,},
                1200: {slidesPerView: 3,},
                1400: {slidesPerView: 3,},
                1600: {slidesPerView: 4,}
            }
        });

        // Info container
        $('<div></div>').attr('class', 'containerDetails_info').attr('id', data[0].id_realestate).appendTo('.container_detailsRealestate')
            .html(`
                <div class='detailsInfo_trading'>
                    <span class='detailsInfo_price'>${new Intl.NumberFormat("es-ES").format(data[0].price)} €&nbsp;&nbsp;|&nbsp;&nbsp;${data[0].name_op}</span>
                </div>
                <div class='detailsInfo_specs'>
                    <div class='detailsInfoSpecs_contents'>
                        <img src='view/img/specs/area.png' class='detailsInfoSpecs-img'>
                        <span class='detailsInfoSpecs-txt'>${data[0].area} m<sup>2</sup></span>
                    </div>
                </div>
                <div class='detailsInfo_title'>
                    <p class='detailsInfoTitle_property'>${data[0].name_type} en ${data[0].name_city}</p>
                    <p class='detailsInfoTitle_province'>${data[0].province}</p>
                </div>
                <p class='detailsInfo_desc'>${data[0].description}</p>`
            )
        if (data[0].rooms != 0){
            $('<div></div>').attr('class', 'detailsInfoSpecs_contents').appendTo('.detailsInfo_specs')
                .html(`
                    <img src='view/img/specs/rooms.png' class='detailsInfoSpecs-img'>
                    <span class='detailsInfoSpecs-txt'>${data[0].rooms} habitaciones</span>`
                )
        }
        if (data[0].bathrooms != 0){
            $('<div></div>').attr('class', 'detailsInfoSpecs_contents').appendTo('.detailsInfo_specs')
                .html(`
                    <img src='view/img/specs/bathrooms.png' class='detailsInfoSpecs-img'>
                    <span class='detailsInfoSpecs-txt'>${data[0].bathrooms} baños</span>`
                )
        }
        if (data[0].floor != 0){
            $('<div></div>').attr('class', 'detailsInfoSpecs_contents').appendTo('.detailsInfo_specs')
                .html(`
                    <img src='view/img/specs/floor.png' class='detailsInfoSpecs-img'>
                    <span class='detailsInfoSpecs-txt'>${data[0].floor}</span>`
                )
        }
        
        // Extras container
        $('<div></div>').attr('class', 'detailsInfo_extras').appendTo('.container_detailsRealestate')
            .html(`
                <p class='detailsInfoExtras_title'>Características</p>
                <div class='detailsInfoExtras_container'></div>`
            )
        for (row in data[2][0]) { 
            $('<div></div>').attr('class', 'detailsInfoExtras_contents').attr('id', data[2][0][row].id_extras).appendTo('.detailsInfoExtras_container')
                .html(`
                    <img src='${data[2][0][row].img_extras}' class='detailsInfoExtras-img'</img>
                    <span class='detailsInfoExtras-txt'>${data[2][0][row].name_extras}</span>`
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
