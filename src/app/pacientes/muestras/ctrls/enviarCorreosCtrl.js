"use strict";

module.exports = EnviarCorreosCtrl;

EnviarCorreosCtrl.$inject = [ "$scope", "$modalInstance", "Muestras", "muestras" ];
function EnviarCorreosCtrl( $scope, $modalInstance, Muestras, muestras ) {
  $scope.datos = {};
  $scope.datos = muestras;

  $scope.ok = function() {
    $modalInstance.close( $scope.datos );
  };

  $scope.cancel = function() {
    $modalInstance.dismiss( "cancel" );
  };
} //EnviarCorreosCtrl
