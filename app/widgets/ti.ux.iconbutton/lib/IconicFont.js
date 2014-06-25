/**
 * IconicFont module for Titanium by Kosuke Isobe (k0sukey)
 * https://github.com/k0sukey/TiIconicFont
 * 
 */
 
function IconicFont(params) {
	params = params || {};

	this._font = require(params.font);
}

Object.defineProperties(IconicFont.prototype, {
	font: {
		set: function(param){
			this._font = require(param);
		},
		get: function(){
			return this._font;
		}
	},
	fontfamily: {
		get: function(){
			return this._font.fontfamily;
		}
	}
});

IconicFont.prototype.icon = function(param){
	var result = [];

	if (!Array.isArray(param)) {
		param = [param];
	}

	for (var i = 0; i < param.length; i++) {
		result.push(String.fromCharCode(this._font.charcode[param[i]]));
	}

	return result.join('');
};

module.exports = IconicFont;