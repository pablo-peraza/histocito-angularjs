"use strict";
module.exports = clickEn;

function clickEn() {
  return {
    restrict: "A",
    link: link
  };
}

function link( $scope, $elem, attr ) {
  $elem.on( "click", function() {
    $( "#" + attr.clickEn ).click();
  } );
}
