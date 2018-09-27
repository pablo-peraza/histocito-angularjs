"use strict";

module.exports = rutas;
var permisos = require( "../../principal/modelos/permisos.js" );

function plantilla( nombre ) {
  return "pacientes/expedientes/htmls/" + nombre + ".html";
}

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/pacientes/expedientes", {
    templateUrl: plantilla( "lista" ),
    titulo: "Administración de Expedientes",
    controller: "ListaExpedienteCtrl",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.medico,
      permisos.valores.patologo,
      permisos.valores.digitador,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo
    ],
    resolve: {
      expedientes: [ "Expedientes", "Alertas", expedientes( 0, 50 ) ],
      dimensiones: [ "Expedientes", "Alertas",
        function( Expedientes, Alertas ) {
          return expedientes( 0, 0 )( Expedientes, Alertas ).then( function( datos ) {
            Expedientes.rest.cargarEtiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    }
  } );

  $routeProvider.when( "/inicio/pacientes/expedientes/nuevo", {
    templateUrl: plantilla( "uno" ),
    controller: "FormExpedienteCtrl",
    titulo: "Nuevo Expediente",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      expediente: function() {
        return {
          nuevo: true,
          editando: true
        };
      } //expediente
    } //resolve
  } );

  $routeProvider.when( "/inicio/pacientes/expedientes/:id", {
    templateUrl: plantilla( "uno" ),
    controller: "FormExpedienteCtrl",
    titulo: "Expediente - ",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.medico,
      permisos.valores.patologo,
      permisos.valores.digitador,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo
    ],
    resolve: {
      expediente: [ "$route", "Expedientes", "Alertas",
        function( $route, Expedientes, Alertas ) {
          var id = $route.current.params.id;
          return Expedientes.rest.obtener( id ).then( function( resp ) {
            resp.data.nuevo = false;
            resp.data.editando = false;
            return resp.data;
          }, function( resp ) {
            if ( resp.status >= 500 ) {
              Alertas.agregar( resp.status );
            }
            return 404;
          } );
        }
      ] //expediente
    } //resolve
  } );

  $routeProvider.when( "/inicio/medico/pacientes", {
    titulo: "Mis Expedientes",
    templateUrl: plantilla( "expedientes" ),
    controller: "ListaExpedienteCtrl",
    permisos: [ permisos.valores.medico ],
    resolve: {
      expedientes: [ "Expedientes", "Alertas", misExpedientes( 0, 50 ) ],
      dimensiones: [ "Expedientes", "Alertas",
        function( Expedientes, Alertas ) {
          return misExpedientes( 0, 0 )( Expedientes, Alertas ).then( function( datos ) {
            Expedientes.rest.cargarEtiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    } //resolve
  } );

  function expedientes( pagina, cantidad ) {
    return function( Expedientes, Alertas ) {
      return Expedientes.rest.buscar( pagina, cantidad ).then(
        function( resp ) {
          return resp.data;
        }, function( error ) {
          Alertas.agregar( error.status );
          console.error( error );
        } );
    };
  } //busqueda

  function misExpedientes( pagina, cantidad ) {
    return function( Expedientes, Alertas ) {
      return Expedientes.rest.misExpedientes( pagina, cantidad ).then(
        function( resp ) {
          return resp.data;
        }, function( error ) {
          Alertas.agregar( error.status );
          console.error( error );
        } );
    };
  } //busqueda
}
