
var args = arguments[0];

var formData = {};			//contains a copy of the arguments passed to init method
var viewsWidgets = [];
var fieldsWidgets = [];		//a module reference to all fields objects created
var fieldsData = [];		//just an array with the fields passed to init

$.init = function(data){
	
	formData = data || {};
	fieldsData = formData.fields || [];
	
	var widget = {};
	
	//set the DONE key in the last step
	fieldsData[fieldsData.length - 1].returnKeyType = Ti.UI.RETURNKEY_DONE;
	
	for(var i = 0, j = fieldsData.length; i < j; i++){		//create the fields and fill in the views array and the fieldsWidgets array

		widget = Widget.createWidget('ti.ux.forms.scrollableform', 'scrollfield', fieldsData[i]);
		
		fieldsWidgets.push(widget.getComponent());				//keep a reference directly to the field widget, not to the scrollview
			
		viewsWidgets.push(widget.getView());

	}
	
	$.scrollableView.views = viewsWidgets.slice(0,1);		//just add the view 0, do not allow to scroll further
		
	autofocusField(0);
	
	//Capture return key on each field
	for(var i = 0, j = fieldsWidgets.length; i < j; i++){
		fieldsWidgets[i].getField().addEventListener('return', validateAndGoNext);
		fieldsWidgets[i].getField().index = i;				//Save its position in the array for event handling
	}
	
};

//fired when the return key is pressed on each field
function validateAndGoNext(e){
	
	var index = e.source.index;
	var field = fieldsWidgets[index];
	
	if(!fieldsData[index].mandatory && !fieldsWidgets[index].getFieldValue()){			//Not mandatory? go to next step
		index++;
		increaseToStep(index);
		return;
	}
	
	field.validate(function(isValid){			//pass a callback function to validate

		if(isValid){							//validation passed, go to next field
			index++;
			increaseToStep(index);
		}else{
			field.focus();
		}
	});

}

//adds new steps to the form (actually, adds the views to the scrollView).
//If there are no more views to show, executes last step
function increaseToStep(index){
	//navigate to next field by adding a new page to the scrollableView and scrolling to it
	if(index < fieldsWidgets.length){
		$.scrollableView.views = viewsWidgets.slice(0, index+1);
		$.scrollableView.scrollToView(index);
		autofocusField(index);
	}else{
		executeLastStep();
	}
}

function autofocusField(index){
	if(fieldsData[index].autofocus) fieldsWidgets[index].focus();
}

//fired when the user scrolls back to a previous field, The idea is to focus the textfield on screen
function changeFocus(e){
	fieldsWidgets[e.currentPage].focus();
}


//to execute when there are no more fields to fill
//We callback onFinish function defined in args
function executeLastStep(){
	
	if(!formData.onFinish){
		Ti.API.warn('ti.ux.forms.scrollableform: WARNING, onFinish() callback function not defined');
		return;
	}
	
	var data = {};
	
	for(var i = 0, j = fieldsWidgets.length; i < j; i++){
		data[fieldsData[i].id] = fieldsWidgets[i].getFieldValue();
	}
	
	formData.onFinish(data);
}


//Returns the value of a field by its id.
//Loop into fieldsData to find the right index is not cool, think a better solution.
$.getFieldValue = function(id){

	var index = -1;

	for(var i = 0, j = fieldsData.length; i < j; i++){
		if(id == fieldsData[i].id){
			index = i;
			break;
		}else{
			continue;
		}
	}

	if(index > -1){
		 return fieldsWidgets[index].getFieldValue();
	}else{
		return undefined;
	}

}
