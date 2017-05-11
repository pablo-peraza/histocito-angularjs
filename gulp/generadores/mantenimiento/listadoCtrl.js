"use strict";

module.exports = ListadoNOMBRECtrl;

ListadoNOMBRECtrl.$inject = [ "listado", "NOMBREAPI", "$state", "$stateParams" ];
function ListadoNOMBRECtrl( listado, NOMBREAPI, $state, $stateParams ) {
  var vm = this;
  vm.pagina = parseInt( $stateParams.pagina || 0 ) + 1;
  vm.cantidad = parseInt( $stateParams.cantidad || 10 );
  vm.listado = listado;
  vm.eliminar = eliminar;
  vm.actualizarPagina = actualizarPagina;

  function eliminar( ARCHIVO ) {
    if ( confirm( "¿Está seguro que desea eliminar el NOMBRE?" ) ) {
      NOMBREAPI.eliminar( ARCHIVO._id ).then( function() {
        vm.listado.docs = _.reject( vm.listado.docs, function( elem ) {
          return elem._id === ARCHIVO._id;
        } );
        vm.listado.contador -= 1;
      } );
    }
  }

  function actualizarPagina( pagina ) {
    $state.go( $state.current, {pagina: pagina, cantidad: vm.cantidad}, {reload: false} );
  }
}
