"use strict";

module.exports = cisImprimir;

cisImprimir.$inject =  [ "$window" ];
function cisImprimir( $window ) {
  return {
    restrict: "A",
    link: function( scope, element ) {
      element.on( "click", function() {
        $window.print();
      } );
    }
  };
} //function
