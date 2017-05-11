"use strict";

module.exports = cosSwitch;

function cosSwitch() {
  return {
    restrict: "EA",
    replace: true,
    templateUrl: "base/vistas/cisSwitch.html",
    require: "ngModel",
    scope: true,
    link: link
  };
}

function link( $scope, $elem, $attr, ngModelCtrl ) {
  $scope.id = uuid();
  $scope.tipo = $attr.tipo || null;
  $scope.valor = false;
  $scope.apply = apply;

  $scope.$watch( function() {
    return $scope.$eval( $attr.ngDisabled );
  }, function( val ) {
    if ( val ) {
      $elem.addClass( "deshabilitado" );
    } else {
      $elem.removeClass( "deshabilitado" );
    }
  } );

  $scope.$watch( function() {
    return ngModelCtrl.$modelValue;
  }, function( val ) {
    if ( val ) {
      $scope.valor = ngModelCtrl.$modelValue;
    } else {
      ngModelCtrl.$setViewValue( $scope.valor );
    }
  } );

  function apply( val ) {
    ngModelCtrl.$setViewValue( val );
  }

}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {
    var r = Math.random() * 16 | 0,
      v = ( c === "x" ? r : ( r & 0x3 | 0x8 ) );
    return v.toString( 16 );
  } );
}
