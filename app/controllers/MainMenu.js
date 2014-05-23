

function openItem(e){
	
	var newWin;

	if(!e.row) return;
	
	if(e.row.widget){
		newWin = Alloy.createWidget(e.row.widget).getView();
	}else if(e.row.controller){
		newWin = Alloy.createController(e.row.controller).getView();
	}else{
		alert('Oooops! Something failed trying to open the window. Have you declared a widget or controller property?');
	}

	if(OS_IOS && newWin){
		Alloy.Globals.navWindow.openWindow(newWin);
	}
	
	if(OS_ANDROID && newWin){
		newWin.open();
	}
	
}

function openWorkingItem(){
	$.tableView.removeEventListener('postLayout', openWorkingItem);
	//openItem({row:{controller:'templates/DetailSample1'}});	
}

//$.tableView.addEventListener('postlayout', openWorkingItem);

setTimeout(openWorkingItem, 300);
