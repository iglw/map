// cityStructure.js
// ---------------------------------
// Contains everything for the city object and the switching of modes (move to cityModifier.js?)
// City() : constructor for a city object. 


var MODE_VIEW = 0;
var MODE_DRAG = 0;
var MODE_ADD = 1;
var MODE_REM = 2;
var MODE_EDIT = 3;


// City object constructor
function City(cName, cImg, cDesc, nX, nY, nR, nColor, lX, lY, lSize, lColor) {
	// General attributes
	this.cName = cName;
	this.cImg = cImg;
	this.cDesc = cDesc;
	this.nColor = nColor;

	// Circle attribute (OPTIONAL: Store implicitly in this.circle
	//this.xco = xco;
	//this.yco = yco;
	//this.size = size;

	// Label attribute (OPTIONAL: Can store implicitly in this.label)
	//this.xla = xla;
	//this.yla = yla;
	//this.labelsize = labelsize;

	// When creating new city, set it as selected city
	var thisCity = this;
	select(thisCity);

	// Attribue: Circle
	this.circle = paper.circle(nX, nY, nR)
		.attr({"fill": nColor, 
			"stroke": "#ffffff", 
			"stroke-width": "1.3"})
		.click(function(event) {thisCity.clickMe();})
		.hover(function(event) {thisCity.hoverOnMe();},
			function(event) {thisCity.hoverOffMe();});

	// Attribue: Label
	this.label = paper.text(lX, lY, cName)
		.attr({ "font-size": lSize, 
			"font-family": "bree", 
			"font-weight": "bold", 
			"fill": lColor })
		.click(function(event) {thisCity.clickMe();})
		.hover(function(event) {thisCity.hoverOnMe();},
			function(event) {thisCity.hoverOffMe();});

	// Attribue: Box
	// Set the box to be behind the label and perfectly sized to it
	/*this.box = paper.rect(50, 50, 50, 50, 5) // Dummy values, update using function
		.attr({ "fill": "#FFFFFF", 
			"stroke": "#ffffff", 
			"stroke-width": "1.3",
			"fill-opacity": "0.7", 
			"stroke-width": "0"})
		.click(function(event) {thisCity.clickMe();})
		.hover(function(event) {thisCity.hoverOnMe();},
			function(event) {thisCity.hoverOffMe();});*/
			
	this.box = paper.text(lX, lY, cName)
		.attr({ 
			"font-size": lSize, 
			"font-family": "bree", 
			"font-weight": "bold", 
			"stroke": "#fff",
			"stroke-width": "3",
			"fill": lColor 
			})
		.click(function(event) {thisCity.clickMe();})
		.hover(function(event) {thisCity.hoverOnMe();},
			function(event) {thisCity.hoverOffMe();});

	// Function to update bounding box
	this.updateBox = function() {
		//var labelWidth = this.label.getBBox().width;
		//var labelHeight = this.label.getBBox().height;
		//var xoffset = Math.floor(labelWidth/2);
		//var yoffset = Math.floor(labelHeight/3);
		//this.box.attr({"x": this.label.attr("x")-xoffset-4,
			//"y": this.label.attr("y")-yoffset,
			//"width": labelWidth+6,
			//"height": Math.floor(labelHeight*0.85)});
		this.box.attr({
			"font-size": this.label.attr("font-size"),
			"text": this.label.attr("text"),
			"x": parseInt(this.label.attr("x"))+1,
			"y": this.label.attr("y")
			});
	}

	// Finishing touches on label init
	this.updateBox();
	this.label.toFront();

	// Function: Click Me
	// What happens when the city is clicked on
	this.clickMe = function() {
		
		if (mode == MODE_REM) {
			loadCityInfo(this);
			thisCity.hoverOffMe();
			if (confirm("Are you sure you want to remove \""+cName+"\"?")) {
				removeCity(this);
			}
			hidePanel();
		} else if (mode == MODE_VIEW) {
			loadDisplay(this);
		} else {
			loadCityInfo(this);
			select(this);
		}
	}

	// Function: Hover Me
	// Functions for when this city is hovered over
	this.hoverOnMe = function() {
		this.circle.attr("fill", "blue")
		paperCanvas.css("cursor", "url('" + hoverOnCursor + "') 13 13, default");
	}
	this.hoverOffMe = function() {
		//alert(thisCity.nColor);
		this.circle.attr("fill", thisCity.nColor)
		paperCanvas.css("cursor", "url('" + hoverOffCursor + "') 13 13, default");
	}

	// Function to change label's attribute
	this.changeLabel = function(attr, val) {
		this.label.attr(attr, val);
		this.updateBox();
		// Change properties (OPTIONAL)
		/*if (attr == "xla") { this.xla = val; }
		else if (attr == "yla") { this.yla = val; }
		else if (attr == "labelsize") { this.labelsize; }*/
	}

	// Function to change circle's attribute
	this.changeCircle = function(attr, val) {
		// Change label font size
		this.circle.attr(attr, val);
		// Change properties (OPTIONAL)
	}
}

// List of attributes for each city (must match XML)
var cityAttr = ["cityName", "cityImg", "cityDesc", "nodeX", "nodeY", "nodeR", "nodeColor", "labelX", "labelY", "labelSize", "labelColor"];

// List of all cities as objects
var cityList = [],
	mapName = "",
	mapWidth = 0,
	mapHeight = 0,
	mapSource = "";

var paper, base, selected, mode, hoverOnCursor, hoverOffCursor;
var paperCanvas;
var mode;
var hoverOnCursor;
var hoverOffCursor;

