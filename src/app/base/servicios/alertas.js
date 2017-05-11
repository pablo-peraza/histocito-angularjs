"use strict";

module.exports = alertas;

function alertas() {
  var funciones = {};

  function oo( mensaje, defecto ) {
    return ( _.isUndefined( mensaje ) ) ? defecto : mensaje;
  } //function

  function alertaExito( status, mensaje, titulo ) {
    var temp = {
      tipo: "success",
      titulo: titulo || "¡Éxito!",
      icono: "fa-check"
    };
    switch ( status ) {
      case 200:
        temp.mensaje = oo( mensaje, "Se ha procesado su pedido con éxito" );
        break;
      case 201:
        temp.mensaje = oo( mensaje, "Se ha guardado el objeto con éxito" );
        break;
      case 204:
        temp.mensaje = oo( mensaje, "Se ha eliminado el objeto con éxito" );
        break;
      default:
        break;
    }
    return temp;
  } //function

  function alertaWarning( status, mensaje, titulo ) {
    return {
      tipo: "warning",
      titulo: titulo || "¡Advertencia!",
      icono: "fa-info",
      mensaje: oo( mensaje, "Se ha procesado su pedido con éxito" )
    };
  } //function

  function alertaInfo( status, mensaje, titulo ) {
    var temp = {
      tipo: "info",
      titulo: titulo || "Error de solicitud",
      icono: "fa-info"
    };
    switch ( status ) {
      case 400:
        temp.mensaje = oo( mensaje, "Faltan datos para poder completar su pedido" );
        break;
      case 403:
        temp.mensaje = oo( mensaje, "Credenciales inválidos" );
        break;
      case 404:
        temp.mensaje = oo( mensaje, "Elemento no encontrado" );
        break;
      case 409:
        var string = "La acción no se puede ejecutar pues generará un conflicto en los datos";
        temp.mensaje = oo( mensaje, string );
        break;
      case 470:
        temp.mensaje = oo( mensaje, "La identificación del documento no es válida" );
        break;
      case 471:
        temp.mensaje = oo( mensaje, "El documento ya existe." );
        break;
      case 472:
        temp.mensaje = oo( mensaje, "Sus credenciales han caducado" );
        break;
      case 473:
        temp.mensaje = oo( mensaje, "Sus credenciales son incorrectos" );
        break;
      default:
        break;
    }
    return temp;
  } //function

  function alertaError( status, mensaje, titulo ) {
    var temp = {
      tipo: "danger",
      titulo: titulo || "Error",
      icono: "fa-fire"
    };
    switch ( status ) {
      case 500:
        var string = "Se ha producido un error inesperado. Por favor, inténtelo más tarde.";
        temp.mensaje = oo( mensaje, string );
        break;
      case 501:
        temp.mensaje = oo( mensaje, "El servicio solicitado no ha sido implementado" );
        break;
      case 530:
        var texto = "No hemos podido completar su pedido debido a que hemos tardado" +
         " demasiado en procesarlo. Por favor, inténtelo más tarde.";
        temp.mensaje = oo( mensaje, texto );
        break;
      default:
        break;
    }
    return temp;
  } //function

  function generar( status, mensaje, titulo ) {
    var temp;
    if ( status >= 200 && status < 300 ) {
      temp = alertaExito( status, mensaje, titulo );
    }
    if ( status >= 300 && status < 400 ) {
      temp = alertaWarning( status, mensaje, titulo );
    }
    if ( status >= 400 && status < 500 ) {
      temp = alertaInfo( status, mensaje, titulo );
    }
    if ( status >= 500 ) {
      temp = alertaError( status, mensaje, titulo );
    }
    return temp;
  } //function

  funciones.agregar = function( status, mensaje, titulo ) {
    funciones.alerta = generar( status, mensaje, titulo );
  };
  funciones.limpiar = function() {
    delete funciones.alerta;
  };
  funciones.alerta = undefined;

  return funciones;
}
