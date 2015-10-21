var Scope = require(WPATH('Scope'));
var Animations = require('alloy/animation');

var args = arguments[0];

initUI();

function initUI() {

	if (args.height)
		$.view.height = args.height;
  else {
    $.view.height = '45dp'; // we need to set this, or he error&tip view can break the widget
  }
	if (args.width)
		$.view.width = args.width;
	if (args.left)
		$.view.left = args.left;
	if (args.right)
		$.view.right = args.right;
	if (args.top)
		$.view.top = args.top;
	if (args.backgroundColor)
		$.view.backgroundColor = args.backgroundColor;

	//if(args.title) $.titleLbl.text = args.title;
	//if(args.hintText) $.field.hintText = args.hintText;
	//if(args.value) $.field.value = args.value;
	//if(args.tipText) $.tipText.text = args.tipText;
	if (args.title)
		$.lblHintText.text = args.title;
	if (args.iconFont) {
		$.lblHintIcon.text = args.iconFont;
		$.field.right = '25dp';
	}
	//Ti.API.info('args: ' + JSON.stringify(args));

	Scope.setupField({
		params : args,
		control : $.field
	});
}

function showValidationError() {
	Animations.shake($.view, 200);
	$.errorText.text = args.errorText || args.tipText;
	$.tipText.visible = false;
	$.lblHintIcon.visible = false;
	$.alertImage.visible = true;
  bindDisplayMessage();
}

function hideValidationError() {
	$.tipText.visible = true;
	$.errorText.text = '';
	$.lblHintIcon.visible = true;
	$.alertImage.visible = false;
  unBindDisplayMessage();
}

function bindDisplayMessage() {
  $.alertImage.addEventListener('click', displayMessage);
}

function unBindDisplayMessage() {
  $.alertImage.removeEventListener('click', displayMessage);
}


function displayMessage() {
  Ti.API.debug('*** In Form Text Widget: displaying aux message.');

  var msgContainer = Ti.UI.createView({
    height: Ti.UI.FILL,
    width: Ti.UI.FILL,
    backgroundColor: 'red',
    opacity: 0.9,
    zIndex: 100
  });
  $.view.add(msgContainer);

  var msg = Ti.UI.createLabel({
    text: $.errorText.text,
    color: 'white',
    touchEnabled: false,
    width: '90%'
  });
  msgContainer.add(msg);

  msgContainer.addEventListener('click', function(e) {
    Ti.API.debug('*** In Form Text Widget: cleaning up.');
    $.view.remove(e.source);
    // Remove the event listener, since it's no longer needed
    this.removeEventListener('click', arguments.callee);
    hideValidationError();
  });
}

function focus(e) {
	$.field.focus();
}

//Public methods. These methods should exist in every ti.ux.forms component

$.validate = function(callback) {

	if (!callback)
		return;

	hideValidationError();

	if ($.field.validate.useCallback) {
		$.actInd.show();
		$.field.validate($.field.value, function(e) {
			callback(e);
			if (!e) {
				showValidationError();
			}
			$.actInd.hide();
		});
	} else {
		var isValid = $.field.validate($.field.value);
		Ti.API.info('isValid: ' + isValid);
		callback(isValid);
		if (!isValid)
			showValidationError();
	}
};

$.labelsView.addEventListener('click', function() {
	Animations.fadeOut($.lblHintText, 300);
});
$.lblHintIcon.addEventListener('click', function() {
	$.field.value = "";
	$.field.focus();
});

$.field.addEventListener('focus', function(e) {
	Animations.fadeOut($.lblHintText, 300);
});

$.field.addEventListener('blur', function(e) {
	if (e.value.length == 0) {
		Animations.fadeIn($.lblHintText, 300);
	}

});

$.focus = focus;

$.blur = function(e) {
	$.field.blur();
};

$.getField = function() {
	return $.field;
};

$.getFieldValue = function() {
	return $.field.value;
};

