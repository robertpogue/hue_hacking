//////////////////////////////////////////////////////////
////              Button handlers                     ////
function listLightsButton() {
	var response = hueApi("", "GET", "");
	var outText = "";
    for(var i=1; i <= len(response); i++) {
		outText += i + ": " + response[i].name + "<br />";
	}
	output(outText);
}

function onButton() {
	on(lightNumberBox());
}

function offButton() {
	off(lightNumberBox());
}

function redButton() {
	red(lightNumberBox());
}

function greenButton() {
	green(lightNumberBox());
}

function blueButton() {
	blue(lightNumberBox());
}

function xmasPartyButton() {
	for(var i=6; i<=10; i++) {
			off(i);
	}
	sleep(1000);
	for(var i=0; i<3; i++) {
		// random
		for(var r=0; r<10; r++) {
			for(j=6; j<=10; j++) {
				if(Math.random() > .5) red(j);
				else green(j);
			}
			sleep(500);
		}
		// twirl
		for(var j=0; j<2; j++) {
			for(var k=6; k<=10; k++) {
				red(k);
				sleep(300);
				green(k);
			}
		}
		for(var i=6; i<=10; i++) {
			off(i);
		}
	}
	output("The party's over...");
}

// returns current value of light button text box
function lightNumberBox() {
	var lightNumberBox = document.getElementById("lightNumberBox");
	if(lightNumberBox.value == "") {
		alert("Enter light number in text box");
	}
	return lightNumberBox.value;
}

function output(string) {
	document.getElementById("output").innerHTML = string;
}

//////////////////////////////////////////////////////////
//// Behavior methods - independent of user interface ////

function on(light) {
	var response = hueApi(light + '/state/', 'PUT', '{"on":true}');
	output(JSON.stringify(response));
}

function off(light) {
    var response = hueApi(light + '/state/', 'PUT', '{"on":false}');
	output(JSON.stringify(response));
}

function red(light) {
	on(light);
	var response = hueApi(light + '/state/', 'PUT', '{"hue":0, "sat":255}')
	output(JSON.stringify(response));
}

function green(light) {
	on(light);
    var response = hueApi(light + '/state/', 'PUT', '{"hue":25500, "sat":255}')
	output(JSON.stringify(response));
}

function blue(light) {
	on(light);
	var response = hueApi(light + '/state/', 'PUT', '{"hue":46920, "sat":255}')
	output(JSON.stringify(response));
}

//////////////////////////////////////////////////////////
////                Utility functions                 ////

function len(array) {
	return Object.keys(array).length
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}