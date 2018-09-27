"use strict";

module.exports = FacturacionLogica;

function FacturacionLogica() {
  var funciones = {};

  funciones.seleccionadas = function( grupo, seleccionada ) {
    return _.filter( grupo, function( muestra ) {
      return muestra.seleccionada === seleccionada;
    } );
  };

  function Facturador( preciosDuenos, preciosProcedimientos ) {
    var padre = this;
    this.precioProcedimiento = function( idProcedimiento ) {
      var proc = _.find( preciosProcedimientos, function( proc ) {
        return proc.id === idProcedimiento;
      } );
      return proc ? proc.precio.centavos : 0;
    }; //precioProcedimiento

    function encontrarPrecioMedico( precios, idProcedimiento ) {
      function encontrar( proc ) {
        return proc.idProcedimiento === idProcedimiento;
      } //encontrar
      var chain = _.chain( precios );
      return chain.filter( encontrar ).pluck( "monto" ).pluck( "centavos" ).first().value();
    } //function

    this.precioDueno = function( idProcedimiento, idDueno ) {
      var medico = _.find( preciosDuenos, function( dueno ) {
        return dueno.id === idDueno;
      } );
      var precioBase = padre.precioProcedimiento( idProcedimiento );
      if ( medico ) {
        var temp = encontrarPrecioMedico( medico.precios, idProcedimiento );
        if ( temp ) {
          return temp;
        } else {
          return precioBase;
        }
      } else {
        return precioBase;
      }
    }; //precioDueno

    this.detalleIndividual = function( buscarPrecio, muestra ) {
      return {
        idMuestra: muestra.id,
        numero: muestra.numero,
        procedimiento: muestra.procedimiento,
        paciente: muestra.paciente,
        precioUsuario: {
          centavos: buscarPrecio( muestra.procedimiento.id, muestra.dueno.id )
        }
      };
    }; //detalleIndividual

    this.generarFactura = function( llave, muestras, buscarPrecio, agrupacion ) {

      // nombre del cliente
      var cliente = function() {
        if ( llave !== "undefined" ) {
          if ( agrupacion === "clinica" ) {
            return _.isArray( muestras ) ? muestras[0].clinica.nombre : muestras.clinica.nombre;
          }
          if ( agrupacion === "medico" ) {
            return _.isArray( muestras ) ? muestras[0].medico.nombre : muestras.medico.nombre;
          }
          if ( agrupacion === "usuario" ) {
            return _.isArray( muestras ) ? muestras[0].dueno.nombre : muestras.dueno.nombre;
          }
          if ( agrupacion === "paciente" ) {
            return _.isArray( muestras ) ? muestras[0].paciente.nombre : muestras.paciente.nombre;
          }
        }
        return undefined;
      };
      var detalle = _.isArray( muestras ) ? _.map( muestras, function( muestra ) {
        return padre.detalleIndividual( buscarPrecio, muestra );
      } ) : [ padre.detalleIndividual( buscarPrecio, muestras ) ];
      return {
        idAgrupado: llave === "undefined" ? undefined : llave,
        cliente: cliente(),
        agrupacion: agrupacion,
        detalle: detalle
      };
    }; //generarFactura;

    this.generarFacturas = function( llave, grupo, agrupacion ) {
      var funcion = ( llave === "undefined" ? padre.precioProcedimiento : padre.precioDueno );
      return _.map( grupo, function( muestra ) {
        return padre.generarFactura( llave, muestra, funcion, agrupacion );
      } );
    }; //generarFacturas
  } //Facturador

  funciones.generarPago = function( fecha, monto, consecutivo ) {
    return {
      fecha: fecha,
      consecutivo: consecutivo,
      cantidad: {
        centavos: monto
      }
    };
  };

  funciones.agruparPorMedico = agruparPor( "medico" );

  funciones.agruparPorClinica = agruparPor( "clinica" );

  funciones.agruparPorDueno = agruparPor( "dueno" );

  funciones.agruparPorPaciente = agruparPor( "paciente" );

  function agruparPor( atributo ) {
    return function( muestras ) {
      return _.groupBy( angular.copy( muestras ), function( muestra ) {
        return ( muestra[atributo] ) ? muestra[atributo].id : undefined;
      } );
    };
  }

  funciones.facturar = function( grupos, preciosMedicos, preciosProcs, agrupacion ) {
    var llaves = _.keys( grupos );
    var facturador = new Facturador( preciosMedicos, preciosProcs );
    var temp = _.map( llaves, function( llave ) {

      //String porque _.keys() convierte un valor undefined a un string
      if ( llave === "undefined" ) {
        return facturador.generarFacturas( llave, grupos[llave], agrupacion );
      } else {
        var individuales = funciones.seleccionadas( grupos[llave], false );
        var agrupadas = funciones.seleccionadas( grupos[llave], true );
        var facturasIndividuales = facturador.generarFacturas( llave, individuales, agrupacion );
        var facturaMedico = facturador
        .generarFactura( llave, agrupadas, facturador.precioDueno, agrupacion );
        facturasIndividuales.push( facturaMedico );
        return facturasIndividuales;
      }
    } );
    return _.flatten( temp, true );
  };

  funciones.totalPagos = function( pagos ) {
    return _.reduce( pagos, function( suma, pago ) {
      return suma + pago.cantidad.centavos;
    }, 0 );
  };

  funciones.total = function( detalle ) {
    return _.reduce( detalle, function( suma, muestra ) {
      return suma + ( muestra.precioFinal ? muestra.precioFinal.centavos : 0 );
    }, 0 );
  };
  funciones.quitar = function( factura, facturas ) {
    return _.without( facturas, factura );
  };

  funciones.actualizarEnMasa = function( viejas, nuevas ) {
    return _.map( viejas, function( vieja ) {
      vieja.id = Math.random().toString(36).substr(2, 9);
      return vieja;
    } );
  };
  function sonDetallesIguales( detallesViejo, detallesNuevo ) {
    return validarArreglos( _.map( detallesViejo, "idMuestra" ),
    _.map( detallesNuevo, "idMuestra" ) ) && validarArreglos( _.map( detallesViejo, "numero" ),
    _.map( detallesNuevo, "numero" ) );
  }
  function validarArreglos( arreglo1, arreglo2 ) {
    return _.every( arreglo1, function( elemento ) {
      return _.some( arreglo2, function( elem ) { return elem === elemento; } );
    } );
  }

  funciones.noProcesadas = function( facturas ) {
    return _.filter( facturas, function( factura ) {
      return !factura.id;
    } );
  };
  return funciones;
} //FacturacionMuestrasLogicas
