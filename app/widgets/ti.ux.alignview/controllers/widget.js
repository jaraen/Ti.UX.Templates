
var args = arguments[0];
var WTools = require('WidgetTools');


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
		
		// fix: https://jira.appcelerator.org/browse/TC-3583 (thx, fokke!)
		if (!children[i]) {
			continue;
		}
		
		views.push(children[i]);
		$.view.add(children[i]);		//we need to draw before positione it to know its real width
	}
	
	$.childrenViews = views;
	
	//postLayout event does not work if the parents container also is listening to this event
	$.view.addEventListener('postlayout', sortChildren);
	
	//TODO: This is a workaroung for the postlayout issues. Not a good practice, btw.
	// setTimeout(sortChildren, 200);
	
}

var didSort = false;

function sortChildren(){
	if(!didSort){
		var views = $.childrenViews;
		
		//$.view.removeEventListener('postlayout', sortChildren);
		var w = 0, factor = 0;
		
		if(args.width){
			w = args.width;	
			factor = 0.5;
		}else{
			w = $.view.rect.width;
			factor = 1;
		}
		
		var distance = (w / views.length);
		
		//we want to distribute horizontally all elements based on their vertical center axis
		for(var i = 0, j = views.length; i < j; i++){
			
			views[i].left = distance * (i + factor) - views[i].rect.width / 2 - distance / 2;
			Ti.API.info('width element ' + views[i].rect.width + ' w ' + w + ' distance: ' + distance + ' final left: ' + views[i].left);
			
		}
		didSort = true;
	}	
}


