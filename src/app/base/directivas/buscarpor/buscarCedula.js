"use strict";

module.exports = cisBuscarCedula;

function cisBuscarCedula() {
  return {
    restrict: "A",
    templateUrl: "base/directivas/buscarpor/buscarPorCedula.html",
    link: function( scope, elem, attr ) {
      scope.formato = attr.cisBuscarCedula;
    },
    scope: {
      modelo: "=",
      enSeleccion: "&",
      buscar: "=",
      editando: "=",
      cargando: "=",
      focus: "@?"
    },
    controller: "cisBuscarPorCtrl"
  };
}
