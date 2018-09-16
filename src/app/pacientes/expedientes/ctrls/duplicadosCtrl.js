"use strict";

module.exports = DuplicadosCtrl;

DuplicadosCtrl.$inject = [ "$scope", "duplicados", "Expedientes", "Alertas" ];
function DuplicadosCtrl( $scope, duplicados, Expedientes, Alertas ) {
  $scope.duplicados = duplicados.data;
  $scope.unificar = unificar;
  $scope.cargarMas = cargarMas;
  $scope.datos = {
    cargando: false,
    elementoActual: 0
  };

  function unificar( exp, dup, index ) {
    if (!confirm("¿Está seguro que desea mantener este expediente y eliminar el resto? " +
    "Esta acción no es reversible.")) {
      return false;
    }
    var body = {
      seleccionado: exp._id,
      duplicados: _.without( _.map(dup.uniqueIds, "_id"), exp._id ),
    };
    return Expedientes.rest.resolverDuplicados( body ).then( function( succ ) {
      $scope.duplicados.splice( index, 1 );
      return Alertas.agregar( succ.status );
    }, function( err ) {
      return Alertas.agregar( err.status );
    } );
  }

  function cargarMas() {
    $scope.datos.elementoActual += 10;
    $scope.datos.cargando = true;
    Expedientes.rest
      .obtenerDuplicados($scope.datos.elementoActual, 10)
      .then( function( resp ) {
        $scope.duplicados = $scope.duplicados.concat(resp.data);
      } )
      .finally( function() {
        $scope.datos.cargando = false;
      } );
  }
}
