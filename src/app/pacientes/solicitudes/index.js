"use strict";

var modulo = angular.module( "Proyecto.solicitudes", [] );

modulo.config( require( "./rutas.js" ) );

modulo.controller( "ListaSolicitudCtrl", require( "./ctrls/listaSolicitudCtrl.js" ) );

modulo.factory( "SolicitudAPI", require( "./ctrls/rest/solicitudApi.js" ) );

module.exports = modulo.name;
