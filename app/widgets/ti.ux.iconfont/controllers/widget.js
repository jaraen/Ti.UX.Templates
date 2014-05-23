
var args = arguments[0] || {};
var WTools = require('WidgetTools');

var fontawesome = require(WPATH('IconicFont')).IconicFont({
	font: WPATH('FontAwesome'),
	ligature: false	// optional
});


function initUI(){

	WTools.setTiProps(args, $.iconLbl);
	
	$.init(args);

	WTools.cleanArgs(args);
}


//returns the whole map of charcodes
$.getCharMap = function(){
	return fontawesome.getCharMap() || {};
};

$.setIcon = function(codename){
	$.iconLbl.text = fontawesome.icon(codename);	
};

$.init = function(argsInit){

	$.iconLbl.font = {
		fontSize: args.size || 24,
		fontFamily: fontawesome.fontfamily()
	};

	if(argsInit.iconColor) $.iconLbl.color = args.iconColor;
	
	if(argsInit.icon) {
		$.iconLbl.text = fontawesome.icon(args.icon);
	}
};


initUI();

