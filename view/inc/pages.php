<?php
	if(isset($_GET['page'])){
		switch($_GET['page']){
			case "home";
				include("module/home/view/home.html");
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
		include("module/home/view/home.html");
	}
?>