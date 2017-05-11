"use strict";

module.exports = notificaciones;

notificaciones.$inject = [ "toastr" ];

function notificaciones( toastr ) {
  notificaciones.agregar = agregar;
  notificaciones.agregarPersonalizado = agregarPersonalizado;
  return notificaciones;

  function tipo( status ) {
    switch ( String( status ).substr( 0, 1 ) ){
      case "2":
        return toastr.success;
      case "4":
        return toastr.info;
      case "5":
        return toastr.error;
      default:
        return toastr.warning;
    }
  }

  function agregar( status, objeto ) {
    tipo( status )( deEstado( status, objeto ) );
  } //function

  function agregarPersonalizado( status, mensaje ) {
    tipo( status )( mensaje );
  } //function

  function deEstado( status, objeto ) {
    var elem = objeto || "documento";
    switch ( status ) {
    case 0:
      return "<strong>0</strong> - No ha habido comunicación con el servidor";
    case 200:
      return "<strong>200</strong> - Se ha procesado su pedido con éxito";
    case 201:
      return "<strong>201</strong> - Se ha guardado el " + elem + " con éxito";
    case 204:
      return "<strong>204</strong> - Se ha eliminado el " + elem + " con éxito";
    case 400:
      return "<strong>400</strong> - Faltan datos para poder completar su pedido";
    case 403:
      return "<strong>493</strong> - Credenciales inválidos";
    case 404:
      return "<strong>404</strong> - " + elem + " no encontrado";
    case 409:
      return "<strong>409</strong> - " +
       "La acción no se puede ejecutar pues generará un conflicto en los datos";
    case 470:
      return "<strong>470</strong> - La identificación del " + elem + " no es válida";
    case 471:
      return "<strong>471</strong> - El " + elem + " ya existe.";
    case 472:
      return "<strong>472</strong> - Sus credenciales han caducado";
    case 473:
      return "<strong>473</strong> - Sus credenciales son incorrectos";
    case 500:
      return "<strong>500</strong> - " +
       "Se ha producido un error inesperado. Por favor, inténtelo más tarde.";
    case 501:
      return "<strong>501</strong> - El servicio solicitado no ha sido implementado";
    case 530:
      return "<strong>530</strong> - No hemos podido completar su pedido debido a que" +
      " hemos tardado demasiado en procesarlo. Por favor, inténtelo más tarde.";
    default:
      return "<strong>0</strong> - Notificación sin mensaje";
    }
  }
} //functions
