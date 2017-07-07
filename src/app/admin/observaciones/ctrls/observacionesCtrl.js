"use strict";

module.exports = ObservacionesCtrl;
var configurarTeclado = require( "../../configurarTeclado.js" );

ObservacionesCtrl.$inject = [ "$scope", "observaciones", "Observaciones", "Alertas", "hotkeys" ];
function ObservacionesCtrl( $scope, observaciones, Observaciones, Alertas, hotkeys ) {
  configurarTeclado( $scope, hotkeys );
  $scope.datos = {
    observaciones: observaciones
  };

  function error( resp ) {
    console.debug( resp );
    Alertas.agregar( resp.status );
  }
  $scope.guardar = function( comentario, form ) {
    $scope.$emit( "show-errors-check-validity" );

    function ok( resp ) {
      var es_nuevo = comentario.id || false;
      comentario.id = resp.data;
      if ( !es_nuevo ) {
        $scope.datos.observaciones.lista.push( comentario );
      } else {
        var comentario_viejo = _.find( $scope.datos.observaciones.lista, {"id": comentario.id} );
        _.assign( comentario_viejo, comentario );
      }
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
      $scope.cancelar( form );
    }
    if ( form.$valid && !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Observaciones.guardar( comentario ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.editar = function( obs ) {
    $scope.datos.nuevo = angular.copy( obs );
    $scope.datos.mostrarForm = true;
  };

  $scope.eliminar = function( obs ) {
    function ok( resp ) {
      $scope.datos.observaciones.lista = _.without( $scope.datos.observaciones.lista, obs );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Observaciones.borrar( obs.id ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.cancelar = function() {
    $scope.$emit( "show-errors-reset" );
    delete $scope.datos.nuevo;
    $scope.datos.mostrarForm = false;
  };

} //controller
