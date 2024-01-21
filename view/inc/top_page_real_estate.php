<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>mircacasa - tu portal inmobiliario</title>

		<!-- Favicons -->
        <link href="view/img/favicon.png" rel="icon">
        <link href="view/img/apple-touch-icon.png" rel="apple-touch-icon">
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
        <!-- Vendor CSS Files -->
        <link href="view/vendor/animate.css/animate.min.css" rel="stylesheet">
        <link href="view/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="view/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
        <link href="view/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
        <!-- Template Main CSS File -->
        <link href="view/css/style.css" rel="stylesheet" type="text/css" />

		<link rel="stylesheet" href="view/css/jquery-ui.css">
  		<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  		<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    	<script type="text/javascript">
        	$(function() {
        		$('#publication_date').datepicker({
        			dateFormat: 'dd-mm-yy', 
        			changeMonth: true, 
        			changeYear: true, 
        			yearRange: '1900:2100',
        			onSelect: function(selectedDate) {
        			}
        		});
        	});
	    </script>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"/>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
		<script>
			function resetear(){
    			document.getElementById('create_real_estate').reset();
			}
		</script>
		<script src="module/real_estate/model/validate_real_estate.js"></script>
		<script src="view/js/promises.js"></script>
    </head>
    <body>