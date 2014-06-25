function loadDisplay(cityObj) {
	showDisplay();
	console.log(cityObj.cName);
	$("#cityNameDisplay").text(cityObj.cName);
	$("#cityImgDisplay").html("<img src=\""+cityObj.cImg+"\">");
	$("#cityDescDisplay").text(cityObj.cDesc);
}


// loadCityInfo
// ------------------------------
// Load the city's info onto the editing panel

function loadCityInfo(cityObj) {
	showPanel();
	$("#cityNameEd").val(cityObj.cName);
		//.focus()
		//.select();
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
// (Useless?)

function clearCityInfo() {
	$("#editForm").trigger("reset");
	select(null);
}

// hidePanel()
// ------------------
// Hides the panel clears information from it, and unselects any city.

function hidePanel() {
	$("#editBar").hide();
	//$("#editForm").trigger("reset");
	select(null);
}
function showPanel() {
	$("#editBar").show();
}
function hideDisplay() {
	$("#displayBar").hide();
	view(null);
}
function showDisplay() {
	$("#displayBar").show();
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
	hidePanel();
}


// Mode
// ---------------
// 0: view
// 1: add
// 2: remove
// 3: edit


function clearMode() {
	$('.button').each(function(i, obj) {
		$(obj).attr("src", "img/" + obj.id + ".png");
	});
}

// This function sets the mode of the site
// requires papercanvas to be defined
function setMode(num) {
	mode = num;
	clearMode();
	switch(mode) {
		case MODE_VIEW:
			hoverOnCursor = "img/cursor_cross_eye_n.png";
			hoverOffCursor = "img/cursor_hand.png";
			$("#button_eye").attr("src", "img/button_eye_n.png");
			// If editing a city when switching over, immediately go to display panel.
			if (selected != null) {
				view(selected);
				loadDisplay(viewing);
			}
			hidePanel();
		break;
		case MODE_ADD:
			hoverOnCursor = "img/cursor_cross_edit_n.png";
			hoverOffCursor = "img/cursor_cross_add_n.png";
			$("#button_add").attr("src", "img/button_add_n.png");
			hideDisplay();
			hidePanel();
		break;
		case MODE_REM:
			hoverOnCursor = "img/cursor_cross_rem_n.png";
			hoverOffCursor = "img/cursor_cross_rem.png";
			$("#button_rem").attr("src", "img/button_rem_n.png");
			hideDisplay();
			hidePanel();
		break;
		case MODE_EDIT:
			hoverOnCursor = "img/cursor_cross_edit_n.png";
			hoverOffCursor = "img/cursor_cross_edit.png";
			$("#button_edit").attr("src", "img/button_edit_n.png");
			// If viewing a city when switching over, immediately go to eit panel.
			if (viewing != null) {
				select(viewing);
				loadCityInfo(selected);
			}
			hideDisplay();
		break;
		default:
			hoverOnCursor = "img/cursor_cross_eye_n.png";
			hoverOffCursor = "img/cursor_cross_eye.png";
		break;
	}
	paperCanvas.css("cursor", "url('" + hoverOffCursor + "') 13 13, default");
}

// This function selects the city to be the current city being modified, viewed, etc.
function select(cityObj) {
	selected = cityObj;
	if (selected != null) {
		//console.log("Selected: " + selected.cName);
	} else {
		//console.log("Clear Selected");
	}
}
// This function selects the city to be the current city being modified, viewed, etc.
function view(cityObj) {
	viewing = cityObj;
}


