function listLights() {
	var response = hueApi("", "GET", "");
	var outText = "";
    for(var i=1; i <= len(response); i++) {
		outText += i + ": " + response[i].name + "<br />";
	}
	output(outText);
}

function on() {
	var response = hueApi(lightNumber() + '/state/', 'PUT', '{"on":true}');
	output(JSON.stringify(response));
}

function off() {
    var response = hueApi(lightNumber() + '/state/', 'PUT', '{"on":false}');
	output(JSON.stringify(response));
}

function output(string) {
	document.getElementById("output").innerHTML = string;
}

function len(array) {
	return Object.keys(array).length
}

function lightNumber() {
	var lightNumber = document.getElementById("lightNumber");
	if(lightNumber.value == "") {
		alert("Enter light number in text box");
	}
	return lightNumber.value;
}

// sends http request to the hue api and returns the response as javascript object
// example: hueApi('2/state/', 'PUT', '{"on":true}');
function hueApi(path, action, body) {
	var http = new XMLHttpRequest();
	var url = "http://192.168.0.22/api/newdeveloper/lights/" + path;
	http.open(action, url, false);
	//TODO add body
	http.send(body);
	var response = JSON.parse(http.responseText);
	return response;
}