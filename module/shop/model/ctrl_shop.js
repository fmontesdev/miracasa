function loadAllRealestates(limit=4, offset=0) {
    // conseguimos accessToken desde localStorage para comprobar que hay un usuario logeado
    var accessToken = localStorage.getItem('access_token') || null;
    
    // con la página activa de la paginación definimos el offset
    var validate_page = localStorage.getItem('page') || undefined;
    if (validate_page != undefined) {
        offset = 4 * (validate_page - 1);
    }

    // transformamos los valores del localStorage del filters_search en valores individuales para pasarselos al filters_shop
    var validate_filtersSearch = localStorage.getItem('filters_search') || undefined; // conseguimos de localStorage filters_search, sinó existe undefined
    if (validate_filtersSearch != undefined) {
        localStorage.removeItem('filters_search');
        var filtersSearch = JSON.parse(validate_filtersSearch); // deserializamos para convertir el string otra vez en un array
        console.log(filtersSearch);

        for (row in filtersSearch) {
            if (filtersSearch[row][0] == 'name_op') {
                localStorage.setItem('filter_op', filtersSearch[row][1]);
            } 
            if (filtersSearch[row][0] == 'name_touristcat') {
                localStorage.setItem('filter_touristcat', filtersSearch[row][1]);
            }
            if (filtersSearch[row][0] == 'name_city') {
                localStorage.setItem('filter_city', filtersSearch[row][1]);
            }
        }

        applyFilters('search');
    }

    // transformamos los valores del localStorage del filter_home en valores individuales para pasarselos al filters_shop
    var validate_filtersHome = localStorage.getItem('filters_home') || undefined; // conseguimos de localStorage filters_home, sinó existe undefined
    if (validate_filtersHome != undefined) {
        localStorage.removeItem('filters_home');
        var filtersHome = JSON.parse(validate_filtersHome); // deserializamos para convertir el string otra vez en un array
        console.log(filtersHome);

        if (filtersHome[0][0] == 'name_touristcat') {
            localStorage.setItem('filter_touristcat', filtersHome[0][1]);
        } else if (filtersHome[0][0] == 'name_type') {
            localStorage.setItem('filter_type', filtersHome[0][1]);
        } else if (filtersHome[0][0] == 'name_cat') {
            localStorage.setItem('filter_cat', filtersHome[0][1]);
        } else if (filtersHome[0][0] == 'name_op') {
            localStorage.setItem('filter_op', filtersHome[0][1]);
        } else if (filtersHome[0][0] == 'name_city') {
            localStorage.setItem('filter_city', filtersHome[0][1]);
        }

        localStorage.setItem('filters_shop', JSON.stringify(filtersHome));
    }

    var validate_filtersHome_details = localStorage.getItem('filtersHome_details') || undefined; // conseguimos de localStorage filtersHome_details, sinó existe undefined
    // var validate_locationDetails = localStorage.getItem('location') || undefined; // conseguimos de localStorage location, sinó existe undefined
    var validate_filtersShop = localStorage.getItem('filters_shop') || undefined; // conseguimos de localStorage filters_shop, sinó existe undefined
    
    if (validate_filtersHome_details != undefined) {
        localStorage.removeItem('filtersHome_details'); // eliminamos de localStorage id_recomendation para no interferir en próximas busquedas
        console.log(validate_filtersHome_details);
        loadDetails(validate_filtersHome_details);
    // } else if (validate_locationDetails != undefined && validate_locationDetails != 'home' && validate_locationDetails != 'shop') {
    //     loadDetails(validate_locationDetails);
    } else if (validate_filtersShop != undefined) {
        var filtersShop = JSON.parse(validate_filtersShop); // deserializamos para convertir el string otra vez en un array
        console.log(filtersShop);
        ajaxForSearch('module/shop/controller/controller_shop.php?op=filters_shop', 'POST', 'JSON', { 'filters': filtersShop, 'limit': limit, 'offset': offset, 'token': accessToken });
    } else {
        ajaxForSearch('module/shop/controller/controller_shop.php?op=all_realestates', 'POST', 'JSON', { 'limit': limit, 'offset': offset, 'token': accessToken });
    }
}

function ajaxForSearch(url, type, dataType, sData=undefined) {
    // console.log(url, type, dataType, sData);
    // return;
    // die("<script>console.log('Hola ajaxForSearch');</script>");
    localStorage.setItem("location", "shop"); // guarda en localStorage localización
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
                );
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
                                <span id='${data[row].id_realestate}' class='listInfo_title toDetails'>${data[row].name_type} en ${data[row].name_city}</span>
                                <div id='${data[row].id_realestate}' class='listLike_container' like='${data[row].like}'>
                                    ${(data[row].like != 0 ?
                                    (`<img src='view/img/icons/like.png' id='${data[row].id_realestate}' class='listLike_icon'>
                                    <span class='list_countLikes'>${(data[row].like > 1 ? (`${data[row].like}`) : "")}</span>`) :
                                    (`<img src='view/img/icons/dislike.png' id='${data[row].id_realestate}' class='listLike_icon'>`))}
                                </div>
                            </div>
                            <div id='${data[row].id_realestate}' class='toDetails'>
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
                            </div>
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
        localStorage.setItem('count', 0);
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
                <div id='${data[row].id_realestate}' class='containerMap toDetails'>
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
    $(document).on("click", ".toDetails", function() {
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
            var total_pages = Math.ceil(localStorage.getItem('count') / 4);
            if (next <= total_pages){
                localStorage.setItem('page', next);
            }
        }
        loadAllRealestates();
    });

    // click like
    $(document).on("click", ".listLike_container", function() {
        var id_realestate = this.getAttribute('id');
        var count_like = this.getAttribute('like');
        likes(id_realestate, count_like, 'list');
    });
    $(document).on("click", ".detailsLike_container", function() {
        var id_realestate = this.getAttribute('id');
        var count_like = this.getAttribute('like');
        likes(id_realestate, count_like, 'details');
    });
}

function loadDetails(id_realestate) {
    localStorage.setItem("location", id_realestate); // guarda en localStorage localización
    var accessToken = localStorage.getItem('access_token') || null;
    ajaxPromise('module/shop/controller/controller_shop.php?op=details_realestate', 'POST', 'JSON', { 'id_re': id_realestate, 'token': accessToken })
    .then(function(data) {
        console.log(data);
        $('.section-detailsCarousel').empty(); // antes de iniciar borramos el contenedor de details
        $('.container_detailsRealestate').empty();
        $('.section-listRealestates').empty();
        $('#pagination_container').empty();
        setTimeout(function(){
            $('.section-filters').empty();
        }, 100);

        $('html, body').animate({ scrollTop: $('#details-carousel') });  // cuando carga posiciona el details al inicio

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
                <div class='detailsInfo_firstRow'>
                    <div class='detailsInfo_trading'>
                        <span class='detailsInfo_price'>${new Intl.NumberFormat("es-ES").format(data[0].price)} €&nbsp;&nbsp;|&nbsp;&nbsp;${data[0].name_op}</span>
                    </div>
                    <div id='${data[0].id_realestate}' class='detailsLike_container' like='${data[3].like}'>
                        ${(data[3].like != 0 ?
                        (`<img src='view/img/icons/like.png' class='detailsLike_icon'>
                        <span class='details_countLikes'>${(data[3].like > 1 ? (`${data[3].like}`) : "")}</span>`) :
                        (`<img src='view/img/icons/dislike.png' class='detailsLike_icon'>`))}
                    </div>
                    <div class='detailsInfo_backButton'>
                        <button class="btn btn-c back_btn" role="link" onclick="window.location='index.php?page=controller_shop&op=list'">Volver</button>
                    </div>
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
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_cat",function(){
        localStorage.setItem('filter_cat', this.value);
        applyFilters('shop');
    });
        
    $(".section-filters").on("change",".filter_type",function(){
        localStorage.setItem('filter_type', this.value);
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_type_all",function(){
        localStorage.setItem('filter_type', this.value);
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_op",function(){
        localStorage.setItem('filter_op', this.value);
        applyFilters('shop');
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
        applyFilters('shop');
    });

    $(".section-filters").on("click","#filterRooms_buttons",function(){
        localStorage.setItem('filter_rooms', this.value);
        applyFilters('shop');
    });

    $(".section-filters").on("click","#filterBathrooms_buttons",function(){
        localStorage.setItem('filter_bathrooms', this.value);
        applyFilters('shop');
    });

    // rango
    $(".section-filters").on("change",".filter_priceSince",function(){
        var filter_priceSince = [];
        filter_priceSince.push('price_since', this.value);
        localStorage.setItem('filter_priceSince', JSON.stringify(filter_priceSince));
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_priceTo",function(){
        var filter_priceTo = [];
        filter_priceTo.push('price_to', this.value);
        localStorage.setItem('filter_priceTo', JSON.stringify(filter_priceTo));
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_touristcat",function(){
        localStorage.setItem('filter_touristcat', this.value);
        applyFilters('shop');
    });

    $(".section-filters").on("change",".filter_order",function(){
        localStorage.setItem('filter_order', this.value);
        applyFilters('shop');
    });
}

function applyFilters(filters) {
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
        localStorage.setItem('last_search', JSON.stringify(filters_shop)); // Última busqueda para Carousel Last Search en el Home
        localStorage.setItem('page', 1);
    }
    
    if (filters == 'shop') {
        location.reload();
    }
}

function highlight() {
    if (localStorage.getItem('filters_shop')) {
        var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    }
    for (row1 in filters_shop) {
        if (filters_shop[row1][0] === 'name_city') {
            // filter all
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterCityAll_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterCityAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            // filter search
            $(".filterSearchCity_container input[type=text]").val(filters_shop[row1][1]) // la class es del div que contiene el input
                .css({
                    "background-color": "#f0f0f0",
                    "transition": "0.5s ease",
                });
            $('.filterSearchButton_container')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('#search_button') // colorea icono busqueda
                .css({
                    "filter": "none",
                });
        }

        if (filters_shop[row1][0] === 'name_cat') {
            // filter shop
            $('#cat_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2eca6a",
                    "transition": "0.5s ease",
                });
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
            // filter all
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterCatAll_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterCatAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'name_type') {
            // filter shop
            $('#type_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2eca6a",
                    "transition": "0.5s ease",
                });
            // filter shop y filter all 
            $("input[value='"+ filters_shop[row1][1] +"']").attr('checked', true);
        }

        if (filters_shop[row1][0] === 'name_op') {
            // filter all
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterOpAll_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterOpAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            // filter search
            $('.filterSearchOp_container select')
                .css({
                    "background-color": "#f0f0f0",
                    "transition": "0.5s ease",
                });
            $('.filterSearchOp_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                    "transition": "0.5s ease",
                });
            $('#search_button') // colorea icono busqueda
                .css({
                    "filter": "none",
                });
        }

        if (filters_shop[row1][0] === 'name_extras') {
            for (row2 in filters_shop[row1][1]) {
                // filter shop
                $('#extras_button')
                    .css({
                        "background-color": "#2eca6a17",
                        "color": "#2eca6a",
                        "transition": "0.5s ease",
                    });
                if (filters_shop[row1][1].length == 1) {
                    $('#extras_button').html(filters_shop[row1][1][row2]);
                } else {
                    $('#extras_button').html(`Extras (${filters_shop[row1][1].length})`);
                }
                // filter shop y filter all
                $("input[value='"+ filters_shop[row1][1][row2] +"']").attr('checked', true);
            }  
        }

        if (filters_shop[row1][0] === 'rooms') {
            // filter all
            $("#filter_rooms_cont input[value='"+ filters_shop[row1][1] +"']") // el id es del div que contiene los inputs
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2eca6a",
                });
        }

        if (filters_shop[row1][0] === 'bathrooms') {
            // filter all
            $("#filter_bathrooms_cont input[value='"+ filters_shop[row1][1] +"']") // el id es del div que contiene los inputs
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2eca6a",
                });
        }

        if (filters_shop[row1][0] === 'price') {
            // filter all
            $("#filter_priceSince_select option[value='"+ filters_shop[row1][1][1] +"']").attr('selected', true);
            $("#filter_priceTo_select option[value='"+ filters_shop[row1][2][1] +"']").attr('selected', true);
            $('.filterPriceSince_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterPriceSince_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            $('.filterPriceTo_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterPriceTo_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
        }

        if (filters_shop[row1][0] === 'name_touristcat') {
            // filter all
            $("option[value='"+ filters_shop[row1][1] +"']").attr('selected', true);
            $('.filterTouristcatAll_container select')
                .css({
                    "background-color": "#f0f0f0",
                });
            $('.filterTouristcatAll_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                });
            // filter search
            $('.filterSearchTouristcat_container select')
                .css({
                    "background-color": "#f0f0f0",
                    "transition": "0.5s ease",
                });
            $('.filterSearchTouristcat_container option')
                .css({
                    "background-color": "#fff",
                    "color": "#555555",
                    "transition": "0.5s ease",
                });
            $('#search_button') // colorea icono busqueda
                .css({
                    "filter": "none",
                });
        }

        if (filters_shop[row1][0] === 'order') {
            // filter shop
            $('#order_button')
                .html(filters_shop[row1][1])
                .css({
                    "background-color": "#2eca6a17",
                    "color": "#2eca6a",
                    "transition": "0.5s ease",
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
    applyFilters('shop');
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

            if (count_realEstates >= 4) {
                total_pages = Math.ceil(count_realEstates / 4)
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
                }).css({
                    "background-color": "#2eca6a",
                });
            }
            
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function realestates_related(data) {
    var id = data[0].id_realestate;
    var operation = data[0].name_op;
    var id_related = [id];
    
    ajaxPromise('module/shop/controller/controller_shop.php?op=count_realestates_related', 'POST', 'JSON', { 'id': id, 'operation': operation })
        .then(function(data) {
            console.log(data);

            var limit = 3;
            var offset = 0;

            if (data != 'error') {
                var countRelated = data.length; // número de inmuebles para el related
                var isFirstLoad = true; // detector de primera carga de relacionados
                // console.log(countRelated, isFirstLoad);
    
                // guardamos los ids de los inmuebles mostrados
                for (row in data) {
                    id_related.push(data[row].id_realestate);
                }
    
                if (countRelated >= 3) {
                    load_realestates_related(id, operation, limit, offset, countRelated, isFirstLoad);
                    countRelated = countRelated - 3;
                } else if (countRelated > 0) {
                    load_realestates_related(id, operation, limit, offset, countRelated, isFirstLoad);
    
                    // para completar una vista del related, hacemos un select descartando los ids ya mostrados
                    limit = 3 - countRelated;
                    isFirstLoad = false;
                    setTimeout(function(){
                        load_realestates_related(id_related.join(), operation=null, limit, offset, countRelated, isFirstLoad); // array.join() convierte array en string, se puede especificar separador array.join(";")
                    }, 50);
                    countRelated = countRelated - 3;
                }
                // console.log(countRelated);

                // click more related
                if (countRelated > 0) {
                    $(document).on("click", '.load_more_related', function() {
                        offset = offset + 3;
                        isFirstLoad = false;
                        // console.log(offset);
        
                        if (countRelated >= 3) {
                            load_realestates_related(id, operation, limit, offset, countRelated, isFirstLoad);
                            countRelated = countRelated - 3;
                        } else if (countRelated > 0) {
                            load_realestates_related(id, operation, limit, offset, countRelated, isFirstLoad);
                            
                            operation = null;
                            limit = 3 - countRelated;
                            offset = 0;
                            setTimeout(function(){
                                load_realestates_related(id_related.join(), operation, limit, offset, countRelated, isFirstLoad);
                            }, 50);
                            countRelated = countRelated - 3;
                            // console.log(countRelated, id_related, operation, limit, offset);
                        }
                    });
                }
            } else {
                load_realestates_related(id, operation=null, limit, offset, countRelated=0, isFirstLoad=true);
            }
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function load_realestates_related(id, operation, limit, offset, countRelated, isFirstLoad) {
    ajaxPromise('module/shop/controller/controller_shop.php?op=realestates_related', 'POST', 'JSON', { 'id': id, 'operation': operation, 'limit': limit, 'offset': offset })
        .then(function(data) {
            console.log(data);

            if (isFirstLoad) {
                $('<div></div>').attr('class', 'detailsRelated_contents').appendTo('.container_detailsRealestate')
                .html(`
                    <p class='detailsRelated_title'>Inmuebles que te pueden interesar...</p>
                    <div class='detailsRelated_realestates'></div>`
                )
            }
            
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

            // console.log(isFirstLoad, countRelated);
            if (isFirstLoad && countRelated > 3) {
                $('<div></div>').attr('class', 'load_more_related' ).appendTo('.detailsRelated_contents')
                    .html(
                        '<button class="btn btn-c more_related" >Ver mas...</button>'
                    )
            } else {
                $('.load_more_related').empty();
            }

        }).catch(function() {
            window.location.href='index.php?page=503';
        });
}

function likes(id_realestate, count_like, origin) {
    var accessToken = localStorage.getItem('access_token') || null;
    if (accessToken != null) {
        ajaxPromise('module/shop/controller/controller_shop.php?op=likes', 'POST', 'JSON', { 'id_re': id_realestate, 'token': accessToken, 'countLike': count_like })
            .then(function(data) {
                if (origin == 'list') {
                    console.log(data);
                    $(`#${id_realestate} .listLike_container`).attr('like', data.like); // actualiza contador de likes como atributo en el div
                    $(`#${id_realestate} .listLike_icon`).remove();
                    if (data.like != 0) {
                        $('<img>').attr('id', id_realestate).attr('class', 'listLike_icon').attr('src', 'view/img/icons/like.png').appendTo(`#${id_realestate} .listLike_container`);
                        if (data.like > 1) {
                            $('<span></span>').attr('class', 'list_countLikes').appendTo(`#${id_realestate} .listLike_container`).html(data.like);
                        }
                    } else {
                        $('<img>').attr('id', id_realestate).attr('class', 'listLike_icon').attr('src', 'view/img/icons/dislike.png').appendTo(`#${id_realestate} .listLike_container`);
                    }
                } else if (origin == 'details') {
                    console.log(data);
                    $('.detailsLike_container').attr('like', data.like);  // actualiza contador de likes como atributo en el div
                    $('.detailsLike_icon').remove();
                    if (data.like != 0) {
                        $('<img>').attr('class', 'detailsLike_icon').attr('src', 'view/img/icons/like.png').appendTo('.detailsLike_container');
                        if (data.like > 1) {
                            $('<span></span>').attr('class', 'details_countLikes').appendTo(`.detailsLike_container`).html(data.like);
                        }
                    } else {
                        $('<img>').attr('class', 'detailsLike_icon').attr('src', 'view/img/icons/dislike.png').appendTo('.detailsLike_container');
                    }
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    } else {
        window.location.href='index.php?page=controller_login&op=view';
    }

}

$(document).ready(function() {
    // console.log('Hola JS document ready');
    loadAllRealestates();
    setTimeout(function(){ 
        loadFilters();
    }, 20);
    saveFilters();
    clicks();
});