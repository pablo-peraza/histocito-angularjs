"use strict";

var modulo = angular.module( "cisFormUsuarioMod", [] );

modulo.controller( "cisFormUsuarioCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisFormUsuario", require( "./directiva.js" ) );

module.exports = modulo.name;
