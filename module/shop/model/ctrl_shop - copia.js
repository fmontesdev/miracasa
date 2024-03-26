function loadAllRealestates(limit=3, offset=0) {
    var validate_filtersHome = localStorage.getItem('filters_home') || undefined; // conseguimos de localStorage filters_home, sinó existe undefined
    var validate_filtersHome_details = localStorage.getItem('filtersHome_details') || undefined; // conseguimos de localStorage filtersHome_details, sinó existe undefined
    var validate_filtersShop = localStorage.getItem('filters_shop') || undefined; // conseguimos de localStorage filters_shop, sinó existe undefined
    
    var validate_page = localStorage.getItem('page') || undefined;
    if (validate_page != undefined) {
        offset = 3 * (validate_page - 1);
    }

    if (validate_filtersHome != undefined) {
        localStorage.removeItem('filters_home');
        var filtersHome = JSON.parse(validate_filtersHome); // deserializamos para convertir el string otra vez en un array
        console.log(filtersHome);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_home', 'POST', 'JSON', { 'filters': filtersHome });
    } else if (validate_filtersHome_details != undefined) {
        localStorage.removeItem('filtersHome_details'); // eliminamos de localStorage id_recomendation para no interferir en próximas busquedas
        var id_details = JSON.parse(validate_filtersHome_details); // deserializamos para convertir el string otra vez en un array
        console.log(id_details);
        loadDetails(id_details[0]['details'][0]);
    } else if (validate_filtersShop != undefined) {
        var filtersShop = JSON.parse(validate_filtersShop); // deserializamos para convertir el string otra vez en un array
        console.log(filtersShop);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_shop', 'POST', 'JSON', { 'filters': filtersShop, 'limit': limit, 'offset': offset });
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_realestates', 'POST', 'JSON', { 'limit': limit, 'offset': offset });
    }
}

function ajaxForSearch(url, type, dataType, sData=undefined) {
    // console.log(url, type, dataType, sData);
    // return;
    // die("<script>console.log('Hola ajaxForSearch');</script>");
    ajaxPromise(url, type, dataType, sData)
    .then(function(data) {
        console.log(data);   
        // return;

        $('.section-detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();
        $('.list_realestates').empty(); // antes de iniciar borramos el contenedor de list
        $('#list_map').empty();
        $('#pagination_container').empty();

        setTimeout(function(){
            $('html, body').animate({ scrollTop: $(".list_realestates") }); // cuando carga posiciona el list al inicio
        }, 50);

        // Mejora para que cuando no hayan resultados en los filtros aplicados
        if (data == "error") {
            $('<div></div>').attr('class', 'intro-single2').appendTo('.section-catch')
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
                $('<div></div>').attr('class', 'containerList').attr('id', data[row].id_realestate).appendTo('.list_realestates')
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
                                        ${data[row].rooms} habs.
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

            load_mapboxList(data);
            load_pagination();
        }
    }).catch(function() {
        localStorage.setItem('results', 0);
        localStorage.removeItem('filters_home'); // eliminamos de localStorage filters_home para no interferir en próximas busquedas
        $('<div></div>').attr('class', 'intro-single3').appendTo('.list_realestates')
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

function load_mapboxList(data) {
    // window.addEventListener('scroll', function() {
    //     var realestates = document.getElementById('list_realestates');
    //     var map = document.getElementById('list_map');
    //     var footer = document.getElementById('footer');
    //     var realestatesRect = realestates.getBoundingClientRect();
    //     var mapRect = map.getBoundingClientRect();
    //     var footerRect = footer.getBoundingClientRect();
    
    //     if (mapRect.bottom <= footerRect.top-20) {
    //         map.style.position = 'fixed';
    //         map.style.top = 193 + 'px';
    //         map.style.left = realestatesRect.right + 'px';
    //     } else {    
    //         map.style.position = 'sticky';
    //         map.style.top = 193;
    //     }
    // });

    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'list_map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-2.5, 40], // starting position [lng, lat]
        zoom: 5.25 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    for (row in data) {
        const popup = new mapboxgl.Popup({ offset: 15 })
            .setHTML(`
                <div id='${data[row].id_realestate}' class='containerMap more_info'>
                    <div class='map_img'>
                        <img src='${data[row].img_realestate[0]}' alt='' class='img-b img-fluid'>
                    </div>
                    <div class='mapInfo_header'>
                        <span class='mapInfo_title'>${data[row].name_type} en ${data[row].name_city}</span>
                    </div>
                    <div class='mapInfo_trading'>
                        <span class='mapInfo_price'>${new Intl.NumberFormat("es-ES").format(data[row].price)} €&nbsp;&nbsp;|&nbsp;&nbsp;${data[row].name_op}</span>
                    </div>
                    <div class='mapInfo_specs'>
                        <div class='mapInfoSpecs_contents'>
                            <span class='mapInfoSpecs-txt'>
                                ${(data[row].rooms != 0 ? (`${data[row].rooms} habs.&nbsp;&nbsp;·&nbsp;&nbsp;`) : "")}
                            </span>
                        </div>
                        <div class='mapInfoSpecs_contents'>
                            <span class='mapInfoSpecs-txt'>
                                ${(data[row].bathrooms != 0 ? (`${data[row].bathrooms} baños&nbsp;&nbsp;·&nbsp;&nbsp;`) : "")}
                            </span>
                        </div>
                        <div class='mapInfoSpecs_contents'>
                            <span class='mapInfoSpecs-txt'>
                                ${(data[row].floor != 0 ? (`${data[row].floor}&nbsp;&nbsp;·&nbsp;&nbsp;`) : "")}
                            </span>
                        </div>
                        <div class='mapInfoSpecs_contents'>
                            <span class='mapInfoSpecs-txt'>
                                ${data[row].area} m<sup>2</sup>
                            </span>
                        </div>
                    </div>
                </div>`
            );

        const marker = new mapboxgl.Marker({ color: '#2eca6a' })
            .setPopup(popup)
            .setLngLat([data[row].lng, data[row].lat])
            .addTo(map);
    }
}

function clicks() {
    // click list
    $(document).on("click", ".more_info", function() {
        var id_realestate = this.getAttribute('id');
        // console.log(id_realestate);
        loadDetails(id_realestate);
    });

    // click related
    $(document).on("click", ".detailsRelated_re", function() {
        var id_realestate = this.getAttribute('id');
        // console.log(id_realestate);
        loadDetails(id_realestate);
    });

    // click pagination
    $(document).on('click', '.page-link', function() {
        var page = this.getAttribute('id');
        console.log(page);

        if (page !== 'prev' && page !== 'next') {
            localStorage.setItem('page', page);
        }
        if (page === 'prev') {
            var prev = parseInt(localStorage.getItem('page')) - 1;
            if (prev > 0){
                localStorage.setItem('page', prev);
            }
        }
        if (page === 'next') {
            var next = parseInt(localStorage.getItem('page')) + 1;
            var total_pages = Math.ceil(localStorage.getItem('count') / 3);
            if (next <= total_pages){
                localStorage.setItem('page', next);
            }
        }
        loadAllRealestates();
    });
}

function loadDetails(id_realestate) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=details_realestate&id=' + id_realestate, 'GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('.section-detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();
        $('.section-listRealestates').empty();
        $('#pagination_container').empty();
        setTimeout(function(){
            $('.section-filters').empty();
        }, 100);

        $('html, body').animate({ scrollTop: $('.section-detailsCarousel') });  // cuando carga posiciona el details al inicio

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

        // Mapbox
        $('<div></div>').attr('class', 'detailsMap_contents').appendTo('.container_detailsRealestate')
            .html(`
                <p class='detailsInfoMap_title'>Localización</p>
                <div id='details_map'></div>`
            )

        load_mapboxDetails(data);
        realestates_related(data);

    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function load_mapboxDetails(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'details_map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [data[0].lng, data[0].lat], // starting position [lng, lat]
        zoom: 15 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker({ color: '#2eca6a' })
        .setLngLat([data[0].lng, data[0].lat])
        .addTo(map);
}

function loadFilters() {
    ajaxPromise('module/shop/controller/controller_shop.php?op=load_filters','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        $('<div></div>').attr('class', 'container').appendTo('.section-filters')
        .html(`
            <div class='filters_container container'>
                <div id='modal_all_filters'>
                    <a href='#modalAllFilters' class='open'>
                        <img src='view/img/icons/filtrar.png' alt='Todos los filtros'>
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

                <div id='modal_type'>
                    <a href='#modalType' class='open'>
                        <button id='type_button' class='modal-button'>Tipo de inmueble</button>
                    </a>
                    <div id='modalType' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterType_container'>
                            <div class='modal-title'>
                                <span>Tipo de inmueble</span>
                                <img src='view/img/icons/eliminar.png' alt='Eliminar filtro' onclick='remove_filterType()'>
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

                <div id='modal_cat'>
                    <a href='#modalCat' class='open'>
                        <button id='cat_button' class='modal-button'>Categoría</button>
                    </a>
                    <div id='modalCat' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterCat_container'>
                            <div class='modal-title'>
                                <span>Categoría</span>
                                <img src='view/img/icons/eliminar.png' alt='Eliminar filtro' onclick='remove_filterCat()'>
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
                                <img src='view/img/icons/eliminar.png' alt='Eliminar filtro' onclick='remove_filterExtras()'>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='modal_order'>
                    <a href='#modalOrder' class='open'>
                        <button id='order_button' class='modal-button'>Ordenar por</button>
                    </a>
                    <div id='modalOrder' class='modal container'>
                        <a href='#' class='modal-bg container'></a>
                        <div class='modal-content filterOrder_container'>
                            <div class='modal-title'>
                                <span>Ordenar por</span>
                                <img src='view/img/icons/eliminar.png' alt='Eliminar filtro' onclick='remove_filterOrder()'>
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
                    <img src='view/img/icons/eliminar.png' alt='Eliminar todos los filtros' onclick='remove_filters()'>
                </div>
            </div>`
        )

        setTimeout(function(){
            $('<div></div>').attr('id', 'modal_results').appendTo('.filters_container')       
                .html(`<span class='results'>${localStorage.getItem('count')} Inmuebles</span>`);
        }, 100);

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

        // // filter city
        // for (row in data[0][0]) {
        //     $('<div></div>').attr('class', 'filter_container').appendTo('.filterCity_container')       
        //         .html(`
        //             <input type='radio' id='filter_city_${data[0][0][row].id_city}' name='filter_city' class='filter_city' value='${data[0][0][row].name_city}'>
        //             <label for='filter_city_${data[0][0][row].id_city}'>${data[0][0][row].name_city}</label>`
        //     )};

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

        // filter category
        for (row in data[1][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterCat_container')       
                .html(`
                    <input type='radio' id='filter_cat_${data[1][0][row].id_cat}' name='filter_cat' class='filter_cat' value='${data[1][0][row].name_cat}'>
                    <label for='filter_cat_${data[1][0][row].id_cat}'>${data[1][0][row].name_cat}</label>`
            )};
        
        // // filter operation
        // for (row in data[3][0]) {
        //     $('<div></div>').attr('class', 'filter_container').appendTo('.filterOp_container')       
        //         .html(`
        //             <input type='radio' id='filter_op_${data[3][0][row].id_op}' name='filter_op' class='filter_op' value='${data[3][0][row].name_op}'>
        //             <label for='filter_op_${data[3][0][row].id_op}'>${data[3][0][row].name_op}</label>`
        //     )};

        // filter extras
        for (row in data[4][0]) {
            $('<div></div>').attr('class', 'filter_container').appendTo('.filterExtras_container')       
                .html(`
                    <input type='checkbox' id='filter_extras_${data[4][0][row].id_extras}' name='filter_extras' class='filter_extras' value='${data[4][0][row].name_extras}'>
                    <label for='filter_extras_${data[4][0][row].id_extras}'>${data[4][0][row].name_extras}</label>`
            )};
        
        // // filter tourist category
        // for (row in data[5][0]) {
        //     $('<div></div>').attr('class', 'filter_container').appendTo('.filterTouristcat_container')       
        //         .html(`
        //             <input type='radio' id='filter_touristcat_${data[5][0][row].id_touristcat}' name='filter_touristcat' class='filter_touristcat' value='${data[5][0][row].name_touristcat}'>
        //             <label for='filter_touristcat_${data[5][0][row].id_touristcat}'>${data[5][0][row].name_touristcat}</label>`
        //     )};
        
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
        localStorage.setItem('page', 1);
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
            $(".filterSearchCity_container input[type=text]").val(filters_shop[row1][1]) // la class es del div que contiene el input
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 250ms",
                });
        }

        if (filters_shop[row1][0] === 'name_cat') {
            $('#cat_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 5000ms",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
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
            $('.filterSearchOp_container select')
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 250ms",
                });
            $('.filterSearchOp_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                    "transition": "all 250ms",
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
            $('.filterSearchTouristcat_container select')
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2ab760",
                    "transition": "all 250ms",
                });
            $('.filterSearchTouristcat_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                    "transition": "all 250ms",
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
    localStorage.setItem('page', 1);
    location.reload();
}

// function remove_filterCity() {
//     localStorage.removeItem('filter_city');
//     remove_filtersShop();
// }

// function remove_filterTouristcat() {
//     localStorage.removeItem('filter_touristcat');
//     remove_filtersShop();
// }

function remove_filterType() {
    localStorage.removeItem('filter_type');
    remove_filtersShop();
}

function remove_filterCat() {
    localStorage.removeItem('filter_cat');
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

function load_pagination() {
    var filtersShop = [];
    var url = "";
    var validate_filtersShop = localStorage.getItem('filters_shop') || undefined;

    if (validate_filtersShop != undefined) {
        filtersShop = JSON.parse(validate_filtersShop)
        url = 'module/shop/controller/controller_shop.php?op=count_filtersShop';
    } else {
        url = 'module/shop/controller/controller_shop.php?op=count_all';
    }

    ajaxPromise(url, 'POST', 'JSON', { 'filters': filtersShop })
        .then(function(data) {
            // console.log(data);

            // el valor de page se guarda en la función clicks al seleccionar la página
            var page = localStorage.getItem('page') || undefined;
            var total_pages = "";

            var count_realEstates = data.count;
            localStorage.setItem('count', count_realEstates);

            if (count_realEstates >= 3) {
                total_pages = Math.ceil(count_realEstates / 3)
            } else {
                total_pages = 1;
            }
   
            $('<div></div>').attr('id', 'pagination_container').attr('class', 'row').appendTo('.list_realestates')
                .html(`
                    <div class='col-sm-12'>
                        <nav class='pagination-a'>
                            <ul class='pagination'></ul>
                        </nav>
                    </div>`
                );
            
            if (total_pages > 1) {
                if (page != undefined && page == total_pages) {
                    $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`<span id='prev' class='page-link bi bi-chevron-left'></span>`);
    
                    for (i=1; i<=total_pages; i++) {
                        $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`
                            <span id='${i}' class='page-link'>${i}</span>`
                        );
                    }    
                } else if (page != undefined && page == 1) {
                    for (i=1; i<=total_pages; i++) {
                        $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`
                            <span id='${i}' class='page-link'>${i}</span>`
                        );
                    }
    
                    $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`<span id='next' class='page-link bi bi-chevron-right'></span>`);    
                } else {
                    $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`<span id='prev' class='page-link bi bi-chevron-left'></span>`);

                    for (i=1; i<=total_pages; i++) {
                        $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`
                            <span id='${i}' class='page-link'>${i}</span>`
                        );
                    }

                    $('<li></li>').attr('class', 'page-item').appendTo('.pagination')
                        .html(`<span id='next' class='page-link bi bi-chevron-right'></span>`);
                }
            }
            
            // highlight pagination
            if (page != undefined) {
                $('span.page-link').filter(function() {
                    return $(this).text() === page;
                }).css('background-color', '#2eca6a');
            }
            
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function realestates_related(data) {
    var id = data[0].id_realestate;
    var operation = data[0].name_op;
    var id_related = [];
    id_related.push(data[0].id_realestate);
    console.log (id);
    console.log (id_related);
    // return;
    ajaxPromise('module/shop/controller/controller_shop.php?op=count_realestates_related', 'POST', 'JSON', { 'id': id, 'operation': operation })
        .then(function(data) {
            console.log(data);

            var limit = 3;
            var offset = 0;

            if (data != 'error') {
                var count = data.length; // número de inmuebles para el related
                console.log(count);
    
                // guardamos en localStorage los ids de los inmuebles mostrados
                for (row in data) {
                    id_related.push(data[row].id_realestate);
                }
                localStorage.setItem('id_related', id_related);
    
                if (count >= 3) {
                    load_realestates_related(id, operation, limit, offset);
                    count = count - 3;
                } else {
                    load_realestates_related(id, operation, limit, offset);
    
                    // para completar una vista del related, hacemos un select descartando los ids ya mostrados
                    limit = 3 - count;
                    var id_moreRelated = localStorage.getItem('id_related') || undefined;
                    setTimeout(function(){
                        if (id_moreRelated != undefined) {
                            load_more_realestates_related(id_moreRelated, operation=null, limit, offset);
                        }
                    }, 50);
                    count = count - 3;
                    localStorage.removeItem('id_related');
                }
                console.log(count);

                // click more related
                if (count > 0) {
                    $(document).on("click", '.load_more_related', function() {
                        offset = offset + 3;
                        console.log(offset);
        
                        if (count >= 3) {
                            load_more_realestates_related(id, operation, limit, offset);
                            count = count - 3;
                        } else {
                            // console.log(count, id, operation, limit, offset);
                            // return;
                            load_more_realestates_related(id, operation, limit, offset);
                            
                            var id_moreRelated = localStorage.getItem('id_related') || undefined;
                            operation = null;
                            limit = 3 - count;
                            offset = 0;
                            setTimeout(function(){
                                if (id_moreRelated != undefined) {
                                    load_more_realestates_related(id_moreRelated, operation, limit, offset);
                                }
                            }, 50);
                            count = count - 3;
                            localStorage.removeItem('id_related');
                            console.log(count, id_moreRelated, operation, limit, offset);
                        }
                    });
                }
            } else {
                load_realestates_related(id, operation=null, limit, offset);
            }



        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function load_realestates_related(id, operation, limit, offset) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=realestates_related', 'POST', 'JSON', { 'id': id, 'operation': operation, 'limit': limit, 'offset': offset })
        .then(function(data) {
            console.log(data);

            // // guardamos en localStorage los ids de los inmuebles mostrados
            // var id_related = [];
            // if (localStorage.getItem('id_related')) {
            //     var id_related = localStorage.getItem('id_related')
            // }
            // for (row in data) {
            //     id_related.push(data[row].id_realestate);
            // }
            // localStorage.setItem('id_related', id_related);
            // // return;
            
            $('<div></div>').attr('class', 'detailsRelated_contents').appendTo('.container_detailsRealestate')
                .html(`
                    <p class='detailsRelated_title'>Inmuebles que te pueden interesar...</p>
                    <div class='detailsRelated_realestates'></div>`
                )
            for (row in data) {
                $('<div></div>').attr('class', 'card-box-a card-shadow border_radius detailsRelated_re').attr('id', data[row].id_realestate).appendTo('.detailsRelated_realestates')
                    .html(`
                        <div class='img-box-a'>
                            <img src='${data[row].img_realestate[0]}' alt='' class='img-a img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-overlay-a-content'>
                                <div class='card-header-a'>
                                    <h2 class='card-title-a'>
                                        <span class='color-b'>${data[row].name_type}</span> en ${data[row].name_city}
                                    </h2>
                                </div>
                                <div class='card-body-a'>
                                    <div class='price-box d-flex'>
                                        <span class='price-a'>
                                            ${data[row].name_op} | ${new Intl.NumberFormat("es-ES").format(data[row].price)} €
                                        </span>
                                    </div>
                                </div>
                                <div class='card-footer-a'>
                                    <ul class='card-info d-flex justify-content-around'>
                                        <li>
                                            <span class='card-info-title'>Area: </span>
                                            <span>${data[row].area} m<sup>2</sup></span>
                                        </li>
                                        <li>
                                            <span class='card-info-title'>Habitaciones: </span>
                                            <span>${data[row].rooms}</span>
                                        </li>
                                        <li>
                                            <span class='card-info-title'>Baños: </span>
                                            <span>${data[row].bathrooms}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`
                    )     
            }

            $('<div></div>').attr('class', 'load_more_related' ).appendTo('.detailsRelated_contents')
                .html(
                    '<button class="load_more_button" id="load_more_button">Ver mas</button>'
                )
            
            // if (loaded >= 3) {
            //     for (row in data) {
            //         if (data[row].id_car != undefined) {
            //             console.log(data);
            //             $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'more_info_list' }).appendTo('.title_content')
            //                 .html(
            //                     "<li class='portfolio-item'>" +
            //                     "<div class='item-main'>" +
            //                     "<div class='portfolio-image'>" +
            //                     "<img src = " + data[row].img_car + " alt='imagen car' </img> " +
            //                     "</div>" +
            //                     "<h5>" + data[row].id_brand + "  " + data[row].name_model + "</h5>" +
            //                     "</div>" +
            //                     "</li>"

            //                 )
            //         }
            //     }
            //     var total_cars = total_item - 3;
            //     if (total_cars <= loaded) {
            //         $('.more_car__button').empty();
            //         $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
            //             .html(
            //                 "</br><button class='btn-notexist' id='btn-notexist'></button>"
            //             )
            //     } else {
            //         $('.more_car__button').empty();
            //         $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
            //             .html(
            //                 '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
            //             )
            //     }
            // }
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function load_more_realestates_related(id_moreRelated, operation, limit, offset) {
    // console.log(id_moreRelated, operation, limit, offset);
    // return;
    ajaxPromise('module/shop/controller/controller_shop.php?op=realestates_related', 'POST', 'JSON', { 'id': id_moreRelated, 'operation': operation, 'limit': limit, 'offset': offset })
        .then(function(data) {
            console.log(data);
            // return;

            // // guardamos en localStorage los ids de los inmuebles mostrados
            // var id_related = [];
            // if (localStorage.getItem('id_related')) {
            //     var id_related = localStorage.getItem('id_related')
            // }
            // for (row in data) {
            //     id_related.push(data[row].id_realestate);
            // }
            // localStorage.setItem('id_related', id_related);
            // // return;

            for (row in data) {
                $('<div></div>').attr('class', 'card-box-a card-shadow border_radius detailsRelated_re').attr('id', data[row].id_realestate).appendTo('.detailsRelated_realestates')
                    .html(`
                        <div class='img-box-a'>
                            <img src='${data[row].img_realestate[0]}' alt='' class='img-a img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-overlay-a-content'>
                                <div class='card-header-a'>
                                    <h2 class='card-title-a'>
                                        <span class='color-b'>${data[row].name_type}</span> en ${data[row].name_city}
                                    </h2>
                                </div>
                                <div class='card-body-a'>
                                    <div class='price-box d-flex'>
                                        <span class='price-a'>
                                            ${data[row].name_op} | ${new Intl.NumberFormat("es-ES").format(data[row].price)} €
                                        </span>
                                    </div>
                                </div>
                                <div class='card-footer-a'>
                                    <ul class='card-info d-flex justify-content-around'>
                                        <li>
                                            <span class='card-info-title'>Area: </span>
                                            <span>${data[row].area} m<sup>2</sup></span>
                                        </li>
                                        <li>
                                            <span class='card-info-title'>Habitaciones: </span>
                                            <span>${data[row].rooms}</span>
                                        </li>
                                        <li>
                                            <span class='card-info-title'>Baños: </span>
                                            <span>${data[row].bathrooms}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>`
                    )     
            }
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

$(document).ready(function() {
    // console.log('Hola JS document ready');
    loadAllRealestates();
    loadFilters();
    saveFilters();
    clicks();
});