
if(OS_IOS){
	Alloy.Globals.navWindow = $.navWindow;


	var mod = require('bencoding.blur');
	
	//Blur effect for iOS
	var blurView = mod.createView({
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		blurLevel:5, blurCroppedToRect:false,
	        backgroundView:$.menuView
	});
	
	$.navWindow.addEventListener('open',function(d){
	
		var container = Ti.UI.createView({
			backgroundColor:"#fff", borderRadius:20,
			top:100, height:150, left:40, right:40
		});
		
		blurView.add(container);
		
		var label = Ti.UI.createLabel({
			text:"Show how to blur like the yahoo weather app.",
			color:"#000", width:Ti.UI.FILL,
			height:50, textAlign:"center"
		});
		
		container.add(label);
	
	});	
}

$.navWindow.open();







