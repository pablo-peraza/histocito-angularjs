"use strict";

module.exports = configurarTeclado;

function configurarTeclado( $scope, hotkeys ) {
  hotkeys.bindTo( $scope )
  .add( {
    combo: "mod+shift+return",
    description: "Editar el usuario",
    allowIn: [ "input", "select", "textarea" ],
    callback: function() {
      $scope.datos.mostrarForm = true;
    }
  } )
  .add( {
    combo: "mod+backspace",
    description: "Cancelar",
    allowIn: [ "input", "select", "textarea" ],
    callback: function() {
      $scope.cancelar();
    }
  } );
}
