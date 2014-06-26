var args = arguments[0];
var WTools = require('WidgetTools');

//WTools.setTiProps(args, $.bgView);

function initUI(){

	var children;
	var rows = [];
	$.value = args.value;
	
	if (args.children) {
		
		children = args.children || [];
		
		for(var i = 0, j = children.length; i < j; i++){
			rows.push(children[i]);
		}
		
	}else if(args.options){
		var selectedValue = args.value || null;
		var options = args.options;
		var selectable = args.selectable || false;
		var value = $.value;
		var icon;
		
		for(var i = 0, j = options.length; i < j; i++){
			icon = selectable && value == i ? 'fa-check-circle':undefined;
			rows.push(Alloy.createWidget('ti.ux.rowitem', 'widget', {title:options[i], hasChildren:args.selectable, icon:icon}).getView()); 
		}
		
	}
	
	$.table.data = rows;
	
	if(args.selectable == "true" || args.selectable === true){
		$.table.allowsSelection = true;
	}
}

initUI();

$.show = function(){
	$.popup.show();
};

$.hide = function(){
	$.popup.hide();
};


$.addEventListener = function(event, fn){
	Ti.API.info('on ' + event);
	if (event === 'optionSelected') $.table.optionSelectedCallback = fn;
	else{
		$.popup.addEventListener(event, fn);
	}
};

$.off = function(event, fn){
	if (event === 'optionSelected') $.table.optionSelectedCallback = undefined;
	else{
		$.popup.addEventListener(event, fn);
	}
};


//WTools.cleanArgs(args);





