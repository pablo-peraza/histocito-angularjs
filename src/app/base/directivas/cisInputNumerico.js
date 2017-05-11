"use strict";
module.exports = cisInputNumerico;
cisInputNumerico.$inject = [ "$filter" ];
function cisInputNumerico( $filter ) {
  return {
    require: "ngModel",
    restrict: "E",
    link: link( $filter )
  };
}

function link( $filter ) {
  return function( scope, element, attrs, ngModelCtrl ) {
    if ( attrs.type === "numerico" ) {
      ngModelCtrl.$parsers.push( function( val ) {
        var clean = val.replace( /[^0-9,\,]+/g, "" );
        if ( val !== clean ) {
          ngModelCtrl.$setViewValue( clean );
          ngModelCtrl.$render();
        }
        if ( clean === "" ) {
          clean = "0";
        }
        return parseFloat( clean.replace( ",", "." ) );
      } );
      ngModelCtrl.$formatters.push( function( val ) {
        var cantDecimales = String( val ).split( "." )[1];
        var decimales = 0;
        if ( cantDecimales ) {
          decimales = cantDecimales.length;
        }
        return $filter( "Numero" )( val, decimales );
      } );

      element.bind( "keypress", function( event ) {
        if ( event.keyCode === 32 ) {
          event.preventDefault();
        }
      } );
    }
    return;
  };
}
