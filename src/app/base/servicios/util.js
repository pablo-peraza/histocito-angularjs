"use strict";

module.exports = Util;

Util.$inject = [];

function Util() {
  Util.desacentuar = desacentuar;
  Util.formatear = formatear;
  Util.comparar = comparar;
  return Util;

  function omitirVocales( texto ) {
    var vocales = [ "(a|á)", "(e|é)", "(i|í)", "(o|ó)", "(u|ú)" ];

    vocales.forEach( function( vocal ) {
      texto = texto.replace( new RegExp( vocal, "ig" ), vocal );
    } );
    return texto;
  }

  function desacentuar( original ) {
    var texto = angular.copy( original );
    return ( texto ) ? omitirVocales( texto ) : undefined;
  }

  function formatear( original, noAcentos, upper ) {
    var texto = angular.copy( original );
    var strCase = ( _.isUndefined( upper ) ) ? null : upper;
    if ( noAcentos ) {
      texto = desacentuar( texto );
    }
    if ( !_.isNull( strCase ) ) {
      texto = strCase ? texto.toUpperCase() : texto.toLowerCase();
    } else {
      texto = texto.charAt( 0 ).toUpperCase() + texto.slice( 1 );
    }
    return texto;
  }

  function comparar( original1, original2 ) {
    var texto1 = formatear( original1, true, false );
    var texto2 = formatear( original2, true, false );
    return ( texto1 === texto2 );
  }
}
