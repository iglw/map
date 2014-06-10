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

// drawCities() Function
// -------------------------------
// Takes current list of cities in cityList[] and draws them out on the canvas

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

	$.get('map.xml', function(data) {
		var data = $(data);

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
			}

			// Add city
			addCity(myAttr['cname'], myAttr['size'], 
					       myAttr['img'], myAttr['desc'], 
	                                       myAttr['xco'], myAttr['yco'], 
	                                       myAttr['xla'], myAttr['yla'], myAttr['labelsize']);

		}); // End loop for each city

		// Display list of cities
		// displayCities();


	}); // End load information from XML
}

// addCity function
// ------------------------------
// Takes the attributes of a nonexisting city, creates a new city object and 
// adds it to the list of cities. Then draws it onto the map.
function addCity(cname, size, img, desc, xco, yco, xla, yla, labelsize) {
	var newCity = new City(cname, size, img, desc, xco, yco, xla, yla, labelsize);
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
	// Remove circle
	cityObj.circle.remove();
	// FUTURE: Remove label
}

// Takes a city object, creates a circle for it and draws it onto the map.
/*function drawCity(cityObj) {
	cityObj.circle = paper.circle(cityObj.xco, cityObj.yco, cityObj.size)
		.attr("fill", "#990000")
		.attr("stroke", "#ffffff")
		.attr("stroke-width", "1.3")
		.click(function(event) {
			if (mode==2) {
				removeCity(cityObj);
			} else {
				loadCityInfo(cityObj);
				selected = cityObj;
			}
		})
		.hover(function(event) {
			this.attr("fill", "#997777")
			$(paper.canvas).css("cursor", "pointer");
		},function(event) {
			this.attr("fill", "#990000")
			$(paper.canvas).css("cursor", "cursor");
		});
	// FUTURE: Draw label
}*/

// Load the city's info onto the display panel
function loadCityInfo(cityObj) {
	$("#nameEd").text(cityObj.cname);
	$("#xEd").text(cityObj.yco);
	$("#yEd").text(cityObj.xco);
	$("#sizeEd").text(cityObj.size);
	$("#imgEd").text(cityObj.img);
	$("#descEd").text(cityObj.desc);
}

// Initializes canvas
function initCanvas() {

	// Create the canvas
	paper = Raphael(10, 50, 1337, 723);
	base = paper.image("img/map_base.png", 0, 0, 1337, 723);

	// When you click on it, add a city and display it
	base.click(function(event) {
		if (mode==1) {
			var x = event.pageX - parseInt($(paper.canvas).css("left"));
			var y = event.pageY - parseInt($(paper.canvas).css("top"));
			//alert(x+","+y);
			loadCityInfo(addCity("MooTown", 5, "moo.png", "Moo cow.", x, y, x, y-12, "12"));
		}
	});
}
