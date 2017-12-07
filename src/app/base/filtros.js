"use strict";

exports.fecha = fecha;
exports.duracion = duracion;
exports.porcentaje = porcentaje;
exports.bool = bool;
exports.trustAsResourceUrl = trustAsResourceUrl;
exports.numero = numero;
exports.llave = llave;
exports.dimension = dimension;
exports.colones = colones;
exports.unsafe = unsafe;
exports.mkString = mkString;
exports.haceCuanto = haceCuanto;
exports.mayusculas = mayusculas;
exports.edad = edad;
exports.tamanoHumano = tamanoHumano;
exports.mes = mes;

function mes() {
  return function( num ) {
    var m = moment().month( Number( num ) ).format( "MMMM" );
    return m[0].toUpperCase() + m.substring( 1 );
  };
}

function duracion() {
  return function( segundos ) {
    var secs = parseInt( segundos );
    if ( !_.isNaN( secs ) ) {
      return new Date( secs * 1000 ).toISOString().substr( 11, 8 );
    }
  };
}

fecha.$inject =  [ "Fechas" ];
function fecha( Fechas ) {
  return function( date, format ) {
    return ( _.isUndefined( date ) ) ? "No Definido" : Fechas.deServidor( date ).format( format );
  }; //function
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

function colones() {
  return function( monto ) {
    return accounting.formatMoney( monto, "₡", ",", " " );
  };
}

unsafe.$inject = [ "$sce" ];
function unsafe( $sce ) {
  return function( val ) {
    return $sce.trustAsHtml( val );
  };
}

function mkString() {
  return function( array, divisor ) {
    return _.reduce( array, function( str, elem, index ) {
      return str + elem + ( index === array.length - 1 ? "" : divisor );
    }, "" );
  };
} //MKString

function haceCuanto() {
  return function( fecha ) {
    return ( _.isUndefined( fecha ) ) ? "No definido" : moment( fecha ).fromNow();
  };
}

function mayusculas() {
  return function( val ) {
    return val.toUpperCase();
  };
}

function edad() {
  return function( fecha ) {
    if ( _.isUndefined( fecha ) ) {
      return "No definido";
    } else {
      var temp = moment().startOf( "day" ).diff( moment( fecha ).startOf( "day" ), "years" );
      return temp + " años";
    }
  };
}

function tamanoHumano() {
  return function( bytes ) {
    return ( _.isUndefined( bytes ) ) ? "Indefinido" : (
      Math.round( ( bytes / 1048576 ) * 100 ) / 100 ) + "MB";
  };
}
