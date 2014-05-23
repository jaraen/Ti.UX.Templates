
var args = arguments[0] || {};

var animation = require('alloy/animation');


if(OS_ANDROID){
    $.img.image = args.image;
}else{
    $.img.image = args.image;
}


if (OS_IOS) {
	$.scroll.addEventListener('click', fadeout);
	
	function fadein() {

		animation.fadeIn($.scroll, 300, function(e) {
			Ti.API.info('fade in window');
		});

	};

	function fadeout() {

		animation.fadeOut($.win, 300, function(e) {
			$.win.close();
		});

	};
	
}
