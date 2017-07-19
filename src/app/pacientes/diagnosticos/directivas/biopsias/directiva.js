"use strict";

module.exports = diagnosticoBiopsia;

function diagnosticoBiopsia() {
  return {
    restrict: "A",
    templateUrl: "pacientes/diagnosticos/directivas/biopsias/htmls/principal.html",
    scope: {
      modelo: "=",
      editando: "=",
      cargando: "=",
      estado: "@"
    },
    controller: "diagnosticoBiopsiaCtrl"
  };
}
