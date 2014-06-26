
var formData = {
	fields: [
		{
			id: 'username',
			title:'username',
			inputType:'text',
			mandatory: true,
			tipText:'Please, fill in your name',
			autofocus: true
		},

		{
			id:'website',
			title:'Your website',
			inputType:'url',
			mandatory: false,
			tipText: 'Please, fill in a valid website or leave it blank.',
			autofocus: true
		},
		
		{
			id:'email',
			title:'e-mail',
			inputType:'email',			//e-mail includes its own validate method, so no need to overwrite it
			mandatory: false,
			tipText:'Please, fill in your e-mail account',
			autofocus: true
		},
		{
			id:'password',
			title:'password',
			inputType:'password',
			mandatory: true,
			hintText:'6 characters at least',
			tipText: 'Set your password',
			errorText: 'The password must contain at least 6 characters',
			autofocus: true,
			validate: function(value){	//customize our own password validation
				Ti.API.info('custom validation called w value: ' + value);
				return value && (""+value).length >= 6;
			}
		},
		{
			id:'confirm-password',
			title:'Confirm password',
			inputType:'password',
			mandatory: true,
			hintText:'6 characters at least',
			tipText:'Repeat the same password, please.',
			errorText: 'The passwords does not match.',
			autofocus: true,
			validate:function(value){	//customize our own password validation
				return value == $.form.getFieldValue('password');		//you can query any form password already introduced
			}
		},
		{
			id:'phone',
			title:'mobile number',
			inputType:'phone',
			mandatory: false,
			tipText:'Insert your phone number',
			autofocus: true
		}
	],
	onCancel: function(e){						//Cancel callback function
		alert('form cancelled');
	},
	
	onFinish: function(data){					//Callback called after last field is validated
		alert("This is your form result: \n\n" + JSON.stringify(data, '', 4));
		$.win.close();
	},
	
	onFieldValidated: function(data){			//Callback called each time a field is validated
		Ti.API.info('Field validated: ' + JSON.stringify(data));
	}
};




function initForm(){
	$.form.init(formData);
}


function closeForm(){
	$.win.close();
}
