
//this is a shared scope for all RemoteImageViews component, as discussed here:
//http://developer.appcelerator.com/question/149848/alloy-controllers-scope-vs-commonjs-modules

exports.NO_IMAGE = '/images/no_image.jpg';
exports.TI_CACHE_DIR = Ti.Filesystem.applicationCacheDirectory;
exports.TI_RESOURCES_DIR = Ti.Filesystem.resourcesDirectory;
exports.TI_FILL = Ti.UI.FILL;
exports.DISPLAY_WIDTH = Ti.Platform.displayCaps.platformWidth;
 
if(OS_IOS) exports.TI_DARK_INDICATOR = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
if(OS_ANDROID) exports.TI_DARK_INDICATOR = Ti.UI.ActivityIndicatorStyle.DARK;



exports.resizeWidth = function(args) {
    
    var args = args || {};
    var blob = args.blob || {};
    
    var imageWidth = blob.width,
    	imageHeight = blob.height,
    	newWidth = args.width;
    	
    if (imageWidth <= 0 || imageHeight <= 0 || newWidth <= 0)
        return blob;
	
	if(imageWidth < newWidth) return blob;
	
    var ratio = imageWidth / imageHeight;

    var w = newWidth;
    var h = newWidth / ratio;

    return blob.imageAsResized(w, h);
}


exports.downloadImage = function(args) {

    var args = args || {};

    var filename = args.filename,
        url = args.url,
        imageView = args.imageView,
        container = args.container;
	Ti.API.info('url: ' + url)
    var client = Ti.Network.createHTTPClient();

    var actInd = Ti.UI.createActivityIndicator({
        style: exports.TI_DARK_INDICATOR,
        width: exports.TI_FILL,
        height: exports.TI_FILL,
        color:'#bbb',
        font:{fontSize:12}
    });

    container.add(actInd);

    actInd.show();

    client.ondatastream = function(e) {
        actInd.message = ' ' + parseInt(e.progress * 100) + '%';
    };

    function removeLoadIndicator(){
    	Ti.API.info('removing indicator');
        actInd.hide();
        container.remove(actInd);
        actInd = null;
    }

    client.onload = function() {
		Ti.API.info('onload')
        if (client.status == 200) {
            //try{
            	var file = Ti.Filesystem.getFile(filename);

                file.write(this.responseData);
                
                if(OS_IOS){
		            imageView.image = file;
	            }else{
					imageView.image = exports.resizeWidth({blob: file.read(),  width: exports.DISPLAY_WIDTH});        	
	            }
	            
                if(OS_IOS && file.exists()) container.fireEvent('downloaded', {cacheFilePath: file.getNativePath() });
                if(OS_ANDROID) container.image = file.getNativePath(); //do this since the container is the public object on android

            //}catch(err){
            //    Ti.API.info('ERROR WRITING FILE: ' + JSON.stringify(err));
            //}

        } else {
            Ti.API.info('RemoteImage: Error downloading file ' + url);
            // imageView.image = exports.NO_IMAGE;
        }
        removeLoadIndicator();
    };

    client.error = function(e) {
        Ti.API.info('RemoteImage: Error downloading file: ' + url);
        imageView.image = exports.NO_IMAGE;
        removeLoadIndicator();
    };

    client.timeout = 10000;

    client.open('GET', url);

    client.send();
}



//Applies a style to a component
//TODO: rewrite to use WidgetTools.setTiProps
exports.applyProperties = function( _component, _style) {
	var _style = _style || {};
	_component = mixin(_component, _style);
};

//Extend an object with the properties from another 
function mixin(/*Object*/ target, /*Object*/ source){
	var name, s, i;
	var empty = {};
	for(name in source){
		s = source[name];
		if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
			target[name] = s;
		}
	}
	return target;
};

exports.mixin = function(/*Object*/ obj, /*Object...*/ props){
	if(!obj){ obj = {}; }
	for(var i=1, l=arguments.length; i<l; i++){
		mixin(obj, arguments[i]);
	}
	return obj; // Object
};

//create a new object, combining the properties of the passed objects with the last arguments having
//priority over the first ones
exports.combine = function(/*Object*/ obj, /*Object...*/ props) {
	var newObj = {};
	for(var i=0, l=arguments.length; i<l; i++){
		mixin(newObj, arguments[i]);
	}
	return newObj;
};

