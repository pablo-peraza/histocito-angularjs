"use strict";

module.exports = Usuarios;

Usuarios.$inject = [ "$http", "Dimensionador", "UsuariosTabs", "urlApi" ];
function Usuarios( $http, Dimensionador, UsuariosTabs, urlApi ) {
  var funciones = {};
  funciones.tabs = UsuariosTabs;

  funciones.muestras = function( id, pagina, cantidad ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    return $http.get( urlApi + "/api/usuarios/historial/muestras/" + id, params );
  };

  funciones.registrar = function( usuario ) {
    return $http.put( urlApi + "/api/usuarios/registrar", usuario );
  };

  funciones.actualizar = function( usuario ) {
    return $http.put( urlApi + "/api/usuarios/actualizar", usuario );
  };

  funciones.guardar = function( usuario ) {
    if ( _.isUndefined( usuario.id ) ) {
      usuario.password = "histocito";
      return funciones.registrar( usuario );
    } else {
      return funciones.actualizar( usuario );
    }
  };

  funciones.habiltar = function( id ) {
    return $http.post( urlApi + "/api/usuarios/habilitar/" + id );
  };

  funciones.deshabiltar = function( id ) {
    return $http.post( urlApi + "/api/usuarios/deshabilitar/" + id );
  };

  funciones.cambiarHabilitacion = function( usuario ) {
    var id = usuario.id;
    return usuario.habilitado ? funciones.deshabiltar( id ) : funciones.habiltar( id );
  };

  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/usuarios/" + id );
  };

  funciones.obtenerBulk = function( ids ) {
    var body = {
      lista: ids,
      cantidad: ids.length
    };
    return $http.post( urlApi + "/api/usuarios/", body );
  };

  funciones.etiquetas = function( dims ) {
    Dimensionador.cargarEtiquetas( dims, urlApi + "/api/usuarios/dimensiones" );
  };

  funciones.limpiarEtiquetas = function( dims ) {
    Dimensionador.limpiarEtiquetas( dims );
  };

  funciones.buscar = function( pagina, cantidad, texto, dims ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    if ( texto ) {
      params.params.texto = texto;
    }
    return $http.get( urlApi + "/api/usuarios/buscar", Dimensionador.hacer( params, dims ) );
  };

  return funciones;
}
