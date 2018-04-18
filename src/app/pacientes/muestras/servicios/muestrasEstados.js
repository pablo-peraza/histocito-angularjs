"use strict";

module.exports = MuestrasEstados;

MuestrasEstados.$inject = [ "MuestrasREST" ];
function MuestrasEstados( MuestrasREST ) {
  var funciones = {};

  funciones.Registrada = "Registrada";
  funciones.Analisis = "En análisis";
  funciones.Diagnostico = "En diagnostico";
  funciones.Completada = "Completada";
  funciones.Espera = "En espera";

  funciones.puedeARegistrada = function( muestra ) {
    return !muestra.cargando && muestra.estado === funciones.Registrada ||
      (muestra.datosEspera && muestra.datosEspera.estadoAnterior === funciones.Registrada);
  };

  funciones.puedeAAnalisis = function( muestra ) {
    return funciones.puedeARegistrada( muestra ) ||
      muestra.estado === funciones.Analisis || (muestra.datosEspera && muestra.datosEspera.estadoAnterior === funciones.Analisis);
  };

  funciones.puedeADiagnostico = function( muestra ) {
    return funciones.puedeAAnalisis( muestra ) ||
      muestra.estado === funciones.Diagnostico || (muestra.datosEspera && muestra.datosEspera.estadoAnterior === funciones.Diagnostico);
  };

  funciones.cambiar = function( muestra, estado ) {
    var servicio = MuestrasREST.estados( muestra.id );
    switch ( estado ) {
      case funciones.Registrada:
        return servicio.aRegistrada();
      case funciones.Analisis:
        return servicio.aAnalisis();
      case funciones.Diagnostico:
        return servicio.aDiagnostico();
      case funciones.Completada:
        return servicio.aCompletada();
      case funciones.Espera:
        return servicio.aEspera( muestra.motivo );
    }
  };

  return funciones;
}
