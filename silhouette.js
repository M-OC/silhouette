var config = {
	"url": "/",
	"refreshRate": 2000,
	"watch": {
		"ipAddress": true,
		"browser": true,
		"sessionTime": false,
		"windowSize": false,
		"click": false,
		"mouseMovement": false
	}
}

var main = function(config) {
// ================ Data to upload and HTTP request ======================
	// 'snapshot' stores all the data collected by 'watchFunctions' methods.
	var snapshot = {};

	var upload = function() {
		window.XMLHttpRequest.open('POST', config.url, true);
		window.XMLHttpRequest.send(JSON.stringify(snapshot));

		//reset bulk data here!
	};

// ================ Watch functions ======================================
	var watchFunctions = {};

	watchFunctions.ipAddress = function () {
		snapshot["ipAddress"] =  1000;
	};

	watchFunctions.browser = function () {
		var agent = navigator.userAgent;
		//This code was inspired by MDN's article on the 'navigator' object. 
		//https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
		if(agent.indexOf("Chrome") > -1) {
		    snapshot["browser"] = "Chrome";
		} else if (agent.indexOf("Safari") > -1) {
		    snapshot["browser"] = "Safari";
		} else if (agent.indexOf("Opera") > -1) {
		    snapshot["browser"] = "Opera";
		} else if (agent.indexOf("Firefox") > -1) {
		    snapshot["browser"] = "Firefox";
		} else if (agent.indexOf("MSIE") > -1) {
		    snapshot["browser"] = "Internet Explorer";
		};
	};

	watchFunctions.click = function () {
		console.log('WORKS!');
	};

	watchFunctions.mouseMovement = function () {

	};

	watchFunctions.sessionTime = function () {

	};

	watchFunctions.windowSize = function () {

	};


// ===================== Initialize =========================================
	for(var task in config.watch){
		if(config.watch[task]){
			watchFunctions[task]();
		}
	}

	setInterval(upload, config.refreshRate);
}

main(config);