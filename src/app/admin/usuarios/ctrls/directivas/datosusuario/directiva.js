"use strict";

module.exports = cisDatosUsuario;

function cisDatosUsuario() {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/datosusuario/plantilla.html",
    scope: {
      modelo: "=ngModel"
    },
    controller: "cisDatosUsuarioCtrl"
  };
} //cisDatosUsuario
