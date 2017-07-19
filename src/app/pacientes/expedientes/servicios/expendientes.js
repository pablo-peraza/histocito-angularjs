"use strict";

module.exports = Expedientes;

Expedientes.$inject = [ "ExpedientesREST", "ExpedientesTabs" ];
function Expedientes( ExpedientesREST, ExpedientesTabs ) {
  var funciones = {};

  funciones.rest = ExpedientesREST;
  funciones.tabs = ExpedientesTabs;

  funciones.esValido = function( expediente ) {
    return !_.isUndefined( expediente ) && !_.isUndefined( expediente.ficha ) &&
      !_.isUndefined( expediente.ficha.cedula ) && !_.isUndefined( expediente.ficha.nombre ) &&
      !_.isUndefined( expediente.ficha.fechaNacimiento ) && !_.isUndefined( expediente.ficha.sexo );
  };

  return funciones;
}
