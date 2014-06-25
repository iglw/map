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
	})
	// KEYBOARD CONTROLS ----------------------------------
	.keydown(function(event) {
		// Exit if something is being input on the from
		if ($('*:focus').length > 0) return; 
		console.log("key:" + event.which + "," + $('*:focus').length);
		keyCode = event.which;
		// Prevent arrow key scrolling
		event.preventDefault();
		switch (keyCode) {		
			// Keyboard: Mode select
			case 49:	//1
				setMode(0);
			break;
			case 50:	//2
				setMode(1);
			break;
			case 51:	//3
				setMode(2);
			break;
			case 52:	//4
				setMode(3);
			break;
			case 53:	//5
				exportCity();
			break;
		}
		if (selected == null) {
			// Only when nothing is selected
		} else {
			// Only when something is selected
			switch(keyCode) {
			
				// Keyboard: Move node position
				case 37:		//LEFT
					selected.circle.attr("cx", parseInt(selected.circle.attr("cx")) - 1);
					$("#nodeXEd").val(selected.circle.attr("cx"));
				break;
				case 38:		//UP
					selected.circle.attr("cy", parseInt(selected.circle.attr("cy")) - 1);
					$("#nodeYEd").val(selected.circle.attr("cy"));
				break;
				case 39:		//RIGHT
					selected.circle.attr("cx", parseInt(selected.circle.attr("cx")) + 1);
					$("#nodeXEd").val(selected.circle.attr("cx"));
				break;
				case 40:		//DOWN
					selected.circle.attr("cy", parseInt(selected.circle.attr("cy")) + 1);
					$("#nodeYEd").val(selected.circle.attr("cy"));
				break;
				
				// Keyboard: Move label position
				case 74:		//J
					selected.changeLabel ("x", parseInt(selected.label.attr("x")) - 1);
					$("#labelXEd").val(selected.label.attr("x"));
				break;
				case 73:		//I
					selected.changeLabel ("y", parseInt(selected.label.attr("y")) - 1);
					$("#labelYEd").val(selected.label.attr("y"));
				break;
				case 76:		//L
					selected.changeLabel ("x", parseInt(selected.label.attr("x")) + 1);
					$("#labelXEd").val(selected.label.attr("x"));
				break;
				case 75:		//K
					selected.changeLabel ("y", parseInt(selected.label.attr("y")) + 1);
					$("#labelYEd").val(selected.label.attr("y"));
				break;
				
				// Dot and Font size changes
				case 189:		//-
					selected.circle.attr("r", parseInt(selected.circle.attr("r")) - 1);
					$("#nodeREd").val(selected.circle.attr("r"));
				break;
				case 187:		//=
					selected.circle.attr("r", parseInt(selected.circle.attr("r")) + 1);
					$("#nodeREd").val(selected.circle.attr("r"));
				break;				
				case 219:		//[
					selected.changeLabel ("font-size", parseInt(selected.label.attr("font-size")) - 1);
					$("#labelSizeEd").val(selected.label.attr("font-size"));
				break;
				case 221:		//]
					selected.changeLabel ("font-size", parseInt(selected.label.attr("font-size")) + 1);
					$("#labelSizeEd").val(selected.label.attr("font-size"));
				break;

			}
		}
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
	<div id="cityDescDisplay" style="text-align:left;margin-top: 13px;"></div><br/>
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
		  	<input type="text" id="nodeXEd"></input><br/>
		<label for="nodeYEd">Dot Y::</label>
		  	<input type="text" id="nodeYEd"></input><br/>
		<label for="nodeREd">Dot Size:</label>
		  	<input type="text" id="nodeREd"></input><br/>
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
		  	<input type="text" id="labelXEd"></input><br/>
		<label for="labelYEd">Label Y:</label>
		  	<input type="text" id="labelYEd"></input><br/>
		<label for="labelSizeEd">Label Size:</label>
		  	<input type="text" id="labelSizeEd"></input><br/>	
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
			<div style="margin: 15 0 0 38; text-align: left;">Description:</div>
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
- View Mode				OK
- Clean form fields
- Keyboard shortcuts	OK
- Browser compatibility

- Help info
- Paths
- 

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
