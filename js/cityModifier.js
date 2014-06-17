// Load the city's info onto the display panel
function loadCityInfo(cityObj) {
	$("#cityNameEd").val(cityObj.cName);
	$("#cityImgEd").val(cityObj.cImg);
	$("#cityDescEd").val(cityObj.cDesc);

	$("#nodeXEd").val(cityObj.circle.attr("cx"));
	$("#nodeYEd").val(cityObj.circle.attr("cy"));
	$("#nodeREd").val(cityObj.circle.attr("r"));
	$("#nodeColorEd").val(cityObj.nColor);

	$("#labelXEd").val(cityObj.label.attr("x"));
	$("#labelYEd").val(cityObj.label.attr("y"));
	$("#labelSizeEd").val(cityObj.label.attr("font-size"));
	$("#labelColorEd").val(cityObj.label.attr("fill"));
}

// Load the city's info onto the display panel
function clearCityInfo() {
	$("#editForm").trigger("reset");
}

