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
	
	var closeBtnView = $.closeBtn.getView();
	if(args.closeButton){
		closeBtnView.visible = true;
		closeBtnView.addEventListener('click', function(e){
			cancelPopup(e);
		});
	}else{
		closeBtnView.visible = false;
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
	
	if (OS_IOS){
		$.bgView.visible = true;
		animation.fadeIn($.bgView, 300, function(e) {
	//		$.bgView.opacity = 1;
		});
	}

};

function fadeOut() {

	if (OS_ANDROID){
		$.bgView.close();
	}else{
		animation.fadeOut($.bgView, 300, function(e) {
			$.bgView.visible = false;
				$.bgView.close();
		});
	}

};

//WTools.cleanArgs(args);
