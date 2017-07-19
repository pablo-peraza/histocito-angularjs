"use strict";

module.exports = diagnosticoNoginecologicoCtrl;

diagnosticoNoginecologicoCtrl.$inject = [ "$scope" ];
function diagnosticoNoginecologicoCtrl( $scope ) {
  if ( _.isUndefined( $scope.modelo ) ) {
    $scope.modelo = {};
  }
} //ctrl
