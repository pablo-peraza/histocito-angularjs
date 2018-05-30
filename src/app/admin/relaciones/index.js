"use strict";

var modulo = angular.module( "Proyecto.relaciones", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "RelacionesCtrl", require( "./ctrls/relacionesCtrl.js" ) );
modulo.factory( "RelacionesAPI", require( "./ctrls/rest/relacionesAPI.js" ) );

module.exports = modulo.name;
