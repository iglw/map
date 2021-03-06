// cityLoader.js
// -------------------------------------
// Contains functions related to the loading and unloading of the map from XML file
// -drawCities() : Not in use
// -loadCitiesXML() : Grabs data from XML and loads it into cityList[]
// -exportCity() : Takes cityList and generates XML for php script saveCity.php
// -initCanvas() : Handles everything directly on the canvas backdrop. Including click and drag.



// drawCities() Function
// -------------------------------
// Takes current list of cities in cityList[] and draws them out on the canvas
// (Not actually in use)

function drawCities() {
	for (var i = 0; i < cityList.length; i++) {
		drawCity(cityList[i]);
	}
}


// loadCitiesXML() Function
// ----------------------------
// Function to load cities from XML file into cityList[] as city objects
// Assumes you already have a .xml file with all the information on the map
// Initializes canvas with information from file and populates map with cities.

function loadCitiesXML() {
	$.get('data/test.xml', function(mapdata) {
		var data = $(mapdata);
		// Get map information
		mapName = data.find('title').text();
		mapSource = data.find('source').text();
		mapWidth = data.find('width').text();
		mapHeight = data.find('height').text();

		// Initialize Canvas
		initCanvas();
		
		// For each city in XML
		var myAttr = [];
		data.find('city').each(function(){

			// Give an array to temp. store city's attributes
			var city = $(this);
			// Load each of the city's attribute into array
			for (var i = 0; i < cityAttr.length; i++) {
				myAttr[cityAttr[i]] = city.find(cityAttr[i]).text();
				//console.log(cityAttr[i] + ":" + myAttr[cityAttr[i]]);
			}

			// Add city
			addCity(myAttr['cityName'], myAttr['cityImg'], myAttr['cityDesc'], 
					myAttr['nodeX'], myAttr['nodeY'], 
					myAttr['nodeR'], myAttr['nodeColor'], 
					myAttr['labelX'], myAttr['labelY'], 
					myAttr['labelSize'], myAttr['labelColor']);

		}); // End loop for each city
		select(null);
	}); // End load information from XML
}


// exportCity() 
// -------------------
// Exports city to xml file using php script

function exportCity() {
	var data = "<map>";
	data += "\n\t<title>" + mapName + "</title>";
	data += "\n\t<width>" + mapWidth + "</width>";
	data += "\n\t<height>" + mapHeight + "</height>";
	data += "\n\t<source>" + mapSource + "</source>";

	for (var i = 0; i < cityList.length; i++) {
		data += "\n\t<city>";
		data += "\n\t\t<cityName>" + cityList[i].cName + "</cityName>";
		data += "\n\t\t<cityImg>" + cityList[i].cImg + "</cityImg>";
		data += "\n\t\t<cityDesc>" + cityList[i].cDesc + "</cityDesc>";
	
		data += "\n\t\t<nodeX>" + cityList[i].circle.attr("cx") + "</nodeX>";
		data += "\n\t\t<nodeY>" + cityList[i].circle.attr("cy") + "</nodeY>";
		data += "\n\t\t<nodeR>" + cityList[i].circle.attr("r") + "</nodeR>";
		data += "\n\t\t<nodeColor>" + cityList[i].nColor + "</nodeColor>";

	
		data += "\n\t\t<labelX>" + cityList[i].label.attr("x") + "</labelX>";
		data += "\n\t\t<labelY>" + cityList[i].label.attr("y") + "</labelY>";
		data += "\n\t\t<labelSize>" + cityList[i].label.attr("font-size") + "</labelSize>";
		data += "\n\t\t<labelColor>" + cityList[i].label.attr("fill") + "</labelColor>";


		data += "\n\t</city>";
	}

	data += "\n</map>";
	//console.log(data);
	$.post('saveMap.php', 
		{data: data}, 
		function() {
			console.log("success");
			alert("Your map has been successfully saved.");
		});
}


// initCanvas()
// -----------------------------
// Initializes canvas by first creating paper, then defining functions for what happens when it is
// clicked on. In Add Mode, creates a new city at the clicked location. In Drag Mode, the canvas is
// moved with the cursor.

function initCanvas() {

	// Create the canvas
	paper = Raphael(0, 70, 1337, 723);
	base = paper.image("img/map_base.png", 0, 0, 1337, 723);
	paperCanvas = $(paper.canvas)
	setMode(MODE_VIEW);

	// When you click on it, add a city and display it
	base.click(function(event) {
		if (mode==MODE_ADD) {
			var x = event.pageX - parseInt(paperCanvas.css("left"));
			var y = event.pageY - parseInt(paperCanvas.css("top"));
			loadCityInfo(addCity("New City", "default.png", "This is a new city.", 
						x, y, 4, "#3d390b", x, y-14, 15, "#3d390b"));
		}
	
	});

	// hoverOffCursor is the default cursor for the map when not on a node
	paperCanvas.css("cursor", "url('" + hoverOffCursor + "') 13 13, default");

	// Dragging canvas begins here
	// -------------------------------

	// Variables for dragging
	var dragging = false;
	var 	mouseStartX, 
		mouseStartY, 
		canvasStartY, 
		canvasStartX, 
		mouseNowX, 
		mouseNowY, 
		canvasNowX, 
		canvasNowY;

	// Dragging: mouse down
	base.mousedown(function(event) {
		if (mode != MODE_DRAG) return;
		if (event.preventDefault) event.preventDefault();
		// Dragging, starting values
		dragging = true;
		paperCanvas.css("cursor", "url('img/cursor_hand_n.png') 13 13, default");
		mouseStartX = event.pageX;
		mouseStartY = event.pageY;
		canvasStartY = parseInt(paperCanvas.css("top"));
		canvasStartX = parseInt(paperCanvas.css("left"));
		//console.log("starting:" + mouseStartX + "," + mouseStartY);
	});

	// Dragging: mouse up
	base.mouseup(function(event) {
		if (mode != MODE_DRAG) return;
		// End dragging if mouse released
		dragging = false;
		paperCanvas.css("cursor", "url('" + hoverOffCursor + "') 13 13, default");
	});

	// Dragging: mouse move
	base.mousemove(function(event) {
		// As the mouse moves, so does the canvas
		if (dragging && mode == MODE_DRAG) {
			mouseNowX = event.pageX;
			mouseNowY = event.pageY;
			//console.log("moving:" + mouseNowX + "," + mouseNowY);
			canvasNowX = canvasStartX + mouseNowX - mouseStartX;
			canvasNowY = canvasStartY + mouseNowY - mouseStartY;
			//console.log(canvasNowX);
			paperCanvas.css({ "left": canvasNowX + "px", "top": canvasNowY + "px" });
		}
	});


}
