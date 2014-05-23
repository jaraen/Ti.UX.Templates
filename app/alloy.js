// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Loads the map module, which can be referenced by Alloy.Globals.Map

/**
 * The Titanium UX Template Library
 * http://www.uxmobilepatterns.com
 * 
 * Please visit the web for more info on the project
 */

Alloy.Globals.Map = require('ti.map');


Alloy.Globals.alert = function(message){
	var dialog = Ti.UI.createAlertDialog({
	    message: message,
	    ok: 'OK',
	    title: Alloy.CFG.appName
	});
	dialog.show();
	return dialog;
};
