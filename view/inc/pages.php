<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){
			case "homepage";
				include("module/inicio/view/inicio.php");
				break;
			case "controller_real_estate";
				include("module/real_estate/controller/".$_GET['page'].".php");
				break;
			case "CRUD";
				include("module/CRUD/".$_GET['page'].".php");
				break;
			case "services";
				include("module/services/".$_GET['page'].".php");
				break;
			case "aboutus";
				include("module/aboutus/".$_GET['page'].".php");
				break;
			case "contactus";
				include("module/contact/".$_GET['page'].".php");
				break;
			case "404";
				include("view/inc/error".$_GET['page'].".php");
				break;
			case "503";
				include("view/inc/error".$_GET['page'].".php");
				break;
			default;
				include("module/inicio/view/inicio.php");
				break;
		}
	} else{
		include("module/inicio/view/inicio.php");
	}
?>