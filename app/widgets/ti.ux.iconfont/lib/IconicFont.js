/**
 * IconicFont module for Titanium by Kosuke Isobe (k0sukey)
 * https://github.com/k0sukey/TiIconicFont
 * 
 */

var exports = exports || this;
exports.IconicFont = (function(global){
	var K = function(){};

	var IconicFont = function(options) {
		var self;

		if (this instanceof IconicFont) {
			self = this;
		} else {
			self = new K();
		}

		if (!options) { options = {}; }
		self.ligature = options.ligature || false;
		var Font = require(options.font);
		self.font = new Font();

		return self;
	};

	K.prototype = IconicFont.prototype;

	IconicFont.prototype.icon = function(options){
		var self = this;

		if (options instanceof Array) {
			options.forEach(function(value){
				if (self.ligature) {
					icons.push(self.font.getCharcode(value));
				} else {
					icons.push(String.fromCharCode(self.font.getCharcode(value)));
				}
			});

			return icons;
		} else {
			if (self.ligature) {
				return self.font.getCharcode(options);
			} else {
				return String.fromCharCode(self.font.getCharcode(options));
			}
		}
	};

	IconicFont.prototype.fontfamily = function(){
		var self = this;

		return self.font.fontfamily;
	};
	
	IconicFont.prototype.getCharMap = function(){
		var self = this;

		return self.font.charcode;
	};

	return IconicFont;
})(this);