"use strict";

module.exports = cisSubidaImagenes;

function cisSubidaImagenes() {
  return {
    restrict: "EA",
    templateUrl: "base/directivas/subidaimagenes/plantilla.html",
    scope: {
      modelo: "=",
      unico: "=?"
    },
    controller: "SubidaImagenesCtrl"
  };
} //directiva
