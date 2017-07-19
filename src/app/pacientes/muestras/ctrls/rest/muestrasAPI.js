"use strict";

MuestrasREST.$inject = MuestrasREST;

MuestrasREST.$inject = [ "$http", "Dimensionador" ];
function MuestrasREST( $http, Dimensionador ) {
  var funciones = {};

  funciones.guardar = function( muestra ) {
    return $http.put( "/api/muestra/", muestra );
  };

  funciones.obtener = function( id ) {
    return $http.get( "/api/muestra/" + id );
  };

  funciones.breeze = function() {
    return $http.get( "/api/muestra/breeze" );
  };

  funciones.eliminar = function( id ) {
    return $http["delete"]( "/api/muestra/" + id );
  };

  funciones.diagnosticar = function( id, diagnostico ) {
    return $http.put( "/api/muestra/" + id + "/diagnosticar", diagnostico );
  };

  funciones.buscar = function( pagina, cantidad, texto, dimensiones ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    if ( texto ) {
      if ( /^\d{4}-\d+$/.test( texto ) ) {
        params.params.muestra = texto;
      } else {
        params.params.texto = texto;
      }
    }
    return $http.get( "/api/muestra/", Dimensionador.hacer( params, dimensiones ) );
  };

  funciones.informePublico = function( hash ) {
    return $http.get( "/api/muestra/informePublico/" + hash );
  };

  funciones.informePrivado = function( id ) {
    return $http.get( "/api/muestra/" + id + "/informe" );
  };

  funciones.estados = function( id ) {
    var url = "/api/muestra/";
    var params = {
      params: {
        id: id
      }
    };
    return {
      aRegistrada: function() {
        return $http.post( url + "aRegistrada", {}, params );
      },
      aAnalisis: function() {
        return $http.post( url + "aAnalisis", {}, params );
      },
      aDiagnostico: function() {
        return $http.post( url + "aDiagnostico", {}, params );
      },
      aCompletada: function() {
        return $http.post( url + id + "/aCompletada" );
      },
      aEspera: function( motivo ) {
        return $http.post( url + id + "/aEspera", {
          motivo: motivo
        } );
      }
    };
  };

  funciones.limpiarEtiquetas = function( dims ) {
    Dimensionador.limpiarEtiquetas( dims );
  };

  funciones.etiquetas = function( dims ) {
    Dimensionador.cargarEtiquetas( dims, "/api/muestra/dimensiones" );
  };

  return funciones;
}
