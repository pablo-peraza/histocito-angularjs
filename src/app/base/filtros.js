"use strict";

exports.fecha = fecha;
exports.duracion = duracion;
exports.porcentaje = porcentaje;
exports.bool = bool;
exports.trustAsResourceUrl = trustAsResourceUrl;
exports.numero = numero;
exports.llave = llave;
exports.dimension = dimension;

function duracion() {
  return function( segundos ) {
    var secs = parseInt( segundos );
    if ( !_.isNaN( secs ) ) {
      return new Date( secs * 1000 ).toISOString().substr( 11, 8 );
    }
  };
}

function fecha() {
  var formatoFecha = "YYYY-MM-DDTHH:mm:ss.sssZ";
  return filtro;

  function filtro( date, formatoDespliegue ) {
    if ( unNull( date ) ) {
      return "No Definido";
    }
    var formateado = formatear( date, formatoDespliegue, formatoFecha );
    if ( formateado ) {
      return formateado;
    }
    return "Fecha Inválida";
  }

  function formatear( date, formatoDespliegue, formatoFecha ) {
    var instancia = instanciar( date, formatoDespliegue );
    if ( validarFormatoString( date ) ) {
      return instancia( formatoFecha );
    }
    if ( date._isAMomentObject ) {
      return instancia( );
    }
  }

  function instanciar( date, formatoDespliegue ) {
    return function( formato ) {
      if ( formato ) {
        return moment( date, formatoFecha ).format( formatoDespliegue );
      } else {
        return moment( date ).format( formatoDespliegue );
      }
    };
  }

  function unNull( obj ) {
    return _.isUndefined( obj ) || _.isNull( obj );
  }

  function validarFormatoString( string ) {
    var regex = /^\d{4}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{3}Z$/;
    return _.isString( string ) && regex.test( string );
  }
}

trustAsResourceUrl.$inject = [ "$sce" ];

function trustAsResourceUrl( $sce ) {
  return function( val ) {
    return $sce.trustAsResourceUrl( val );
  };
}

porcentaje.$inject = [ "$filter" ];

function porcentaje( $filter ) {
  return filtro;

  function filtro( num, decimales ) {
    if ( isNumber( num ) ) {
      return $filter( "number" )( num * 100, decimales || 2 ) + "%";
    }
    return "No Definido";
  }

  function isNumber( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
  }
} //function

function bool() {
  return filtro;

  function filtro( bool, positivo, negativo ) {
    if ( bool ) {
      return positivo;
    } else {
      return negativo;
    } // if..else
  } //function

} //function

function numero( ) {
  return function( num, decimales ) {
    return accounting.formatMoney( num || 0, "", decimales, " ", "," );
  };
} //function

function llave() {
  var llaves = {
    categoria: "Categoría",
    tipo: "Tipo",
    origen: "Origen",
    estado: "Estado",
    tipoUsuario: "Tipo de Usuario",
    pagada: "Pagada",
    cobrada: "Cobrada",
    sexo: "Sexo",
    femenino: "Femenino",
    masculino: "Masculino"
  };
  return function( valor ) {
    return llaves[valor] ? llaves[valor] : valor;
  };
}

dimension.$inject = [ "Cache" ];
function dimension( Cache ) {
  return function( valor ) {
    return Cache[valor] ? Cache[valor] : valor;
  }; //function
}
