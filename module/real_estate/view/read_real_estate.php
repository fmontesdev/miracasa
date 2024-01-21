<div id="contenido" >
    <span class="title"><h2>Información del Inmueble</h2></span>
    
    <div class="read_container">
        <div class="read_title">
            <?php
                if ($real_estate['trade']=="Compra") {
                    $trade="venta";
                } else {
                    $trade="alquiler";
                }
                echo "<h1>". $real_estate['type']." en ".$trade." en ".$real_estate['town'] ."</h1>";
            ?>
        </div>

        <div class="read_price">
            <?php
                echo "<h1>". number_format($real_estate['price'],0,",",".")." €" ."</h1>";
            ?>
        </div>

        <div class="read_container_logo">
            <img class="read_img" src="view/img/superficie.png" style="width:40px">
            <span class="read_img_txt">
                <span class="term_desc">
                    Superficie<br>
                </span>
                <?php echo $real_estate['m2']." m<sup>2</sup>" ?>
            </span>
        </div>

        <div class="read_cadastre">
            <span class="term_desc">
                Referencia catastral
            </span>
            <?php echo $real_estate['id_cadastre']; ?>
        </div>

        <div class="read_province">
            <span class="term_desc">
                Provincia
            </span>
            <?php echo $real_estate['province']; ?>
        </div>

        <div class="read_trade">
            <?php echo $real_estate['trade']; ?>
        </div>
    </div>

    <div class="read_description">
        <?php echo "<p>". $real_estate['description'] ."</p>"; ?>
    </div>
    
    <div class="features_container">
        <div class="features_title">
            <h3>Características</h3>
        </div>
        
        <?php
            $features=explode(":", $real_estate['feature']); // divide un string en varios strings - genera un último string vacio por el último separador
            array_pop($features); // extrae el último elemento del array
            $size_features=count($features);
        ?>
        
        <div class="features_container_logos">      
            <?php   
                for ($i=0; $i<$size_features; $i++) {
            ?>
                    <div class="features_logos">
                        <img class="features_img" src="view/img/<?php echo $features[$i] ?>.png" style="width:40px">
                        <span class="features_txt"><?php echo $features[$i] ?></span>
                    </div>
            <?php            
                }
            ?>
        </div>
    </div>
            
    <div  class="read_date">
        <p><span class="term_desc">
            Fecha de publicación:&nbsp;
        </span>
        <?php echo $real_estate['publication_date']; ?></p>
    </div>

    <div>
        <a class="button_blue" href="index.php?page=controller_real_estate&op=list">Volver</a>
    </div>
</div>