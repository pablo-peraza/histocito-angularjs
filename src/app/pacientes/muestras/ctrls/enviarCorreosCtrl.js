"use strict";

module.exports = EnviarCorreosMuestrasUnaCtrl;

EnviarCorreosMuestrasUnaCtrl.$inject = [ "$scope", "$modalInstance", "Muestras", "muestras" ];
function EnviarCorreosMuestrasUnaCtrl( $scope, $modalInstance, Muestras, muestras ) {
  $scope.datos = {};
  $scope.datos = muestras;
  $scope.adjuntos = [];
  $scope.procesando = false;

  $scope.ok = function() {
    if ( $scope.adjuntos.length ) {
      var elementos = _.map( $scope.adjuntos, function( adjunto ) {
        return "<li><a href='" + adjunto.url +  "'>" + adjunto.titulo + "</a></li>";
      } );
      var listaAdjuntos = "<ul>";
      _.forEach( elementos, function( elem ) {
        listaAdjuntos = listaAdjuntos + elem;
      } );
      listaAdjuntos = listaAdjuntos + "</ul>";
      $scope.datos.comentarioAdicional = ( $scope.datos.comentarioAdicional ?
      $scope.datos.comentarioAdicional : "" ) +
      "<br><p style='font-weight: bold'>Archivos adjuntos:</p>" + listaAdjuntos + "<br>";
    }
    $modalInstance.close( $scope.datos );
  };
  $scope.cancel = function() {
    $modalInstance.dismiss( "cancel" );
  };

  $scope.validarFormularioVacio = function( datos ) {
    var correosAdicionales = false;
    if ( typeof datos.correosAdicionales === "undefined" || datos.correosAdicionales === "" ) {
      correosAdicionales = true;
    }
    return correosAdicionales && !datos.expediente.ficha.datosContacto.enviarCorreo &&
    _.all( datos.usuariosParaCorreos, {"enviarcorreo": false} );
  };
} //EnviarCorreosMuestrasUnaCtrl
