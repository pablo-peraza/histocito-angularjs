"use strict";

module.exports = {
  GestorMuestras: GestorMuestras,
  enriquecerMedico: enriquecerMedico
};

function GestorMuestras( Muestras, Alertas, Futuros ) {
  this.obtenerExpediente = function( id, res ) {
    return Muestras.obtenerExpediente( id ).then( function( resp ) {
      res.expediente = resp.data;
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del paciente" );
      return res;
    } );
  }; //obtenerExpediente

  this.obtenerUsuario = function( dueno, autorizados, res ) {
    var authCopy = angular.copy( autorizados );
    if ( dueno ) {
      authCopy.push( dueno );
    }
    var ids = authCopy;
    return !_.isEmpty( ids ) ? Muestras.buscarUsuariosBulk( ids ).then( function( resp ) {
      var lista = resp.data.lista;
      res.dueno = _.find( lista, function( usu ) {
        return !!dueno && usu.id.toString() === dueno.toString();
      } );
      res.autorizados = _.reject( lista, function( usu ) {
        return !!dueno && usu.id.toString() === dueno.toString();
      } );
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del usuario dueño" );
      return res;
    } ) : Futuros.aFuturo( res, 1 );
  }; //obtenerUsuario

  this.obtenerOrigen = function( id, res ) {
    return Muestras.obtenerOrigen( id ).then( function( resp ) {
      res.origen = resp.data;
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status,
        "Hubo un problema al cargar los datos del origen de la muestra" );
      return res;
    } );
  }; //obtenerOrigen

  this.obtenerTipo = function( id, res ) {
    return Muestras.obtenerTipo( id ).then( function( resp ) {
      res.tipo = resp.data;
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status,
        "Hubo un problema al cargar los datos del tipo de procedimiento" );
      return res;
    } );
  }; //obtenerTipo

  this.obtenerClinica = function( id, res ) {
    return id ? Muestras.obtenerClinica( id ).then( function( resp ) {
      res.clinica = resp.data;
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos de la clínica" );
      return res;
    } ) : Futuros.aFuturo( res, 1 );
  }; //obtenerTipo

  this.obtenerMedico = function( id, res ) {
    return id ? Muestras.obtenerMedico( id ).then( function( resp ) {
      res.medico = enriquecerMedico( resp.data );
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del médico" );
      return res;
    } ) : Futuros.aFuturo( res, 1 );
  }; //obtenerTipo

  this.obtenerProcedimiento = function( id, res ) {
    return Muestras.obtenerProcedimiento( id ).then( function( resp ) {
      res.procedimiento = resp.data;
      return res;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del procedimiento" );
      return res;
    } );
  }; //obtenerProcedimiento

  this.obtenerMuestra = function( id ) {
    return Muestras.obtener( id ).then( function( resp ) {
      resp.data.nuevo = false;
      resp.data.editando = false;
      return {
        muestra: resp.data
      };
    }, function( resp ) {
      if ( resp.status >= 500 ) {
        Alertas.agregar( resp.status );
      }
      return {
        muestra: 404
      };
    } );
  }; //obtenerMuestra
} //gestor

function enriquecerMedico( medico ) {
  if ( !_.isUndefined( medico ) ) {
    medico.nombreCompleto = medico.titulo + " " + medico.nombre;
  }
  return medico;
}
