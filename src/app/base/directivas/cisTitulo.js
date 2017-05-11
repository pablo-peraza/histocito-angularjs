"use strict";

module.exports = titulo;
var nombre = require( "../../../../package.json" ).nombreNatural;

titulo.$inject = [ "$rootScope", "$timeout" ];
function titulo( $rootScope, $timeout ) {
  return {
    restrict: "EA",
    scope: true,
    link: link
  };

  function link( scope, element ) {
    $rootScope.$on( "$stateChangeStart", cambio );

    function cambio( event, toState ) {
      var titulo = titular( toState );
      $timeout( function() {
        element.text( titulo );
      } );
    }

    function titular( toState ) {
      if ( toState.data && toState.data.titulo ) {
        return toState.data.titulo + " | " + nombre;
      }
      return nombre;
    }
  }

}
