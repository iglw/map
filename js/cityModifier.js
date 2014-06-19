// loadCityInfo
// ------------------------------
// Load the city's info onto the editing panel

function loadCityInfo(cityObj) {
	showPanel();
	$("#cityNameEd").val(cityObj.cName)
		.focus()
		.select();
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


// clearCityInfo()
// ------------------------
// Remove the city's information from the editing panel

function clearCityInfo() {
	$("#editForm").trigger("reset");
}


function hidePanel() {
	$("#editBar").hide();
}
function showPanel() {
	$("#editBar").show();
}

// addCity function
// ------------------------------
// Takes the attributes of a nonexisting city, creates a new city object and 
// adds it to the list of cities.

function addCity(cName, cImg, cDesc, nX, nY, nR, nColor, lX, lY, lSize, lColor) {
	var newCity = new City(cName, cImg, cDesc, nX, nY, nR, nColor, lX, lY, lSize, lColor);
	cityList.push(newCity);
	return newCity;
}


// removeCity function
// ------------------------
// Removes city from list

function removeCity(cityObj) {
	// Remove from list
	cityList.splice($.inArray(cityObj,cityList),1);
	// Remove circle, label, and box
	cityObj.circle.remove();
	cityObj.label.remove();
	cityObj.box.remove();
}


