"use strict";

module.exports = cisEnter;

function cisEnter() {
  return function( scope, element, attrs ) {
    element.bind( "keydown keypress", function( event ) {
      if ( event.which === 13 ) {
        scope.$apply( function() {
          scope.$eval( attrs.cisEnter );
        } );

        //event.preventDefault();
      }
    } );
  };
}
