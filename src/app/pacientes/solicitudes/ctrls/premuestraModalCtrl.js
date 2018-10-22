"use strict";

module.exports = PremuestraModalCtrl;

var map = require( "lodash/collection/map" );
var parsearMuestra = require( "./utils/solicitudCtrlUtil.js" ).parsearMuestra;
var getCorreos = require( "./utils/solicitudCtrlUtil.js" ).getCorreos;

PremuestraModalCtrl.$inject = [
  "$scope",
  "solicitudes",
  "$modalInstance",
  "SolicitudAPI",
  "Procedimientos",
  "Muestras",
  "MuestrasREST",
  "Usuarios",
  "Alertas"
];
function PremuestraModalCtrl(
  $scope,
  solicitudes,
  $modalInstance,
  SolicitudAPI,
  Procedimientos,
  Muestras,
  MuestrasREST,
  Usuarios,
  Alertas
) {
  $scope.cancelar = cancelar;
  $scope.solicitudes = solicitudes;
  $scope.actual = {};
  $scope.i = 0;
  $scope.cargarPremuestra = cargarPremuestra;
  $scope.buscarItem = buscarItem;
  $scope.buscarUsuarios = buscarUsuarios;
  $scope.convertir = convertir;
  $scope.convirtiendo = false;
  $scope.aplicarTodos = aplicarTodos;
  $scope.mapBuscador = {
    "procedimiento": Procedimientos.procedimientos.buscar,
    "medico": Muestras.buscarMedicos,
    "clinica": Muestras.buscarClinicas
  };

  cargarPremuestra( solicitudes[$scope.i] );

  function cargarPremuestra( solicitud ) {
    return SolicitudAPI
      .preconvertir( solicitud )
      .then( function( resp ) {
        $scope.actual = resp;
      } );
  }

  function buscarItem( valor, item ) {
    return $scope.mapBuscador[item]( 0, 10, valor ).then( ok, error );
  }

  function buscarUsuarios( texto, tipo ) {
    var dim = [ {
      tipoUsuario: [ tipo ]
    } ];
    return Usuarios.buscar( 0, 10, texto, dim ).then( ok, error );
  }

  function convertir( pre, form ) {
    $scope.$emit( "show-errors-check-validity" );
    if ( form.$valid ) {
      $scope.convirtiendo = true;
      var muestra = parsearMuestra( pre, getCorreos );
      return SolicitudAPI.convertir( muestra )
        .then( cargarSiguiente )
        .catch( errorConvertir )
        .finally( terminarConvertir );
    }
  }

  function cargarSiguiente() {
    $scope.i += 1;
    if ( $scope.i < $scope.solicitudes.length ) {
      return cargarPremuestra( $scope.solicitudes[$scope.i] );
    }
    return $modalInstance.close();
  }

  function errorConvertir( err ) {
    Alertas.agregar( err.status, "Hubo un error al convertir la solicitud en muestra" );
  }

  function terminarConvertir() {
    $scope.$emit( "show-errors-reset" );
    $scope.convirtiendo = false;
  }

  function aplicarTodos( solicitud, form ) {
    $scope.$emit( "show-errors-check-validity" );
    if ( form.$valid ) {
      var molde = parsearMuestra( solicitud );
      var ids = map( $scope.solicitudes.slice( $scope.i ), "_id" );
      $scope.convirtiendo = true;
      return SolicitudAPI.convertirTodos( molde, ids )
        .then( function( resp ) {
          Alertas.agregar( resp.status );
          $modalInstance.close();
        } )
        .catch( errorConvertir )
        .finally( terminarConvertir );
    }
  }

  function ok( resp ) {
    return resp.data.lista;
  }

  function error() {
    return [];
  }

  function cancelar() {
    $scope.$emit( "show-errors-reset" );
    $modalInstance.dismiss();
  }
}
