
var Scope = require(WPATH('scope'));

var args0 = arguments[0] || {};



exports.init = function(args){
	
	var args = args || {};

    if(args !== args0){
        args = Scope.combine(args, args0);
    }

	var image = args.image;

	//Ti.API.info('RemoteImageView. Loading image: ' + image);
	
	if(!image) return;

	delete args.image; //avoid conflict with native property

	var codedFilename = Ti.Utils.md5HexDigest(image);
	
	if(Titanium.Platform.displayCaps.density === 'high'){
		codedFilename += '@2x';
	}

	var cachePath = Scope.TI_CACHE_DIR + codedFilename;

    var file = Ti.Filesystem.getFile(Scope.TI_CACHE_DIR, codedFilename);

	if(file.exists()){		//exists in cache, do not call to server
		// Ti.API.info('File exists')
		
		applyImageProperties(args);
		
		if(OS_IOS){
			$.img.image = file.read();			
		}else{
			$.img.image = Scope.resizeWidth({blob: file.read(),  width: Scope.DISPLAY_WIDTH});
			
	        $.imgContainer.image = file.getNativePath(); //do this since the container is the public object on android			
		}

        
	}else if(Ti.Filesystem.getFile(Scope.TI_RESOURCES_DIR, image).exists()){	//check if exists in local resources
		file = Ti.Filesystem.getFile(Scope.TI_RESOURCES_DIR, image);
		Ti.API.info('image exists in resources dir')
		$.img.image = file.read();
		applyImageProperties(args);

	}else{
		
		Ti.API.info('File does not exists. DOWNLOAD AND CACHE IMAGE')

		// args.defaultImage = Scope.NO_IMAGE;	//set a default image while is downloaded (should be a local image)
		args.justDownloaded = true; 	//lets the parent view to know if may need refresh
		
		applyImageProperties(args);
		
		Scope.downloadImage({
			file:file, 
			filename: file.getNativePath(),
			url:image, 
			imageView: $.img,
			container: OS_IOS?$.img:$.imgContainer
		});
	}
	
	$.img.cacheFilePath = file.getNativePath();
	
}

function applyImageProperties(props){
	
	if(OS_IOS){
		Scope.applyProperties($.img, props);
	}
	if(OS_ANDROID){
		Scope.applyProperties($.imgContainer, props);
	}
}


exports.addEventListener = function(eventName, callback){
	if(OS_IOS){
		$.img.addEventListener(eventName, callback);
	}else{
		$.imgContainer.addEventListener(eventName, callback);	
	}
};

exports.removeEventListener = function(eventName, callback){
	if(OS_IOS){
		$.img.removeEventListener(eventName, callback);
	}else{
		$.imgContainer.removeEventListener(eventName, callback);	
	}
};

exports.setZoomable = function(value) {
	$.img.addEventListener('click', function(e){
		if($.img.image){
			var win = Alloy.createWidget('com.criteriastudio.RemoteImageView', 'zoomWin', {image:$.img.cacheFilePath}).getView();
			win.open();
		}
	});
}

if(args0.image) exports.init(args0); 