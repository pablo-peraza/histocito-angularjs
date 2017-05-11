"use strict";

module.exports = Dimensionador;

Dimensionador.$inject = [ "$http", "Cache" ];

function Dimensionador( $http, Cache ) {
  return {
    cargarEtiquetas: function( dims, url ) {
      cargarEtiquetasCurry( Cache, $http )( dims, url );
    },
    limpiarEtiquetas: function( dims ) {
      _.forEach( _.keys( dims ), function( llave ) {
        _.forEach( dims[llave], function( obj ) {
          delete Cache[obj.nombre];
        } );
      } );
    },
    hacer: hacer
  };

  function hacer( params, dims ) {
    if ( dims ) {
      var copia = angular.copy( params );
      var temp = _.reduce( dims, function( result, d ) {
        return _.merge( result, d );
      }, {} );
      copia.params = _.merge( temp, copia.params );
      return copia;
    }
    return params;
  }
}

function filtrarDimension( Cache, dims ) {
  var copia = angular.copy( dims );
  _.forEach( _.keys( copia ), function( llave ) {
    var noCargadas = _.filter( copia[llave], function( dim ) {
      return _.isUndefined( Cache[dim.nombre] );
    } );
    if ( _.isEmpty( noCargadas ) ) {
      delete copia[llave];
    } else {
      copia[llave] = noCargadas;
    }
  } );
  return copia;
} //filtrarDimension

function cargarEtiquetasCurry( Cache, $http ) {
  return function( dims, url ) {
    var filtradas = filtrarDimension( Cache, dims );
    if ( !_.isEmpty( filtradas ) ) {
      $http.post( url, filtradas ).then( function( resp ) {
        _.forEach( _.keys( resp.data ), function( llave ) {
          Cache[llave] = resp.data[llave];
        } );
      } );
    }
  };
} //cargarEtiquetasCurry
