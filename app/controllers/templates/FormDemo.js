
var FIELDS = [
	$.fieldText,
	$.fieldEmail,
	$.fieldUrl,
	$.fieldTextArea,
	$.fieldDate,
	$.fieldOption,
	$.fieldSwitch
];

function validateAndSave(){

	var values = {};
	for(var i = 0, j = FIELDS.length; i< j; i++){
		Ti.API.info('field: ' + FIELDS[i].id + ', value: ' + FIELDS[i].getValue()); 
	}
	
	Alloy.Globals.alert('Settings data is printed in console');
}
