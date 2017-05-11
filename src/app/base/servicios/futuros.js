"use strict";

module.exports = futuros;

function futuros( $q, $timeout ) {
  futuros.aFuturo = aFuturo;
  futuros.aRechazo = aRechazo;
  return futuros;

  function aFuturo( valor, timeout ) {
    return promesa( "resolve", valor, timeout );
  } //function

  function aRechazo( valor, timeout ) {
    return promesa( "reject", valor, timeout );
  } //function

  function promesa( tipo, valor, timeout ) {
    try {
      var futuro = $q.defer();
      $timeout( function() {
        futuro[tipo]( valor );
      }, ( _.isUndefined( timeout ) ) ? 0 : timeout );
      return futuro.promise;
    } catch ( ex ) {
      return ex;
    } //catch
  } //function

}
