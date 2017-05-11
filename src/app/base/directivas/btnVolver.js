"use strict";
module.exports = btnVolver;

function btnVolver() {
  return {
    restric: "EA",
    link: link
  };
}

function link( scope, elem ) {
  elem.on( "click", function() {
    window.history.back();
  } );
}
