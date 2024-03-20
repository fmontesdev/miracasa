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

    if (localStorage.getItem('filter_op')) { // recupera del localstorage
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

    // $("#filter_search_touristcat_select").one("click", function () {
    //     if ($('#filter_search_op_select').val() == 'Transacción') {
            
    //         // op = $('#filter_search_op_select').val();
    //         localStorage.removeItem('filter_op');
    //         load_touristCategory();
    //     }
    // });

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
        // localStorage.removeItem('filters_shop');
        localStorage.removeItem('filter_city');
        // localStorage.removeItem('filter_cat');
        // localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_op');
        // localStorage.removeItem('filter_extras');
        // localStorage.removeItem('filter_rooms');
        // localStorage.removeItem('filter_bathrooms');
        // localStorage.removeItem('filter_priceSince');
        // localStorage.removeItem('filter_priceTo');
        localStorage.removeItem('filter_touristcat');
        // localStorage.removeItem('filter_order');
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

    // filtros shop
    if (localStorage.getItem('filter_cat')) {
        search.push(['name_cat', (localStorage.getItem('filter_cat'))]);
    }
    if (localStorage.getItem('filter_type')) {
        search.push(['name_type', (localStorage.getItem('filter_type'))]);
    }
    if (localStorage.getItem('filter_extras')) {
        var filter_extras = JSON.parse(localStorage.getItem('filter_extras'));
        console.log(filter_extras);
        if (filter_extras.length > 0) {
            search.push(['name_extras', filter_extras]);
        } else {
            localStorage.removeItem('filter_extras');
            localStorage.removeItem('filters_shop');
        }
    }
    if (localStorage.getItem('filter_rooms')) {
        search.push(['rooms', (localStorage.getItem('filter_rooms'))]);
    }
    if (localStorage.getItem('filter_bathrooms')) {
        search.push(['bathrooms', (localStorage.getItem('filter_bathrooms'))]);
    }
    if (localStorage.getItem('filter_priceSince')) {
        filter_priceSince = JSON.parse(localStorage.getItem('filter_priceSince'));
        if (localStorage.getItem('filter_priceTo')) {
            filter_priceTo = JSON.parse(localStorage.getItem('filter_priceTo'));
            search.push(['price', filter_priceSince, filter_priceTo]);
        } else {
            filter_priceTo.push('price_to', "100000000");
            search.push(['price', filter_priceSince, filter_priceTo]);
        }
    } 
    else  {
        if (localStorage.getItem('filter_priceTo')) {
            filter_priceSince.push('price_since', "0");
            filter_priceTo = JSON.parse(localStorage.getItem('filter_priceTo'));
            search.push(['price', filter_priceSince, filter_priceTo]);
        }
    }
    if (localStorage.getItem('filter_order')) {
        search.push(['order', (localStorage.getItem('filter_order'))]);
    }

    if (search.length != 0) {
        // localStorage.removeItem('filters_shop');
        // localStorage.removeItem('filter_cat');
        // localStorage.removeItem('filter_type');
        // localStorage.removeItem('filter_extras');
        // localStorage.removeItem('filter_rooms');
        // localStorage.removeItem('filter_bathrooms');
        // localStorage.removeItem('filter_priceSince');
        // localStorage.removeItem('filter_priceTo');
        // localStorage.removeItem('filter_order');
        localStorage.setItem('filters_shop', JSON.stringify(search));
    }

    window.location.href = 'index.php?page=controller_shop&op=list';      
}

function click_home() {
    $('.navbar-brand').on('click', function () {
        localStorage.setItem('page', 1);
        localStorage.removeItem('count');
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
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
    click_home();
});