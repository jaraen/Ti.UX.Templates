


function loadSymbols(){
	
	var charcodes = Alloy.createWidget('ti.ux.iconfont', 'widget', {}).getCharMap();	
	
	var rows = [];
	
	for(var symbol in charcodes){
		rows.push(new Row(symbol));
	}
	
	$.tableView.data = rows;
	
}


//ListViews does not allow to use widgets inside, so we have to render it in a tableView which
//unfortunately, does not perform as well as the Listview
function Row(codename){
	
	var icon = Alloy.createWidget('ti.ux.iconfont', 'widget', {icon:codename, left:10, color:'#009'}).getView();
	
	var lbl = Ti.UI.createLabel({
		text:codename,
		left:80
	});
	
	var row = Ti.UI.createTableViewRow({
		height:80,
		codename:codename		//for search purpposes
	});
	
	row.add(icon);
	row.add(lbl);
	return row;
};


