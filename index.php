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

<div id="topBar">
<a href="#" onclick="setMode(0);"><img class="button" id="button_eye" src="img/button_eye_n.png"></a>
<a href="#" onclick="setMode(1);"><img class="button" id="button_add" src="img/button_add.png"></a>
<a href="#" onclick="setMode(2);"><img class="button" id="button_rem" src="img/button_rem.png"></a> 
<a href="#" onclick="setMode(3);"><img class="button" id="button_edit" src="img/button_edit.png"></a> 
<a href="#"><img class="button" id="button_save" src="img/button_save.png"></a>

<script>
var buttonSave = $("#button_save");
buttonSave.mousedown(function(event){
		buttonSave.attr("src", "img/button_save_n.png");
	})
	.mouseup(function(event) {
		buttonSave.attr("src", "img/button_save.png");
		exportCity();
	});

</script>
</div>

<div id="editBar">
	City Information: <br/>
	<form id="editForm">
		City Name: 	<input type="text" id="cityNameEd"></input><br/>
		Image:  	<input type="text" id="cityImgEd"></input><br/>
		Description:  	<input type="text" id="cityDescEd"></input></span><br/>
		<br/>
		Dot X:  	<input type="number" id="nodeXEd"></input><br/>
		Dot Y:  	<input type="number" id="nodeYEd"></input><br/>
		Dot Size:  	<input type="number" id="nodeREd"></input></span><br/>
		Dot Colour:  	<input type="text" id="nodeColorEd"></input></span><br/>
		<br/>
		Label X:  	<input type="number" id="labelXEd"></input><br/>
		Label Y:  	<input type="number" id="labelYEd"></input><br/>
		Label Size:  	<input type="number" id="labelSizeEd"></input><br/>	
		Label Colour:  	<input type="text" id="labelColorEd"></input><br/>	

		<a href="#" onclick="removeCity(selected);">Remove</a>

		<script>
			$("#cityNameEd").change(function(event) {
				selected.changeLabel("text", $("#cityNameEd").val());
				selected.cName = $("#cityNameEd").val();
			});
			$("#cityImgEd").change(function(event) {
				selected.cImg = $("#cityImgEd").val();
			});
			$("#cityDescEd").change(function(event) {
				selected.cDesc = $("#cityDescEd").val();
			});

			$("#nodeXEd").change(function(event) {
				selected.changeCircle("cx", $("#nodeXEd").val());
			});
			$("#nodeYEd").change(function(event) {
				selected.changeCircle("cy", $("#nodeYEd").val());
			});
			$("#nodeREd").change(function(event) {
				selected.changeCircle("r", $("#nodeREd").val());
			});
			$("#nodeColorEd").change(function(event) {
				selected.changeCircle("fill", $("#nodeColorEd").val());
				selected.nColor = $("#nodeColorEd").val();
			});

			$("#labelXEd").change(function(event) {
				selected.changeLabel("x", $("#labelXEd").val());
			});
			$("#labelYEd").change(function(event) {
				selected.changeLabel("y", $("#labelYEd").val());
			});
			$("#labelSizeEd").change(function(event) {
				selected.changeLabel("font-size", $("#labelSizeEd").val());
			});
			$("#labelColorEd").change(function(event) {
				selected.changeLabel("fill", $("#labelColorEd").val());
			});


		</script>


	</form>

<pre>
TODO:
- Mode cursors		DONE
- Mode buttons		DONE
- Better edit menu
- Fix right alignment	DONE
- Confirm to remove	DONE
- Coloured cities 	DONE
- Better labelling 	DONE
- Save			DONE
- Mode Separation
- Clean form fields
- Drag and Drop		DONE
- Keyboard shortcuts
- Better site layout
- New map/other maps

</pre>

</div>

</body>

</html>
