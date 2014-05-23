var args = arguments[0];

$.view.left = args.left;

$.view.activate = function(){
	$.resetClass($.view, "view-pagingcontrol-dot view-pagingcontrol-dot-active");
	$.view.left = args.left;
};

$.view.deactivate = function(){
	$.resetClass($.view, "view-pagingcontrol-dot view-pagingcontrol-dot-inactive");
	$.view.left = args.left;
};
