"use strict";

module.exports = FacturasREST;

FacturasREST.$inject = [ "$http", "Dimensionador", "urlApi", "node" ];
function FacturasREST( $http, Dimensionador, urlApi, node ) {
  var funciones = {};
  funciones.guardar = function( factura ) {
    var copy = angular.copy( factura );
    copy.detalle = _.map( copy.detalle, enriquecerDetalle );
    return $http.put( urlApi + "/api/facturas/", copy );
  };

  funciones.guardarfacturaZoho = function( factura ) {
    var copy = angular.copy( factura );
    copy.detalle = _.map( copy.detalle, enriquecerDetalle );

    var facturaZoho = cambiarModeloAFacturaZoho( factura );
    return $http.post( node + "/api/facturas/zoho/guardar/factura", facturaZoho );

    //return $http.put( urlApi + "/api/facturas/", copy );
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

  funciones.guardarTodasZoho = function( facturas ) {
    var copiaFacturas = _.map( angular.copy( facturas ), function( factura ) {
      factura.detalle = _.map( factura.detalle, enriquecerDetalle );
      return factura;
    } );

    var facturasZoho = _.map( copiaFacturas,  cambiarModeloAFacturaZoho );
    return $http.post( node + "/api/facturas/zoho/guardar/factura", facturasZoho );
  };

  funciones.facturarZoho = function( facturas ) {
    var copiaFacturas = _.map( angular.copy( facturas ), function( factura ) {
      factura.detalle = _.map( factura.detalle, enriquecerDetalle );
      return factura;
    } );
    return $http.get( node + "/api/facturas/zoho", {
      facturas: copiaFacturas
    } );
  };

  function enriquecerDetalle( detalle ) {
    detalle.nombrePaciente = detalle.paciente.nombre;
    detalle.idProcedimiento = detalle.procedimiento.id;
    detalle.procedimiento = detalle.procedimiento.nombre;
    return detalle;
  }

  function cambiarModeloAFacturaZoho( factura ) {
    function crearLineasFactura( lineas ) {
      return _.map( lineas, function( linea ) {
        var lineItem = linea.articulo ? { // articulo zoho
          "item_id": linea.articulo.item_id,
          "name": linea.articulo.name,
          "description": linea.numero + " " + linea.articulo.description,
          "rate": linea.articulo.rate,
        } : { // articulo default
          "name": linea.numero,
          "description": linea.procedimiento.nombre + " - " + linea.paciente.nombre,
          "rate": linea.precioFinal.centavos / 100,
        };
        _.assign(lineItem, {
          "quantity": 1,
          "unit": "",
          "discount_amount": 0,
          "discount": 0,
          "tax_id": "",
          "tax_name": "",
          "tax_type": "tax",
          "tax_percentage": 0,
          "documents": []
        } );
        return lineItem;
      } );
    }
    var facturaZoho = {
      "status": "draft",
      "customer_id": "",
      "customer_name": factura.cliente,
      "line_items": crearLineasFactura( factura.detalle ),
      "payment_reminder_enabled": true,
      "price_precision": 2,
      "is_emailed": false,
      "notes": "",
      "can_send_in_mail": false
    };
    return facturaZoho;
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
