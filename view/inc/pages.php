<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){
			case "home";
				$_GET['op']='list';
				include("module/home/controller/controller_home.php");
				break;
			case "controller_shop";
				include("module/shop/controller/".$_GET['page'].".php");
				break;
			case "details";
				include("module/shop/view/".$_GET['page'].".html");
				break;
			/*
			case "controller_real_estate";
				include("module/real_estate/controller/".$_GET['page'].".php");
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
			*/
			case "404";
				include("view/inc/error".$_GET['page'].".html");
				break;
			case "503";
				include("view/inc/error".$_GET['page'].".html");
				break;
			default;
				include("module/home/view/home.html");
				break;
		}
	} else{
		$_GET['op']='list';
		include("module/home/controller/controller_home.php");
	}
?>