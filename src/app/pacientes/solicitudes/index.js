"use strict";

var modulo = angular.module( "Proyecto.solicitudes", [] );

modulo.config( require( "./rutas.js" ) );

modulo.controller( "SolicitudCtrl", require( "./ctrls/solicitudCtrl.js" ) );
modulo.controller( "PremuestraModalCtrl", require( "./ctrls/premuestraModalCtrl.js" ) );

modulo.factory( "SolicitudAPI", require( "./ctrls/rest/solicitudApi.js" ) );

module.exports = modulo.name;
