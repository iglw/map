<html>
<head>
<title></title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script type="text/Javascript">

$(document).ready(function(){

	// City object constructor
	function City(name, size, img, desc, xco, yco) {
		this.name = name;
		this.size = size;
		this.img = img;
		this.desc = desc;
		this.xco = xco;
		this.yco = yco;
	}

	// List of attributes for each city
	var cityAttr = ["name", "size", "img", "desc", "xco", "yco"];

	// List of all cities as objects
	var cityList = [];

	// Display information on each city
	function displayCities() {
		for (var i = 0; i < cityList.length; i++) {
			var html =  "Name: " + cityList[i].name + "<br>";
			    html += "Image: " + cityList[i].img + "<br>";
			    html += "Coordinates: " + cityList[i].xco + "," + cityList[i].yco + "<br>";
			    html += "Description: " + cityList[i].desc + "<br><br>";
			$("#main").append(html);
		}
	}

	// Function to load cities from XML file
	function loadCitiesXML() {
		// Load information from XML
		$.get('map.xml', function(data) {
			var data = $(data);
			var title = data.find('title').text();
			$("#main").append("Title: " + title + "<br><br>");

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
				var newCity = new City(myAttr['name'], myAttr['size'], 
						       myAttr['img'], myAttr['desc'], 
		                                       myAttr['xco'], myAttr['yco']);

				// Add city to list of cities
				cityList.push(newCity);

			}); // End loop for each city

			// Display list of cities
			displayCities();

		}); // End load information from XML
	}

	loadCitiesXML();
});

</script>

</head>

<body>

<p id="main">
</p>

</body>

</html>
