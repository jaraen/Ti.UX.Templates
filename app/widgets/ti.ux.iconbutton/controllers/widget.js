
var args = arguments[0];
var WTools = require('WidgetTools');

var IconicFont = require(WPATH('IconicFont')),
	fontawesome = new IconicFont({
		font: WPATH('FontAwesome')
	});

function initUI(){

	WTools.setTiProps(args, $.btn);
	
	$.init(args);

	WTools.cleanArgs(args);
}

//returns the whole map of charcodes
$.getCharMap = function(){
	return fontawesome.font.charcode || {};
};

$.setIcon = function(codename){
	$.btn.title = fontawesome.icon(codename);	
};

$.init = function(argsInit){

	$.btn.font = {
		fontSize: args.size || 24,
		fontFamily: fontawesome.fontfamily
	};

	if(argsInit.iconColor) $.btn.color = args.iconColor;
	
	if(argsInit.icon) {
		$.btn.title = fontawesome.icon(args.icon);
	}
};


initUI();
