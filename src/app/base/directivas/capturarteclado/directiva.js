"use strict";

module.exports = cisCapturarTeclado;

function cisCapturarTeclado() {
  return {
    restrict: "A",
    link: function( scope, elem, attr, cisCapturarTecladoCtrl ) {
      cisCapturarTecladoCtrl.init( elem, ( attr.cisCapturarTeclado * 1 ), attr.hacer, attr.padre );
    },
    controller: "cisCapturarTecladoCtrl"
  };
}
