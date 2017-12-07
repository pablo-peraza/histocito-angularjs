"use strict";

module.exports = rutas;

var permisos = require( "../../principal/modelos/permisos.js" );

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/admin/reportes", {
    templateUrl: "admin/reportes/htmls/principal.html",
    controller: "reporteCtrl",
    titulo: "Reportes",

    //TODO: HAY QUE CREAR PERMISOS PARA ESTE PROCEDIMIENTO
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ]
  } );

  $routeProvider.when( "/inicio/admin/citologias", {
    templateUrl: "admin/reportes/htmls/diagnosticosCitologias.html",
    controller: "DiagReporteCtrl",
    controllerAs: "vm",
    titulo: "Diagnósticos de Citologías",
    permisos: [ permisos.valores.laboratorio, permisos.valores.medico ]
  } );
}
