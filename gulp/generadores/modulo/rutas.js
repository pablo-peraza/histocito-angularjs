"use strict";

module.exports = rutas;

rutas.$inject = [ "$stateProvider" ];
function rutas( $stateProvider ) {

  $stateProvider.state( "inicio.ARCHIVOMODULO", {
    templateUrl: "ARCHIVOMODULO/vistas/inicio.html",
    url: "/ARCHIVOMODULO",
    controller: "NOMBREMODULOCtrl",
    controllerAs: "mod",
    data: {
      titulo: "Módulo NOMBREMODULO",
      icono: "fa-home",
      menu: "NOMBREMODULO"
    }
  } );

}
