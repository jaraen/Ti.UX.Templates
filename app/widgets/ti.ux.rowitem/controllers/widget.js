
var args = arguments[0];

$.titleLbl.text = args.title;
$.subtitleLbl.text = args.subtitle;

if(args.count) {
	$.countLbl.applyProperties({
		visible:true,
		text: "  " + args.count	+ "   "
	});
}

$.childrenImage.visible = args.hasChildren;

if(OS_IOS && args.hasChildren){
	$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.BLUE;
}else{
	$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
}
