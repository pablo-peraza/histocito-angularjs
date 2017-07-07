"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/observaciones", {
    templateUrl: "admin/observaciones/htmls/principal.html",
    controller: "ObservacionesCtrl",
    titulo: "Administración de Observaciones",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      observaciones: [ "Observaciones", "Alertas",
        function( Observaciones, Alertas ) {
          return obs( Observaciones, Alertas );
        }
      ]
    }
  } );

  function obs( Observaciones, Alertas ) {
    return Observaciones.listar().then(
      function( resp ) {
        return resp.data;
      },
      function( error ) {
        Alertas.agregar( error.status );
        console.error( error );
        return [];
      } );
  } //obs
}
