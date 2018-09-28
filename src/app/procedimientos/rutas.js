"use strict";

module.exports = rutas;
var permisos = require( "../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/procedimientos/origenes", {
    templateUrl: "procedimientos/htmls/origenes.html",
    controller: "OrigenesCtrl",
    titulo: "Orígenes de las muestras",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      origenes: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.origenes, Alertas, 100 );
        }
      ],
      elementoActual: function() {
        return 100;
      }
    }
  } ); //when

  $routeProvider.when( "/inicio/procedimientos/tipos", {
    templateUrl: "procedimientos/htmls/tipos.html",
    controller: "TiposCtrl",
    titulo: "Tipos de Procedimientos",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      tipos: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.tipos, Alertas, 100 );
        }
      ],
      dimensiones: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.tipos, Alertas, 0 ).then( function( datos ) {
            Procedimientos.tipos.limpiarEtiquetas( datos.dimensiones );
            Procedimientos.tipos.etiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 100;
      }
    }
  } ); //when

  getTipos.$inject = [ "Procedimientos", "Alertas" ];
  function getTipos( Procedimientos, Alertas ) {
    return busqueda( Procedimientos.tipos, Alertas, 100 );
  }

  $routeProvider.when( "/inicio/procedimientos/procedimientos", {
    templateUrl: "procedimientos/htmls/procedimientos.html",
    titulo: "Administración de Procedimientos",
    controller: "ProcedimientosCtrl",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      procedimientos: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.procedimientos, Alertas, 100 );
        }
      ],
      dimensiones: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.procedimientos, Alertas, 0 ).then( function( datos ) {
            Procedimientos.procedimientos.limpiarEtiquetas( datos.dimensiones );
            Procedimientos.procedimientos.etiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 100;
      }
    }
  } ); //when

  function obtenerUsuario( Credenciales, Usuarios, Alertas ) {
    return Usuarios.obtener( Credenciales.credenciales().id ).then( function( resp ) {
      return resp.data;
    }, function( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } );
  } //obtenerUsuario

  obtenerUsuario.$inject = [ "Credenciales", "Usuarios", "Alertas" ];

  $routeProvider.when( "/inicio/medico/precios", {
    templateUrl: "procedimientos/htmls/precios.html",
    titulo: "Procedimientos y precios",
    controller: "ProcedimientosMedicosCtrl",
    permisos: [ permisos.valores.medico ],
    resolve: {
      procedimientos: [ "Procedimientos", "Alertas",
        function( Procedimientos, Alertas ) {
          return busqueda( Procedimientos.procedimientos, Alertas, 100 );
        }
      ],
      elementoActual: function() {
        return 100;
      },
      usuario: obtenerUsuario
    }
  } ); //when

  function busqueda( dondeBuscar, Alertas, cantidad ) {
    return dondeBuscar.buscar( 0, cantidad ).then(
      function( resp ) {
        return resp.data;
      }, function( error ) {
        Alertas.agregar( error.status );
        console.error( error );
        return {
          lista: [],
          cantidad: 0
        };
      } );
  } //busqueda
}
