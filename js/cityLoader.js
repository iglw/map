// displayCities() Function
// -------------------------------
// Takes current list of cities in cityList[] and lists them out in text

function displayCities() {
	for (var i = 0; i < cityList.length; i++) {
		var html =  "Name: " + cityList[i].cname + "<br>";
		    html += "Image: " + cityList[i].img + "<br>";
		    html += "Coordinates: " + cityList[i].xco + "," + cityList[i].yco + "<br>";
		    html += "Description: " + cityList[i].desc + "<br><br>";
		$("#main").append(html);
	}
}

// loadCitiesXML() Function
// ----------------------------
// Function to load cities from XML file into cityList[] as city objects

function loadCitiesXML() {
	// Load information from XML
	$.get('map.xml', function(data) {
		var data = $(data);
		mapName = data.find('title').text();
		mapSource = data.find('source').text();
		mapWidth = data.find('width').text();
		mapHeight = data.find('height').text();

		// For each city in XML
		var myAttr = [];
		data.find('city').each(function(){

			// Give an array to temp. store city's attributes
			var city = $(this);

			// Load each of the city's attribute into array
			for (var i = 0; i < cityAttr.length; i++) {
				myAttr[cityAttr[i]] = city.find(cityAttr[i]).text();
			}

			// Create city as object
			var newCity = new City(myAttr['cname'], myAttr['size'], 
					       myAttr['img'], myAttr['desc'], 
	                                       myAttr['xco'], myAttr['yco']);

			// Add city to list of cities
			cityList.push(newCity);

		}); // End loop for each city

		// Display list of cities
		//displayCities();

		paper = Raphael(10, 50, 1337, 723);
		base = paper.image("img/map_base.png", 0, 0, 1337, 723);
		drawCities();

		
	}); // End load information from XML
}

function addCity(cname, size, img, desc, xco, yco) {
	var newCity = newCity(cname, size, img, desc, xco, yco);
	cityList.push(newCity);
	
	drawCity(newCity);
}

// drawCities() Function
// -------------------------------
// Takes current list of cities in cityList[] and draws them out on the canvas

function drawCities() {
	for (var i = 0; i < cityList.length; i++) {
		drawCity(cityList[i]);
	}
}

function drawCity(cityObj) {
	var circle = paper.circle(cityObj.xco, cityObj.yco, cityObj.size);
	// Populate physical properties
	circle.attr("fill", "red");
	circle.attr("stroke", "#ffffff");
	circle.attr("stroke-width", "1.2");
}

// Function to initialize Raphael canvas
function loadMap() {

	

}
