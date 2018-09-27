"use strict";

module.exports = rutas;

var dimensiones = [ {
  cobrada: [ "No" ]
}, {
  estado: [ "completada", "registrada", "diagnostico", "analisis" ]
} ];

var permisos = require( "../principal/modelos/permisos.js" );
rutas.$inject = [ "$routeProvider" ];

function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/facturacion/muestras", {
    templateUrl: "facturacion/htmls/principal.html",
    controller: "MuestasNoFacturadasCtrl",
    titulo: "Muestras no facturadas",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.digitador,
      permisos.valores.facturacion
    ],
    resolve: {
      muestras: [ "Muestras", "Alertas", muestras( 0, 50 ) ],
      elementoActual: function() {
        return 50;
      }
    } //resolve
  } );

  $routeProvider.when( "/inicio/medico/facturas", {
    templateUrl: "facturacion/htmls/facturas.html",
    controller: "MedicoFacturasCtrl",
    titulo: "Mis facturas y pagos",
    permisos: [ permisos.valores.medico ],
    resolve: {
      facturas: [ "Facturas", "Alertas",
        function( Facturas, Alertas ) {
          return busquedaMedico( Facturas, Alertas, 50 );
        }
      ],
      dimensiones: [ "Facturas", "Alertas",
        function( Facturas, Alertas ) {
          return busquedaMedico( Facturas, Alertas, 0 )
            .then( function( datos ) {
              return datos.dimensiones;
            } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    }
  } );

  $routeProvider.when( "/inicio/facturacion/facturas", {
    templateUrl: "facturacion/htmls/listaFacturas.html",
    controller: "AdminFacturasCtrl",
    titulo: "Administración de facturas",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.digitador,
      permisos.valores.facturacion
    ],
    resolve: {
      facturas: [ "Facturas", "Alertas",
        function( Facturas, Alertas ) {
          return busqueda( Facturas, Alertas, 50 );
        }
      ],
      dimensiones: [ "Facturas", "Alertas",
        function( Facturas, Alertas ) {
          return busqueda( Facturas, Alertas, 0 )
            .then( function( datos ) {
              return datos.dimensiones;
            } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    }
  } );

  $routeProvider.when( "/inicio/facturacion/facturas/:id", {
    templateUrl: "facturacion/htmls/una.html",
    titulo: "Factura",
    controller: "FacturaCtrl",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.digitador,
      permisos.valores.facturacion,
      permisos.valores.medico
    ],
    resolve: {
      factura: [ "Facturas", "Alertas", "$route", factura ]
    }
  } );

  function muestras( pagina, cantidad ) {
    return function( Muestras, Alertas ) {
      return Muestras.rest.buscar( pagina, cantidad, undefined, dimensiones )
        .then(
          function( resp ) {
            return resp.data;
          }, function( error ) {
            Alertas.agregar( error.status );
            console.error( error );
          } );
    };
  } //busqueda

  function factura( Facturas, Alertas, $route ) {
    return Facturas.rest.obtener( $route.current.params.id )
      .then(
        function( resp ) {
          return resp.data;
        },
        function( resp ) {
          Alertas.agregar( resp.status );
          console.error( resp );
          return 404;
        }
      );
  } //factura

  function busqueda( Facturas, Alertas, cantidad ) {
    return Facturas.rest.buscar( 0, cantidad )
      .then(
        function( resp ) {
          return resp.data;
        }, function( error ) {
          Alertas.agregar( error.status );
          console.error( error );
        } );
  } //busqueda

  function busquedaMedico( Facturas, Alertas, cantidad ) {
    return Facturas.rest.facturasMedico( 0, cantidad )
      .then(
        function( resp ) {
          return resp.data;
        }, function( error ) {
          Alertas.agregar( error.status );
          console.error( error );
        } );
  } //busqueda
}
