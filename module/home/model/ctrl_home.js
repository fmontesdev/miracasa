function carouselTouristcat() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselTouristcat','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (row in data) {
            $('<div></div>').attr('class', 'touristcatSlide carousel-item-c swiper-slide').attr('id', data[row].id_touristcat).appendTo('#touristcat-carousel .containerTouristcat')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_touristcat}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e touristcat_map_overlay_cont'>
                                <div class='full_width'>
                                    <img src='${data[row].map_touristcat}' alt='' class='touristcat_map'>
                                </div>
                                <div class='full_width'>
                                    <span class='title-1'>
                                    ${data[row].name_touristcat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#touristcat-carousel', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            //slidesPerGroup: 2,
            //initialSlide: 2,
            pagination: {
                el: '.touristcat-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {slidesPerView: 1,},
                500: {slidesPerView: 2,},
                1000: {slidesPerView: 3,},
                1500: {slidesPerView: 4,},
                2000: {slidesPerView: 5,},
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselTypes() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselType','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'typeSlide carousel-item-c swiper-slide').attr('id', data[row].id_type).appendTo('#types-carousel .containerTypes')
                .html(`
                    <div class='card-box-b card-shadow news-box border_radius'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_type}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    ${data[row].name_type}
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#types-carousel', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            //slidesPerGroup: 2,
            //initialSlide: 2,
            pagination: {
                el: '.types-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
            
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 18
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselCategories() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselCategory','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'categorySlide carousel-item-c swiper-slide').attr('id', data[row].id_cat).appendTo('#categories-carousel .containerCategories')
                .html(`
                    <div class='card-box-b card-shadow news-box border_radius'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_cat}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    ${data[row].name_cat}
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#categories-carousel', {
            speed: 600,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.categories-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
            
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 18
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselOperations() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselOperation','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'operationSlide carousel-item-c swiper-slide').attr('id', data[row].id_op).appendTo('#operations-carousel .containerOperations')
                .html(`
                    <div class='card-box-b card-shadow news-box border_radius'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_op}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    ${data[row].name_op}
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#operations-carousel', {
            speed: 600,
            loop: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.operations-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
        
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 18
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselCities() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselCity','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'citySlide carousel-item-c swiper-slide').attr('id', data[row].id_city).appendTo('#cities-carousel .containerCities')
                .html(`
                    <div class='card-box-b card-shadow news-box border_radius'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_city}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-3'>
                                    ${data[row].name_city}
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#cities-carousel', {
            speed: 500,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.cities-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    spaceBetween: 14
                },
        
                1200: {
                    slidesPerView: 6,
                    spaceBetween: 14
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselRecomendations() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselRecomendations','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'recomendationSlide carousel-item-b swiper-slide').attr('id', data[row].id_realestate).appendTo('#recomendations-carousel .containerRecomendations')
                .html(`
                    <div class='card-box-a card-shadow border_radius'>
                        <div class='img-box-a'>
                            <img src='${data[row].img_realestate}' alt='' class='img-a img-fluid'>
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
                        </div>
                    </div>`
                )     
        }

        new Swiper('#recomendations-carousel', {
            speed: 500,
            loop: false,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.recomendations-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 18
                },
            
                768: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
            
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 18
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselMostvisited() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselMostvisited','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'mostvisitedSlide carousel-item-b swiper-slide').attr('id', data[row].id_realestate).appendTo('#mostvisited-carousel .containerMostvisited')
                .html(`
                    <div class='card-box-a card-shadow border_radius'>
                        <div class='img-box-a'>
                            <img src='${data[row].img_realestate}' alt='' class='img-a img-fluid'>
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
                        </div>
                    </div>`
                )     
        }

        new Swiper('#mostvisited-carousel', {
            speed: 500,
            loop: false,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.mostvisited-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 18
                },
            
                768: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
            
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 18
                }
            }
        });
    }).catch(function() {
        window.location.href='index.php?page=503';
    });
}

function carouselLastsearch() {
    var validate_filtersShop = localStorage.getItem('filters_shop') || undefined;

    if (validate_filtersShop != undefined) {
        var filtersShop = JSON.parse(validate_filtersShop);
        console.log(filtersShop);
    
        ajaxPromise('module/home/controller/controller_home.php?op=carouselLastsearch', 'POST', 'JSON', { 'filters': filtersShop })
        .then(function(data) {
            for (row in data) {
                console.log(data);
                // return;

                $('<div></div>').attr('class', 'lastsearchSlide carousel-item-b swiper-slide').attr('id', data[row].id_realestate).appendTo('#lastsearch-carousel .containerLastsearch')
                    .html(`
                        <div class='card-box-a card-shadow border_radius'>
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
                            </div>
                        </div>`
                    )     
            }

            new Swiper('#lastsearch-carousel', {
                speed: 500,
                loop: false,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                slidesPerView: 'auto',
                pagination: {
                    el: '.lastsearch-carousel-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 18
                    },
                
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 18
                    },
                
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 18
                    }
                }
            });
        }).catch(function() {
            window.location.href='index.php?page=503';
        });
    }
}

function clicks(){
    $(document).on("click",'div.touristcatSlide', function (){
        var filters_home = []; // creamos array donde capturaremos todos los clicks del home
        filters_home.push({"touristcat":[this.getAttribute('id')]}); // introducimos en la primera posición del array el id del div que indicamos (id_type)
        localStorage.removeItem('filters_home') // borramos el contenido previo de localStorage
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); // seteamos localStorge serializando el array filters_home con JSON (pasamos de un array a un string)
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list'; // cargaremos crtl_shop.js a través del controller_shop.php al darnos acceso a shop.html 
            }, 500);  
    });

    $(document).on("click",'div.typeSlide', function (){
        var filters_home = []; // creamos array donde capturaremos todos los clicks del home
        filters_home.push({"type":[this.getAttribute('id')]}); // introducimos en la primera posición del array el id del div que indicamos (id_type)
        localStorage.removeItem('filters_home') // borramos el contenido previo de localStorage
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); // seteamos localStorge serializando el array filters_home con JSON (pasamos de un array a un string)
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list'; // cargaremos crtl_shop.js a través del controller_shop.php al darnos acceso a shop.html 
            }, 500);  
    });

    $(document).on("click",'div.categorySlide', function (){
        var filters_home = [];
        filters_home.push({"category":[this.getAttribute('id')]});
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500);  
    });

    $(document).on("click",'div.operationSlide', function (){
        var filters_home = [];
        filters_home.push({"operation":[this.getAttribute('id')]});
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
          setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
          }, 500);  
      });

    $(document).on("click",'div.citySlide', function (){
        var filters_home = [];
        filters_home.push({"city":[this.getAttribute('id')]});
        localStorage.removeItem('filters_home');
        localStorage.setItem('filters_home', JSON.stringify(filters_home)); 
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500);
    });

    $(document).on("click",'div.recomendationSlide', function (){
        var filtersHome_details = [];
        filtersHome_details.push({"details":[this.getAttribute('id')]});
        localStorage.removeItem('filtersHome_details');
        localStorage.setItem('filtersHome_details', JSON.stringify(filtersHome_details)); 
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500);
    });

    $(document).on("click",'div.mostvisitedSlide', function (){
        var filtersHome_details = [];
        filtersHome_details.push({"details":[this.getAttribute('id')]});
        localStorage.removeItem('filtersHome_details');
        localStorage.setItem('filtersHome_details', JSON.stringify(filtersHome_details)); 
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500);
    });

    $(document).on("click",'div.lastsearchSlide', function (){
        var filtersHome_details = [];
        filtersHome_details.push({"details":[this.getAttribute('id')]});
        localStorage.removeItem('filtersHome_details');
        localStorage.setItem('filtersHome_details', JSON.stringify(filtersHome_details)); 
            setTimeout(function(){ 
            window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500);
    });
} 

$(document).ready(function() {
    //$data = 'hola JS function';
    //die("<script>console.log('.json_encode( $data ).');</script>");
    carouselTouristcat()
    carouselTypes();
    carouselCategories();
    carouselOperations();
    carouselCities();
    carouselRecomendations();
    carouselMostvisited();
    carouselLastsearch();
    clicks();
});