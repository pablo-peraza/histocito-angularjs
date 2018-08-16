"use strict";

module.exports = ModalSecuenciaCtrl;

ModalSecuenciaCtrl.$inject = [ "$scope", "$modalInstance", "modoSecuencia", "Muestras" ];
function ModalSecuenciaCtrl( $scope, $modalInstance, modoSecuencia, Muestras ) {
  $scope.datos = _.cloneDeep(modoSecuencia);
  $scope.datos.secuencia = "";
  $scope.ok = function(datos) {
    Muestras.guardarSecuencia(datos).then(function() {
      $modalInstance.close(datos);
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss( "NO" );
  };
} //controller
