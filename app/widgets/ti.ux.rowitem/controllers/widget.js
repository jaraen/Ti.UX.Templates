
var args = arguments[0];

function initUI(){


	//not icon? move the title to the left
	if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}

	$.titleLbl.text = args.title;
	$.subtitleLbl.text = args.subtitle;
	
	if(args.count) {
		$.countLbl.applyProperties({
			visible:true,
			text: "  " + args.count	+ "   "
		});
	}
	
	if (!args.hasChildren){
		$.childrenImage.hide();
	}
	
	if(OS_IOS && args.hasChildren){
		$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.BLUE;
	}else{
		$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	}
	$.row.data = args;
	
}

initUI();