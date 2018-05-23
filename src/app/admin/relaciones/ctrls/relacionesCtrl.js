"use strict";

module.exports = RelacionesCtrl;

var _ = require( "lodash" );

RelacionesCtrl.$inject = [ "$scope", "relaciones", "Muestras", "Usuarios", "RelacionesAPI" ];
function RelacionesCtrl( $scope, relaciones, Muestras, Usuarios, RelacionesAPI ) {
  var vm = this;
  vm.mostrarForm = false;
  vm.relaciones = relaciones;
  vm.nuevo = { autorizados: [] };
  vm.autorizado = null;
  vm.guardar = guardar;
  vm.cancelar = cancelar;
  vm.editar = editar;
  vm.eliminar = eliminar;
  vm.agregarAutorizado =  agregarAutorizado;
  vm.borrarAutorizado = borrarAutorizado;
  vm.buscarMedicos = buscarMedicos;
  vm.buscarDuenos = buscarDuenos;
  vm.buscarClinicas = buscarClinicas;
  vm.buscarUsuarios = buscarUsuarios;

  function guardar( rel ) {
    return RelacionesAPI.guardar( rel ).then(function( resp ) {
      vm.relaciones.push( resp );
      vm.cancelar();
    } );
  }

  function cancelar() {
    vm.nuevo = {};
    vm.mostrarForm = false;
  }

  function editar( item ) {
    vm.nuevo = item;
    vm.mostrarForm = true;
  }

  function eliminar( item ) {
    if( confirm( "¿Está seguro que desea eliminar esta relación?" ) ) {
      return RelacionesAPI.eliminar( item._id ).then(function() {
        vm.relaciones = _.reject( vm.relaciones, function( rel ) {
          return rel._id === item._id;
        } );
      } );
    }
    return false;
  }

  function ok( resp ) {
    return _.map( resp.data.lista, function( item ) {
      item._id = item.id;
      return item;
    } );
  }

  function error() {
    return [];
  }

  function agregarAutorizado(item) {
    item._id = item.id;
    vm.nuevo.autorizados.push(item);
    vm.autorizado = null;
  }

  function borrarAutorizado(item) {
    vm.nuevo.autorizados = _.reject(vm.nuevo.autorizados, function( aut ) {
      return aut._id === item._id;
    } );
  }

  function buscarMedicos( valor ) {
    return Muestras.buscarMedicos( 0, 10, valor ).then( ok, error );
  }

  function buscarDuenos( texto ) {
    var dim = [ {
      tipoUsuario: [ "médico" ]
    } ];
    return Usuarios.buscar( 0, 10, texto, dim ).then( ok, error );
  };

  function buscarClinicas( valor ) {
    return Muestras.buscarClinicas( 0, 10, valor ).then( ok, error );
  }

  function buscarUsuarios( valor ) {
    return Muestras.buscarUsuarios( 0, 10, valor ).then( ok, error );
  };
} //controller
