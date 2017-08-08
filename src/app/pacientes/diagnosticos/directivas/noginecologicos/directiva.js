"use strict";

module.exports = diagnosticoNoginecologico;

function diagnosticoNoginecologico() {
  return {
    restrict: "A",
    templateUrl: "pacientes/diagnosticos/directivas/noginecologicos/plantilla.html",
    scope: {
      modelo: "=",
      editando: "=",
      cargando: "=",
      estado: "@"
    },
    controller: "diagnosticoNoginecologicoCtrl"
  };
}
