"use strict";

module.exports = MedicosCtrl;
var configurarTeclado = require( "../../configurarTeclado.js" );

MedicosCtrl.$inject = [ "$scope", "medicos", "elementoActual", "Medicos", "Alertas", "hotkeys" ];
function MedicosCtrl( $scope, medicos, elementoActual, Medicos, Alertas, hotkeys ) {
  configurarTeclado( $scope, hotkeys );
  $scope.datos = {
    medicos: medicos,
    elementoActual: elementoActual
  };

  function error( resp ) {
    Alertas.agregar( resp.status );
  }
  $scope.guardar = function( medico, form ) {
    $scope.$emit( "show-errors-check-validity" );

    function ok( resp ) {
      if ( medico.id ) {
        $scope.datos.medicos.lista = _.reject( $scope.datos.medicos.lista,
          function( cli ) { return cli.id.toString() === medico.id.toString(); }
        );
      } else {
        medico.id = resp.data;
      }
      $scope.datos.medicos.lista.push( medico );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
      $scope.cancelar( form );
    }
    if ( form.$valid && !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Medicos.guardar( medico ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.editar = function( medico ) {
    $scope.datos.nuevo = angular.copy( medico );
    $scope.datos.mostrarForm = true;
  };

  $scope.eliminar = function( medico ) {
    function ok( resp ) {
      $scope.datos.medicos.lista = _.without( $scope.datos.medicos.lista, medico );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Medicos.borrar( medico.id ).then( ok, error ).finally( finalmente );
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
      $scope.datos.medicos.cantidad = resp.data.cantidad;
      $scope.datos.medicos.lista = $scope.datos.medicos.lista.concat( resp.data.lista );
      $scope.datos.elementoActual += 100;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status,
        "Hubo un error al cargar el historial de muestras del paciente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }

    Medicos.listar( $scope.datos.elementoActual, 100 ).then( ok, error ).finally( finalmente );
  };

} //controller
