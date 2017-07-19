"use strict";

module.exports = DiagnosticoCtrl;

DiagnosticoCtrl.$inject = [
  "$rootScope",
  "$scope",
  "params",
  "hotkeys",
  "Muestras",
  "Alertas",
  "$window",
  "$location"
];
function DiagnosticoCtrl( $rootScope, $scope, params, hotkeys, Muestras, Alertas, $window,
  $location ) {
  var original;
  if ( params.muestra !== 401 && params.muestra !== 404 ) {
    if ( _.isUndefined( params.muestra.diagnostico ) ) {
      params.muestra.diagnostico = {
        editando: true,
        nuevo: true,
        tipo: tipo( params.tipo.categoria )
      };
    } else {
      params.muestra.diagnostico.editando = false;
    }
    configurarTeclado( $scope, hotkeys );
  } //if

  function configurarTeclado( $scope, hotkeys ) {
    hotkeys.bindTo( $scope )
      .add( {
        combo: "mod+return",
        description: "Guardar el diagnóstico",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.guardar( $scope.datos.muestra.id, $scope.datos.muestra.diagnostico );
        }
      } )
      .add( {
        combo: "mod+shift+return",
        description: "Editar el diagnóstico",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.editar( $scope.datos.usuario );
        }
      } )
      .add( {
        combo: "mod+backspace",
        description: "Cancelar",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.cancelar();
        }
      } );
  } //configurarTeclado

  function tipo( categoria ) {
    return categoria === "Citología no ginecológica" ? "No ginecológico" : categoria;
  }

  $scope.datos = {
    muestra: params.muestra,
    procedimiento: params.procedimiento,
    tipo: params.tipo,
    origen: params.origen,
    expediente: params.expediente
  };

  $scope.guardar = function( id, diagnostico ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      Alertas.agregar( resp.status );
      $scope.datos.muestra.diagnostico.editando = false;
      delete $scope.datos.muestra.diagnostico.nuevo;
    } //ok
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( ( diagnostico.lesiones && diagnostico.lesiones.activado ) && !diagnostico.lesiones.tipo ) {
      ultima();
      return Alertas.agregar( 400,
        "Precaución", "Debe completar el tipo de lesión en la pestaña de Interpretación Citológica"
      );
    }
    Muestras.rest.diagnosticar( id, diagnostico ).then( ok, error ).finally( ultima );
  };

  $scope.editar = function() {
    original = angular.copy( $scope.datos.muestra.diagnostico );
    $scope.datos.muestra.diagnostico.editando = true;
  };

  $scope.reporte = function() {
    if ( !$scope.datos.muestra.diagnostico.nuevo && !$scope.datos.muestra.diagnostico.editando ) {
      $location
      .path( "/inicio/pacientes/muestras/" + $scope.datos.muestra.id + "/diagnostico/reporte" );
    } //if
  };
  $scope.cancelar = function() {
    if ( $scope.datos.muestra.diagnostico.nuevo ) {
      $window.history.back();
    } else {
      $scope.datos.muestra.diagnostico = original;
    }
  };
  $scope.completar = function( muestra ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
      muestra.estado = "Completada";
    } //ok
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( muestra.estado !== "Completada" && !$scope.datos.cargando && $rootScope.puedePasar(
      [ $rootScope.permisos.laboratorio, $rootScope.permisos.patologo ] ) ) {
      if ( confirm( "¿Está seguro que desea aceptar el diagnóstico?" ) ) {
        $scope.datos.cargando = true;
        Muestras.rest.estados( muestra.id ).aCompletada().then( ok, error ).finally( ultima );
      }
    } //if
  };
} //ctrl
