"use strict";

module.exports = Procedimientos;

Procedimientos.$inject = [ "$http", "Dimensionador", "urlApi" ];
function Procedimientos( $http, Dimensionador, urlApi ) {
  var funciones = {};

  funciones.temporal = {};

  funciones.origenes = {
    buscar: function( pagina, cantidad, texto ) {
      var params = {
        params: {
          pagina: pagina,
          cantidad: cantidad
        }
      };
      if ( texto ) {
        params.params.texto = texto;
      }
      return $http.get( urlApi + "/api/origen/", params );
    },
    obtener: function( id ) {
      return $http.get( urlApi + "/api/origen/" + id );
    },
    guardar: function( origen ) {
      return $http.put( urlApi + "/api/origen/", origen );
    },
    eliminar: function( id ) {
      return $http["delete"]( urlApi + "/api/origen/" + id );
    },
    etiquetas: function( dims ) {
      Dimensionador.cargarEtiquetas( dims, urlApi + "/api/origen/dimensiones" );
    },
    limpiarEtiquetas: function( dims ) {
      Dimensionador.limpiarEtiquetas( dims );
    }
  };

  funciones.tipos = {
    buscar: function( pagina, cantidad, texto, dims ) {
      var params = {
        params: {
          pagina: pagina,
          cantidad: cantidad
        }
      };
      if ( texto ) {
        params.params.texto = texto;
      }
      return $http.get( urlApi + "/api/tipo/", Dimensionador.hacer( params, dims ) );
    },
    obtener: function( id ) {
      return $http.get( urlApi + "/api/tipo/" + id );
    },
    guardar: function( tipo ) {
      console.debug( tipo );
      return $http.put( urlApi + "/api/tipo/", tipo );
    },
    eliminar: function( id ) {
      return $http["delete"]( urlApi + "/api/tipo/" + id );
    },
    etiquetas: function( dims ) {
      Dimensionador.cargarEtiquetas( dims, urlApi + "/api/tipo/dimensiones" );
    },
    limpiarEtiquetas: function( dims ) {
      Dimensionador.limpiarEtiquetas( dims );
    }
  };

  funciones.procedimientos = {
    buscar: function( pagina, cantidad, texto, dims ) {
      var params = {
        params: {
          pagina: pagina,
          cantidad: cantidad
        }
      };
      if ( texto ) {
        params.params.texto = texto;
      }
      return $http.get( urlApi + "/api/procedimiento/", Dimensionador.hacer( params, dims ) );
    },
    obtener: function( id ) {
      return $http.get( urlApi + "/api/procedimiento/" + id );
    },
    guardar: function( procedimiento ) {
      return $http.put( urlApi + "/api/procedimiento/", procedimiento );
    },
    eliminar: function( id ) {
      return $http["delete"]( urlApi + "/api/procedimiento/" + id );
    },
    etiquetas: function( dims ) {
      Dimensionador.cargarEtiquetas( dims, urlApi + "/api/procedimiento/dimensiones" );
    },
    limpiarEtiquetas: function( dims ) {
      Dimensionador.limpiarEtiquetas( dims );
    }
  };
  return funciones;
}
