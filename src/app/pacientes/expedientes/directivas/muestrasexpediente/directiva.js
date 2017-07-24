"use strict";

module.exports = cisMuestrasExpediente;

function cisMuestrasExpediente() {
  return {
    restrict: "A",
    templateUrl: "pacientes/expedientes/directivas/muestrasexpediente/plantilla.html",
    scope: {
      idExpediente: "@"
    },
    controller: "cisMuestrasExpedienteCtrl"
  };
} //cisHistorialMuestras
