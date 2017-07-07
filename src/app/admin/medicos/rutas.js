"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/medicos", {
    templateUrl: "admin/medicos/htmls/principal.html",
    controller: "MedicosCtrl",
    titulo: "Administración de Médicos",
    permisos: [ permisos.valores.laboratorio ],
    resolve: {
      medicos: [ "Medicos", "Alertas",
        function( Medicos, Alertas ) {
          return medicos( Medicos, Alertas, 50 );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    }
  } );

  function medicos( Medicos, Alertas, cantidad ) {
    return Medicos.listar( 0, cantidad ).then(
      function( resp ) {
        return resp.data;
      },
      function( error ) {
        Alertas.agregar( error.status );
        console.error( error );
        return [];
      } );
  } //medicos
}
