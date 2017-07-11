"use strict";

module.exports = cisBuscarOrigenes;

function cisBuscarOrigenes() {
  return {
    require: "?cisCapturarTeclado",
    replace: true,
    scope: {
      modelo: "=",
      cargando: "=",
      editando: "=",
      focus: "@?"
    },
    link: function( scope, elem, attr, cisCapturarTecladoCtrl ) {
      if ( cisCapturarTecladoCtrl ) {
        cisCapturarTecladoCtrl
        .init( elem.find( "input" ), attr.cisCapturarTeclado * 1, attr.hacer );
      }
    },
    restrict: "A",
    templateUrl: "procedimientos/directivas/buscarorigenes/plantilla.html",
    controller: "cisBuscarOrigenesCtrl"
  };
}
