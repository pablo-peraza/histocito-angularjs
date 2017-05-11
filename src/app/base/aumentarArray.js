"use strict";

module.exports = function aumentarArray( temp ) {
  if ( temp === null ) {
    return null;
  }
  if ( temp && _.isArray( temp ) && verificarNumeros( temp ) ) {
    return _.map( temp, function( n ) {
      return n + 1;
    } );
  }

};

function verificarNumeros( array ) {
  return _.every( array, function( n ) {
    return _.isNumber( n );
  } );
}
