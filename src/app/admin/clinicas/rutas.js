"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/clinicas", {
    templateUrl: "admin/clinicas/htmls/principal.html",
    controller: "ClinicasCtrl",
    titulo: "Administración de Clínicas",
    permisos: [ permisos.valores.laboratorio ],
    resolve: {
      clinicas: [ "Clinicas", "Alertas",
        function( Clinicas, Alertas ) {
          return clinicas( Clinicas, Alertas, 100 );
        }
      ],
      elementoActual: function() {
        return 100;
      }
    }
  } );

  function clinicas( Clinicas, Alertas, cantidad ) {
    return Clinicas.listar( 0, cantidad ).then(
      function( resp ) {
        return resp.data;
      },
      function( error ) {
        Alertas.agregar( error.status );
        console.error( error );
        return [];
      } );
  } //clinicas
}
