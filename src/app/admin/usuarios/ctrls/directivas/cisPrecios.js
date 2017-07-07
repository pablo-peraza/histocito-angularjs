"use strict";

module.exports = cisPrecios;

function cisPrecios() {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/precios.html",
    scope: {
      modelo: "=",
      procedimientos: "=",
      editando: "=",
      cargando: "="
    }
  };
}
