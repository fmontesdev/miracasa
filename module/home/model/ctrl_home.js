function carouselTypes() {
    //die("<script>console.log('Hola loadCategories');</script>");
    ajaxPromise('module/home/controller/controller_home.php?op=carouselType','GET', 'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_type).appendTo('#types-carousel .containerTypes')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_type}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    <a href='#'>${data[row].name_type}</a>
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
                delay: 2500,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            //slidesPerGroup: 3,
            //initialSlide: 2,
            pagination: {
                el: '.types-carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {slidesPerView: 1,},
                500: {slidesPerView: 2,},
                1000: {slidesPerView: 3,},
                1500: {slidesPerView: 4,}
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
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_cat).appendTo('#categories-carousel .containerCategories')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_cat}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    <a href='#'>${data[row].name_cat}</a>
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#categories-carousel', {
            speed: 500,
            loop: true,
            autoplay: {
                delay: 2500,
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
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_op).appendTo('#operations-carousel .containerOperations')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_op}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-1'>
                                    <a href='#'>${data[row].name_op}</a>
                                </span>
                            </div>
                        </div>
                    </div>`
                )     
        }

        new Swiper('#operations-carousel', {
            speed: 500,
            loop: true,
            autoplay: {
                delay: 2500,
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
            $('<div></div>').attr('class', 'carousel-item-c swiper-slide').attr('id', data[row].name_city).appendTo('#cities-carousel .containerCities')
                .html(`
                    <div class='card-box-b card-shadow news-box'>
                        <div class='img-box-b'>
                            <img src='${data[row].img_city}' alt='' class='img-b img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-header-e'>
                                <span class='title-3'>
                                    <a href='#'>${data[row].name_city}</a>
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
                delay: 1000,
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
            $('<div></div>').attr('class', 'carousel-item-b swiper-slide').attr('id', data[row].cadastre).appendTo('#recomendations-carousel .containerRecomendations')
                .html(`
                    <div class='card-box-a card-shadow'>
                        <div class='img-box-a'>
                            <img src='${data[row].img_realestate}' alt='' class='img-a img-fluid'>
                        </div>
                        <div class='card-overlay'>
                            <div class='card-overlay-a-content'>
                                <div class='card-header-a'>
                                    <h2 class='card-title-a'>
                                        <a href='#'><span class='color-b'>${data[row].name_type}</span> en ${data[row].name_city}</a>
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

$(document).ready(function() {
    //$data = 'hola JS function';
    //die("<script>console.log('.json_encode( $data ).');</script>");
    carouselTypes();
    carouselCategories();
    carouselOperations();
    carouselCities();
    carouselRecomendations();
});