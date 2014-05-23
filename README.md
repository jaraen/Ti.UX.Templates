
# The Titanium UX Library

## Disclaimer

This project is under active development and its actual status is in alpha or “preview” phase. Some parts can drastically change in short term. 

Use under your own risk. Bug reports, pull requests and any kind of collaboration are welcome.

## Description

The Titanium UX project arises to solve some common UX patterns that we use in our apps every day with Titanium Alloy.

The added value of this project is that each template and component is the result of a collaboration between an UX expert and a Titanium developer, 
and improved with cool designs done by pro apps designers.

The result is a collection of Templates with all the sources (mock up files for Omni-Graffle, designs in Illustrator and code in Titanium Alloy).

Regarding the code, the project now includes 3 templates with more than 20 reusable and customizable widgets of all kinds.

We are doing a big effort in creating useful widgets, with performance in mind and specially high integration with Alloy, so they can be added
to your xml files and 100% customizables from style files.

Find more info about ux mobile patterns in our website [www.uxmobilepatterns.com](http://www.uxmobilepatterns.com) or contact us by twitter at @jrayon and @sonianoneka

##Multiplatform Support

The project has been developed and fully works on iPhone. Although the UX has been designed with iPhone users in mind, most components also work on android
and our intention is to give full support to get the templates and widgets working in both platforms.


## Templates

### Franky: a detail view full of small widgets

Franky is our little monster. After review hundred of detail views in mobile apps, Sonia found the kind of components more usable and used
and put them all in a unique view, as a sample of what a detail view commonly includes.

This pattern will help you understand not only how to structure a kind of window like this, but also to have quick access to
a library of ready-to-use components that you can reuse.

It uses several custom widgets ready to reuse and support for [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/)


### Settings form: a template for modifying and input data

All we know what a settings form is, how often we use and develop them for apps and how long it takes to get fully working, 
including data validation, option pickers and so on.

This template will boost the process of creating new forms and will do it super easy to edit and maintain.

### Sign in & up form: a step-by-step template

It is becoming more than usual that some input data processes, as for example sign up, buying process and so on, are made in a step-by-step way, 
so the user is more comfortable and not swamped by a large quantity of data to fill in.

This example adds all the needed logic to create the step-by-step navigation and also adds an high level of customization for your process. 

By now, only text fields are supported, with several validation methods, support for custom validation methods, synchronous and asynchronous validation and
invalid data detection.

### List: a template full of interaction samples

coming soon...

## Component Widgets

### com.criteriastudio.RemoteImageView


An image view that downloads and automatically manages its own cache. Also works with local images.

It also adds properties to the image, doing it `zoomable`, it is, click for view fullscreen and pinch in for zoomin.

Features:
 - manages its own cache
 - shows a loading indicator witha progress indicator when its loading a remote picture
 - set zoomable property to true open a new window with a zoomable fullscreen image, showing an small loupe icon
 
### ti.ux.image

this component envelopes com.criteriastudio.RemoteImageView widget for easier management.

### com.jrayon.title

A title label styling class `H1`

### ti.ux.expandabletext

A clickable label that expands its size. Properties accepted:

 `height` 

Uses style `paragraph` 

### ti.ux.forms.scrollableform

`<Widget src="ti.ux.forms.scrollableform" id="form"></Widget>`

Creates a form assistant (each field in one scrollable view). Initialize the widget with a json data structure, 
indicating the fields to create, properties for each field, callback methods (in case it is cancelled or validated).

A validation method is automatically assigned to each field depending on its `type` property. A custom validator method
can be declared for each field.

Declaring a `type` customizes the keyboard, passwordMask and validator method. Supported types are:

`text`
`password` 
`email`
`phone`
`number`
`url`

Default type is `text` 

This is an example of json form data:


```javascript

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
			tipText:'Set your password',
			errorText: 'The password must contain at least 6 characters',
			autofocus: true,
			validate:function(value){	//customize our own password validation
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

```

To create the form, just call it in you `onOpen`  window event:

```javascript
function initForm(){
	$.form.init(formData);
}
```

##### About validators

Validators may include or not a callback function. A callback function can be useful when the validation requires 
a remote connection (for example, to check if a username already exists). If a callback function is used, an 
activityIndicator is shown during the validation.

Have a look to lib/validators.js to see a few examples of validators.


### ti.ux.forms.text

A boxed label and textfield with validation methods. 

### ti.ux.iconbutton

A button that accepts [FontAwesome 4.1.0 codes](http://fortawesome.github.io/Font-Awesome/icons/). Fully customizable.

### ti.ux.iconfont

A label that accepts [FontAwesome 4.1.0 codes](http://fortawesome.github.io/Font-Awesome/icons/) codes

### ti.ux.iconlabel

An icon with a label besides it. The icon can be an image, using `image` property or a 
[FontAwesome 4.1.0 codes](http://fortawesome.github.io/Font-Awesome/icons/) code using `icon` property.

### ti.ux.iconvalue

An icon with a label below it. The icon can be an image, using `image` property or a 
[FontAwesome 4.1.0 codes](http://fortawesome.github.io/Font-Awesome/icons/) code using `icon` property.

### ti.ux.pagingcontrol

A paging control that can be embebbed to any scrollable view and stylized in style files.

The widget can be declared in Alloy in the xml view file, but must be initialized in code, after the scrollable view is drawn.

```xml
<ScrollableView id="scrollableView" onPostlayout="linkScrollableView" onScrollEnd="updatePagingControl">
	<Label text="View 1" />
	<Label text="View 2" />
	<Label text="View 3" />
</ScrollableView>
<Widget src="ti.ux.pagingcontrol" id="pagingControl" backgroundColor="#fff" top="0"/>

```

Then, in the controller

```javascript
/* SCROLLABLE VIEW FUNCTIONS */

function linkScrollableView(){
	$.scrollableView.removeEventListener('postlayout', linkScrollableView);
	$.pagingControl.linkScrollableView($.scrollableView);
}

function updatePagingControl(e){
	$.pagingControl.setActiveDot(e.currentPage);
}
```


### ti.ux.rowitem

A `TableViewRow` widget, that accepts `title`, `subtitle` and `count` properties.

### ti.ux.spacer
 
A white space widget to leave blank spaces between rows or components. 
 
## Credits

Dreamed up by Sonia Villanueva and Javier Rayon in 2014.

UX strategy and mock-ups by Sonia

Titanium code and documentation by Javier

Themes designs and extra energy push by **Mai Berreando**. She has contributed with some of the coolest designs we have seen, among some beautiful cactus. ;)

We use the incredible work and technology done by:

- [Font Awesome](http://fortawesome.github.io/Font-Awesome)

- [Appcelerator](http://www.appcelerator.com)

Orignal FontAwesome [Titanium module by Kosuke Isobe](https://github.com/k0sukey/TiIconicFont)


## License

All parts of this project are fully open source and is GPL friendly. You can use it for commercial projects, open source projects, 
or really just about whatever you want.

Attribution is not required, but appreciated. Among anything else, we will love to know how this project may help you.

.

.

.

.

.










