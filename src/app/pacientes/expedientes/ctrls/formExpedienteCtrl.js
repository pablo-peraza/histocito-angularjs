"use strict";

module.exports = FormExpedienteCtrl;

function configurarTeclado( $scope, hotkeys, $timeout ) {
  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+return",
      description: "Guardar el expediente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $timeout( function() {
          document.getElementById( "enviarForm" ).click();
        }, 10 );
      }
    } )
    .add( {
      combo: "mod+shift+return",
      description: "Editar el expediente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.editar( $scope.datos.expediente );
      }
    } )
    .add( {
      combo: "mod+backspace",
      description: "Cancelar edición",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $timeout( function() {
          document.getElementById( "resetForm" ).click();
        }, 10 );
      }
    } )
    .add( {
      combo: "mod+left",
      description: "Paso Anterior",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.anterior();
      }
    } )
    .add( {
      combo: "mod+right",
      description: "Paso Siguiente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.siguiente();
      }
    } );
} //configurarTeclado

FormExpedienteCtrl.$inject = [
  "$rootScope",
  "$scope",
  "$location",
  "$window",
  "expediente",
  "hotkeys",
  "Expedientes",
  "Alertas",
  "Credenciales",
  "Tabs",
  "$timeout"
];
function FormExpedienteCtrl( $rootScope, $scope, $location, $window, expediente,
    hotkeys, Expedientes, Alertas, Credenciales, Tabs, $timeout ) {
  var temp;
  $scope.datos = {
    expediente: expediente
  };
  $scope.hoy = moment().endOf( "hour" );
  $scope.vacio = _.isEmpty;

  $scope.cargarMasMuestras = function() {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.muestras.cantidad = resp.data.cantidad;
      $scope.datos.muestras.lista = $scope.datos.muestras.lista.concat( resp.data.lista );
      $scope.elementoActual += 100;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status,
        "Hubo un error al cargar el historial de muestras del paciente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    Expedientes.rest.muestras( $scope.datos.expediente.id,
      $scope.elementoActual, 100 ).then( ok, error ).finally( finalmente );
  };

  if ( $scope.datos.expediente !== 404 ) {
    configurarTeclado( $scope, hotkeys, $timeout );
    if ( !$scope.datos.expediente.nuevo ) {
      $rootScope.titulo += $scope.datos.expediente.ficha.nombre;
    }
    $scope.tabs = Expedientes.tabs.generar( $scope.datos.expediente.id );
    if ( $scope.datos.expediente.id ) {
      $scope.elementoActual = 0;
      $scope.datos.muestras = {
        cantidad: 0,
        lista: []
      };
      $scope.cargarMasMuestras();
    }
  } //if

  $scope.editar = function( expediente ) {
    if ( $rootScope
      .puedePasar( [ $rootScope.permisos.laboratorio, $rootScope.permisos.digitador ] ) ) {
      temp = angular.copy( expediente );
      expediente.editando = true;
    }
  };

  $scope.cancelar = function( form ) {
    $scope.$broadcast( "show-errors-reset" );
    form.$setPristine();
    if ( $scope.datos.expediente.nuevo ) {
      $window.history.back();
    } else {
      $scope.datos.expediente = temp;
    }
  };
  $scope.guardar = function( expediente, form ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
      if ( expediente.id ) {
        expediente.editando = false;
      } else {
        $location.path( "/inicio/pacientes/expedientes/" + resp.data );
      }
      $scope.$broadcast( "show-errors-reset" );
      form.$setPristine();
    } //function
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //function
    $scope.$broadcast( "show-errors-check-validity" );
    if ( $rootScope
      .puedePasar( [ $rootScope.permisos.laboratorio, $rootScope.permisos.digitador ] ) &&
    expediente.editando && !$scope.datos.cargando && form.$valid ) {
      $scope.datos.cargando = true;
      Expedientes.rest.guardar( expediente ).then( ok, error ).finally( function() {
        $scope.datos.cargando = false;
      } );
    }
  };

  $scope.siguiente = function() {
    $scope.tabs = Tabs.siguiente( $scope.tabs );
  };

  $scope.anterior = function() {
    $scope.tabs = Tabs.anterior( $scope.tabs );
  };
  $scope.tabActual = function() {
    return Expedientes.tabs.actual( $scope.tabs );
  };

  //Medico
  $scope.editadoMedico = editadoMedico;
  $scope.guardadoMedico = guardadoMedico;
  $scope.canceladoMedico = canceladoMedico;
  var temporalMedico;

  function editadoMedico( expediente ) {
    temporalMedico = angular.copy( expediente );
    $scope.datos.edicionMedica = true;
  } //editadoMedico

  function guardadoMedico( expediente ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
    } //function
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //function
    $scope.datos.cargando = true;
    Expedientes.rest.guardar( expediente ).then( ok, error ).finally( function() {
      $scope.datos.cargando = false;
    } );
  } //guardadoMedico

  function canceladoMedico() {
    $scope.datos.edicionMedica = false;
    $scope.datos.expediente = temporalMedico;
  } //canceladoMedico

} //function
