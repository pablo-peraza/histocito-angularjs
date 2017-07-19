"use strict";

module.exports = ListaExpedientesCtrl;

ListaExpedientesCtrl.$inject = [
  "$rootScope",
  "$scope",
  "expedientes",
  "dimensiones",
  "elementoActual",
  "hotkeys",
  "$location",
  "Alertas",
  "Expedientes"
];
function ListaExpedientesCtrl( $rootScope, $scope, expedientes, dimensiones, elementoActual,
    hotkeys, $location, Alertas, Expedientes ) {
  $scope.datos = {
    expedientes: expedientes,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };
  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+return",
      description: "Nuevo Expediente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        if ( $rootScope
          .puedePasar( [ $rootScope.permisos.laboratorio, $rootScope.permisos.digitador ] ) ) {
          $location.path( "/inicio/pacientes/expedientes/nuevo" );
        }
      }
    } );
  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.expedientes = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    Expedientes.rest.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, $scope.filtros )
    .then( ok, error ).finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.aplicarDimension = function( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.expedientes.lista.concat( res.lista );
      return res;
    } );
  };
} //controlador
