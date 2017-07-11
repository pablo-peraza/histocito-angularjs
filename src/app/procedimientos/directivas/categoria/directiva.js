"use strict";

module.exports = cisCategorias;

function cisCategorias() {
  return {
    replace: true,
    scope: {
      modelo: "=",
      cargando: "=",
      editando: "=",
      focus: "=?"
    },
    restrict: "A",
    templateUrl: "procedimientos/directivas/categoria/plantilla.html",
    controller: "cisCategoriasCtrl"
  };
}
