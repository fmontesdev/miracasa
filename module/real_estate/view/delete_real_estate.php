<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">Eliminar Inmueble</h1>
                        <span class="color-text-a">¿Estás seguro que quieres eliminar este Inmueble?</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=controller_real_estate&op=crud">CRUD</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Eliminar Inmuebles
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->

    <section class="">
        <div class="container">
            <form autocomplete="on" method="post" name="delete_real_estate" id="delete_real_estate">
                <input type="hidden" id="id" name="id" placeholder="id" value="<?php echo $real_estate['id']; ?>"/>
                
                <div class="del_container">
                    <div class="del_img">
                        <img src="view/img/eliminar.png" style="height:52px">
                    </div>

                    <div class="del_content_1">
                        <div class="del_cadastre">
                            <span class="del_term">
                                Ref. Catastral:&nbsp;
                            </span>
                            <span class="del_desc">
                                <?php echo $real_estate['id_cadastre']; ?>
                            </span>
                        </div>
                        
                        <div class="del_title">
                            <?php
                                if ($real_estate['trade']=="Compra") {
                                    $trade="venta";
                                } else {
                                    $trade="alquiler";
                                }
                                echo $real_estate['type']." en ".$trade." en ".$real_estate['town'];
                            ?>
                        </div>
                    </div>
                    
                    <div class="del_content_2">
                        <div class="del_m2">
                            <span class="del_term">
                                Superficie:&nbsp;
                            </span>
                            <span class="del_desc">
                                <?php echo $real_estate['m2']." m<sup>2</sup>" ?>
                            </span>
                        </div>
                        
                        <div class="del_province">
                            <span class="del_term">
                                Provincia:&nbsp;
                            </span>
                            <span class="del_desc">
                                <?php echo $real_estate['province']; ?>
                            </span>
                        </div>
                    </div>

                    <div class="del_content_3">
                        <div class="del_trade">
                            <span class="del_desc">
                                <?php echo $real_estate['trade']; ?>
                            </span>
                        </div>
                        
                        <div class="del_price">
                            <?php
                                echo number_format($real_estate['price'],0,",",".")." €";
                            ?>
                        </div>
                    </div>
                </div>

                <div class="ok_cancel_buttons">
                    <input name="Submit" type="button" class="btn btn-a ok_cancel_btn" onclick="operations_real_estate('delete')" value="Aceptar"/>
                    <a class="btn btn-a ok_cancel_btn" href="index.php?page=controller_real_estate&op=crud">Cancelar</a>
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
                