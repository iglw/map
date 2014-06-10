// City object constructor
function City(cname, size, img, desc, xco, yco, xla, yla, labelsize) {
	// General attributes
	this.cname = cname;
	this.img = img;
	this.desc = desc;

	// Circle attribute
	this.xco = xco;
	this.yco = yco;
	this.size = size;

	// Label attribute
	this.xla = xla;
	this.yla = yla;
	this.labelsize = labelsize;

	// When creating new city, set it as selected city
	var thisCity = this;
	select(thisCity);

	// Circle
	this.circle = paper.circle(xco, yco, size)
		.attr("fill", "#990000")
		.attr("stroke", "#ffffff")
		.attr("stroke-width", "1.3")
		.click(function(event) {
			if (mode==2) {
				removeCity(thisCity);
			} else {
				loadCityInfo(thisCity);
				select(thisCity);
			}
		})
		.hover(function(event) {
			this.attr("fill", "#997777")
			$(paper.canvas).css("cursor", "pointer");
		},function(event) {
			this.attr("fill", "#990000")
			$(paper.canvas).css("cursor", "cursor");
		});

	// Label
	this.label = paper.text(xla, yla, cname)
		.attr({ "font-size": 13, "font-family": "bree" })
		.attr("fill", "#990000");

	// Box

}

// List of attributes for each city
var cityAttr = ["cname", "size", "img", "desc", "xco", "yco", "xla", "yla", "labelsize"];

// List of all cities as objects
var cityList = [],
	mapName = "",
	mapWidth = 0,
	mapHeight = 0,
	mapSource = "";

var paper, base, selected, mode;

// Mode
// ---------------
// 0: view
// 1: add
// 2: remove
// 3: edit

function setMode(num) {
	mode = num;
	// FUTURE: Change mode specific display: cursor, buttons
}

function select(cityObj) {
	selected = cityObj;
}
