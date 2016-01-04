var config = {
	"url": "/",
	"refreshRate": 2000,
	"watch": {
		"browser": false,
		"click": true,
	}
}

var main = function(config) {
// ================ Data to upload and HTTP request ======================
	var snapshot = {};
	var upload = function() {
		window.XMLHttpRequest.open('POST', config.url, true);
		window.XMLHttpRequest.send(JSON.stringify(snapshot));
	};

// ================ Watch functions ======================================
	
	var watchFunctions = {};

	watchFunctions.browser = function() {
		console.log('WORKS!');
	}

	watchFunctions.click = function() {
		console.log('WORKS!');
	}


// ===================== Initialize ======================================
	for(var task in config.watch){
		if(config.watch[task]){
			watchFunctions[task]();
		}
	}

	//setInterval(upload, config.refreshRate);
}

main(config);