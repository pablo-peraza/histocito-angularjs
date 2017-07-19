"use strict";

module.exports = cisDatosPaciente;

function cisDatosPaciente() {
  return {
    restrict: "A",
    templateUrl: plantilla( "datospaciente" ),
    scope: {
      cargando: "=",
      editando: "=",
      expediente: "="
    },
    controller: "cisDatosPacienteCtrl"
  };
}
