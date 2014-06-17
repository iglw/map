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
	$.get('test.xml', function(mapdata) {
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

	}); // End load information from XML
}

// addCity function
// ------------------------------
// Takes the attributes of a nonexisting city, creates a new city object and 
// adds it to the list of cities. Then draws it onto the map.
function addCity(cName, cImg, cDesc, nX, nY, nR, nColor, lX, lY, lSize, lColor) {
	var newCity = new City(cName, cImg, cDesc, nX, nY, nR, nColor, lX, lY, lSize, lColor);
	cityList.push(newCity);
	//drawCity(newCity);
	return newCity;
}

// removeCity function
// ------------------------
// Removes city from list

function removeCity(cityObj) {
	// Remove from list
	cityList.splice($.inArray(cityObj,cityList),1);
	// Remove circle, label, and box
	cityObj.circle.remove();
	cityObj.label.remove();
	cityObj.box.remove();
}

// Initializes canvas
function initCanvas() {
	// Create the canvas
	paper = Raphael(10, 50, 1337, 723);
	base = paper.image("img/map_base.png", 0, 0, 1337, 723);
	paperCanvas = $(paper.canvas)

	// When you click on it, add a city and display it
	base.click(function(event) {
		if (mode==1) {
			var x = event.pageX - parseInt($(paper.canvas).css("left"));
			var y = event.pageY - parseInt($(paper.canvas).css("top"));
			loadCityInfo(addCity("New City", "default.png", "This is a new city.", 
						x, y, 5, "#5A312A", x, y-14, 12, "#5A312A"));
		}
	});
	paperCanvas.css("cursor", "url('" + hoverOffCursor + "') 13 13, default");
}
