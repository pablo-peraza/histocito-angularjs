"use strict";
module.exports = ocultarAccion;
ocultarAccion.$inject = [ "$auth" ];

function ocultarAccion( $auth ) {
  return {
    restrict: "EA",
    require: "?ngModel",
    scope: true,
    link: link( $auth )
  };
}

function link( $auth ) {
  return function( scope, element, attrs ) {
    scope.permiso = attrs.permiso;
    scope.accion = attrs.accion;
    try {
      if ( !$auth.getPayload().permisos[scope.permiso][scope.accion] ) {
        element.hide();
      }
    }
    catch ( err ) {
      element.hide();
    }
  };
}
