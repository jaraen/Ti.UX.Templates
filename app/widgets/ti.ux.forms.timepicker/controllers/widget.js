var args = arguments[0],
	moment = require('alloy/moment');


var CUSTOM_PROPS = [
	"title",
	"minDate",
	"maxDate",
	"format", //date format used in value property
	"value",	//date in some format moment library can manage
];

$.id = args.id || 'datePicker';

$.picker.type = args.pickerType || Titanium.UI.PICKER_TYPE_DATE_AND_TIME;

initUI();
initValues();

function initUI(){

	$.picker.visible = true;
	$.picker.maxDate = args.maxDateShow;
	
	//not icon? move the title to the left
	
	//$.titleLbl.text = args.title || '';
	
}


function initValues(){
	
	var value = args.value;
	Ti.API.info('value: ' + value);
	
	/*if(value){
		var t = moment(value, args.format || '');
		$.dateLbl.text = t.calendar();
	}*/

	$.value = value;

}

$.getValue = function(){
	return $.picker.value;
};

require('WidgetTools').cleanArgs(args);


/*function toggleRow(e){
	if($.row.isExpanded){
		$.row.height = "50"; //TODO: use classes instead of fixed size
		$.picker.visible = false;
		$.row.isExpanded = false;
	}else{
		$.row.height = "240"; //TODO: use classes instead of fixed size
		$.picker.visible = true;
		$.row.isExpanded = true;
	}
}*/

function updateLabels(e){
	Ti.API.info('User selected: ' + e.value);
	var t = moment(e.value);
	
	//$.dateLbl.text = t.calendar();
}



