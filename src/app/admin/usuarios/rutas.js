"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );
var map = require( "lodash/collection/map" );
var compact = require( "lodash/array/compact" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/usuarios", {
    templateUrl: "admin/usuarios/htmls/lista.html",
    controller: "AdminUsuariosCtrl",
    titulo: "Administración de usuarios",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      usuarios: [ "Usuarios", "Alertas",
        function( Usuarios, Alertas ) {
          return busqueda( Usuarios, Alertas, 100 );
        }
      ],
      dimensiones: [ "Usuarios", "Alertas",
        function( Usuarios, Alertas ) {
          return busqueda( Usuarios, Alertas, 0 ).then( function( datos ) {
            Usuarios.etiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 100;
      }
    }
  } );

  $routeProvider.when( "/inicio/admin/usuarios/nuevo", {
    templateUrl: "admin/usuarios/htmls/uno.html",
    controller: "formUsuarioCtrl",
    titulo: "Nuevo Usuario",
    permisos: [ permisos.valores.laboratorio ],
    resolve: {
      usuario: function() {
        return {
          nuevo: true,
          editando: true
        };
      },
      procedimientos: [ "Procedimientos",
        function( Procedimientos ) {
          return Procedimientos.procedimientos.buscar( 0, 100 ).then( function( resp ) {
            Procedimientos.procedimientos.etiquetas( resp.data.dimensiones );
            return resp.data.lista;
          } );
        }
      ]
    } //resolve
  } );

  $routeProvider.when( "/inicio/admin/usuarios/:id", {
    templateUrl: "admin/usuarios/htmls/uno.html",
    controller: "formUsuarioCtrl",
    titulo: "Usuario - ",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      usuario: [ "$route", "Usuarios", "Alertas", "ZohoAPI",
        function( $route, Usuarios, Alertas, ZohoAPI ) {
          var id = $route.current.params.id;
          return Usuarios.obtener( id ).then( function( resp ) {
            var idsArticulos = map( resp.data.precios, "idArticulo" );
            return ZohoAPI.obtenerReferencias( compact( idsArticulos ), resp.data.clienteZoho )
            .then( function( respZoho ) {
              resp.data.editando = false;
              resp.data.nuevo = false;
              resp.data.articulos = respZoho.articulos;
              resp.data.clienteZoho = respZoho.clienteZoho;
              return resp.data;
            } );
          }, function( resp ) {
            if ( resp.status !== 404 ) {
              Alertas.agregar( resp.status );
            }
            return 404;
          } );
        }
      ], //usuario
      procedimientos: [ "Procedimientos",
        function( Procedimientos ) {
          return Procedimientos.procedimientos.buscar( 0, 200 ).then( function( resp ) {
            Procedimientos.procedimientos.etiquetas( resp.data.dimensiones );
            return resp.data.lista;
          } );
        }
      ]
    } //resolve
  } );

  function busqueda( Usuarios, Alertas, cantidad ) {
    return Usuarios.buscar( 0, cantidad ).then(
      function( resp ) {
        return resp.data;
      },
      function( error ) {
        Alertas.agregar( error.status );
        console.error( error );
      } );
  } //busqueda
}
