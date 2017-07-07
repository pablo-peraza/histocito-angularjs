"use strict";

module.exports = Medicos;

Medicos.$inject = [ "$http", "Futuros", "urlApi" ];
function Medicos( $http, Futuros, urlApi ) {
  var funciones = {};
  var medicos;

  funciones.guardar = function( observacion ) {
    return $http.put( urlApi + "/api/medicos/", observacion );
  };

  funciones.listar = function( pagina, cantidad, texto ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad,
        texto: texto
      }
    };
    medicos = undefined;
    return $http.get( urlApi + "/api/medicos/", params );
  };

  funciones.listarDeCache = function( pagina, cantidad ) {
    if ( !medicos ) {
      var params = {
        params: {
          pagina: pagina,
          cantidad: cantidad
        }
      };
      medicos = $http.get( urlApi + "/api/medicos/", params );
    }
    return Futuros.aFuturo( medicos );
  };

  funciones.borrar = function( id ) {
    return $http["delete"]( urlApi + "/api/medicos/" + id );
  };

  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/medicos/" + id );
  };

  return funciones;
} //Medicos
