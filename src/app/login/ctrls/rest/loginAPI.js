"use strict";

module.exports = loginApi;
loginApi.$inject = [ "$http", "Credenciales", "Configuraciones" ];

function loginApi( $http, Credenciales, Configuraciones ) {
  var funciones = {};

  funciones.autenticar = function( credenciales ) {
    return $http.post( "/api/usuarios/autenticar", credenciales ).then( function( respuesta ) {
      Credenciales.iniciar( credenciales.recordarPor, respuesta.data );
      Configuraciones.setHeaders( respuesta.data.token );
      return respuesta.data;
    } );
  };

  funciones.buscarPorCorreo = function( correo ) {
    return $http.get( "/api/usuarios/verificarLogin", {
      params: {
        correo: correo
      }
    } );
  };

  funciones.registrarUsuario = function( usuario ) {
    return $http.put( "/api/usuarios/registrar", usuario );
  };

  funciones.pedirRecuperacion = function( correo ) {
    return $http.put( "/api/usuarios/recuperar", {
      correo: correo
    } );
  };

  funciones.existeRecuperacion = function( id ) {
    return $http.get( "/api/usuarios/recuperar/" + id );
  };

  funciones.recuperar = function( id, nuevaClave ) {
    return $http.post( "/api/usuarios/recuperar", {
      id: id,
      clave: nuevaClave
    } );
  };

  return funciones;
}
