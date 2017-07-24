"use strict";

module.exports = inputsPropios;

function inputsPropios() {
  return {
    restrict: "E",
    require: "?ngModel",
    link: function( scope, elem, attr, ngModelCtrl ) {
      if ( attr.type === "colones" ) {
        return colones( scope, elem, attr, ngModelCtrl );
      }
      return;
    } //link
  };
} //ctrl

function colones( scope, elem, attr, ngModelCtrl ) {
  function limpiar( val ) {
    if ( val ) {
      var temp = val.toString().replace( /[\D]+/g, "" ) * 1;
      return temp;
    }
    return val;
  }
  var min = attr.min ? scope.$eval( attr.min ) : undefined;
  var max = attr.max ? scope.$eval( attr.max ) : undefined;

  ngModelCtrl.$formatters.push( function( modelValue ) {
    return modelValue / 100;
  } );

  ngModelCtrl.$parsers.push( function( viewValue ) {
    return viewValue * 100;
  } );

  ngModelCtrl.$render = function() {
    elem.val( ngModelCtrl.$viewValue );
  };

  elem.unbind( "input" );
  elem.bind( "input", function() {
    elem.val( limpiar( elem.val() ) );
    scope.$apply( function() {
      ngModelCtrl.$setViewValue( elem.val() );
      if ( max ) {
        ngModelCtrl.$setValidity( "max", ngModelCtrl.$modelValue <= max ); //false lo hace invalido
      }
      if ( min ) {
        ngModelCtrl.$setValidity( "min", ngModelCtrl.$modelValue >= min );
      }
    } );
  } );
} //colones
