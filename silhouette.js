var config = {
	"url": "/",
	"refreshRate": 3000,
	"watch": {
		"ipAddress": false,
		"browser": false,
		"sessionTime": false,
		"windowSize": false,
		"click": false,
		"mouseMovement": true
	}
}

var main = function(config) {
// ================ Data to upload and HTTP request ======================
	// 'snapshot' stores all the data collected by 'watchFunctions' methods.
	var snapshot = {};

	var upload = function() {
		if(config.watch["sessionTime"] === true){
			watchFunctions.sessionTime();
		}

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
		} else {
			snapshot["browser"] = "Unknown";
		};
	};

	watchFunctions.click = function () {
		snapshot["clicks"] = snapshot["clicks"] || [];

		document.getElementsByTagName("body")[0].onclick = function(event){
			var clickEvent = {};
			clickEvent.x = event.pageX;
			clickEvent.y = event.pageY;
			clickEvent.timeStamp = event.timeStamp;

			snapshot["clicks"].push(clickEvent);
		};
	};

	watchFunctions.mouseMovement = function () {
		snapshot["mouseMovement"] = [];

		document.getElementsByTagName("body")[0].onmousemove = function(event){
			if(event.timeStamp % 5 === 0){
				var moveEvent = {};
				moveEvent.x = event.pageX;
				moveEvent.y = event.pageY;
				moveEvent.timeStamp = event.timeStamp;
				
				snapshot["mouseMovement"].push(moveEvent);
			}
		};
	};

	watchFunctions.sessionTime = function () {
		snapshot["sessionTime"] = snapshot["sessionTime"] + config["refreshRate"] || 0;
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