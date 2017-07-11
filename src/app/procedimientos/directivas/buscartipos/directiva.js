"use strict";

module.exports = cisBuscarTipos;

function cisBuscarTipos() {
  return {
    require: "?cisCapturarTeclado",
    replace: true,
    scope: {
      categoria: "=?",
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
    templateUrl: "procedimientos/directivas/buscartipos/plantilla.html",
    controller: "cisBuscarTiposCtrl"
  };
}
