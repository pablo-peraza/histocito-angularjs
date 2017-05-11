"use strict";

module.exports = Cache;

Cache.$inject = [];
function Cache() {
  var clientesMap = {};
  var entidadesMap = {};
  var personajesMap = {};

  Cache.setClientes = setObjeto( clientesMap );
  Cache.setEntidades = setObjeto( entidadesMap );
  Cache.setPersonajes = setObjeto( personajesMap );
  Cache.listaClientes = getLista( clientesMap );
  Cache.listaEntidades = getLista( entidadesMap );
  Cache.listaPersonajes = getLista( personajesMap );
  Cache.clientes = clientesMap;
  Cache.entidades = entidadesMap;
  Cache.personajes = personajesMap;
  return Cache;

  function setObjeto( mapa ) {
    return function( lista ) {
      _.forEach( lista, function( objeto ) {
        if ( objeto._id ) {
          mapa[ objeto._id ] = objeto;
        }
      } );
    };
  }

  function getLista( mapa ) {
    return function() { return angular.copy( _.values( mapa ) ); };
  }
}
