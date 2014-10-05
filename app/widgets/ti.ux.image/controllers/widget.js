"use strict";

var args = arguments[0] || {};
var WTools = require('WidgetTools');

var SUPPORTED_PROPS = [
	'innerMargin',
	'imageHeight',
	'realTop',		//For parallax fx, we need an approximate top real position in the screen
	'zoomable'
];

var REAL_TOP = 0;

initUI();

function initUI(){

	//Container init
	REAL_TOP = args.realTop || 0;
	WTools.setTiProps(args, $.container);
	
	//imageView init
	$.imageView = $.img.getView();
	$.img.init(args);
	
	if(args.zoomable){
	    $.img.setZoomable(true);
	}
	
	if(args.innerMargin){
		
		//parse values to int or it will concat them as strings if props were set in the xml
		$.imageView.height = parseInt(args.height) + parseInt(args.innerMargin); 
		$.imageView.top = $.imageView._top = - args.innerMargin / 2;
		
	}else if(args.imageHeight){
		
		$.imageView.height = args.imageHeight;
		$.imageView.top = $.container.height - $.imageView.height;
		
	}

	WTools.cleanArgs(args);
	
}

$.updateScroll = function(e){
	if(OS_IOS) $.imageView.top = $.imageView._top + (e.contentOffset.y - REAL_TOP) / 5;
}

exports.set = function(params){
	
	$.img.init(params);
	
	if(params.zoomable){
	    $.img.setZoomable(true);
	}
}


//alternative method for parallax fx
/*var lastPos = 0;
$.updateScroll = function(e){
	Ti.API.info('lastPos: ' + lastPos + ' offset: ' + e.contentOffset.y + ' lastPos-offset: ' + (lastPos-e.contentOffset.y));
	
	$.imageView.top += (lastPos - e.contentOffset.y) ;
	lastPos = e.contentOffset.y;
}*/
