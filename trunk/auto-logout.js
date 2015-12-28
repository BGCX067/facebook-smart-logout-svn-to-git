var fbTabs = [];

var recolectFBtabs = function(){
	chrome.windows.getAll({"populate":true}, function(windows) {
		var existing_tab = null;
		for (var i in windows) {
			var tabs = windows[i].tabs;
			for (var j in tabs) {
				var tab = tabs[j];
				addTab(tab);
			}
		}
	});
}

var addTab = function(tab){
	if( findTabs(tab.url) ){
		fbTabs.push( { "id":tab.id , "url":tab.url } );
//		console.log(fbTabs);
	}
}

var removeTab = function(tabId){
	for (var i in fbTabs) {
		if( fbTabs[i].id == tabId ){
			fbTabs.splice( i , 1 );
			chrome.browserAction.getBadgeText({}, function( text ){
				if( text == "ON" ){
					if( fbTabs.length == 0 ){
						findCookie();
					}
				}
			});
//			console.log(fbTabs.length);
			break;
		}
	};
}

var findCookie = function(){
	chrome.cookies.getAll({}, function(cookies) {
		for (var i in cookies) {
//			console.log(i);
			if( cookies[i].name == "c_user" && findTabs( cookies[i].domain ) ){
				if( confirm ){
					logout( cookies[i] );
				}
				break;
			}
		}
	});
}

var logout = function( cookie ){
	var url = "http" + ( cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
	chrome.cookies.remove({ "url":url , "name":cookie.name });
}

var findTabs = function( searchInto , toSearch ){
	if(  typeof toSearch == "undefined" ){
		var toSearch = "facebook.com";
	}
	if( searchInto.search( toSearch ) == "-1" ){
		return false;
	}else{
		return true;
	}
}

chrome.tabs.onCreated.addListener(
	function( tab ){
		addTab(tab);
	}
);

chrome.tabs.onRemoved.addListener(
	function( tabId ){
		removeTab( tabId );
	}
);

chrome.browserAction.setBadgeText({ "text" : "ON" });
chrome.browserAction.setBadgeBackgroundColor({ "color" : "#009900" });