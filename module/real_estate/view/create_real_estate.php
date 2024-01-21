<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">Añadir Inmueble</h1>
                        <span class="color-text-a">Crear una nueva entrada de Inmueble</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=controller_real_estate&op=crud">CRUD</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                            Añadir Inmuebles
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->
    
    <section class="container">
        <div class="row">
            <form autocomplete="on" method="post" class="form-as" id="create_real_estate" name="create_real_estate">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input type="text" id="id_cadastre" name="id_cadastre" class="form-control form-control-lg form-control-a" placeholder="Referencia Catastral" value=""/>
                        <span id="error_id_cadastre" class="error"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                        <input type="text" id="publication_date" name="publication_date" class="form-control form-control-lg form-control-a" placeholder="Fecha de Publicación" value=""/>
                        <span id="error_publication_date" class="error"></span>
                    </div>

                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <legend class="legend">Transacción</legend>
                            <label class="label"><input type="radio" id="trade" name="trade" class="radio" value="Compra"/>Compra</label>
                            <label class="label"><input type="radio" id="trade" name="trade" class="radio" value="Alquiler"/>Alquiler</label>
                        </fieldset>
                        <span id="error_trade" class="error"></span>
                    </div>
                
                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <legend class="legend">Tipo de inmueble</legend>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Vivienda"/>Vivienda</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Local"/>Local</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Garaje"/>Garaje</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Oficina"/>Oficina</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Trastero"/>Trastero</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" value="Terreno"/>Terreno</label>
                        </fieldset>
                        <span id="error_type" class="error"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                        <select id="province" name="province" class="form-control form-control-lg form-control-a">
                            <option value="" hidden selected>Provincia</option>
                            <option value="Albacete">Albacete</option>
                            <option value="Alicante">Alicante</option>
                            <option value="Almería">Almería</option>
                            <option value="Álava">Álava</option>
                            <option value="Asturias">Asturias</option>
                            <option value="Ávila">Ávila</option>
                            <option value="Balears, Illes">Balears, Illes</option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Bizkaia">Bizkaia</option>
                            <option value="Burgos">Burgos</option>
                            <option value="Cáceres">Cáceres</option>
                            <option value="Cádiz">Cádiz</option>
                            <option value="Cantabria">Cantabria</option>
                            <option value="Castellón">Castellón</option>
                            <option value="Ciudad Real">Ciudad Real</option>
                            <option value="Coruña, A">Coruña, A</option>
                            <option value="Cuenca">Cuenca</option>
                            <option value="Gipuzkoa">Gipuzkoa</option>
                            <option value="Girona">Girona</option>
                            <option value="Granada">Granada</option>
                            <option value="Guadalajara">Guadalajara</option>
                            <option value="Huelva">Huelva</option>
                            <option value="Huesca">Huesca</option>
                            <option value="Jaén">Jaén</option>
                            <option value="León">León</option>
                            <option value="Lleida">Lleida</option>
                            <option value="Lugo">Lugo</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Málaga">Málaga</option>
                            <option value="Murcia">Murcia</option>
                            <option value="Navarra">Navarra</option>
                            <option value="Ourense">Ourense</option>
                            <option value="Palencia">Palencia</option>
                            <option value="Palmas, Las">Palmas, Las</option>
                            <option value="Pontevedra">Pontevedra</option>
                            <option value="Rioja, La">Rioja, La</option>
                            <option value="Salamanca">Salamanca</option>
                            <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                            <option value="Segovia">Segovia</option>
                            <option value="Sevilla">Sevilla</option>
                            <option value="Soria">Soria</option>
                            <option value="Tarragona">Tarragona</option>
                            <option value="Teruel">Teruel</option>
                            <option value="Toledo">Toledo</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Valladolid">Valladolid</option>
                            <option value="Zamora">Zamora</option>
                            <option value="Zaragoza">Zaragoza</option>
                            <option value="Ceuta">Ceuta</option>
                            <option value="Melilla">Melilla</option>
                        </select>
                        <span id="error_province" class="error"></span>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <input type="text" id="town" name="town" class="form-control form-control-lg form-control-a" placeholder="Población" value=""/>
                        <span id="error_town" class="error"></span>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <input type="number" id="m2" name="m2" class="form-control form-control-lg form-control-a" placeholder="Superficie m2" value=""/>
                        <span id="error_m2" class="error"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                        <input type="number" id="price" name="price" class="form-control form-control-lg form-control-a" placeholder="Precio €" value=""/>
                        <span id="error_price" class="error"></span>
                    </div>
                    
                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <legend class="legend">Características</legend>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Ascensor"/>Ascensor</label>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Parking"/>Parking</label>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Terraza"/>Terraza</label>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Muebles"/>Muebles</label>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Electrodomésticos"/>Electrodomésticos</label>
                            <label class="label"><input type="checkbox" id="feature[]" name="feature[]" class="checkbox" value="Climatización"/>Climatización</label>
                        </fieldset>
                        <span id="error_feature" class="error"></span>
                    </div>
                    
                    <div class="col-md-12 mb-3">
                        <textarea cols="60" rows="4" id="description" name="description" class="form-control" placeholder="Descripción" value=""></textarea>
                        <span id="error_description" class="error"></span>
                    </div>
                    
                    <div class="buttons_container">
                        <div class="action_buttons">
                            <input name="Submit" type="button" class="btn btn-a action_btn" onclick="validate('create')" value="Añadir"/>
                            <input name="Reset" type="button" class="btn btn-a action_btn" onclick="resetear()" value="Reiniciar"/>
                        </div>
                        <div class="back_button">
                            <a class="btn btn-a back_btn" href="index.php?page=controller_real_estate&op=crud">Volver</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

</main>

<div id="preloader"></div>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="view/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="view/vendor/swiper/swiper-bundle.min.js"></script>
<script src="view/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="view/js/main.js"></script>