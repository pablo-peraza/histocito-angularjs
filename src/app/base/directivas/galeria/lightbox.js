"use strict";

module.exports = LightBoxCtrl;

LightBoxCtrl.$inject = [ "$scope", "imagen", "Imagenes" ];
function LightBoxCtrl( $scope, imagen, Imagenes ) {
  Imagenes.obtener( imagen.id ).then(
    function( resp ) {
      $scope.imagen = resp.data;
    }
  );
} //controller
