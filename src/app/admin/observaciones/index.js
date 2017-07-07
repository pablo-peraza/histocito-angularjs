"use strict";

var modulo = angular.module( "Proyecto.observaciones", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "ObservacionesCtrl", require( "./ctrls/observacionesCtrl.js" ) );
modulo.factory( "Observaciones", require( "./ctrls/rest/observacionesAPI.js" ) );

module.exports = modulo.name;
