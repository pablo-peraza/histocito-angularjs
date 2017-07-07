"use strict";

module.exports = cisBuscarNombre;

function cisBuscarNombre() {
  return {
    restrict: "A",
    templateUrl: "base/directivas/buscarpor/buscarPorNombre.html",
    link: function( scope, elem, attr ) {
      scope.formato = attr.cisBuscarNombre;
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
