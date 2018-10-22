"use strict";

var test = require( "tape" );
var util = require( "../ctrls/utils/solicitudCtrlUtil.js" );

test( "SolicitudCtrlUtil: Obtener correos de paciente con id y correos", function( assert ) {
  var paciente = {
    _id: "1",
    ficha: {
      datosContacto: {
        correos: [
          { correo: "usuario1@dominio.com" },
          { correo: "usuario2@dominio.com" }
        ]
      }
    }
  };
  var resultado = util.getCorreos( paciente );
  var esperado = [ "usuario1@dominio.com", "usuario2@dominio.com" ];
  assert.deepEqual( resultado, esperado );
  assert.end();
} );

test( "SolicitudCtrlUtil: Obtener correos de paciente con id y sin datos", function( assert ) {
  var paciente = {
    _id: "1",
    ficha: {}
  };
  var resultado = util.getCorreos( paciente );
  assert.deepEqual( resultado, [] );
  assert.end();
} );

test( "SolicitudCtrlUtil: Obtener correos de paciente sin id y con correos", function( assert ) {
  var paciente = {
    correos: [ "usuario1@dominio.com", "usuario2@dominio.com" ]
  };
  var resultado = util.getCorreos( paciente );
  var esperado = [ "usuario1@dominio.com", "usuario2@dominio.com" ];
  assert.deepEqual( resultado, esperado );
  assert.end();
} );

test( "SolicitudCtrlUtil: Convertir solicitud a muestra con paciente que existe en BD",
function( assert ) {
  var solicitud = {
    _id: 1,
    relacion: {
      histotecnologo: { _id: 1 },
      citotecnologo: { _id: 1 },
      patologo: { _id: 1 },
      clinica: { _id: 1 },
      medico: { _id: 1 },
      dueno: { _id: 1 }
    },
    fechaToma: "2018-10-10T00:00:00.000+0000",
    paciente: {
      _id: 1,
      ficha: {
        datosContacto: {
          correos: [
            { correo: "usuario1@dominio.com" },
            { correo: "usuario2@dominio.com" }
          ]
        }
      }
    },
    procedimiento: { _id: 1 },
    plantilla: "default",
    consecutivo: { numero: 1, display: "A-1" }
  };
  var resultado = util.parsearMuestra( solicitud, util.getCorreos );
  var esperado = {
    autorizados: [],
    cobrada: false,
    consecutivo: "A-1",
    correos: [ "usuario1@dominio.com", "usuario2@dominio.com" ],
    enviada: false,
    equipo: {
      histotecnologo: 1,
      citotecnologo: 1,
      patologo: 1
    },
    estado: "Registrada",
    fechaToma: "2018-10-10T00:00:00.000+0000",
    idClinica: 1,
    idExpediente: {
      _id: 1,
      ficha: {
        datosContacto: {
          correos: [
            { correo: "usuario1@dominio.com" },
            { correo: "usuario2@dominio.com" }
          ]
        }
      }
    },
    idMedico: 1,
    idProcedimiento: 1,
    idUsuario: 1,
    idSolicitud: 1,
    imagenes: [],
    numero: 1,
    template: "default"
  };
  assert.deepEqual( resultado, esperado );
  assert.end();
} );

test( "SolicitudCtrlUtil: Convertir solicitud a muestra con paciente que no existe en BD",
function( assert ) {
  var solicitud = {
    _id: 1,
    relacion: {
      histotecnologo: { _id: 1 },
      citotecnologo: { _id: 1 },
      patologo: { _id: 1 },
      clinica: { _id: 1 },
      medico: { _id: 1 },
      dueno: { _id: 1 }
    },
    fechaToma: "2018-10-10T00:00:00.000+0000",
    paciente: { nombre: "Fabio Flores" },
    procedimiento: { _id: 1 },
    plantilla: "default",
    consecutivo: { numero: 1, display: "A-1" }
  };
  var resultado = util.parsearMuestra( solicitud, util.getCorreos );
  var esperado = {
    autorizados: [],
    cobrada: false,
    consecutivo: "A-1",
    correos: [],
    enviada: false,
    equipo: {
      histotecnologo: 1,
      citotecnologo: 1,
      patologo: 1
    },
    estado: "Registrada",
    fechaToma: "2018-10-10T00:00:00.000+0000",
    idClinica: 1,
    idExpediente: { nombre: "Fabio Flores" },
    idMedico: 1,
    idProcedimiento: 1,
    idUsuario: 1,
    idSolicitud: 1,
    imagenes: [],
    numero: 1,
    template: "default"
  };
  assert.deepEqual( resultado, esperado );
  assert.end();
} );
