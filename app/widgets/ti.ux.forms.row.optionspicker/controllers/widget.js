var args = arguments[0];

var TYPE_OPTION_DIALOG = 'dialog',
	TYPE_POPUP = 'popup',
	TYPE_MODALWINDOW = 'modalwindow';

var CUSTOM_PROPS = [
	"title",
	"hintText",	
	"options",	//Values to show by the picker. An array of values or a string containing several values separated by '|' char
	"type",		//What kind of picker opens: optiondialog, popup, modalwindow
	"value",	//Selected value, as index of the options array. Use -1 to not show any value by default (hintText will be shown instead)
];

$.id = args.id || 'optionPicker';

initUI();
initValues();

function initUI(){

	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}
	
	$.titleLbl.text = args.title || '';
	
}

function initValues(){
	
	var allValues = prepareValues(args.options);

	var value = args.value;
	
	//Ti.API.info('allValues: ' + JSON.stringify(args) + ' ' + value);	
	
	if(typeof value !== 'undefined' && value !== -1 && value !== "-1"){

		value = parseInt(value);
		
		if(value < allValues.length){
			$.subtitleLbl.text = allValues[value];
		}else{
			console.warn('ti.ux.forms.optionspicker: value is out of index');
		}
		
	}else if(args.hintText){
		$.subtitleLbl.text = args.hintText;
	}

	$.OPTIONS = allValues;
	$.value = value;
}

function openPicker(e){
	
	//use OPTION DIALOG as default selector
	var type = (args.dialogType || TYPE_OPTION_DIALOG).toLowerCase();
	
	if(type === TYPE_OPTION_DIALOG){
		//Ti.API.info('ti.ux.forms.optionspicker: option dialog');
		$.dialog.options = $.OPTIONS;
		if(args.cancel) $.dialog.cancel = args.cancel;
		$.dialog.show();
	}else if(type === TYPE_POPUP){
		//Ti.API.info('ti.ux.forms.optionspicker: popup');		
		var popupDialog = Alloy.createWidget('ti.ux.popup.list', 'widget', {closeButton:false, selectable:true, options:$.OPTIONS, value:$.value});

		popupDialog.getView('table').addEventListener('click', function(e){
			//Ti.API.info('optionSelected ' + JSON.stringify(e));
			$.value = e.index;
			$.subtitleLbl.text = e.row.data.title;
			popupDialog.hide();
		});
		
		popupDialog.getView().show();
		
	}else if(type === TYPE_MODALWINDOW){
		Ti.API.info('ti.ux.forms.optionspicker: modal window');
		alert('modal window not implemented yet');
	}
}

function optionSelected(e){
	var index = e.index;

	if(index === -1 || index == args.cancel) return;
	
	$.value = index;
	$.subtitleLbl.text = $.OPTIONS[index];
}

//Values argument can be an array of values or a string with values separated by character |
//Returns an array of values
function prepareValues(values){
	
	var values = values || '';
	
	if(Array.isArray(values)){
		return values;
	}
	
	//not an array, split by '|' character
	return values.split('|');
}


$.getOptions = function(){
	return $.OPTIONS || [];
};

$.getValue = function(){
	return $.value;
};

require('WidgetTools').cleanArgs(args);








