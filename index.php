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

<span style="
    float: right;
    padding-right: 39px;
    font-size: 45;
">Cartomancer</span>


</div>

<div id="displayBar">
	<h2 id="cityNameDisplay"></h2><br/>
	<span id="cityImgDisplay"></span><br/>
	<div id="cityDescDisplay" style="text-align:left;"></div><br/>
</div>

<div id="editBar">
	<form id="editForm">
		<div style="margin: 0 0 0 0; font-weight: bold; font-size: 20;">
			Edit City Info
		</div>
		<label for="cityNameEd">City Name: 	</label>
			<input type="text" id="cityNameEd"></input><br/>
		<label for="cityImgEd">Image:</label>
			<input type="text" id="cityImgEd"></input><br/>
		<br/>
		<label for="nodeXEd">Dot X:</label>
		  	<input type="number" id="nodeXEd"></input><br/>
		<label for="nodeYEd">Dot Y::</label>
		  	<input type="number" id="nodeYEd"></input><br/>
		<label for="nodeREd">Dot Size:</label>
		  	<input type="number" id="nodeREd"></input><br/>
		<label for="nodeColorEd">Dot Colour:</label>
		  	<input type="text" id="nodeColorEd"></input><br/>
		<?php
			$colors = array("ff0000", "b20000", "7f0000", "4c0000", "ffa500", "b27300", "4c3100", "ffff00", "7f7f00", "008000", "005900", "003300", "0000ff", "000099", "800080", "590059", "000000", "FFFFFF");
			echo "<div style=\"padding:10px;\">\n";
			foreach ($colors as  $color) {
				echo "\t\t\t<div onclick=\"nodeColor('#".$color."');\" class=\"colorSwatch\" style=\"background:#".$color.";\"></div>\n";
			}
			echo "\t\t</div>\n";
		?>
		<br/>
		<br/>
		<label for="labelXEd">Label X:</label>
		  	<input type="number" id="labelXEd"></input><br/>
		<label for="labelYEd">Label Y:</label>
		  	<input type="number" id="labelYEd"></input><br/>
		<label for="labelSizeEd">Label Size:</label>
		  	<input type="number" id="labelSizeEd"></input><br/>	
		<label for="labelColorEd">Label Colour:</label>
		  	<input type="text" id="labelColorEd"></input><br/>
		
		<?php
			echo "<div style=\"padding:10px;\">\n";
			foreach ($colors as  $color) {
				echo "\t\t\t<div onclick=\"labelColor('#".$color."');\" class=\"colorSwatch\" style=\"background:#".$color.";\"></div>\n";
			}
			echo "\t\t</div>\n";
		?>
		<br/>
			<div style="margin: 15 0 0 -200;">Description:</div>
			<textarea id="cityDescEd"></textarea>
		  <br/>
		<button type="button" onclick="removeCityEditBar();">Remove</button>
		<button type="button" onclick="hidePanel();">Done</button>

		<script>
		
			function removeCityEditBar() {
				if(confirm("Are you sure you want to remove \""+selected.cName+"\"?")) {
					removeCity(selected);
					hidePanel();
				}
			}
			function nodeColor(color) {
				$("#nodeColorEd").val(color).change();
			}
			function labelColor(color) {
				$("#labelColorEd").val(color).change();
			}
		
		
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
<!--
<pre>
TODO:
- View Mode
- Clean form fields
- Keyboard shortcuts

FUTURE
- Better site layout?
- New map/other maps
- City categories
- Fix Dragging: Text Selection, Drag off canvas
- Fix: Prevent Size 0/0 cities

</pre>
-->

</div>

</body>

</html>
