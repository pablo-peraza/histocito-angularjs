"use strict";

module.exports = MotivoCtrl;

MotivoCtrl.$inject = [ "$scope", "$modalInstance" ];
function MotivoCtrl( $scope, $modalInstance ) {
  $scope.datos = {};
  $scope.ok = function( motivo ) {
    $modalInstance.close( motivo );
  };

  $scope.cancel = function() {
    $modalInstance.dismiss( "NO" );
  };
} //controller
