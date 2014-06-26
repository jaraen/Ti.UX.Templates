
function initUI(){
	
	var text = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
	
	$.descriptionLabel.setText(text);
	
	//Init eventListeners
	if(OS_IOS)$.photoBtn.getView().addEventListener('click', photo); //review android
	$.locationLabel.getView().addEventListener('click', showPopupMap); 
}

/* EVENT LISTENERS CALLBACKS */

function photo(e){
	Alloy.Globals.alert('Photo!');
}

function showPopupMap(e){
	$.mapPopup.show();
}

function showPopupServices(e){
	$.servicesPopup.show();
}

function updateScrolls(e){
	e.cancelBubble = true;
	if(e.source !== $.mainTable) return;
	$.img.updateScroll(e);
	//$.stickyView.updateScroll(e.contentOffset.y);
	
}

/* SCROLLABLE VIEW FUNCTIONS */

function linkScrollableView(){

	$.scrollableView.removeEventListener('postlayout', linkScrollableView);
	$.pagingControl.linkScrollableView($.scrollableView);
}

function updatePagingControl(e){
	$.pagingControl.setActiveDot(e.currentPage);
}

/* SHOW GALLERY */

if(OS_IOS) $.photosRow.getView().addEventListener('click', showGallery);

function showGallery(e){
	Ti.API.info('show gallery');
	Ti.Media.openPhotoGallery({
		animated:true,
		allowEditing:false,
		autohide:true,
		mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
		cancel:function(){},
		error:function(){},
		success:function(){},
	});
}
