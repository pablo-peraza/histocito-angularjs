"use strict";

module.exports = DuplicadosCtrl;

DuplicadosCtrl.$inject = [ "$scope", "Expedientes", "Alertas" ];
function DuplicadosCtrl( $scope, Expedientes, Alertas ) {
  $scope.duplicados = [];
  $scope.unificar = unificar;
  $scope.buscar = buscar;
  $scope.cargarMas = cargarMas;
  $scope.filtros = {
    cedula: "Cédulas iguales",
    nombre: "Nombres iguales",
    nombreCedula: "Nombre y Cédula iguales"
  };
  $scope.datos = {
    cargando: false,
    elementoActual: 0
  };

  function unificar( exp, dup, index ) {
    if ( !confirm( "¿Está seguro que desea mantener este expediente y eliminar el resto? " +
    "Esta acción no es reversible." ) ) {
      return false;
    }
    var body = {
      seleccionado: exp._id,
      duplicados: _.without( _.map( dup.uniqueIds, "_id" ), exp._id )
    };
    return Expedientes.rest.resolverDuplicados( body ).then( function( succ ) {
      $scope.duplicados.docs.splice( index, 1 );
      $scope.duplicados.cant -= 1;
      return Alertas.agregar( succ.status );
    }, function( err ) {
      return Alertas.agregar( err.status );
    } );
  }

  function buscar( filtro ) {
    $scope.datos.cargando = true;
    Expedientes.rest
      .obtenerDuplicados( 0, 100, filtro )
      .then( function( resp ) {
        $scope.duplicados = resp.data;
      } )
      .finally( function() {
        $scope.datos.cargando = false;
      } );
  }

  function cargarMas() {
    $scope.datos.elementoActual += 100;
    $scope.datos.cargando = true;
    Expedientes.rest
      .obtenerDuplicados( $scope.datos.elementoActual, 100, $scope.datos.filtro )
      .then( function( resp ) {
        $scope.duplicados.docs = $scope.duplicados.docs.concat( resp.data.docs );
      } )
      .finally( function() {
        $scope.datos.cargando = false;
      } );
  }
}
