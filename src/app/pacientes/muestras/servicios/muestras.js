"use strict";

module.exports = Muestras;

Muestras.$inject = [
  "MuestrasREST",
  "MuestrasTabs",
  "MuestrasEstados",
  "Expedientes",
  "Usuarios",
  "Procedimientos",
  "LogicaRecomendaciones",
  "Clinicas",
  "Medicos"
];
function Muestras( MuestrasREST, MuestrasTabs, MuestrasEstados, Expedientes, Usuarios,
  Procedimientos, LogicaRecomendaciones, Clinicas, Medicos ) {
  var funciones = {};

  funciones.tabs = MuestrasTabs;
  funciones.rest = MuestrasREST;
  funciones.estados = MuestrasEstados;
  funciones.obtener = MuestrasREST.obtener;
  funciones.obtenerExpediente = Expedientes.rest.obtener;
  funciones.obtenerUsuario = Usuarios.obtener;
  funciones.obtenerProcedimiento = Procedimientos.procedimientos.obtener;
  funciones.obtenerTipo = Procedimientos.tipos.obtener;
  funciones.obtenerOrigen = Procedimientos.origenes.obtener;
  funciones.recomendaciones = LogicaRecomendaciones;
  funciones.obtenerClinica = Clinicas.obtener;
  funciones.obtenerMedico = Medicos.obtener;
  funciones.buscarMedicos = Medicos.listar;
  funciones.buscarClinicas = Clinicas.listar;
  funciones.buscarUsuarios = Usuarios.buscar;
  funciones.buscarUsuariosBulk = Usuarios.obtenerBulk;
  funciones.informePrivado = MuestrasREST.informePrivado;
  funciones.informePublico = MuestrasREST.informePublico;
  funciones.obtenerSecuencia = MuestrasREST.obtenerSecuencia;
  funciones.guardarSecuencia = MuestrasREST.guardarSecuencia;

  funciones.actualizarEnMasa = function( viejas, nuevas ) {
    return _.map( viejas, function( vieja ) {
      var actualizada = _.find( nuevas, function( nueva ) {
        return vieja.id === nueva.id;
      } );
      if ( actualizada ) {
        vieja.estado = actualizada.estado;
      }
      return vieja;
    } );
  };

  funciones.esValido = function( procedimiento, paciente ) {
    return !_.isUndefined( procedimiento ) && !_.isUndefined( paciente );
  };

  funciones.esNueva = function( muestra ) {
    return _.isUndefined( muestra.id );
  };

  funciones.guardar = function( muestra, procedimiento, dueno, paciente, medico, clinica,
    autorizados ) {
    var copia = angular.copy( muestra );
    copia.idProcedimiento = procedimiento.id;
    copia.idExpediente = paciente.id;
    copia.idUsuario = dueno ? dueno.id : undefined;
    copia.idClinica = clinica ? clinica.id : undefined;
    copia.idMedico = medico ? medico.id : undefined;
    copia.autorizados = _.map( autorizados, "id" );
    if ( muestra.equipo ) {
      if ( muestra.equipo.patologo ) {
        copia.equipo.patologo = copia.equipo.patologo.id;
      }
      if ( muestra.equipo.histotecnologo ) {
        copia.equipo.histotecnologo = copia.equipo.histotecnologo.id;
      }
      if ( muestra.equipo.citotecnologo ) {
        copia.equipo.citotecnologo = copia.equipo.citotecnologo.id;
      }
    } else {
      copia.equipo = {};
    }
    copia.numero = parsearConsecutivo( copia.consecutivoManual );
    return MuestrasREST.guardar( copia );
  };
  funciones.guardarPaciente = function( paciente ) {
    return Expedientes.rest.guardar( paciente );
  };
  funciones.guardarMedico = function( medico ) {
    if ( !medico.id ) {
      medico.telefonos = [];
      medico.configuracion = {
        tipoUsuario: "Médico"
      };
    }
    return Usuarios.guardar( medico );
  };
  return funciones;

  function parsearConsecutivo( consecutivo ) {
    var parseado = Number( consecutivo );
    return _.isNaN( parseado ) ? 0 : parseado;
  }
}
