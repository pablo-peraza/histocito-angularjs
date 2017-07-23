"use strict";

module.exports = passwordIguales;

function passwordIguales() {
  return {
    restrict: "A",
    scope: true,
    require: "ngModel",
    link: function( scope, elem, attrs, control ) {
      var checker = function() {
        var e1 = scope.$eval( attrs.ngModel ),
          e2 = scope.$eval( attrs.passwordIguales );
        return e1 === e2;
      };
      scope.$watch( checker, function( n ) {
        control.$setValidity( "unique", n );
      } );
    } //function
  }; //return
}
