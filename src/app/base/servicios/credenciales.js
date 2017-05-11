"use strict";

module.exports = credenciales;

credenciales.$inject = [ "$localStorage", "$sessionStorage" ];

function credenciales( $localStorage, $sessionStorage ) {
  var funciones = {};
  funciones.local = $localStorage;
  funciones.sesion = $sessionStorage;
  $localStorage.$default( {
    recordarPor: 3
  } );

  funciones.recordarPor = function( nuevo ) {
    $localStorage.recordarPor = nuevo || $localStorage.recordarPor;
    return $localStorage.recordarPor;
  };

  funciones.loguear = function( credenciales ) {
    $sessionStorage.credenciales = credenciales;
  };

  funciones.iniciar = function( recordar, credenciales ) {
    if ( recordar ) {
      $localStorage.credenciales = credenciales;
    }
    funciones.loguear( credenciales );
  };

  funciones.credenciales = function() {
    return $sessionStorage.credenciales;
  };

  function recordar() {
    var temp = $localStorage.credenciales;
    if ( !_.isUndefined( temp ) && _.isUndefined( funciones.credenciales() ) ) {
      funciones.loguear( temp );
    }
  } //function

  funciones.estaLogueado = function() {
    recordar();
    return !_.isUndefined( funciones.credenciales() );
  };

  funciones.borrarSession = function() {
    delete $sessionStorage.credenciales;
  };

  funciones.borrarCredenciales = function() {
    funciones.borrarSession();
    delete $localStorage.credenciales;
  };
  return funciones;
}
