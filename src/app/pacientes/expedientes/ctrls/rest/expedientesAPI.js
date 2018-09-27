"use strict";

module.exports = ExpedientesREST;

function completarExpediente( expediente ) {
  var temp = angular.copy( expediente );
  if (  expediente.ficha.sexo === "Masculino" ) {
    delete temp.fichaMedica.ago;
  }
  if ( !expediente.ficha.datosContacto ) {
    temp.ficha.datosContacto = {
      telefonos: [],
      correos: []
    };
  }
  return temp;
}

ExpedientesREST.$inject = [ "$http", "Dimensionador", "urlApi", "node" ];
function ExpedientesREST( $http, Dimensionador, urlApi, node ) {
  var funciones = {};

  funciones.guardar = function( expediente ) {
    expediente.fichaMedica.cirugias = [];
    return $http.put( urlApi + "/api/expedientes/", completarExpediente( expediente ) );
  };

  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/expedientes/" + id );
  };

  funciones.misExpedientes = function( pagina, cantidad ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    return $http.get( urlApi + "/api/usuarios/expedientes/", params );
  };

  funciones.buscar = function( pagina, cantidad, texto, dimensiones ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    if ( texto ) {
      params.params.texto = texto;
    }
    return $http.get( urlApi + "/api/expedientes/buscar",
      Dimensionador.hacer( params, dimensiones ) );
  };

  funciones.buscarNuevo = function( pagina, cantidad, texto, dimensiones ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    if ( texto ) {
      params.params.texto = texto;
    }
    return $http.get( urlApi + "/api/expedientes/buscar",
      Dimensionador.hacer( params, dimensiones ) );
  };

  funciones.buscarWebService = function( texto ) {
    return $http.get( node + "/api/pacientes", {
      params: {
        texto: texto
      } } );
  };

  funciones.muestras = function( id, pagina, cantidad ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    return $http.get( urlApi + "/api/expedientes/historial/muestras/" + id, params );
  };

  funciones.cargarEtiquetas = function( dims ) {
    Dimensionador.cargarEtiquetas( dims, urlApi + "/api/expedientes/dimensiones" );
  };

  funciones.obtenerDuplicados = function(pagina, cantidad, filtro) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad,
        filtro: filtro
      }
    };
    return $http.get( node + "/api/expedientes/duplicados", params );
  };

  funciones.resolverDuplicados = function( dups ) {
    return $http.put( node + "/api/expedientes/resolver", dups );
  };

  return funciones;
}
