"use strict";

module.exports = cisDatosPacienteCtrl;
cisDatosPacienteCtrl.$inject = [ "$scope", "Expedientes", "Alertas", "Selecciones" ];
function cisDatosPacienteCtrl( $scope, Expedientes, Alertas, Selecciones ) {

  function init() {
    $scope.temp = {};
    if ( !$scope.expediente ) {
      $scope.expediente = {};
    }
  } //function
  function encontrarSeleccion( selecciones, aencontrar ) {
    return selecciones[_.indexOf( selecciones, aencontrar )];
  } //encontrarSeleccion

  Selecciones.sexo().then( function( resp ) {
    $scope.sexos = resp.lista;
    if ( !$scope.expediente.ficha.sexo ) {
      $scope.expediente.ficha.sexo = encontrarSeleccion( $scope.sexos, "Femenino" );
    }
  } );
  init();

  $scope.calcularEdad = function( edad ) {
    $scope.expediente.ficha.fechaNacimiento = moment().subtract( edad, "y" );
  };

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
  }

  $scope.buscar = function( texto ) {
    function ok( resp ) {
      return resp.data.lista;
    }
    return Expedientes.rest.buscar( 0, 20, texto ).then( ok, error );
  };
  $scope.seleccionarExpediente = function( item ) {
    $scope.cargando = true;

    function ok( resp ) {
      $scope.expediente = resp.data;
    }

    function ultimo() {
      $scope.cargando = false;
    }
    Expedientes.rest.obtener( item.id ).then( ok, error ).finally( ultimo );
  };
  $scope.nombreNuevo = function( nombre ) {
    $scope.expediente.ficha.nombre = nombre;
    if ( $scope.expediente.id ) {
      delete $scope.temp.cedula;
    }

  };
} //controlador
