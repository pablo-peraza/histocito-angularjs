"use strict";

module.exports = cisGaleria;

function cisGaleria() {
  return {
    restrict: "EA",
    replace: "true",
    templateUrl: "/htmls/partials/comps/galeria.html",
    scope: {
      modelo: "=",
      unico: "=?",
      privado: "=?"
    },
    controller: "cisGaleriaCtrl"
  };
}
