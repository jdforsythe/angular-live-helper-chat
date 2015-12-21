/*
 * Angular-Live-Helper-Chat
 * v0.1.0
 * Jeremy Forsythe <https://github.com/jdforsythe>
 *
 * Usage:
 * <live-helper-chat options="" attrs="" widget-url=""></live-helper-chat>
 *
 * Where:
 *   1. `options` is the options string from the Live Helper Chat generated source
 *   2. `attrs` (optional) is any additional data you wish to include in the widget (hidden username/userid/email fields, etc. - see https://livehelperchat.com/pre-filling-form-fields-and-adding-custom-fields-140a.html)
 *   3. `widget-url` is the url string from the Live Helper Chat generated source, up to but NOT INCLUDING the ?r='+referrer+'&l='+location
 *
 * But why?
 * This will allow you to insert data contained within angular into the Live Helper Chat attrs. For instance, if you have the user id inside Angular, you couldn't
 * normally put this into the LHC widget attrs because it lives outside the scope of Angular. With this directive, you can pass any data in from the parent controller
 */
 (function(){
angular.module('angular-live-helper-chat', [])
  .directive('liveHelperChat', ['$interpolate', function($interpolate) {
  	var script = 'var LHCChatOptions = {};' +
  								'LHCChatOptions.opt = {{ options }};' +
  								'{{ attrs ? \'LHCChatOptions.attr = \' + attrs + \';\' : \'\'}}' +
  								'(function() {' +
  								'var po = document.createElement("script"); po.type = "text/javascript"; po.async = true;' +
      						'var referrer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf("://")+1)) : "";' +
      						'var location  = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : "";' +
      						'po.src = "{{ widgetUrl }}?r="+referrer+"&l="+location;' +
      						'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(po, s);' +
      						'})();';
    return {
    	restrict: 'E',
    	scope: {
    		options: '@',
    		attrs: '=',
    		widgetUrl: '@'
    	},
		link: function($scope, $element, $attrs) {
			var scriptTag = angular.element(document.createElement("script"));
			scriptTag.text($interpolate(script, false, false)({
      	options: $attrs.options,
      	attrs: $attrs.attrs,
      	widgetUrl: $attrs.widgetUrl
      }));
      $element.append(scriptTag);

      $scope.$on('$destroy', function() {
        // when we destroy the directive (e.g. through ng-if), we want to remove the LHC from the page, if it's there
        // since LHC uses a separate script to append to the DOM, we need to find its root element, #lhc_status_container
        var lhc_container = angular.element(document.getElementById('lhc_status_container'));
        lhc_container.remove();
      });
		}
    };
  }]);
})();
