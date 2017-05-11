"use strict";

module.exports = FormNOMBRECtrl;

FormNOMBRECtrl.$inject = [ "ARCHIVO", "NOMBREAPI", "$state", "$stateParams" ];
function FormNOMBRECtrl( ARCHIVO, NOMBREAPI, $state, $stateParams ) {
  var vm = this;
  vm.ARCHIVO = ARCHIVO;
  vm.ARCHIVO.editando = ( $stateParams.editar === "true" );
  vm.guardar = guardar;
  vm.editar = editar;
  vm.eliminar = eliminar;

  function guardar( formValido ) {
    if ( formValido ) {
      NOMBREAPI.guardar( vm.ARCHIVO ).then( function( resp ) {
        reload( resp._id, false );
      } );
    }
  }

  function editar( valor ) {
    reload( vm.ARCHIVO._id, valor );
  }

  function eliminar() {
    NOMBREAPI.eliminar( vm.ARCHIVO ).then( function() {
      $state.go( "^.ARCHIVO-lista" );
    } );
  }

  function reload( id, editando ) {
    $state.go( $state.current, {id: id, editar: editando}, {reload: true} );
  }
}
