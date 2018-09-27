"use strict";

module.exports = ClinicasCtrl;
var configurarTeclado = require( "../../configurarTeclado.js" );

ClinicasCtrl.$inject = [ "$scope", "clinicas", "elementoActual", "Clinicas", "Alertas", "hotkeys" ];
function ClinicasCtrl( $scope, clinicas, elementoActual, Clinicas, Alertas, hotkeys ) {
  configurarTeclado( $scope, hotkeys );
  $scope.datos = {
    clinicas: clinicas,
    elementoActual: elementoActual
  };

  function error( resp ) {
    Alertas.agregar( resp.status );
  }
  $scope.guardar = function( clinica, form ) {
    $scope.$emit( "show-errors-check-validity" );

    function ok( resp ) {
      if ( clinica.id ) {
        $scope.datos.clinicas.lista = _.reject( $scope.datos.clinicas.lista,
          function( cli ) { return cli.id.toString() === clinica.id.toString(); }
        );
      } else {
        clinica.id = resp.data;
      }
      $scope.datos.clinicas.lista.push( clinica );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
      $scope.cancelar( form );
    }
    if ( form.$valid && !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Clinicas.guardar( clinica ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.editar = function( clinica ) {
    $scope.datos.nuevo = angular.copy( clinica );
    $scope.datos.mostrarForm = true;
  };

  $scope.eliminar = function( clinica ) {
    function ok( resp ) {
      $scope.datos.clinicas.lista = _.without( $scope.datos.clinicas.lista, clinica );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Clinicas.borrar( clinica.id ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.cancelar = function() {
    $scope.$emit( "show-errors-reset" );
    delete $scope.datos.nuevo;
    $scope.datos.mostrarForm = false;
  };

  $scope.cargarMasMuestras = function() {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.clinicas.cantidad = resp.data.cantidad;
      $scope.datos.clinicas.lista = $scope.datos.clinicas.lista.concat( resp.data.lista );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status,
        "Hubo un error al cargar el historial de muestras del paciente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }

    Clinicas.listar( $scope.datos.elementoActual, 50 ).then( ok, error ).finally( finalmente );
  };

} //controller
