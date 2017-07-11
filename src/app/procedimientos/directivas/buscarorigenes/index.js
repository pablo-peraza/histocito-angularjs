"use strict";

var modulo = angular.module( "cisBuscarOrigenesMod", [] );

modulo.controller( "cisBuscarOrigenesCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisBuscarOrigenes", require( "./directiva.js" ) );

module.exports = modulo.name;
