
var validators = require('validators');

var KEYBOARD_ASCII = Ti.UI.KEYBOARD_ASCII, 
	KEYBOARD_DECIMAL_PAD = Ti.UI.KEYBOARD_DECIMAL_PAD, 
	KEYBOARD_DEFAULT = Ti.UI.KEYBOARD_DEFAULT, 
	KEYBOARD_EMAIL = Ti.UI.KEYBOARD_EMAIL, 
	KEYBOARD_NAMEPHONE_PAD = Ti.UI.KEYBOARD_NAMEPHONE_PAD, 
	KEYBOARD_NUMBERS_PUNCTUATION = Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION, 
	KEYBOARD_NUMBER_PAD = Ti.UI.KEYBOARD_NUMBER_PAD, 
	KEYBOARD_PHONE_PAD = Ti.UI.KEYBOARD_PHONE_PAD, 
	KEYBOARD_URL = Ti.UI.KEYBOARD_URL;
	
var TEXT_AUTOCAPITALIZATION_NONE = Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE;
	
var RETURNKEY_DONE = Ti.UI.RETURNKEY_DONE, 
	RETURNKEY_NEXT = Ti.UI.RETURNKEY_NEXT;
/*	RETURNKEY_DEFAULT = Ti.UI.RETURNKEY_DEFAULT, 
 	RETURNKEY_EMERGENCY_CALL, //return key types not supported (not found a good reason to use them in forms)
 	RETURNKEY_GO = Ti.UI.RETURNKEY_GO, 
	RETURNKEY_GOOGLE, 
	RETURNKEY_JOIN, 
	RETURNKEY_ROUTE, 
	RETURNKEY_SEARCH, 
	RETURNKEY_SEND,
	RETURNKEY_YAHOO.
*/	

exports.setupField = function (args){
	
	var params = args.params || {};
	var control = args.control;
	Ti.API.info('params: ' + JSON.stringify(params));
	
	if(!control) return;
	
	var type = params.inputType || "text";
	Ti.API.info('set type ' + type);
	
	control.value = params.value || '';
	
	//setup keyboard and default validators
	if(type == "text"){
		setTypeText(control);
		
	}else if(type == "password"){
		setTypePassword(control);		
		
	}else if(type == "email"){
		setTypeEmail(control);
		
	}else if(type == "phone"){
		setTypePhone(control);
		
	}else if(type == "number"){
		setTypeNumber(control);
		
	}else if(type == "url"){
		setTypeUrl(control);
	}else if(type == "textarea"){
		setTypeTextArea (control);
	}
	
	if(params.validate) control.validate = params.validate;		//overwrite with custom validate method if it has defined
	
	//setup return key. By default, it is always the next key (except done is defined)
	control.returnKeyType = RETURNKEY_DONE;
	
	//if it is mandatory, disable return key until there's at least on character
	control.enableReturnKey = false;
	
}


function setTypeText(control){
	control.validate = validators.defaultValidator;
	control.autocorrect = false;
}

function setTypeTextArea(control){
	control.validate = validators.defaultValidator;
	control.autocorrect = true;
	
	control.addEventListener('focus', function(){	//show a modal window to input data to the textarea
		Ti.API.info('focus textarea ' + control.value);
		control.blur();
		var win = Alloy.createWidget('ti.ux.forms.row.text', 'TextAreaWin', {value:control.value}).getView();
		
		win.open({modal:true});
		
		win.addEventListener('save', function(e){
			control.value = e.value;
		});
		
		win.addEventListener('cancel', function(e){
			Ti.API.info('textarea editing cancelled');
		});
		
	});
}

function setTypePassword(control){
	control.passwordMask = true;
	control.validate = validators.password;
	control.autocorrect = false;
}

function setTypeEmail(control){
	control.keyboardType = KEYBOARD_EMAIL;
	control.validate = validators.email;
	control.autocapitalization = TEXT_AUTOCAPITALIZATION_NONE
	control.autocorrect = false;
}

function setTypePhone(control){
	control.keyboardType = KEYBOARD_NUMBERS_PUNCTUATION;
	control.validate = validators.defaultValidator;
}

function setTypeUrl(control){
	control.keyboardType = KEYBOARD_URL;
	control.validate = validators.url;	
	control.autocapitalization = TEXT_AUTOCAPITALIZATION_NONE
	control.autocorrect = false;
}

function setTypeNumber(control){
	control.keyboardType = KEYBOARD_NUMBERS_PUNCTUATION;
	control.validate = validators.url;
}

