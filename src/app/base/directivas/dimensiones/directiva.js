"use strict";
module.exports = directiva;
function directiva() {
  return {
    restrict: "A",
    scope: {
      actuales: "=",
      onChange: "&",
      cargando: "="
    },
    link: function( scope, elem, attr, ctrl ) {
      ctrl.init( scope.$eval( attr.cisDimensiones ), scope.$eval( attr.eliminar ) );
    },
    templateUrl: "/htmls/partials/comps/dimensiones.html",
    controller: "cisDimensionesCtrl"
  };
}
