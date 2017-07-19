"use strict";

module.exports = Cache;

Cache.$inject = [ "Futuros" ];
function Cache( Futuros ) {
  var cache = {};
  return {
    agregar: function( llave, valor ) {
      cache[llave] = valor;
    },
    obtener: function( llave ) {
      if ( cache[llave] ) {
        return Futuros.aFuturo( cache[llave] );
      }
    }
  };
}
