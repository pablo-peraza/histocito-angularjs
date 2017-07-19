"use strict";

module.exports = modalEtitrocitosCtrl;

modalEtitrocitosCtrl.$inject = [ "$scope", "$modalInstance", "modelo" ];
function modalEtitrocitosCtrl( $scope, $modalInstance, modelo ) {
  $scope.modelo = modelo;
  $scope.ok = function( modelo ) {
    $modalInstance.close( modelo );
  };
} //ctrl
