"use strict";

var modulo = angular.module( "cisCorreosMod", [] );

modulo.controller( "cisCorreosCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisCorreos", require( "./directiva.js" ) );

module.exports = modulo.name;
