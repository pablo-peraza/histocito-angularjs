"use strict";

module.exports = cisCorreos;

function cisCorreos() {
  return {
    restrict: "A",
    replace: "true",
    templateUrl: "base/directivas/correos/plantilla.html",
    scope: {
      modelo: "=",
      cargando: "=",
      editando: "="
    },
    controller: "cisCorreosCtrl"
  };
}
