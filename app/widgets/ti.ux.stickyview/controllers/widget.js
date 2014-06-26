
var args = arguments[0];
var WTools = require('WidgetTools');

var VIEW_VISIBLE = true;
var ORIGINAL_OFFSET = 0, ORIGINAL_TOP = 0;

init();

function init(){
	
	WTools.setTiProps(args, $.view);
	drawChildren(args.children);

	WTools.cleanArgs(args);
	
}

function drawChildren(children){
	
	var views = [];
	
	if (!children || children.length === 0) {
		return;	
	}
	
	//remove other platforms views if they exist
	for(var i = 0, j = children.length; i < j; i++){
		Ti.API.info('adding children to sticky view');
		// fix: https://jira.appcelerator.org/browse/TC-3583 (thx, fokke!)
		if (!children[i]) {
			Ti.API.info('no children!');
			continue;
		}
		
		views.push(children[i]);
		$.view.add(children[i]);
	}
	ORIGINAL_OFFSET = -(parseInt($.view.height) + parseInt($.view.top));
	ORIGINAL_TOP = parseInt($.view.top);
	newTop = ORIGINAL_TOP;
	
}


var y = 0, lastY = 0, offset = 0, newTop = 0;

$.updateScroll = function(Y){
	
	y = Y;
	
	if(y < 0) return;		//avoid bounce effect in tables/lists
	
	//if(y > e.contentSize.height) return;		//avoid bounce effect in tables/lists. 
	
	offset = y - lastY;		//offset > 0 is scrolling down, < 0 scrolling up
	
	lastY = y;
		
	if((!VIEW_VISIBLE && offset > 0)) {
		return;
	}else if((VIEW_VISIBLE && offset < 0 && $.view.top < ORIGINAL_OFFSET)){
		return;
	}
	
	newTop -= offset;
	
	if(newTop <= ORIGINAL_OFFSET){
		VIEW_VISIBLE = false;
		newTop = ORIGINAL_OFFSET;
	}else if(newTop >= ORIGINAL_TOP){
		VIEW_VISIBLE = true;		
		newTop = ORIGINAL_TOP;
	}
	
	$.view.top = newTop;
	
};



$.hide = function(offset){

	$.view.animate({top: - ORIGINAL_OFFSET}, function(){
		VIEW_VISIBLE = false;
	});	

};
$.show = function(offset){

	$.view.animate({top: ORIGINAL_TOP}, function(){
		VIEW_VISIBLE = true;
	});	

};



