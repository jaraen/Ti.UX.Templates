
//Validators may return a value (true/false) or call a callback function in case the response is asynchronous

exports.defaultValidator = function(value){
	return value ? true : false;
};

exports.email = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

exports.password = function(value){
	return value && value.length > 4;
};

exports.number = function(value){
	return !isNaN(value);
};


//TODO: replace httpClient by a tcp socket
exports.url = function(url, callback) {		

	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			callback(true);
		},
		onerror : function(e) {
			Ti.API.info('e: ' + JSON.stringify(e));
			callback(false);
		},
		timeout : 5000 
	});
	
	//URL must include protocol. If it does not include any, just add http
	if(url.indexOf('://') === -1){
		url = 'http://' + url;
	}
	
	xhr.open("GET", url);
	xhr.send();

}; 
exports.url.useCallback = true;		//notice that url validator needs to call a callback function

