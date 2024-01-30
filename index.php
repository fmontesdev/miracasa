<?php
	include("view/inc/top_page_home.html");
	/*
    if ((isset($_GET['page'])) && ($_GET['page']==="controller_real_estate") ){
		include("view/inc/top_page_real_estate.php");
	}else{
		include("view/inc/top_page.php");
	}
	*/
	session_start();
?>
<div id="wrapper">		
    <div id="header">    	
    	<?php
    	    include("view/inc/header.html");
    	?>        
    </div>  
    <div id="menu">
		<?php
		    include("view/inc/menu.html");
		?>
    </div>	
    <div id="">
    	<?php 
		    include("view/inc/pages.php"); 
		?>        
        <br style="clear:both;" />
    </div>
    <div id="footer">   	   
	    <?php
	        include("view/inc/footer.html");
	    ?>        
    </div>
</div>
<?php
    include("view/inc/bottom_page.html");
?>
    