"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/pacientes/solicitudes", {
    templateUrl: "pacientes/solicitudes/htmls/principal.html",
    controller: "SolicitudCtrl",
    controllerAs: "vm",
    titulo: "Solicitudes",
    permisos: [ permisos.valores.laboratorio ],
    resolve: {
      solicitudes: ["SolicitudAPI", function(SolicitudAPI) {
        return SolicitudAPI.listar();
      }]
    }
  } );
}
