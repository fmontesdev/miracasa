<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">Modificar Inmueble</h1>
                        <span class="color-text-a">Modificar una entrada de Inmueble</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=controller_real_estate&op=crud">CRUD</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                            Modificar Inmuebles
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->

    <section class="container">    
        <div class="row">
            <form autocomplete="on" method="post" class="form-as" id="update_real_estate" name="update_real_estate">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <input type="text" id="id_cadastre" name="id_cadastre" class="form-control form-control-lg form-control-a" placeholder="Referencia Catastral" value="<?php echo $real_estate['id_cadastre']; ?>" />
                        <span id="error_id_cadastre" class="error"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                        <input type="text" id="publication_date" name="publication_date" class="form-control form-control-lg form-control-a" placeholder="Fecha de Publicación" value="<?php echo $real_estate['publication_date']; ?>" />
                        <span id="error_publication_date" class="error"></span>
                    </div>

                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <label class="label"><input type="radio" id="trade" name="trade" class="radio" <?php if (isset($real_estate['trade']) && $real_estate['trade']=="Compra") echo "checked"; ?> value="Compra"/>Compra</label>
                            <label class="label"><input type="radio" id="trade" name="trade" class="radio" <?php if (isset($real_estate['trade']) && $real_estate['trade']=="Alquiler") echo "checked"; ?> value="Alquiler"/>Alquiler</label>
                            <legend class="legend">Transacción</legend>
                        </fieldset>
                        <span id="error_trade" class="error"></span>
                    </div>
                    
                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Vivienda") echo "checked"; ?> value="Vivienda"/>Vivienda</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Local") echo "checked"; ?> value="Local"/>Local</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Garaje") echo "checked"; ?> value="Garaje"/>Garaje</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Oficina") echo "checked"; ?> value="Oficina"/>Oficina</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Trastero") echo "checked"; ?> value="Trastero"/>Trastero</label>
                            <label class="label"><input type="radio" id="type" name="type" class="radio" <?php if (isset($real_estate['type']) && $real_estate['type']=="Terreno") echo "checked"; ?> value="Terreno"/>Terreno</label>
                            <legend class="legend">Tipo de inmueble</legend>
                        </fieldset>
                        <span id="error_type" class="error"></span>
                    </div>

                    <div class="col-md-6 mb-3">
                        <select id="province" name="province" class="form-control form-control-lg form-control-a">
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Albacete") echo "selected"; ?> value="Albacete">Albacete</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Alicante") echo "selected"; ?> value="Alicante">Alicante</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Almería") echo "selected"; ?> value="Almería">Almería</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Álava") echo "selected"; ?> value="Álava">Álava</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Asturias") echo "selected"; ?> value="Asturias">Asturias</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Ávila") echo "selected"; ?> value="Ávila">Ávila</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Balears, Illes") echo "selected"; ?> value="Balears, Illes">Balears, Illes</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Barcelona") echo "selected"; ?> value="Barcelona">Barcelona</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Bizkaia") echo "selected"; ?> value="Bizkaia">Bizkaia</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Burgos") echo "selected"; ?> value="Burgos">Burgos</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Cáceres") echo "selected"; ?> value="Cáceres">Cáceres</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Cádiz") echo "selected"; ?> value="Cádiz">Cádiz</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Cantabria") echo "selected"; ?> value="Cantabria">Cantabria</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Castellón") echo "selected"; ?> value="Castellón">Castellón</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Ciudad Real") echo "selected"; ?> value="Ciudad Real">Ciudad Real</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Coruña, A") echo "selected"; ?> value="Coruña, A">Coruña, A</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Cuenca") echo "selected"; ?> value="Cuenca">Cuenca</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Gipuzkoa") echo "selected"; ?> value="Gipuzkoa">Gipuzkoa</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Girona") echo "selected"; ?> value="Girona">Girona</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Granada") echo "selected"; ?> value="Granada">Granada</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Guadalajara") echo "selected"; ?> value="Guadalajara">Guadalajara</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Huelva") echo "selected"; ?> value="Huelva">Huelva</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Huesca") echo "selected"; ?> value="Huesca">Huesca</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Jaén") echo "selected"; ?> value="Jaén">Jaén</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="León") echo "selected"; ?> value="León">León</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Lleida") echo "selected"; ?> value="Lleida">Lleida</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Lugo") echo "selected"; ?> value="Lugo">Lugo</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Madrid") echo "selected"; ?> value="Madrid">Madrid</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Málaga") echo "selected"; ?> value="Málaga">Málaga</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Murcia") echo "selected"; ?> value="Murcia">Murcia</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Navarra") echo "selected"; ?> value="Navarra">Navarra</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Ourense") echo "selected"; ?> value="Ourense">Ourense</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Palencia") echo "selected"; ?> value="Palencia">Palencia</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Palmas, Las") echo "selected"; ?> value="Palmas, Las">Palmas, Las</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Pontevedra") echo "selected"; ?> value="Pontevedra">Pontevedra</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Rioja, La") echo "selected"; ?> value="Rioja, La">Rioja, La</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Salamanca") echo "selected"; ?> value="Salamanca">Salamanca</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Santa Cruz de Tenerife") echo "selected"; ?> value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Segovia") echo "selected"; ?> value="Segovia">Segovia</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Sevilla") echo "selected"; ?> value="Sevilla">Sevilla</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Soria") echo "selected"; ?> value="Soria">Soria</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Tarragona") echo "selected"; ?> value="Tarragona">Tarragona</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Teruel") echo "selected"; ?> value="Teruel">Teruel</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Toledo") echo "selected"; ?> value="Toledo">Toledo</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Valencia") echo "selected"; ?> value="Valencia">Valencia</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Valladolid") echo "selected"; ?> value="Valladolid">Valladolid</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Zamora") echo "selected"; ?> value="Zamora">Zamora</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Zaragoza") echo "selected"; ?> value="Zaragoza">Zaragoza</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Ceuta") echo "selected"; ?> value="Ceuta">Ceuta</option>
                            <option <?php if (isset($real_estate['province']) && $real_estate['province']=="Melilla") echo "selected"; ?> value="Melilla">Melilla</option>
                        </select>
                        <span id="error_province" class="error"></span>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <input type="text" id="town" name="town" class="form-control form-control-lg form-control-a" placeholder="Población" value="<?php echo $real_estate['town']; ?>" />
                        <span id="error_town" class="error"></span>
                    </div>
                        
                    <div class="col-md-6 mb-3">
                        <input type="number" id="m2" name="m2" placeholder="Superficie m2" class="form-control form-control-lg form-control-a" value="<?php echo $real_estate['m2']; ?>" />
                        <span id="error_m2" class="error"></span>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                        <input type="number" id="price" name="price" class="form-control form-control-lg form-control-a" placeholder="Precio €" value="<?php echo $real_estate['price']; ?>" />
                        <span id="error_price" class="error"></span>
                    </div>

                    <div class="col-md-12 mb-3">
                        <fieldset class="fieldset">
                            <?php
                                $feature=explode(":", $real_estate['feature']);
                            ?>
                            <?php
                                $busca_array=in_array("Ascensor", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Ascensor" checked/>Ascensor</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Ascensor"/>Ascensor</label>
                            <?php
                                }
                            ?>

                            <?php
                                $busca_array=in_array("Parking", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Parking" checked/>Parking</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Parking"/>Parking</label>
                            <?php
                                }
                            ?>
        
                            <?php
                                $busca_array=in_array("Terraza", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Terraza" checked/>Terraza</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Terraza"/>Terraza</label>
                            <?php
                                }
                            ?>
                        
                            <?php
                                $busca_array=in_array("Muebles", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Muebles" checked/>Muebles</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Muebles"/>Muebles</label>
                            <?php
                                }
                            ?>
                            
                            <?php
                                $busca_array=in_array("Electrodomésticos", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Electrodomésticos" checked/>Electrodomésticos</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Electrodomésticos"/>Electrodomésticos</label>
                            <?php
                                }
                            ?>

                            <?php
                                $busca_array=in_array("Climatización", $feature);
                                if($busca_array){
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Climatización" checked/>Climatización</label>
                            <?php
                                }else{
                            ?>
                                <label class="label"><input type="checkbox" id= "feature[]" name="feature[]" class="checkbox" value="Climatización"/>Climatización</label>
                            <?php
                                }
                            ?>
                            <legend class="legend">Características</legend>
                        </fieldset>
                        <span id="error_feature" class="error"></span>
                    </div>
                    
                    <div class="col-md-12 mb-3">
                        <textarea cols="60" rows="4" id="description" name="description" class="form-control" placeholder="Descripción"><?php echo $real_estate['description']; ?></textarea>
                        <span id="error_description" class="error"></span>
                    </div>
                    
                    <div class="buttons_container">
                        <div class="action_buttons">
                            <input type="hidden" name="id" value=<?php echo $_GET['id'];?>> <!-- con el input hiden pasamos el id -->
                            <input name="Submit" type="button" class="btn btn-a action_btn" onclick="validate('update')" value="Modificar"/>
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