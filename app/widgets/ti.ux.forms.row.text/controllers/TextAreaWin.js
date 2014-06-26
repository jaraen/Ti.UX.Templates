var args = arguments[0];

function init(){
	$.textarea.value = args.value || '';
	$.textarea.focus();
}

function save(){
	$.win.close();
	$.win.fireEvent('save', {value: $.textarea.value});
}

function cancel(){
	$.win.close();
	$.win.fireEvent('cancel', {value: $.textarea.value});
}
