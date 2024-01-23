function validate_id_cadastre(texto){
    if (texto.length > 0){
        var reg=/^[A-Z0-9]{20}$/;
        return reg.test(texto);
    }
    return false;
}

function validate_trade(texto){
    var i;
    var check=false;
    for(i=0; i<texto.length; i++){
        if(texto[i].checked){
            check=true;
        }
    }
    return check;
}

function validate_type(texto){
    var i;
    var check=false;
    for(i=0; i<texto.length; i++){
        if(texto[i].checked){
            check=true;
        }
    }
    return check;
}

function validate_m2(texto){
    if (texto.length > 0){
        var reg=/^[1-9][0-9]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_feature(array){
    var i;
    var check=false;
    for(i=0; i<array.length; i++){
        if(array[i].checked){
            check=true;
        }
    }
    return check;
}

function validate_province(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

function validate_town(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

function validate_price(texto){
    if (texto.length > 0){
        var reg=/^[1-9][0-9]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_publication_date(texto){
    if (texto.length > 0){
        var reg=/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
        return reg.test(texto);
    }
    return false;
}

function validate_description(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

function validate(op){
    // console.log('hola validate js');
    // return false;

    var check=true;
    
    var v_id_cadastre=document.getElementById('id_cadastre').value;
    //console.log(v_id_cadastre);
    //return false;
    var v_trade=document.getElementsByName('trade');
    var v_type=document.getElementsByName('type');
    //console.log(v_type);
    //return false;
    var v_m2=document.getElementById('m2').value;
    var v_feature=document.getElementsByName('feature[]');
    //console.log(v_feature);
    //return false;
    var v_province=document.getElementById('province').value;
    var v_town=document.getElementById('town').value;
    var v_price=document.getElementById('price').value;
    var v_publication_date=document.getElementById('publication_date').value;
    var v_description=document.getElementById('description').value;
    
    var r_id_cadastre=validate_id_cadastre(v_id_cadastre);
    // console.log(r_id_cadastre);
    // return false;
    var r_trade=validate_trade(v_trade);
    var r_type=validate_type(v_type);
    var r_m2=validate_m2(v_m2);
    var r_feature=validate_feature(v_feature);
    var r_province=validate_province(v_province);
    var r_town=validate_town(v_town);
    var r_price=validate_price(v_price);
    var r_publication_date=validate_publication_date(v_publication_date);
    var r_description=validate_description(v_description);
    
    if(!r_id_cadastre){
        document.getElementById('error_id_cadastre').innerHTML = "&nbsp; Introduce la Ref. Catastral formada por 20 caracteres alfanuméricos";
        // console.log(r_id_cadastre);
        // return false;
        check=false;
    }else{
        document.getElementById('error_id_cadastre').innerHTML = "";
    }
    
    if(!r_trade){
        document.getElementById('error_trade').innerHTML = "&nbsp; No has seleccionado ninguna Transacción";
        check=false;
    }else{
        document.getElementById('error_trade').innerHTML = "";
    }

    if(!r_type){
        document.getElementById('error_type').innerHTML = "&nbsp; No has seleccionado ningún Tipo de Inmueble";
        check=false;
    }else{
        document.getElementById('error_type').innerHTML = "";
    }
    
    if(!r_m2){
        document.getElementById('error_m2').innerHTML = "&nbsp; Introduce la Superficie en m2 compuesta solo por números enteros";
        check=false;
    }else{
        document.getElementById('error_m2').innerHTML = "";
    }
    
    if(!r_feature){
        document.getElementById('error_feature').innerHTML = "&nbsp; No has seleccionado ninguna Característica";
        check=false;
    }else{
        document.getElementById('error_feature').innerHTML = "";
    }
    
    if(!r_province){
        document.getElementById('error_province').innerHTML = "&nbsp; No has seleccionado ninguna Provincia";
        check=false;
    }else{
        document.getElementById('error_province').innerHTML = "";
    }
   
    if(!r_town){
        document.getElementById('error_town').innerHTML = "&nbsp; No has introducido ninguna Población";
        check=false;
    }else{
        document.getElementById('error_town').innerHTML = "";
    }
    
    if(!r_price){
        document.getElementById('error_price').innerHTML = "&nbsp; Introduce el Precio en € compuesto solo por números enteros";
        check=false;
    }else{
        document.getElementById('error_price').innerHTML = "";
    }
    
    if(!r_publication_date){
        document.getElementById('error_publication_date').innerHTML = "&nbsp; Introduce la Fecha de Publicación con el formato dd-mm-aaaa";
        check=false;
    }else{
        document.getElementById('error_publication_date').innerHTML = "";
    }

    if(!r_description){
        document.getElementById('error_description').innerHTML = "&nbsp; No has introducido ninguna Descripción";
        check=false;
    }else{
        document.getElementById('error_description').innerHTML = "";
    }
    //return check;

    if (check){
        if (op == 'create'){
            document.getElementById('create_real_estate').submit();
            document.getElementById('create_real_estate').action = "index.php?page=controller_real_estate&op=create";
        }
        if (op == 'update'){
            document.getElementById('update_real_estate').submit();
            document.getElementById('update_real_estate').action = "index.php?page=controller_real_estate&op=update";
        }
    }
}

function operations_real_estate(op){
    if (op == 'delete'){
        document.getElementById('delete_real_estate').submit();
        document.getElementById('delete_real_estate').action = "index.php?page=controller_real_estate&op=delete";
    }
    if (op == 'delete_all'){
        document.getElementById('delete_all_real_estate').submit();
        document.getElementById('delete_all_real_estate').action = "index.php?page=controller_real_estate&op=delete_all";
    }
    if (op == 'dummies'){
        document.getElementById('dummies_real_estate').submit();
        document.getElementById('dummies_real_estate').action = "index.php?page=controller_real_estate&op=dummies";
    }
}

function showModal(title_real_estate, id) {
    $("#read_container").show();
    $("#real_estate_modal").dialog({
        title: title_real_estate,
        width : 1000,
        height: 560,
        resizable: "false",
        modal: "true", // si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante)
        show: {
            effect: "blind",
            duration: 250
        },
        hide: {
            effect: "blind",
            duration: 250
        },
        buttons : {
            Volver: function () {
                $(this).dialog("close");
            },
            /*
            Update: function() {
                window.location.href = 'index.php?page=controller_real_estate&op=update&id=' + id;  
            },
            Delete: function() {
                window.location.href = 'index.php?page=controller_real_estate&op=delete&id=' + id;
            }
            */
        }
    });
}

function loadContentModal() {
    $('.real_estate').click(function () {
        var id = this.getAttribute('id');
        //alert(id);
        ajaxPromise('module/real_estate/controller/controller_real_estate.php?op=read_modal&id_modal=' + id, 'GET', 'JSON',)
        .then(function(data) {
            //console.log(data);
            $('<div></div>').attr('id', 'read_container', 'type', 'hidden').appendTo('#real_estate_modal');
            $('#read_container').empty();
            $('<div></div>').attr('id', 'read_price').appendTo('#read_container');
            $('#read_price').html(function() {
                var content = "";
                content += new Intl.NumberFormat("es-ES").format(data.price) + ' €';
                return content;
            });
            $('<div></div>').attr('id', 'read_m2').appendTo('#read_container');
            $('#read_m2').html(function() {
                var content = "";
                content += '<img class="read_img" src="view/img/superficie.png" style="width:40px">' +
                '<span class="read_img_txt">' + '<span class="term_desc">Superficie<br></span>' + data.m2 + ' m<sup>2</sup>' + '</span>';
                return content;
            });
            $('<div></div>').attr('id', 'read_province').appendTo('#read_container');
            $('#read_province').html(function() {
                var content = "";
                content += '<span class="term_desc">Provincia</span>' + data.province;
                return content;
            });
            $('<div></div>').attr('id', 'read_cadastre').appendTo('#read_container');
            $('#read_cadastre').html(function() {
                var content = "";
                content += '<span class="term_desc">Referencia catastral</span>' + data.id_cadastre;
                return content;
            });
            $('<div></div>').attr('id', 'read_description').appendTo('#read_container');
            $('#read_description').html(function() {
                var content = "";
                content += '<p>' + data.description + '</p>';
                return content;
            });
            $('<div></div>').attr('id', 'read_features').appendTo('#read_container');
            $('<div></div>').attr('id', 'features_title').appendTo('#read_features');
            $('#features_title').html(function() {
                var content = "";
                content += 'Características';
                return content;
            });
            $('<div></div>').attr('id', 'features_container_logos').appendTo('#read_features');

            var features = data.feature.split(':'); // divide un string en varios strings - genera un último string vacio por el último separador
            features.pop(); // extrae el último elemento del array
            var size_features = features.length; // tamaño de un array       
            for (var i=0; i<size_features; i++) {
                $('<div></div>').attr('id', 'features_logos_'+i).appendTo('#features_container_logos');
                $('#features_logos_'+i).html(function() {
                    var content = "";
                    content +=
                    '<img class="features_img" src="view/img/' + features[i] + '.png" style="width:40px">' +
                    '<span class="features_txt">' + features[i] + '</span>';
                    return content;
                }); 
            }

            $('<div></div>').attr('id', 'read_date').appendTo('#read_container');
            $('#read_date').html(function() {
                var content = "";
                content += '<span class="term_desc">Fecha de publicación:&nbsp;&nbsp;</span>' + data.publication_date;
                return content;
            });

            /*
            $('<div></div>').attr('id', 'real_estate_content').appendTo('#read_container');
            $('#real_estate_content').empty();
            $('#real_estate_content').html(function() {
                var content = "";
                for (row in data) {
                    content += '<br><span>' + row + ': <span id =' + row + '>' + data[row] + '</span></span>';
                }
                return content;
            });
            */

            var trade = "";
            if (data.trade == 'Compra') {
                trade = 'venta';
            } else {
                trade = 'alquiler';
            }

            showModal(title_real_estate = data.type + ' en ' + trade + ' en ' + data.town, data.id);
        })
        .catch(function() {
            window.location.href='index.php?page=503';
        });
    });
 }

 $(document).ready(function() {
    loadContentModal();
});