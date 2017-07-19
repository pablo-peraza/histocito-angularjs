"use strict";

module.exports = diagnosticoCitologia;

function diagnosticoCitologia() {
  return {
    restrict: "A",
    templateUrl: "pacientes/diagnosticos/directivas/citologias/htmls/principal.html",
    scope: {
      modelo: "=",
      origen: "=",
      expediente: "=",
      editando: "=",
      cargando: "=",
      estado: "@"
    },
    controller: "diagnosticoCitologiaCtrl"
  };
} //directiva
