"use strict";

module.exports = LogicaRecomendaciones;

function LogicaRecomendaciones() {
  return {
    init: init
  };

  function init( rec ) {
    var temp = angular.copy( rec );
    return bloqueoUno( bloqueoDos( temp ) );
  } //init
  function bloqueoUno( rec ) {
    rec.bloqueoUno = rec.repetirEstudio || rec.estudioColposcopico;
    return rec;
  } //repetirEstudio
  function bloqueoDos( rec ) {
    rec.bloqueoDos = rec.controlRutina || rec.controlCitologico.activado ||
    rec.repetirDespuesTratamiento.activado;
    return rec;
  } //repetirEstudio
} //LogicaRecomendaciones
