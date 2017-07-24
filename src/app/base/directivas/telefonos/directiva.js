"use strict";

module.exports = cisTelefonos;

function cisTelefonos() {
  return {
    restrict: "A",
    replace: "true",
    templateUrl: "base/directivas/telefonos/plantilla.html",
    scope: {
      modelo: "=",
      cargando: "=",
      editando: "="
    },
    controller: "cisTelefonosCtrl"
  };
}
