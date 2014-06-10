<html>
<head>
<title></title>
<link type="text/css" rel="stylesheet" href="style.css"/>

<script type="text/javascript" src="js/raphael-min.js"></script>
<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>

<script type="text/Javascript" src="js/cityStructure.js"></script>
<script type="text/Javascript" src="js/cityLoader.js"></script>
<script type="text/Javascript" src="js/cityModifier.js"></script>

<script type="text/Javascript">

$(document).ready(function(){
	// Create canvas
	loadCitiesXML();
});

</script>

</head>

<body>

<p id="main">
<a href="#" onclick="setMode(0);">View</a> |
<a href="#" onclick="setMode(1);">Add</a> |
<a href="#" onclick="setMode(2);">Remove</a> | 
<a href="#" onclick="setMode(3);">Edit</a>
</p>

<div id="editBar">
	City Information: <br/>
	<form>
		Name: <input type="text" id="nameEd"></input><br/>
		X:  <input type="text" id="xEd"></input><br/>
		Y:  <input type="text" id="yEd"></input><br/>
		Size:  <input type="text" id="sizeEd"></input></span><br/>
		Image:  <input type="text" id="imgEd"></input><br/>
		Description:  <input type="text" id="descEd"></input></span><br/>
		<a href="#" onclick="removeCity(selected);">Remove</a>
	</form>
</div>

</body>

</html>
