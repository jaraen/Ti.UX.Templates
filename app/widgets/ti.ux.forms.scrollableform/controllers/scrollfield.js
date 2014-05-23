var args = arguments[0];

if(args.type == 'image'){
	
}else{
	$.field = Alloy.createWidget('ti.ux.forms.text', args);

	$.field.getView().top = '40dp'; 		//TODO: ugly! set using classes styles

	$.view.add($.field.getView());
}

$.getComponent = function(){
	return $.field;
};

function blurField(e){
	if(e.source === $.view){
		$.field.blur();
	}
}
