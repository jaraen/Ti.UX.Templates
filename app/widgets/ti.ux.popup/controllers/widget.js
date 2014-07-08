var animation = require('alloy/animation');


var args = arguments[0];
var children = args.children || [];
var showCloseButton = !!args.showCloseButton;

initUI(children, showCloseButton);


function initUI(children, showCloseButton) {
    children.map(function (child) {
        $.container.add(child);
    });

    if (showCloseButton) {
        try {
            $.closeBtn = Alloy.createWidget('ti.ux.iconbutton', {
                icon: 'fa-times-circle',
                size: 26,
                iconColor: 'black'
            });
            var closeBtnView = $.closeBtn.getView();

            var closeButtonStyle = $.createStyle({classes: 'close-button'});
            closeBtnView.applyProperties(closeButtonStyle);

            $.view.add(closeBtnView);
        } catch (e) {
            Ti.API.error("Add 'ti.ux.iconbutton' to use close button.");
        }
    }

    $.bgView.opacity = 0.0;
}

$.show = function () {
    fadeIn();
};

$.hide = function () {
    fadeOut();
};

function cancelPopup(e) {
    var view = e.source;
    if (
        view !== $.bgView &&
        ($.closeBtn == null || view !== $.closeBtn.getView())
    ) return;

    $.hide();
}

function fadeIn() {
    $.bgView.open();
    animation.fadeIn($.bgView, 300);
}

function fadeOut() {
    animation.fadeOut($.bgView, 300, function (e) {
        $.bgView.close();
    });
}