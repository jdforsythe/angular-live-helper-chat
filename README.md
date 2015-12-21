# angular-live-helper-chat

Bower component for a simple AngularJS live chat widget using [Live Helper Chat](https://livehelperchat.com).

This allows you to add [extra input fields](https://livehelperchat.com/pre-filling-form-fields-and-adding-custom-fields-140a.html) to the chat widget using data from within your AngularJS application.

## Requirements
1. Requires [AngularJS](http://angularjs.org)
2. Requires an active [Live Helper Chat](https://livehelperchat.com) installation
3. You must be using the "widget embed code" function of Live Helper Chat, not the "page embed code" function

## Usage
1. `bower install angular-live-helper-chat`
2. Add `angular-live-helper-chat.js` script to your HTML
3. Add `angular-live-helper-chat` as a module dependency to your app.
4. Generate the embed code for your widget, as you'll need some of this information to set up the directive
  * Log in to Live Helper Chat
  * Choose Settings > Embed code > Live help embed code > Widget embed code
  * Set all your options and refer to the code in step 5
5. Insert the `live-helper-chat` directive into your template:

```html
<live-helper-chat
    options="{widget_height:340,widget_width:300,popup_height:520,popup_width:500}"
    widget-url="//chat.example.com/index.php/chat/getstatus/(click)/internal/(position)/bottom_right/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(survey)/1">
</live-helper-chat>
```
The `options` attribute value comes from the embed code:
```js
LHCChatOptions.opt = {widget_height:340,widget_width:300,popup_height:520,popup_width:500};
```

The `widget-url` attribute is taken from the embed code, as well:

```js
po.src='//chat.example.com/index.php/chat/getstatus/(click)/internal/(position)/bottom_right/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(survey)/1?r='+referrer+'&l='+location;
```

**You must include everything** from the `//` up to, but **NOT including, the `?`** - the directive handles the referrer and location for you.

##Custom Fields in Widget
In order to add the extra attributes, simply include the optional `attrs` and follow the array-of-objects syntax from [Live Helper Chat](https://livehelperchat.com/pre-filling-form-fields-and-adding-custom-fields-140a.html):

```html
<live-helper-chat
    options="{widget_height:340,widget_width:300,popup_height:520,popup_width:500}"
    attrs="[
        {'name': 'user_id', 'value': '{{ LHCAttrs.user_id }}', 'type': 'hidden'},
        {'name': 'email', 'value': '{{ LHCAttrs.email }}', 'type': 'hidden'}
    ]"
    widget-url="//chat.example.com/index.php/chat/getstatus/(click)/internal/(position)/bottom_right/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(survey)/1">
</live-helper-chat>
```

```js
// this example assumes you have a UserFactory that will return a user object,
// but you can get the data to the directive just like any other
app.controller('LHCController', ['$scope', 'UserFactory', function($scope, UserFactory) {
    var user = UserFactory.getCurrentUser();
    
    $scope.LHCAttrs = {
		user_id: user.id,
		email: user.email
    };
});
```
##Contributing

Please file issues and pull requests. I'd like to see this extended to allow setting the `widget-url` globally and to be a full service wrapper, allowing all of the different widgets Live Helper Chat provides.

## License
MIT