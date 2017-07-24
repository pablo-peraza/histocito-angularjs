"use strict";

module.exports = cisScroll;

function cisScroll() {
  return {
    restrict: "A",
    templateUrl: "base/directivas/scroll/plantilla.html",
    scope: {
      cargador: "=",
      umbral: "@",
      debeCargar: "="
    },
    controller: "cisScrollCtrl"
  };
}
