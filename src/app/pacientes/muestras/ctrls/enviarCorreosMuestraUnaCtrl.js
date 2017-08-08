"use strict";

module.exports = EnviarCorreosMuestrasUnaCtrl;

EnviarCorreosMuestrasUnaCtrl.$inject = [ "$scope", "$modalInstance", "Muestras", "muestras" ];
function EnviarCorreosMuestrasUnaCtrl( $scope, $modalInstance, Muestras, muestras ) {
  $scope.datos = {};
  $scope.datos = muestras;

  $scope.ok = function() {
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
