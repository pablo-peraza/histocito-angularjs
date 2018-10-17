"use strict";

module.exports = PremuestraModalCtrl;

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
  $scope.mapBuscador = {
    "procedimiento": Procedimientos.procedimientos.buscar,
    "medico": Muestras.buscarMedicos,
    "clinica": Muestras.buscarClinicas
  };

  cargarPremuestra( solicitudes[$scope.i] );

  function cargarPremuestra( premuestra ) {
    return SolicitudAPI
      .preconvertir( premuestra )
      .then( function( resp ) {
        resp.plantilla = "default";
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

  function parsearMuestra( data ) {
    return {
      autorizados: data.autorizados,
      cobrada: false,
      consecutivo: data.consecutivo.display,
      correos: [],
      enviada: false,
      equipo: {
        histotecnologo: data.histotecnologo._id,
        citotecnologo: data.citotecnologo._id,
        patologo: data.patologo._id
      },
      estado: "Registrada",
      fechaToma: data.fechaToma,
      idClinica: data.clinica._id,
      idExpediente: data.paciente._id,
      idMedico: data.medico._id,
      idProcedimiento: data.procedimiento._id,
      idUsuario: data.dueno._id,
      imagenes: [],
      numero: data.consecutivo.numero,
      template: "default"
    };
  }

  function convertir( pre, form ) {
    $scope.$emit( "show-errors-check-validity" );
    if ( form.$valid ) {
      var obj = parsearMuestra( pre );
      return MuestrasREST.guardar( obj )
        .then( function( resp ) {
          $scope.i += 1;
          $scope.actual = $scope.solicitudes[$scope.i];
          Alertas.agregar( resp.status );
        } )
        .catch( function( err ) {
          Alertas.agregar( err.status, "Hubo un error al convertir la solicitud en muestra" );
        } );
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
