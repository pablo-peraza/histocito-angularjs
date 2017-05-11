"use strict";

module.exports = loginApi;
loginApi.$inject = [ "$http", "Credenciales", "Configuraciones", "urlApi" ];

function loginApi( $http, Credenciales, Configuraciones, urlApi ) {
  var funciones = {};

  funciones.autenticar = function( credenciales ) {
    var url = urlApi + "/api/usuarios/autenticar";
    return $http.post( url, credenciales ).then( function( respuesta ) {
      Credenciales.iniciar( credenciales.recordarPor, respuesta.data );
      Configuraciones.setHeaders( respuesta.data.token );
      return respuesta.data;
    } );
  };

  funciones.buscarPorCorreo = function( correo ) {
    return $http.get( urlApi + "/api/usuarios/verificarLogin", {
      params: {
        correo: correo
      }
    } );
  };

  funciones.registrarUsuario = function( usuario ) {
    return $http.put( urlApi + "/api/usuarios/registrar", usuario );
  };

  funciones.pedirRecuperacion = function( correo ) {
    return $http.put( urlApi + "/api/usuarios/recuperar", {
      correo: correo
    } );
  };

  funciones.existeRecuperacion = function( id ) {
    return $http.get( urlApi + "/api/usuarios/recuperar/" + id );
  };

  funciones.recuperar = function( id, nuevaClave ) {
    return $http.post( urlApi + "/api/usuarios/recuperar", {
      id: id,
      clave: nuevaClave
    } );
  };

  return funciones;
}
