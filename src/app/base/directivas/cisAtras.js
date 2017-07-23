"use strict";

module.exports = cisAtras;

cisAtras.$inject = [ "$window" ];
function cisAtras( $window ) {
  return {
    restrict: "A",
    link: function( scope, element ) {
      element.on( "click", function() {
        $window.history.back();
      } );
    }
  };
}
