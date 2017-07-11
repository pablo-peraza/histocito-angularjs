"use strict";

module.exports = procedimientosMedicosCtrl;

procedimientosMedicosCtrl.$inject = [
  "$scope",
  "procedimientos",
  "elementoActual",
  "usuario"
];
function procedimientosMedicosCtrl( $scope, procedimientos, elementoActual, usuario ) {
  function mapaPrecios( precios ) {
    return _.reduce( precios, function( res, ele ) {
      res[ele.idProcedimiento] = ele.monto.centavos;
      return res;
    }, {} );
  } //mapaPrecios
  $scope.datos = {
    procedimientos: procedimientos,
    elementoActual: elementoActual,
    usuario: usuario,
    precios: mapaPrecios( usuario.precios )
  };
} //ctrl
