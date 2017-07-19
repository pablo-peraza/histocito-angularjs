"use strict";

module.exports = configurarTeclado;

function configurarTeclado( $scope, hotkeys ) {
  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+left",
      description: "Paso Anterior",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.anterior();
      }
    } )
    .add( {
      combo: "mod+right",
      description: "Paso Siguiente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.siguiente();
      }
    } );
} //configurarTeclado
