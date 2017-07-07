"use strict";

var modulo = angular.module( "cisDatosUsuarioMod", [] );

modulo.controller( "cisDatosUsuarioCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisDatosUsuario", require( "./directiva.js" ) );

module.exports = modulo.name;
