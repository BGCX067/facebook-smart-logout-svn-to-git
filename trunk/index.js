var active;

var toggleActivation = function(){
	var text,color,legend;
	if( active ){
		active = false;
		text = "OFF";
		color = "#990000";
		legend = "Activar";
	}else{
		active = true;
		text = "ON";
		color = "#009900";
		legend = "Desactivar";
	}
	$("#toggleActivation").text(legend);
	chrome.browserAction.setBadgeText({ "text" : text });
	chrome.browserAction.setBadgeBackgroundColor({ "color" : color });
}

var refreshButton = function(){
	chrome.browserAction.getBadgeText({}, function( text ){
		if( text == "ON" ){
			active = true;
			legend = "Desactivar";
		}else{
			active = false;
			legend = "Activar";
		}
		$("#toggleActivation").text(legend);
	});
}

$(document).ready(function(){
	$("#toggleActivation").bind('click',function(){
		toggleActivation();
	});

	refreshButton();
});