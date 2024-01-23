<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">Nuestros Inmuebles</h1>
                        <span class="color-text-a">Tu Selección</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=homepage">Inicio</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Inmuebles
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->

    <!-- ======= Property Grid ======= -->
    <section class="property-grid grid">
        <div class="container">
            <div class="row">
                <!-- ======= Filtro ======= 
                <div class="col-sm-12">
                    <div class="grid-option">
                        <form>
                            <select class="custom-select">
                                <option selected>All</option>
                                <option value="1">New to Old</option>
                                <option value="2">For Rent</option>
                                <option value="3">For Sale</option>
                            </select>
                        </form>
                    </div>
                </div>
                -->
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
                        <div class="col-md-4">
                            <div class="card-box-a card-shadow">
                                <div class="img-box-a">
                                    <img src="view/img/property-<?php echo rand(1,10); ?>.jpg" alt="" class="img-a img-fluid">
                                </div>
                                <div class="card-overlay">
                                    <div class="card-overlay-a-content">
                                        <div class="card-header-a">
                                            <h2 class="card-title-a">
                                                <a href="#">
                                                    <?php
                                                        echo $row['type']."<br>en ".$row['town'];
                                                    ?>
                                                </a>
                                            </h2>
                                        </div>
                                        <div class="card-body-a">
                                            <div class="price-box d-flex">
                                                <span class="price-a">
                                                    <?php
                                                        if ($row['trade']=="Compra") {
                                                            $trade="venta";
                                                        } else {
                                                            $trade="alquiler";
                                                        }
                                                        echo $trade." | ".number_format($row['price'],0,",",".")." €";
                                                    ?>
                                                </span>
                                            </div>
                                            <div class="d-flex">
                                                <span class="m2">
                                                    Superficie:&nbsp;
                                                    <?php echo $row['m2']." m<sup>2</sup>" ?>
                                                </span>
                                            </div>
                                            <span class="real_estate link-b" id="<?php print $row['id'] ?>"> <!-- NUEVO READ modal jquery -->
                                                Clic aquí para ver
                                                <span class="bi bi-chevron-right"></span>
                                            </span> 
                                        </div>
                                        <div class="card-footer-a">
                                            <div class="list_features">
                                                <?php
                                                    $features=explode(":", $row['feature']); // divide un string en varios strings - genera un último string vacio por el último separador
                                                    array_pop($features); // extrae el último elemento del array
                                                    $size_features=count($features);
                                                    
                                                    for ($i=0; $i<$size_features; $i++) {
                                                ?>
                                                    <div class="features">     
                                                        <span class=""><?php echo $features[$i] ?></span> 
                                                    </div>     
                                                <?php            
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
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
            <!-- ======= Pagination ======= 
            <div class="row">
                <div class="col-sm-12">
                    <nav class="pagination-a">
                        <ul class="pagination justify-content-end">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1">
                                    <span class="bi bi-chevron-left"></span>
                                </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item next">
                                <a class="page-link" href="#">
                                    <span class="bi bi-chevron-right"></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            -->
        </div>
    </section><!-- End Property Grid Single-->

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