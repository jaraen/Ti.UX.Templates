
var args = arguments[0] || {};
$.checked = !!args.checkValue;
$.model = args.model;

args.checkedIcon = args.checkedIcon || '/images/checked-icon.png';
args.checkboxIcon = args.checkboxIcon || '/images/checkbox-icon.png';

function initUI(){
	Ti.API.debug('In Ti.UX.forms.row.checkbox initUI');
	$.row.backgroundColor = Alloy.Globals.colors.bgSignupHeader;
	if ($.checked) {
		$.imageCheck.image = args.checkedIcon;
	} else {
		$.imageCheck.image = args.checkboxIcon;
	}
	//not icon? move the title to the left
	/*if(!args.icon){
		$.titleLbl.left = $.icon.getView().left;
	}else{
		$.icon.setIcon(args.icon);
		if(args.iconColor) $.icon.getView().color = args.iconColor;
	}*/

	$.titleLbl.text = args.title;
	$.labelHintText.text = args.hintTextValue;
	
	
	/*if(args.count) {
		$.countLbl.applyProperties({
			visible:true,
			text: "  " + args.count	+ "   "
		});
	}
	
	if (!args.hasChildren){
		$.childrenImage.hide();
	}*/
	
	if(OS_IOS){
		if(args.hasChildren){
			$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.BLUE;
		}else{
			$.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
		}
	}
	$.row.data = args;
	Ti.API.debug('Finished Ti.UX.forms.rowcheckbox initUI');
}

//Check image function
$.toggleCheckmark = function () {
	//alert(JSON.stringify(e.row));
	if ($.checked) {
		$.checked = false;
		$.imageCheck.image = args.checkboxIcon;
		
	} else {
		$.checked = true;
		$.imageCheck.image = args.checkedIcon;		
	}
	
};

initUI();