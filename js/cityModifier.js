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


function exportCity() {
	var data = "<map>";
	data += "\n\t<title>" + mapName + "</title>";
	data += "\n\t<width>" + mapWidth + "</width>";
	data += "\n\t<height>" + mapHeight + "</height>";
	data += "\n\t<source>" + mapSource + "</source>";

	for (var i = 0; i < cityList.length; i++) {
		data += "\n\t<city>";
		data += "\n\t\t<cityName>" + cityList[i].cName + "</cityName>";
		data += "\n\t\t<cityImg>" + cityList[i].cImg + "</cityImg>";
		data += "\n\t\t<cityDesc>" + cityList[i].cDesc + "</cityDesc>";
	
		data += "\n\t\t<nodeX>" + cityList[i].circle.attr("cx") + "</nodeX>";
		data += "\n\t\t<nodeY>" + cityList[i].circle.attr("cy") + "</nodeY>";
		data += "\n\t\t<nodeR>" + cityList[i].circle.attr("r") + "</nodeR>";
		data += "\n\t\t<nodeColor>" + cityList[i].nColor + "</nodeColor>";

	
		data += "\n\t\t<labelX>" + cityList[i].label.attr("x") + "</labelX>";
		data += "\n\t\t<labelY>" + cityList[i].label.attr("y") + "</labelY>";
		data += "\n\t\t<labelSize>" + cityList[i].label.attr("font-size") + "</labelSize>";
		data += "\n\t\t<labelColor>" + cityList[i].label.attr("fill") + "</labelColor>";


		data += "\n\t</city>";
	}

	data += "\n</map>";
	//console.log(data);
	$.post('saveMap.php', 
		{data: data}, 
		function() {
			console.log("success");
			alert("Your map has been successfully saved.");
		});
}
