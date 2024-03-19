function load_operation() {
    ajaxPromise('module/search/controller/controller_search.php?op=search_operation', 'POST', 'JSON')
        .then(function(data) {
            console.log(data);
            // return;
            for (row in data) {
                $('<option></option>').attr('value', `${data[row].name_op}`).html(`${data[row].name_op}`).appendTo('#filter_search_op_select')
                };
            }).catch(function() {
                window.location.href='index.php?page=503';
            });
}

function load_touristCategory(op) {
    $('#filter_search_touristcat_select').empty();
    // var op = localStorage.getItem('filter_op') || undefined;
    // console.log(op);

    if (localStorage.getItem('filter_op')) {
        var op2 = localStorage.getItem('filter_op');
        // localStorage.removeItem('filter_op');
        ajaxPromise('module/search/controller/controller_search.php?op=search_touristCategory', 'POST', 'JSON', { 'operation': op2 })
            .then(function (data) {
                console.log(data);
                // return;
                if (data != 'error') { // para gestionar la falta de resultados
                    $('<option></option>').attr('selected', true).attr('hidden', true).html('Zona turística').appendTo('#filter_search_touristcat_select');
                    for (row in data) {
                        $('<option></option>').attr('value', `${data[row].name_touristcat}`).html(`${data[row].name_touristcat}`).appendTo('#filter_search_touristcat_select')
                        };
                } else {
                    $('<option></option>').attr('selected', true).attr('hidden', true).html('Zona turística').appendTo('#filter_search_touristcat_select');
                    $('<option></option>').attr('disabled', true).html('Sin resultados').appendTo('#filter_search_touristcat_select');
                }  
            }).catch(function () {
                window.location.href='index.php?page=503';
            });
    } else if (op == undefined) {
        ajaxPromise('module/search/controller/controller_search.php?op=search_touristCategory_null', 'POST', 'JSON')
            .then(function (data) {
                console.log(data);
                // return;
                $('<option></option>').attr('selected', true).attr('hidden', true).html('Zona turística').appendTo('#filter_search_touristcat_select');
                for (row in data) {
                    $('<option></option>').attr('value', `${data[row].name_touristcat}`).html(`${data[row].name_touristcat}`).appendTo('#filter_search_touristcat_select')
                    };
            }).catch(function () {
                window.location.href='index.php?page=503';
            });
    } else {
        ajaxPromise('module/search/controller/controller_search.php?op=search_touristCategory', 'POST', 'JSON', { 'operation': op })
            .then(function (data) {
                console.log(data);
                // return;
                if (data != 'error') { // para gestionar la falta de resultados
                    $('<option></option>').attr('selected', true).attr('hidden', true).html('Zona turística').appendTo('#filter_search_touristcat_select');
                    for (row in data) {
                        $('<option></option>').attr('value', `${data[row].name_touristcat}`).html(`${data[row].name_touristcat}`).appendTo('#filter_search_touristcat_select')
                        };
                } else {
                    $('<option></option>').attr('selected', true).attr('hidden', true).html('Zona turística').appendTo('#filter_search_touristcat_select');
                    $('<option></option>').attr('disabled', true).html('Sin resultados').appendTo('#filter_search_touristcat_select');
                }  
            }).catch(function () {
                window.location.href='index.php?page=503';
            });
    }
}

function launch_search() {
    load_operation();
    load_touristCategory();
    $(".filterSearch_container").on("change", "#filter_search_op_select", function(){
        localStorage.removeItem('filter_op');
        var op = this.value;
        console.log(op);
        if (!op) {
            load_touristCategory();
        } else {
            load_touristCategory(op);
        }
    });
    // $(".filterSearch_container").on("change", "#filter_search_op_select", function(){
    //     localStorage.setItem('filter_op', this.value);

    //     if (localStorage.getItem('filter_op')) {
    //         load_touristCategory(localStorage.getItem('filter_op'));
    //     } else {
    //         load_touristCategory();
    //     }
    // });

    // $("#filter_search_touristcat_select").one("click", function () {

    //     if (localStorage.getItem('filter_op')) {
    //         load_touristCategory(localStorage.getItem('filter_op'));
    //     } else {
    //         load_touristCategory();
    //     }
    // });
    

    // $("#filter_search_touristcat_select").one("click", function () {
    //     if ($('#filter_search_op_select').val() != 'Transacción') {
    //         op = $('#filter_search_op_select').val();
    //         load_touristCategory(op);
    //     } else {
    //         load_touristCategory();
    //     }
    // });

    $("#filter_search_touristcat_select").one("click", function () {
        if ($('#filter_search_op_select').val() == 'Transacción') {
            
            // op = $('#filter_search_op_select').val();
            localStorage.removeItem('filter_op');
            load_touristCategory();
        }
    });

    // $("#filter_search_touristcat_select").one("click", function () {
    //     localStorage.removeItem('filter_op');
    // });
}

function autocomplete() {

    // ------------------------- evento click ------------------------- //
    $("#filter_search_city_auto").on("click", function () {
        var sdata = {"complete": ""};

        if ($('#filter_search_op_select').val() != 'Transacción') {
            sdata.op = $('#filter_search_op_select').val();
            if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
                sdata.touristcat = $('#filter_search_touristcat_select').val();
            }
        } else if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
            sdata.touristcat = $('#filter_search_touristcat_select').val();
        }

        ajaxPromise('module/search/controller/controller_search.php?op=search_autocomplete', 'POST', 'JSON', sdata)
            .then(function (data) {
                console.log(data);
                if (data != 'error') { // para gestionar la falta de resultados
                    $('#search_auto').empty();
                    $('#search_auto').fadeIn(100);
                    for (row in data) {
                        $('<div></div>').attr('class', 'search_element').attr('id', `${data[row].name_city}`).html(`${data[row].name_city}`).appendTo('#search_auto');
                    }
                    $(document).on('click', '.search_element', function () {
                        $('#filter_search_city_auto').val(this.getAttribute('id'));
                        $('#search_auto').fadeOut(100);
                        click_search();
                    });
                    $(document).on('click scroll', function (event) {
                        if (event.target.id !== 'filter_search_city_auto') {
                            $('#search_auto').fadeOut(100);
                        }
                    });
                } else {
                    $('#search_auto').empty();
                    $('#search_auto').fadeIn(100);
                    $('<div></div>').attr('class', 'search_element').html('Sin resultados').appendTo('#search_auto');
                    $(document).on('click', '.search_element', function () {
                        $('#filter_search_city_auto').val(this.getAttribute('id'));
                        $('#search_auto').fadeOut(100);
                        click_search();
                    });
                    $(document).on('click scroll', function (event) {
                        if (event.target.id !== 'filter_search_city_auto') {
                            $('#search_auto').fadeOut(100);
                        }
                    });
                }
            }).catch(function () {
                $('#search_auto').fadeOut(100);
            })
        
        // ------------------------- evento keyup ------------------------- //
        $("#filter_search_city_auto").on("keyup", function () {
            sdata = {"complete": $(this).val()};
            
            if ($('#filter_search_op_select').val() != 'Transacción') {
                sdata.op = $('#filter_search_op_select').val();
                if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
                    sdata.touristcat = $('#filter_search_touristcat_select').val();
                }
            } else if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
                sdata.touristcat = $('#filter_search_touristcat_select').val();
            }

            console.log(sdata);
            // return;
        
            ajaxPromise('module/search/controller/controller_search.php?op=search_autocomplete', 'POST', 'JSON', sdata)
                .then(function (data) {
                    console.log(data);
                    if (data != 'error') { // para gestionar la falta de resultados
                        $('#search_auto').empty();
                        $('#search_auto').fadeIn(100);
                        for (row in data) {
                            $('<div></div>').attr('class', 'search_element').attr('id', `${data[row].name_city}`).html(`${data[row].name_city}`).appendTo('#search_auto');
                        }
                        $(document).on('click', '.search_element', function () {
                            $('#filter_search_city_auto').val(this.getAttribute('id'));
                            $('#search_auto').fadeOut(100);
                            click_search();
                        });
                        $(document).on('click scroll', function (event) {
                            if (event.target.id !== 'filter_search_city_auto') {
                                $('#search_auto').fadeOut(100);
                            }
                        });
                    } else {
                        $('#search_auto').empty();
                        $('#search_auto').fadeIn(100);
                        $('<div></div>').attr('class', 'search_element').html('Sin resultados').appendTo('#search_auto');
                        $(document).on('click', '.search_element', function () {
                            $('#filter_search_city_auto').val(this.getAttribute('id'));
                            $('#search_auto').fadeOut(100);
                            click_search();
                        });
                        $(document).on('click scroll', function (event) {
                            if (event.target.id !== 'filter_search_city_auto') {
                                $('#search_auto').fadeOut(100);
                            }
                        });
                    }
                }).catch(function () {
                    $('#search_auto').fadeOut(100);
                });
        });
        
    });
}

function button_search() {
    $('#search_button').on('click', function () {
        click_search();
    });
}

function click_search() {
    localStorage.removeItem('filter_op');
    localStorage.removeItem('filter_touristcat');
    localStorage.removeItem('filter_city');

    if ($('#filter_search_op_select').val() != 'Transacción') {
        localStorage.setItem('filter_op', $('#filter_search_op_select').val());
    }
    if (($('#filter_search_touristcat_select').val() != 'Zona turística') && ($('#filter_search_touristcat_select').val() != null)) {
        localStorage.setItem('filter_touristcat', $('#filter_search_touristcat_select').val());
    }
    if ($("#filter_search_city_auto").val()) {
        localStorage.setItem('filter_city', $("#filter_search_city_auto").val());
    }
    if ( ($('#filter_search_op_select').val() == 'Transacción') && ($('#filter_search_touristcat_select').val() == 'Zona turística') && (!$("#filter_search_city_auto").val()) ) {
        localStorage.removeItem('filters_shop');
        localStorage.removeItem('filter_city');
        localStorage.removeItem('filter_cat');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_op');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_rooms');
        localStorage.removeItem('filter_bathrooms');
        localStorage.removeItem('filter_priceSince');
        localStorage.removeItem('filter_priceTo');
        localStorage.removeItem('filter_touristcat');
        localStorage.removeItem('filter_order');
    }
    applySearch();
}

function applySearch() {
    var search = [];

    if (localStorage.getItem('filter_op')) {
        search.push(['name_op', (localStorage.getItem('filter_op'))]);
    }
    if (localStorage.getItem('filter_touristcat')) {
        search.push(['name_touristcat', (localStorage.getItem('filter_touristcat'))]);
    }
    if (localStorage.getItem('filter_city')) {
        search.push(['name_city', (localStorage.getItem('filter_city'))]);
    }

    if (search.length != 0) {
        localStorage.removeItem('filters_shop');
        localStorage.removeItem('filter_cat');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_extras');
        localStorage.removeItem('filter_rooms');
        localStorage.removeItem('filter_bathrooms');
        localStorage.removeItem('filter_priceSince');
        localStorage.removeItem('filter_priceTo');
        localStorage.removeItem('filter_order');
        localStorage.setItem('filters_shop', JSON.stringify(search));
    }

    window.location.href = 'index.php?page=controller_shop&op=list';      
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});








function loadAllRealestates() {
    var validate_filtersHome = localStorage.getItem('filters_home') || undefined; // conseguimos de localStorage filters_home, sinó existe undefined
    var validate_filtersHome_details = localStorage.getItem('filtersHome_details') || undefined; // conseguimos de localStorage filtersHome_details, sinó existe undefined
    var validate_filtersHome_lastsearch = localStorage.getItem('filtersHome_lastsearch') || undefined;
    var validate_filtersShop = localStorage.getItem('filters_shop') || undefined; // conseguimos de localStorage filters_shop, sinó existe undefined
    
    if (validate_filtersHome != undefined) {
        var filtersHome = JSON.parse(validate_filtersHome); // deserializamos para convertir el string otra vez en un array
        localStorage.removeItem('filters_home');
        console.log(filtersHome);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_home', 'POST', 'JSON', { 'filters': filtersHome });
    } else if (validate_filtersHome_details != undefined) {
        localStorage.removeItem('filtersHome_details'); // eliminamos de localStorage id_recomendation para no interferir en próximas busquedas
        var id_details = JSON.parse(validate_filtersHome_details); // deserializamos para convertir el string otra vez en un array
        console.log(id_details);
        loadDetails(id_details[0]['recomendation'][0]);
    } else if (validate_filtersHome_lastsearch != undefined) {
        localStorage.removeItem('filtersHome_lastsearch'); // eliminamos de localStorage id_recomendation para no interferir en próximas busquedas
        var id_details = JSON.parse(validate_filtersHome_lastsearch); // deserializamos para convertir el string otra vez en un array
        console.log(id_details);
        loadDetails(id_details[0]['lastsearch'][0]);
    } else if (validate_filtersShop != undefined) {
        // localStorage.removeItem('filters_shop'); // eliminamos de localStorage filters_shop para no interferir en próximas busquedas
        var filtersShop = JSON.parse(validate_filtersShop); // deserializamos para convertir el string otra vez en un array
        console.log(filtersShop);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_shop', 'POST', 'JSON', { 'filters': filtersShop });
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_realestates', 'GET', 'JSON');
    }
}

function ajaxForSearch(url, type, dataType, sData=undefined) {
    // console.log(url, type, dataType, sData);
    // return;
    // die("<script>console.log('Hola ajaxForSearch');</script>");
    ajaxPromise(url, type, dataType, sData)
    .then(function(data) {
        console.log(data);

        localStorage.setItem('results', data.length);
            
        // return;
        $('.section-detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();
        $('.container_listRealestates').empty(); // antes de iniciar borramos el contenedor de list
        $('.section-catch').empty();

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
            // var title_filter = "";
            // var validate_filters = localStorage.getItem('filters_home') || undefined;

            // if (validate_filters != undefined){
            //     localStorage.removeItem('filters_home'); // eliminamos de localStorage filters_home para no interferir en próximas busquedas
            //     var filters = JSON.parse(validate_filters); // deserializamos para convertir el string otra vez en un array
            //     if (filters[0]['type']) {
            //         switch (data[0].name_type) {
            //             case 'Habitación':    
            //                 title_filter = "Habitaciones";
            //                 break;
            //             case 'Garaje':    
            //                 title_filter = "Garajes";
            //                 break;
            //             case 'Trastero':    
            //                 title_filter = "Trasteros";
            //                 break;
            //             case 'Oficina':    
            //                 title_filter = "Oficinas";
            //                 break;
            //             case 'Local o nave':    
            //                 title_filter = "Locales o naves";
            //                 break;
            //             case 'Terreno':    
            //                 title_filter = "Terrenos";
            //                 break;
            //             case 'Edificio':    
            //                 title_filter = "Edificios";
            //                 break;
            //             default:    
            //                 title_filter = "Viviendas";
            //                 break;
            //         }
            //     }
            //     if (filters[0]['category']) {
            //         title_filter = data[0].name_cat;
            //     }
            //     if (filters[0]['operation']) {
            //         title_filter = data[0].name_op;
            //     }
            //     if (filters[0]['city']) {
            //         title_filter = data[0].name_city;
            //     }
            // } else {
            //     title_filter = "Nuestros Inmuebles";
            // }

            // $('<div></div>').attr('class', 'intro-single2').appendTo('.section-intro')
            //     .html(`
            //         <div class='container'>
            //             <div class='row'>
            //                 <div class='col-md-12 col-lg-8'>
            //                     <div class='title-single-box'>
            //                         <h1 class='title-single'>${title_filter}</h1>
            //                         <span class='color-text-a'>Tu Selección</span>
            //                     </div>
            //                 </div>
            //                 <div class='col-md-12 col-lg-4'>
            //                     <nav aria-label='breadcrumb' class='breadcrumb-box d-flex justify-content-lg-end'>
            //                         <ol class='breadcrumb'>
            //                             <li class='breadcrumb-item'>
            //                                 <a href='index.php?page=home'>Inicio</a>
            //                             </li>
            //                             <li class='breadcrumb-item active' aria-current='page'>Inmuebles</li>
            //                         </ol>
            //                     </nav>
            //                 </div>
            //             </div>
            //         </div>`
            //     )

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
        localStorage.setItem('results', 0);
        localStorage.removeItem('filters_home'); // eliminamos de localStorage filters_home para no interferir en próximas busquedas
        $('<div></div>').attr('class', 'intro-single3').appendTo('.section-catch')
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
        // console.log(id_realestate);
        loadDetails(id_realestate);
    });
}

function loadDetails(id_realestate) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=details_realestate&id=' + id_realestate, 'GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('.section-detailsCarousel').empty();
        $('.container_detailsRealestate').empty();
        $('.section-filters').empty();
        // $('.section-filters container').empty();
        // $('.section-filters .modal_fixed').empty();
        $('.container_listRealestates').empty();
        $('.section-catch').empty();
        

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

function loadFilters() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=load_filters','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('<div></div>').attr('class', 'container').appendTo('.section-filters')
        .html(`
            <div class='modal_fixed container'>
                <div id='modal_all_filters'>
                    <a href='#modalAllFilters' class='open'>
                        <img src='view/img/icons/filtrar.png'>
                    </a>
                    <div id='modalAllFilters' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterAll_container_main'>
                            <div class='filterAll-title_main'>
                                <span>Filtros</span>
                            </div>

                            <div class='filterTouristcatCityAll_container filterAll_container'>
                                <div class='filterTouristcatAll_container'>
                                    <div class='filterAll-title'>
                                        <span>Zona turística</span>
                                    </div>
                                    <select id='filter_touristcat_select' name='filter_touristcat' class='filter_touristcat'>
                                        <option hidden selected>Selecciona zona turística</option>
                                    </select>
                                </div>

                                <div class='filterCityAll_container'>
                                    <div class='filterAll-title'>
                                        <span>Ciudad</span>
                                    </div>
                                    <select id='filter_city_select' name='filter_city' class='filter_city'>
                                        <option hidden selected>Selecciona una ciudad</option>
                                    </select>
                                </div>
                            </div>

                            <div class='filterTypeAll_container filterAll_container'>
                                <div class='filterAll-title'>
                                    <span>Tipo de inmuebles</span>
                                </div>
                                <div class='filterTypeCont_data'>
                                    <div class='filterTypeCont_col1'>
                                        <label><em>General</em></label>
                                        <ul class='filterTypeAllCont_general'></ul>
                                    </div>

                                    <div class='filterTypeCont_col2'>
                                        <label><em>Piso</em></label>
                                        <ul class='filterTypeAllCont_piso'></ul>
                                        <label><em>Casa</em></label>
                                        <ul class='filterTypeAllCont_casa'></ul>
                                    </div>
                                </div>
                            </div>


                            <div class='filterCatOpAll_container filterAll_container'>
                                <div class='filterCatAll_container'>
                                    <div class='filterAll-title'>
                                        <span>Categoria</span>
                                    </div>
                                    <select id='filter_cat_select' name='filter_cat' class='filter_cat'>
                                        <option hidden selected>Selecciona una categoria</option>
                                    </select>
                                </div>

                                <div class='filterOpAll_container'>
                                    <div class='filterAll-title'>
                                        <span>Transacción</span>
                                    </div>
                                    <select id='filter_op_select' name='filter_op' class='filter_op'>
                                        <option hidden selected>Selecciona transacción</option>
                                    </select>
                                </div>
                            </div>



                            <div class='filterPrice_container filterAll_container'>
                                <div class='filterAll-title filterAll-doubleTitle'>
                                    <span>Precio</span>
                                </div>

                                <div class='filterPriceSince_container'>
                                    <div class='filterAll-title'>
                                        <span>Mínimo</span>
                                    </div>
                                    <select id='filter_priceSince_select' name='filter_priceSince' class='filter_priceSince'>
                                        <option hidden selected>Indiferente</option>
                                        <option value='50000'>50.000 €</option>
                                        <option value='75000'>75.000 €</option>
                                        <option value='100000'>100.000 €</option>
                                        <option value='125000'>125.000 €</option>
                                        <option value='150000'>150.000 €</option>
                                        <option value='200000'>200.000 €</option>
                                        <option value='250000'>250.000 €</option>
                                        <option value='300000'>300.000 €</option>
                                        <option value='400000'>400.000 €</option>
                                        <option value='500000'>500.000 €</option>
                                        <option value='750000'>750.000 €</option>
                                        <option value='1000000'>1.000.000 €</option>
                                        <option value='1500000'>1.500.000 €</option>
                                        <option value='2000000'>2.000.000 €</option>
                                    </select>
                                </div>

                                <div class='filterPriceTo_container'>
                                    <div class='filterAll-title'>
                                        <span>Máximo</span>
                                    </div>
                                    <select id='filter_priceTo_select' name='filter_priceTo' class='filter_priceTo'>
                                        <option hidden selected>Indiferente</option>
                                        <option value='50000'>50.000 €</option>
                                        <option value='75000'>75.000 €</option>
                                        <option value='100000'>100.000 €</option>
                                        <option value='125000'>125.000 €</option>
                                        <option value='150000'>150.000 €</option>
                                        <option value='200000'>200.000 €</option>
                                        <option value='250000'>250.000 €</option>
                                        <option value='300000'>300.000 €</option>
                                        <option value='400000'>400.000 €</option>
                                        <option value='500000'>500.000 €</option>
                                        <option value='750000'>750.000 €</option>
                                        <option value='1000000'>1.000.000 €</option>
                                        <option value='1500000'>1.500.000 €</option>
                                        <option value='2000000'>2.000.000 €</option>
                                    </select>
                                </div>
                            </div>  

                            <div class='filterRooms_container filterAll_container'>
                                <div class='filterAll-title'>
                                    <span>Habitaciones</span>
                                </div>
                                <div id='filter_rooms_cont'>
                                    <input type='button' name='filterRooms_buttons' id='filterRooms_buttons' class='filter_button' value='1'>
                                    <input type='button' name='filterRooms_buttons' id='filterRooms_buttons' class='filter_button' value='2'>
                                    <input type='button' name='filterRooms_buttons' id='filterRooms_buttons' class='filter_button' value='3'>
                                    <input type='button' name='filterRooms_buttons' id='filterRooms_buttons' class='filter_button' value='4'>
                                    <input type='button' name='filterRooms_buttons' id='filterRooms_buttons' class='filter_button' value='+5'>
                                </div>

                            </div>

                            <div class='filterBathrooms_container filterAll_container'>
                                <div class='filterAll-title'>
                                    <span>Baños</span>
                                </div>
                                <div id='filter_bathrooms_cont'>
                                    <input type='button' name='filterBathrooms_buttons' id='filterBathrooms_buttons' class='filter_button' value='1'>
                                    <input type='button' name='filterBathrooms_buttons' id='filterBathrooms_buttons' class='filter_button' value='2'>
                                    <input type='button' name='filterBathrooms_buttons' id='filterBathrooms_buttons' class='filter_button' value='3'>
                                    <input type='button' name='filterBathrooms_buttons' id='filterBathrooms_buttons' class='filter_button' value='4'>
                                    <input type='button' name='filterBathrooms_buttons' id='filterBathrooms_buttons' class='filter_button' value='+5'>
                                </div>
                            </div>

                            <div class='filterExtras_container filterAll_container'>
                                <div class='filterAll-title'>
                                    <span>Extras</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_touristcat'>
                    <a href='#modalTouristcat' class='open'>
                        <button id='touristcat_button' class='modal-button'>Zona Turística</button>
                    </a>
                    <div id='modalTouristcat' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterTouristcat_container'>
                            <div class='modal-title'>
                                <span>Zona Turística</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterTouristcat()'>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_city'>
                    <a href='#modalCity' class='open'>
                        <button id='city_button' class='modal-button'>Ciudad</button>
                    </a>
                    <div id='modalCity' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterCity_container'>
                            <div class='modal-title'>
                                <span>Ciudad</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterCity()'>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_type'>
                    <a href='#modalType' class='open'>
                        <button id='type_button' class='modal-button'>Tipo de inmueble</button>
                    </a>
                    <div id='modalType' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterType_container'>
                            <div class='modal-title'>
                                <span>Tipo de inmueble</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterType()'>
                            </div>
                            <div class='filterTypeCont_data'>
                                <div class='filterTypeCont_col1'>
                                    <label><em>General</em></label>
                                    <ul class='filterTypeCont_general'></ul>
                                </div>
                                
                                <div class='filterTypeCont_col2'>
                                    <label><em>Piso</em></label>
                                    <ul class='filterTypeCont_piso'></ul>
                                    <label><em>Casa</em></label>
                                    <ul class='filterTypeCont_casa'></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_op'>
                    <a href='#modalOp' class='open'>
                        <button id='op_button' class='modal-button'>Transacción</button>
                    </a>
                    <div id='modalOp' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterOp_container'>
                            <div class='modal-title'>
                                <span>Transacción</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterOp()'>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_extras'>
                    <a href='#modalExtras' class='open'>
                        <button id='extras_button' class='modal-button'>Extras</button>
                    </a>
                    <div id='modalExtras' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterExtras_container'>
                            <div class='modal-title'>
                                <span>Extras</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterExtras()'>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_order'>
                    <a href='#modalOrder' class='open'>
                        <button id='order_button' class='modal-button'>Ordenar</button>
                    </a>
                    <div id='modalOrder' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterOrder_container'>
                            <div class='modal-title'>
                                <span>Ordenar</span>
                                <img src='view/img/icons/eliminar.png' onclick='remove_filterOrder()'>
                            </div>
                            <div class="filter_container">
                                <input type='radio' id='filter_order_cheaper' name='filter_order' class='filter_order' value='Más baratos'>
                                <label for='filter_order_cheaper'>Más baratos</label>
                            </div>
                            <div class="filter_container">
                                <input type='radio' id='filter_order_expensive' name='filter_order' class='filter_order' value='Más caros'>
                                <label for='filter_order_expensive'>Más caros</label>
                            </div>
                            <div class="filter_container">
                                <input type='radio' id='filter_order_bigger' name='filter_order' class='filter_order' value='Más grandes'>
                                <label for='filter_order_bigger'>Más grandes</label>
                            </div>
                            <div class="filter_container">
                                <input type='radio' id='filter_order_smaller' name='filter_order' class='filter_order' value='Más pequeños'>
                                <label for='filter_order_smaller'>Más pequeños</label>
                            </div>
                            <div class="filter_container">
                                <input type='radio' id='filter_order_visited' name='filter_order' class='filter_order' value='Más visitados'>
                                <label for='filter_order_visited'>Más visitados</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_remove'>
                    <img src='view/img/icons/eliminar.png' onclick='remove_filters()'>
                </div>

                <div id='modal_results'>
                    <span class='results'>${localStorage.getItem('results')} Inmuebles</span>
                </div>
            </div>`
        )
        // filters all
        for (row in data[0][0]) {
            $('<option></option>').attr('value', `${data[0][0][row].name_city}`).html(`${data[0][0][row].name_city}`).appendTo('#filter_city_select')
            };
        for (row in data[1][0]) {
            $('<option></option>').attr('value', `${data[1][0][row].name_cat}`).html(`${data[1][0][row].name_cat}`).appendTo('#filter_cat_select')
            };
        for (row in data[2]) {
            for (i=0; i<data[2][row].length; i++ ) {
                if (data[2][row][i].subtype == 'Inmueble') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeAllCont_general')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type_all' class='filter_type_all' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    );
                };
                if (data[2][row][i].subtype == 'Piso') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeAllCont_piso')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type_all' class='filter_type_all' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    ); 
                };
                if (data[2][row][i].subtype == 'Casa') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeAllCont_casa')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type_all' class='filter_type_all' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    ); 
                };
            };
        };
        for (row in data[3][0]) {
            $('<option></option>').attr('value', `${data[3][0][row].name_op}`).html(`${data[3][0][row].name_op}`).appendTo('#filter_op_select')
            };
        for (row in data[5][0]) {
            $('<option></option>').attr('value', `${data[5][0][row].name_touristcat}`).html(`${data[5][0][row].name_touristcat}`).appendTo('#filter_touristcat_select')
            };

        // filter city
        for (row in data[0][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterCity_container')       
                .html(`
                    <input type='radio' id='filter_city_${data[0][0][row].id_city}' name='filter_city' class='filter_city' value='${data[0][0][row].name_city}'>
                    <label for='filter_city_${data[0][0][row].id_city}'>${data[0][0][row].name_city}</label>`
            )};

        // filter type
        for (row in data[2]) {
            for (i=0; i<data[2][row].length; i++ ) {
                if (data[2][row][i].subtype == 'Inmueble') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeCont_general')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type' class='filter_type' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    );
                };
                if (data[2][row][i].subtype == 'Piso') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeCont_piso')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type' class='filter_type' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    ); 
                };
                if (data[2][row][i].subtype == 'Casa') {
                    $('<li></li>').attr('class', 'filter_container').appendTo('.filterTypeCont_casa')       
                        .html(`
                            <input type='radio' id='filter_type_${data[2][row][i].id_type}' name='filter_type' class='filter_type' value='${data[2][row][i].name_type}'>
                            <label for='filter_type_${data[2][row][i].id_type}'>${data[2][row][i].name_type}</label>`
                    ); 
                };
            };
        };
        
        // filter operation
        for (row in data[3][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterOp_container')       
                .html(`
                    <input type='radio' id='filter_op_${data[3][0][row].id_op}' name='filter_op' class='filter_op' value='${data[3][0][row].name_op}'>
                    <label for='filter_op_${data[3][0][row].id_op}'>${data[3][0][row].name_op}</label>`
            )};

        // filter extras
        for (row in data[4][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterExtras_container')       
                .html(`
                    <input type='checkbox' id='filter_extras_${data[4][0][row].id_extras}' name='filter_extras' class='filter_extras' value='${data[4][0][row].name_extras}'>
                    <label for='filter_extras_${data[4][0][row].id_extras}'>${data[4][0][row].name_extras}</label>`
            )};
        
        // filter tourist category
        for (row in data[5][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterTouristcat_container')       
                .html(`
                    <input type='radio' id='filter_touristcat_${data[5][0][row].id_touristcat}' name='filter_touristcat' class='filter_touristcat' value='${data[5][0][row].name_touristcat}'>
                    <label for='filter_touristcat_${data[5][0][row].id_touristcat}'>${data[5][0][row].name_touristcat}</label>`
            )};
        
        highlight();
        
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function saveFilters() {
    $(".section-filters").on("change",".filter_city",function(){
        // filter_city.splice(0, 2, 'name_city', this.value);
        localStorage.setItem('filter_city', this.value);
        applyFilters();
    });

    $(".section-filters").on("change",".filter_cat",function(){
        // filter_cat.splice(0, 2, 'name_cat', this.value);
        localStorage.setItem('filter_cat', this.value);
        applyFilters();
    });
        
    $(".section-filters").on("change",".filter_type",function(){
        // filter_type.splice(0, 2, 'name_type', this.value);
        localStorage.setItem('filter_type', this.value);
        applyFilters();
    });

    $(".section-filters").on("change",".filter_type_all",function(){
        // filter_type.splice(0, 2, 'name_type', this.value);
        localStorage.setItem('filter_type', this.value);
        applyFilters();
    });

    $(".section-filters").on("change",".filter_op",function(){
        // filter_op.splice(0, 2, 'name_op', this.value);
        localStorage.setItem('filter_op', this.value);
        applyFilters();
    });

    // checkbox
    $(".section-filters").on("change",".filter_extras",function(){
        var filter_extras = JSON.parse(localStorage.getItem('filter_extras')) || [];

        if (filter_extras.includes(this.value)) {
            var index = filter_extras.indexOf(this.value); // obtenemos la posición del valor en el array
            filter_extras.splice(index, 1); // 1 es la cantidad de elemento a eliminar
        } else {
            filter_extras.push(this.value);
        }

        localStorage.setItem('filter_extras', JSON.stringify(filter_extras));
        applyFilters();
    });

    $(".section-filters").on("click","#filterRooms_buttons",function(){
        localStorage.setItem('filter_rooms', this.value);
        applyFilters();
    });

    $(".section-filters").on("click","#filterBathrooms_buttons",function(){
        localStorage.setItem('filter_bathrooms', this.value);
        applyFilters();
    });

    // rango
    $(".section-filters").on("change",".filter_priceSince",function(){
        var filter_priceSince = [];
        filter_priceSince.push('price_since', this.value);
        localStorage.setItem('filter_priceSince', JSON.stringify(filter_priceSince));
        applyFilters();
    });

    $(".section-filters").on("change",".filter_priceTo",function(){
        var filter_priceTo = [];
        filter_priceTo.push('price_to', this.value);
        localStorage.setItem('filter_priceTo', JSON.stringify(filter_priceTo));
        applyFilters();
    });

    $(".section-filters").on("change",".filter_touristcat",function(){
        localStorage.setItem('filter_touristcat', this.value);
        applyFilters();
    });

    $(".section-filters").on("change",".filter_order",function(){
        // filter_op.splice(0, 2, 'name_op', this.value);
        localStorage.setItem('filter_order', this.value);
        applyFilters();
    });
}

function applyFilters() {
    var filter_priceSince = [];
    var filter_priceTo = [];
    var filters_shop = [];

    if (localStorage.getItem('filter_city')) {
        filters_shop.push(['name_city', (localStorage.getItem('filter_city'))]);
    }

    if (localStorage.getItem('filter_cat')) {
        filters_shop.push(['name_cat', (localStorage.getItem('filter_cat'))]);
    }

    if (localStorage.getItem('filter_type')) {
        filters_shop.push(['name_type', (localStorage.getItem('filter_type'))]);
    }

    if (localStorage.getItem('filter_op')) {
        filters_shop.push(['name_op', (localStorage.getItem('filter_op'))]);
    }

    // checkbox
    if (localStorage.getItem('filter_extras')) {
        var filter_extras = JSON.parse(localStorage.getItem('filter_extras'));
        console.log(filter_extras);
        if (filter_extras.length > 0) {
            filters_shop.push(['name_extras', filter_extras]);
        } else {
            localStorage.removeItem('filter_extras');
            localStorage.removeItem('filters_shop');
        }
    }

    if (localStorage.getItem('filter_rooms')) {
        filters_shop.push(['rooms', (localStorage.getItem('filter_rooms'))]);
    }

    if (localStorage.getItem('filter_bathrooms')) {
        filters_shop.push(['bathrooms', (localStorage.getItem('filter_bathrooms'))]);
    }

    // rango
    if (localStorage.getItem('filter_priceSince')) {
        filter_priceSince = JSON.parse(localStorage.getItem('filter_priceSince'));
        if (localStorage.getItem('filter_priceTo')) {
            filter_priceTo = JSON.parse(localStorage.getItem('filter_priceTo'));
            filters_shop.push(['price', filter_priceSince, filter_priceTo]);
        } else {
            filter_priceTo.push('price_to', "100000000");
            filters_shop.push(['price', filter_priceSince, filter_priceTo]);
        }
    } 
    else  {
        if (localStorage.getItem('filter_priceTo')) {
            filter_priceSince.push('price_since', "0");
            filter_priceTo = JSON.parse(localStorage.getItem('filter_priceTo'));
            filters_shop.push(['price', filter_priceSince, filter_priceTo]);
        }
    }

    if (localStorage.getItem('filter_touristcat')) {
        filters_shop.push(['name_touristcat', (localStorage.getItem('filter_touristcat'))]);
    }

    if (localStorage.getItem('filter_order')) {
        filters_shop.push(['order', (localStorage.getItem('filter_order'))]);
    }

    if (filters_shop.length != 0) {
        localStorage.setItem('filters_shop', JSON.stringify(filters_shop));
        location.reload();
    } else {
        location.reload();
    }       
}

function highlight() {
    if (localStorage.getItem('filters_shop')) {
        var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    }
    for (row1 in filters_shop) {
        if (filters_shop[row1][0] === 'name_city') {
            $('#city_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterCityAll_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterCityAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'name_cat') {
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterCatAll_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterCatAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            // jQuery("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
            // $("input[type=checkbox]").prop("checked", false);
        }

        if (filters_shop[row1][0] === 'name_type') {
            $('#type_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
        }

        if (filters_shop[row1][0] === 'name_op') {
            $('#op_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterOpAll_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterOpAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'name_extras') {
            for (row2 in filters_shop[row1][1]) {
                $('#extras_button')
                    .css({
                        "background-color": "#2eca6a17",
                        "color": "#2ab760",
                        "transition": "all 5000ms",
                    });
                if (filters_shop[row1][1].length == 1) {
                    $('#extras_button').html(filters_shop[row1][1][row2]);
                } else {
                    $('#extras_button').html(`Extras (${filters_shop[row1][1].length})`);
                }
                $("input[value='"+ filters_shop[row1][1][row2] +"']").attr('checked', true);
            }  
        }

        if (filters_shop[row1][0] === 'rooms') {
            $("#filter_rooms_cont input[value='"+ filters_shop[row1][1] +"']") // el id es del div que contiene los inputs
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
        }

        if (filters_shop[row1][0] === 'bathrooms') {
            $("#filter_bathrooms_cont input[value='"+ filters_shop[row1][1] +"']") // el id es del div que contiene los inputs
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
        }

        if (filters_shop[row1][0] === 'price') {
            $("#filter_priceSince_select option[value='"+ filters_shop[row1][1][1] +"']").attr('selected', true);
            $("#filter_priceTo_select option[value='"+ filters_shop[row1][2][1] +"']").attr('selected', true);
            $('.filterPriceSince_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterPriceSince_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            $('.filterPriceTo_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterPriceTo_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'name_touristcat') {
            $('#touristcat_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterTouristcatAll_container select')
                .css({
                    "border": "1px solid #2eca6a",
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                });
            $('.filterTouristcatAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'order') {
            $('#order_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
        }
    }
}

function remove_filters() {
    localStorage.removeItem('filters_shop');
    localStorage.removeItem('filter_city');
    localStorage.removeItem('filter_cat');
    localStorage.removeItem('filter_type');
    localStorage.removeItem('filter_op');
    localStorage.removeItem('filter_extras');
    localStorage.removeItem('filter_rooms');
    localStorage.removeItem('filter_bathrooms');
    localStorage.removeItem('filter_priceSince');
    localStorage.removeItem('filter_priceTo');
    localStorage.removeItem('filter_touristcat');
    localStorage.removeItem('filter_order');
    location.reload();
}

function remove_filterCity() {
    localStorage.removeItem('filter_city');
    remove_filtersShop();
}

function remove_filterTouristcat() {
    localStorage.removeItem('filter_touristcat');
    remove_filtersShop();
}

function remove_filterType() {
    localStorage.removeItem('filter_type');
    remove_filtersShop();
}

function remove_filterOp() {
    localStorage.removeItem('filter_op');
    remove_filtersShop();
}

function remove_filterExtras() {
    localStorage.removeItem('filter_extras');
    remove_filtersShop();
}

function remove_filterOrder() {
    localStorage.removeItem('filter_order');
    remove_filtersShop();
}

function remove_filtersShop() {
    localStorage.removeItem('filters_shop');
    applyFilters();
    location.reload();
}

// $(document).ready(function() {
//     // console.log('Hola JS document ready');
//     loadAllRealestates();
//     loadFilters();
//     saveFilters();
//     clicks();
// });