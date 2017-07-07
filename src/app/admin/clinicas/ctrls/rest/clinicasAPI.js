"use strict";

module.exports = Clinicas;

Clinicas.$inject = [ "$http", "Futuros", "urlApi" ];
function Clinicas( $http, Futuros, urlApi ) {
  var funciones = {};
  var clinicas;

  funciones.guardar = function( observacion ) {
    return $http.put( urlApi + "/api/clinicas/", observacion );
  };

  funciones.listar = function( pagina, cantidad, texto ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad,
        texto: texto
      }
    };
    clinicas = undefined;
    return $http.get( urlApi + "/api/clinicas/", params );
  };

  funciones.listarDeCache = function( pagina, cantidad ) {
    if ( !clinicas ) {
      var params = {
        params: {
          pagina: pagina,
          cantidad: cantidad
        }
      };
      clinicas = $http.get( urlApi + "/api/clinicas/", params );
    }
    return Futuros.aFuturo( clinicas );
  };

  funciones.borrar = function( id ) {
    return $http["delete"]( urlApi + "/api/clinicas/" + id );
  };

  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/clinicas/" + id );
  };

  return funciones;
} //Clinicas
