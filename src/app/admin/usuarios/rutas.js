"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/usuarios", {
    templateUrl: "admin/usuarios/htmls/lista",
    controller: "AdminUsuariosCtrl",
    titulo: "Administración de usuarios",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      usuarios: [ "Usuarios", "Alertas",
        function( Usuarios, Alertas ) {
          return busqueda( Usuarios, Alertas, 50 );
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
        return 50;
      }
    }
  } );

  $routeProvider.when( "/inicio/admin/usuarios/nuevo", {
    templateUrl: "admin/usuarios/htmls/uno",
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
    templateUrl: "admin/usuarios/htmls/uno",
    controller: "formUsuarioCtrl",
    titulo: "Usuario - ",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      usuario: [ "$route", "Usuarios", "Alertas",
        function( $route, Usuarios, Alertas ) {
          var id = $route.current.params.id;
          return Usuarios.obtener( id ).then( function( resp ) {
            resp.data.nuevo = false;
            resp.data.editando = false;
            return resp.data;
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
