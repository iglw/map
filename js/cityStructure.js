// City object constructor
function City(cname, size, img, desc, xco, yco) {
	this.cname = cname;
	this.size = size;
	this.img = img;
	this.desc = desc;
	this.xco = xco;
	this.yco = yco;
}

// List of attributes for each city
var cityAttr = ["cname", "size", "img", "desc", "xco", "yco"];

// List of all cities as objects
var cityList = [],
	mapName = "",
	mapWidth = 0,
	mapHeight = 0,
	mapSource = "";

var paper, base;
