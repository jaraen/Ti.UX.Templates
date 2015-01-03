
var args = arguments[0];
var WTools = require('WidgetTools');

var dots = {
	active: 0,
	total: 0,
	views: []
};

WTools.setTiProps(args, $.view);

$.linkScrollableView = function(scrollable){
	
	if(!scrollable || !scrollable.views){
		Ti.API.warning('WARNING: ti.ux.pagingcontrol.linkScrollableView(): scrollable not found or does not contain views');
		return;
	}
	
	var countViews = scrollable.views.length;
	var views = [];
	
	for(var i = 0; i < countViews; i++){
		views.push(Alloy.createWidget('ti.ux.pagingcontrol', 'dot',{left:8*i}).getView());
		$.view.add(views[i]);
		views[i].deactivate();
	}
		
	dots.views = views;
	dots.total = countViews;
	
	if(countViews) $.setActiveDot(0);
	
	views[0].activate();
};



$.setActiveDot = function(index){
	if(dots.views[index]){
		dots.views[dots.active].deactivate();
		dots.views[index].activate();
		dots.active = index;
	}
};


