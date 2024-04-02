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

function load_touristCategory() {
    $('#filter_search_touristcat_select').empty();

    var op ="";
    if (localStorage.getItem('filter_op')) { // recupera del localstorage
        var op = localStorage.getItem('filter_op');
    }
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

function launch_search() {
    load_operation();
    setTimeout(function(){ 
        load_touristCategory();
    }, 10);
    
    $(".filterSearch_container").on("change", "#filter_search_op_select", function(){
        localStorage.removeItem('filter_op');
        localStorage.setItem('filter_op', this.value);
        load_touristCategory();
        $('#filter_search_city_auto').val('');
    });
    $(".filterSearch_container").on("change", "#filter_search_touristcat_select", function(){
        $('#filter_search_city_auto').val('');
    });
}

function autocomplete() {
    // $('#filter_search_op_select').on('click', function () {
    //     $('#filter_search_city_auto').empty();
    // });

    // ------------------------- evento click ------------------------- //
    $('#filter_search_city_auto').on('click', function () {
        var sdata = {"complete": "%", "op": null, "touristcat": null};

        if ($('#filter_search_op_select').val() != 'Transacción') {
            sdata.op = $('#filter_search_op_select').val();
            if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
                sdata.touristcat = $('#filter_search_touristcat_select').val();
            }
        } else if ($('#filter_search_touristcat_select').val() != 'Zona turística') {
            sdata.touristcat = $('#filter_search_touristcat_select').val();
        }

        console.log(sdata);

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
        $('#filter_search_city_auto').on('keyup', function () {
            var sdata = {"complete": $(this).val(), "op": null, "touristcat": null};
            
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
        applySearch();
    });
}

function applySearch() {
    var filters_search = [];

    if ($('#filter_search_op_select').val() != 'Transacción') {
        filters_search.push(['name_op', $('#filter_search_op_select').val()]);
    }
    if (($('#filter_search_touristcat_select').val() != 'Zona turística') && ($('#filter_search_touristcat_select').val() != null)) {
        filters_search.push(['name_touristcat', $('#filter_search_touristcat_select').val()]);
    } else {
        localStorage.removeItem('filter_touristcat');
    }
    if ($("#filter_search_city_auto").val()) {
        filters_search.push(['name_city', $("#filter_search_city_auto").val()]);
    } else {
        localStorage.removeItem('filter_city');
    }
    if ( ($('#filter_search_op_select').val() == 'Transacción') && ($('#filter_search_touristcat_select').val() == 'Zona turística') && (!$("#filter_search_city_auto").val()) ) {
        localStorage.removeItem('filters_search');
    }

    if (filters_search.length != 0) {
        localStorage.setItem('filters_search', JSON.stringify(filters_search));
    }

    localStorage.setItem('page', 1);
    window.location.href = 'index.php?page=controller_shop&op=list';      
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});