"use strict";

module.exports = cisMinimizar;

function cisMinimizar() {
  return {
    restrict: "A",
    scope: true,
    link: function( $scope, $element ) {
      if ( $( window ).width() < 768 ) {
        oscurecer();
        estilos();
      }
      $element.on( "click", minimizar );
      function minimizar() {
        oscurecer();
        estilos();
      }
    }
  };
}

function estilos() {
  $( "#wrapper" ).toggleClass( "minimizado" );
  $( "#logo" ).toggleClass( "ocultarLogo" );
  if ( $( "#wrapper" ).hasClass( "minimizado" ) ) {
    $( "#iconoMinimizador" ).removeClass( "fa-chevron-left" );
    $( "#iconoMinimizador" ).addClass( "fa-chevron-right" );
  } else {
    $( "#iconoMinimizador" ).removeClass( "fa-chevron-right" );
    $( "#iconoMinimizador" ).addClass( "fa-chevron-left" );
  }
}

function oscurecer() {
  if ( $( window ).width() < 768 ) {
    if ( $( "#wrapper" ).hasClass( "minimizado" ) ) {
      $( "#oscurecer" ).removeClass( "hidden" );
    } else {
      $( "#oscurecer" ).addClass( "hidden" );
    }
  }

}
