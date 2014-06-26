
var args = arguments[0];
var WTools = require('WidgetTools');

WTools.setTiProps(args, $.scrollable);

$.scrollable.disableBounce = args.disableBounce;

if(OS_IOS){ //todo: review android version
	if (args.children) {
		$.scrollable.views = args.children; 
	}
}

//WTools.cleanArgs(args);


/* SCROLLABLE VIEW FUNCTIONS */

function linkScrollableView(){
	$.scrollable.removeEventListener('postlayout', linkScrollableView);
	$.pagingControl.linkScrollableView($.scrollable);
}

function updatePagingControl(e){
	$.pagingControl.setActiveDot(e.currentPage);
}