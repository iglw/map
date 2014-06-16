// Load the city's info onto the display panel
function loadCityInfo(cityObj) {
	$("#nameEd").val(cityObj.cname);
	$("#xEd").val(cityObj.circle.attr("cx"));
	$("#yEd").val(cityObj.circle.attr("cy"));
	$("#sizeEd").val(cityObj.circle.attr("r"));
	$("#imgEd").val(cityObj.img);
	$("#descEd").val(cityObj.desc);
	$("#xlaEd").val(cityObj.label.attr("x"));
	$("#ylaEd").val(cityObj.label.attr("y"));
	$("#labelsizeEd").val(cityObj.label.attr("font-size"));
}

