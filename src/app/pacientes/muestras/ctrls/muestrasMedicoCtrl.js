"use strict";

module.exports = MuestrasMedicoCtrl;

MuestrasMedicoCtrl.$inject = [
    "$rootScope",
    "$scope",
    "muestras",
    "dimensiones",
    "elementoActual",
    "FacturasREST",
    "Muestras",
    "Alertas"
  ];
function MuestrasMedicoCtrl( $root, $scope, muestras, dimensiones, elementoActual,
    FacturasREST, Muestras, Alertas ) {
  $scope.datos = {
    muestras: muestras,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };

  $scope.seleccionadas = function( muestras ) {
    return _.filter( muestras, function( muestra ) {
      return muestra.seleccionada;
    } );
  };

  $scope.seleccionarTodas = function( bool, muestras ) {
    return _.map( muestras, function( muestra ) {
      muestra.seleccionada = bool;
      return muestra;
    } );
  };
  $scope.sonDeEstado = function( muestras, campo, estado ) {
    if ( _.isEmpty( muestras ) || _.isUndefined( muestras ) ) {
      return false;
    }
    return _.every( muestras, function( muestra ) {
      return muestra[campo] === estado;
    } );
  };

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;
    $scope.datos.seleccionadas = false;

    function ok( resp ) {
      $scope.datos.muestras = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;

    }
    Muestras.rest.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, $scope.filtros )
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
      res.lista = $scope.datos.muestras.lista.concat( res.lista );
      return res;
    } );
  };
} //ctrl
