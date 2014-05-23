
var args = arguments[0];
var WTools = require('WidgetTools');

WTools.setTiProps(args, $.widget);


function initUI(){
	$.setText(args.text);
	$.setIcon(args.icon);
	if(args.color) $.setColor(args.color);
}

$.setText = function(str){
	$.label.text = str || '';
};

$.setColor = function(color){
	$.label.color = color;
	$.icon.getView().color = color;
};

$.setIcon = function(iconcode){
	$.icon.setIcon(iconcode);
};

initUI();

WTools.cleanArgs(args);