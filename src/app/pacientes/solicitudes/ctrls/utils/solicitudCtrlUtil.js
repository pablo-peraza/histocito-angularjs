"use strict";

var map = require( "lodash/collection/map" );
var get = require( "lodash/object/get" );

module.exports = {
  parsearMuestra: parsearMuestra,
  getCorreos: getCorreos
};

function parsearMuestra( data, getCorreosFn ) {
  return {
    autorizados: data.relacion.autorizados || [],
    cobrada: false,
    consecutivo: data.consecutivo.display,
    correos: getCorreosFn( data.paciente ),
    enviada: false,
    equipo: {
      histotecnologo: data.relacion.histotecnologo._id,
      citotecnologo: data.relacion.citotecnologo._id,
      patologo: data.relacion.patologo._id
    },
    estado: "Registrada",
    fechaToma: data.fechaToma,
    idClinica: data.relacion.clinica._id,
    idExpediente: data.paciente,
    idMedico: data.relacion.medico._id,
    idProcedimiento: data.procedimiento._id,
    idUsuario: data.relacion.dueno._id,
    idSolicitud: data._id,
    imagenes: [],
    numero: data.consecutivo.numero,
    template: data.plantilla
  };
}

function getCorreos( paciente ) {
  if ( paciente._id ) {
    return map( get( paciente.ficha, "datosContacto.correos", [] ), "correo" );
  }
  return paciente.correos || [];
}
