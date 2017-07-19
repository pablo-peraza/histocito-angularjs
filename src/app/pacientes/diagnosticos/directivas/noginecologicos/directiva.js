"use strict";

module.exports = diagnosticoNoginecologico;

function diagnosticoNoginecologico() {
  return {
    restrict: "A",
    templateUrl: "paciente/diagnosticos/directivas/noginecologicos/plantilla.html",
    scope: {
      modelo: "=",
      editando: "=",
      cargando: "=",
      estado: "@"
    },
    controller: "diagnosticoNoginecologicoCtrl"
  };
}
