"use strict";

module.exports = Fechas;

function Fechas() {
  var funciones = {};
  funciones.formato = "YYYY-MM-DDTHH:mm:ss.SSSZ";
  funciones.deServidor = function( fecha ) {
    return moment( fecha, funciones.formato );
  };
  return funciones;
}
