"use strict";

module.exports = cisAutofocus;

function cisAutofocus() {
  return {
    restrict: "A",
    scope: true,
    link: function( scope, elem, attr ) {
      var temp = ( !attr.cisAutofocus || scope.$eval( attr.cisAutofocus ) === true );
      if ( temp ) {
        elem[0].focus();
      }
    }
  };
}
