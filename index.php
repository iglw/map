<html>
<head>
<title></title>
<script type="text/javascript" src="js/raphael-min.js"></script>
<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>

<script type="text/Javascript" src="js/cityStructure.js"></script>
<script type="text/Javascript" src="js/cityLoader.js"></script>


<script type="text/Javascript">

$(document).ready(function(){
	// Create canvas
	loadCitiesXML();

	base.click(function(event) {
		var x = event.pageX - parseInt($(paper.canvas).css("left"));
		var y = event.pageY - parseInt($(paper.canvas).css("top"));
		alert(x + "," + y);
	});


});

</script>

</head>

<body>

<p id="main">
</p>

</body>

</html>
