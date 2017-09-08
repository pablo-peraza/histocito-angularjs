"use strict";

module.exports = FacturasREST;

FacturasREST.$inject = [ "$http", "Dimensionador", "urlApi" ];
function FacturasREST( $http, Dimensionador, urlApi ) {
  var funciones = {};
  funciones.guardar = function( factura ) {
    var copy = angular.copy( factura );
    copy.detalle = _.map( copy.detalle, enriquecerDetalle );
    return $http.put( urlApi + "/api/facturas/", copy );
  };

  funciones.guardarTodas = function( facturas ) {
    var copiaFacturas = _.map( angular.copy( facturas ), function( factura ) {
      factura.detalle = _.map( factura.detalle, enriquecerDetalle );
      return factura;
    } );

    return $http.put( urlApi + "/api/facturas/masa", {
      facturas: copiaFacturas
    } );
  };

  function enriquecerDetalle( detalle ) {
    detalle.nombrePaciente = detalle.paciente.nombre;
    detalle.idProcedimiento = detalle.procedimiento.id;
    detalle.procedimiento = detalle.procedimiento.nombre;
    return detalle;
  }

  funciones.editarConsecutivo = function( id, consecutivo ) {
    return $http.post( urlApi + "/api/facturas/" + id + "/numero", {
      numero: consecutivo
    } );
  };

  funciones.facturasMedico = function( pagina, cantidad, texto, dims ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad,
        texto: texto
      }
    };
    return $http.get( urlApi + "/api/usuarios/facturas/", Dimensionador.hacer( params, dims ) );
  };

  funciones.pagar = function( idFactura, pago ) {
    return $http.put( urlApi + "/api/facturas/" + idFactura + "/pagos", pago );
  };

  funciones.eliminarPago = function( idFactura, pago ) {
    return $http["delete"]( urlApi + "/api/facturas/" + idFactura + "/pagos/" + pago.id );
  };

  funciones.preciosMedicos = function( ids ) {
    var datos = {
      lista: ids,
      cantidad: ids.length
    };
    return $http.post( urlApi + "/api/facturas/precios", datos );
  };

  funciones.borrar = function( id ) {
    return $http["delete"]( urlApi + "/api/facturas/" + id );
  };

  funciones.preciosProcedimientos = function( ids ) {
    var datos = {
      lista: ids,
      cantidad: ids.length
    };
    return $http.post( urlApi + "/api/facturas/procedimientos", datos );
  };

  funciones.buscar = function( pagina, cantidad, texto, dims ) {
    var params = {
      params: {
        pagina: pagina,
        cantidad: cantidad
      }
    };
    if ( texto ) {
      params.params.texto = texto;
    }
    return $http.get( urlApi + "/api/facturas/buscar", Dimensionador.hacer( params, dims ) );
  };

  funciones.obtener = function( id ) {
    return $http.get( urlApi + "/api/facturas/" + id );
  };

  return funciones;
} //FacturasREST
