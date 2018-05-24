"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/relaciones", {
    templateUrl: "admin/relaciones/htmls/principal.html",
    controller: "RelacionesCtrl",
    controllerAs: "vm",
    titulo: "Relaciones",
    permisos: [ permisos.valores.laboratorio ],
    resolve: {
      relaciones: [ "RelacionesAPI", function( RelacionesAPI ) {
        return RelacionesAPI.listar();
      } ]
    }
  } );
}
