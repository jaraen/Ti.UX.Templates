var args = arguments[0];
var Scope = require(WPATH('Scope'));
var Animations = require('alloy/animation');

var CUSTOM_PROPS = [
	"title",
	"hintText",
	"value",	//true|false
];


initUI();

function initUI(){

	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}
	
	$.titleLbl.text = args.title || '';
	$.field.hintText = args.hintText || '';
	$.field.value = args.value || '';
	$.alertIcon.getView().opacity = 0;
	
	Scope.setupField({params:args, control:$.field});
}

function showValidationError(){
	var icon = $.alertIcon.getView();
	Animations.fadeIn(icon);
	Animations.shake($.field, 200);
}

function hideValidationError(){
	var icon = $.alertIcon.getView();
	Animations.fadeOut(icon);

}

function focus(e){
	$.field.focus();
}

function validate(e){
	$.validate();
}

//Public methods. These methods should exist in every ti.ux.forms component

$.validate = function(callback){
		
	hideValidationError();
	
	if($.field.validate.useCallback){
		$.actInd.show();
		$.field.validate($.field.value, function(e){
			if(callback)callback(e);
			if(!e){
				showValidationError();
			}
			$.actInd.hide();
		});
	}else{
		var isValid = $.field.validate($.field.value);
		Ti.API.info('isValid: ' + isValid);
		if(callback)callback(isValid);	
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

require('WidgetTools').cleanArgs(args);








