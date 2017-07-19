"use strict";

module.exports = diagnosticoMolecular;

function diagnosticoMolecular() {
  return {
    restrict: "A",
    templateUrl: "pacientes/diagnosticos/directivas/moleculares/htmls/principal.html",
    scope: {
      modelo: "=",
      editando: "=",
      cargando: "=",
      estado: "@"
    },
    controller: "diagnosticoMolecularCtrl"
  };
}
