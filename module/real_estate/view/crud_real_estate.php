<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">CRUD</h1>
                        <span class="color-text-a">Administración</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=homepage">Inicio</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                CRUD
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->

    <!-- ======= Buttons Create Dummies DeleteAll ======= -->
    <section class="">
        <div class="container">
            <div class="crud_header_buttons">
                <button class="btn btn-a crud_header_btn" onclick="document.location='index.php?page=controller_real_estate&op=create'">
                    <span class="list_header_create">Create</span>
                </button>
                <button class="btn btn-a crud_header_btn" onclick="document.location='index.php?page=controller_real_estate&op=dummies'">
                    <span class="list_header_dummies">Dummies</span>
                </button>
                <button class="btn btn-a crud_header_btn" onclick="document.location='index.php?page=controller_real_estate&op=delete_all'">
                    <span class="list_header_del_all">Delete All</span>
                </button>
            </div>
        </div>
    </section>

    <!-- ======= List ======= -->
    <section class="container">
        <div class="row">
            <?php
                if ($rdo->num_rows === 0) {
            ?>        
                <div class="">
                    <h4>No hay ningún inmueble</h4>
                </div>
            <?php    
                } else {
            ?>
                <?php 
                    foreach ($rdo as $row) {
                ?>
                    <div class="crud_container">
                        <div class="crud_cont_1">
                            <div class="crud_cadastre">
                                <span class="crud_term">
                                    Referencia catastral:&nbsp;
                                </span>
                                <span class="crud_desc">
                                    <?php echo $row['id_cadastre']; ?>
                                </span>
                            </div>

                            <div class="crud_title">
                                <?php
                                    if ($row['trade']=="Compra") {
                                        $trade="venta";
                                    } else {
                                        $trade="alquiler";
                                    }
                                    echo $row['type']." en ".$trade." en ".$row['town'];
                                ?>
                            </div>
                        </div>

                        <div class="crud_cont_2">
                            <div class="crud_trade">
                                <span class="crud_desc">
                                    <?php echo $row['trade']; ?>
                                </span>
                            </div>

                            <div class="crud_price">
                                <?php
                                    echo number_format($row['price'],0,",",".")." €";
                                ?>
                            </div>
                        </div>

                        <div class="crud_cont_3">
                            <div class="crud_province">
                                <span class="crud_term">
                                    Provincia:&nbsp;
                                </span>
                                <span class="crud_desc">
                                    <?php echo $row['province']; ?>
                                </span>
                            </div>

                            <div class="crud_m2">
                                <span class="crud_term">
                                    Superficie:&nbsp;
                                </span>
                                <span class="crud_desc">
                                    <?php echo $row['m2']." m<sup>2</sup>" ?>
                                </span>
                            </div>
                        </div>
                
                        <div class="crud_cont_4">
                            <div  class="crud_date">
                                <span class="crud_term">
                                    Fecha de publicación:&nbsp;
                                </span>
                                <span class="crud_desc">
                                    <?php echo $row['publication_date']; ?>
                                </span>
                            </div>
                            
                            <div class="">
                                <button class="real_estate btn btn-c-n crud_btn" id="<?php print $row['id'] ?>">Read</button> <!-- NUEVO READ modal jquery -->    
                                <a class="btn btn-c-n crud_btn" href="index.php?page=controller_real_estate&op=update&id=<?php echo $row['id'] ?>">Update</a>
                                <a class="btn btn-c-n crud_btn" href="index.php?page=controller_real_estate&op=delete&id=<?php echo $row['id'] ?>">Delete</a>
                            </div>
                        </div>
                    </div>
                <?php
                    }
                ?>
            <?php
                }
            ?>
        </div>
    </section>

    <!-- modal window -->
    <section id="real_estate_modal">
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