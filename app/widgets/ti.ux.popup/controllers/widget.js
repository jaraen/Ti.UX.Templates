var args = arguments[0];
var WTools = require('WidgetTools');

var animation = require('alloy/animation');

//WTools.setTiProps(args, $.bgView);

initUI();

function initUI(){

	var children;

	if (args.children) {
		
		children = args.children|| [];
		
		if(OS_IOS){
			$.container.add(children);
		}
		
		if(OS_ANDROID){
			for(var i = 0, j = children.length; i < j; i++){
				$.container.add(children[i]);
			}
		}
		
	}
	
	if(args.closeButton){
		$.closeBtn.visible = true;
		$.closeBtn.getView().addEventListener('click', function(e){
			cancelPopup(e);
		});
	}else{
		$.closeBtn.visible = false;
	}
	
}

$.show = function(){
	fadeIn();
};

$.hide = function(){
	fadeOut();
};

function cancelPopup(e){	

	if(e.source !== $.bgView && e.source !== $.closeBtn.getView()) return;
	
	fadeOut();
}

function fadeIn() {
	$.bgView.open();
//	$.bgView.opacity = 0;
	$.bgView.visible = true;
	animation.fadeIn($.bgView, 300, function(e) {
//		$.bgView.opacity = 1;
	});

};

function fadeOut() {

	animation.fadeOut($.bgView, 300, function(e) {
		$.bgView.visible = false;
			$.bgView.close();
	});

};

//WTools.cleanArgs(args);