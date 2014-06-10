// Load the city's info onto the display panel
function loadCityInfo(cityObj) {
	$("#nameEd").val(cityObj.cname);
	$("#xEd").val(cityObj.yco);
	$("#yEd").val(cityObj.xco);
	$("#sizeEd").val(cityObj.size);
	$("#imgEd").val(cityObj.img);
	$("#descEd").val(cityObj.desc);
}

