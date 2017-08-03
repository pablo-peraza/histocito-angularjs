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
} //EnviarCorreosMuestrasUnaCtrl
