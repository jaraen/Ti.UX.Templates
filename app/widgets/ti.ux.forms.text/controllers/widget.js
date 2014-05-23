
var Scope = require(WPATH('Scope'));
var Animations = require('alloy/animation');

var args = arguments[0];

initUI();

function initUI(){
	
	if(args.height)$.view.height = args.height;
	if(args.backgroundColor) $.view.backgroundColor = args.backgroundColor;
	
	if(args.title) $.titleLbl.text = args.title;
	if(args.hintText) $.field.hintText = args.hintText;
	if(args.value) $.field.value = args.value;
	if(args.tipText) $.tipText.text = args.tipText;
	
	//Ti.API.info('args: ' + JSON.stringify(args));
	
	Scope.setupField({params:args, control:$.field});
}


function showValidationError(){
	Animations.shake($.view, 200);
	$.errorText.text = args.errorText || args.tipText;
	$.tipText.visible = false;
	$.alertImage.visible = true;
}

function hideValidationError(){
	$.tipText.visible = true;
	$.errorText.text = '';
	$.alertImage.visible = false;	
}

function focus(e){
	$.field.focus();
}



//Public methods. These methods should exist in every ti.ux.forms component

$.validate = function(callback){
	
	if(!callback) return;
	
	hideValidationError();
	
	if($.field.validate.useCallback){
		$.actInd.show();
		$.field.validate($.field.value, function(e){
			callback(e);
			if(!e){
				showValidationError();
			}
			$.actInd.hide();
		});
	}else{
		var isValid = $.field.validate($.field.value);
		Ti.API.info('isValid: ' + isValid);
		callback(isValid);	
		if(!isValid) showValidationError();
	}
};


$.focus = focus;

$.blur = function(e){
	$.field.blur();
};


$.getField = function(){
	return $.field;
};

$.getFieldValue = function(){
	return $.field.value;
};

