<main id="main">

    <!-- ======= Intro Single ======= -->
    <section class="intro-single">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="title-single-box">
                        <h1 class="title-single">Eliminar la Lista de Inmuebles</h1>
                        <span class="color-text-a">¿Estás seguro que quieres eliminar toda la lista de Inmuebles?</span>
                    </div>
                </div>
                <div class="col-md-12 col-lg-4">
                    <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.php?page=controller_real_estate&op=crud">CRUD</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Eliminar Lista de Inmuebles
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section><!-- End Intro Single-->

    <section class="">
        <div class="container">
            <form autocomplete="on" method="post" name="delete_all_real_estate" id="delete_all_real_estate">
                <input type="hidden" id="id" name="id" placeholder="id" value=""/>    

                <div class="ok_cancel_buttons">
                    <input name="Submit" type="button" class="btn btn-a ok_cancel_btn" onclick="operations_real_estate('delete_all')" value="Aceptar"/>
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