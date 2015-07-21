var args = arguments[0] || {};
var options = args.options || [];
/*
 * Inputs:
 * 
 * args.options: Required, Array of options (Strings)
 * args.value: Set Value
 * args.title: Add a title to the page
 * args.closeButton: Boolean, display the close/cancel button?
 * args.viewColor: Optional, background color
 * 
 */
var WTools = require('WidgetTools');

var animation = require('alloy/animation');

//WTools.setTiProps(args, $.bgView);

initUI();
initValues();

function initUI(){

	var children;
	$.viewText.text = args.title;
	$.container.backgroundColor = args.viewColor || 'white';
	
	for (var opt in options)
	{
		$.viewPicker.add(Ti.UI.createPickerRow({title: options[opt]}));		
	}
	$.viewPicker.visible = true;
	
	if(args.closeButton){
		$.closeBtn.visible = true;
		$.closeBtn.getView().addEventListener('click', function(e){
			cancelPopup(e);
		});
	}else{
		$.closeBtn.visible = false;
	}
	Ti.API.info("Popup Picker initUI complete");
	
}

function initValues(){
	$.viewPicker.setSelectedRow(0, args.value, true);
	Ti.API.info("Popup Picker initValues complete, initial value: " + args.value);

}

$.value = function(){
	$.viewPicker.getSelectedRow(0);
};

$.show = function(){
	Ti.API.info("Popup Picker show start");
	fadeIn();
	Ti.API.info("Popup Picker show complete");
};

$.hide = function(){
	Ti.API.info("Popup Picker hide start");
	fadeOut();
	Ti.API.info("Popup Picker hide complete");
};

function cancelPopup(e){	

	if(e.source !== $.bgView && e.source !== $.closeBtn.getView()) return;
	
	fadeOut();
}

function fadeIn() {
	$.bgView.open();
	$.bgView.visible = true;
	animation.fadeIn($.bgView, 300, function(e) {
	});

};

function fadeOut() {

	animation.fadeOut($.bgView, 300, function(e) {
		$.bgView.visible = false;
			$.bgView.close();
	});

};
