"use strict";

module.exports = cisGaleria;

function cisGaleria() {
  return {
    restrict: "EA",
    replace: "true",
    templateUrl: "base/directivas/galeria/plantilla.html",
    scope: {
      modelo: "=",
      unico: "=?",
      privado: "=?",
      deshabilitado: "=?"
    },
    controller: "cisGaleriaCtrl"
  };
}
