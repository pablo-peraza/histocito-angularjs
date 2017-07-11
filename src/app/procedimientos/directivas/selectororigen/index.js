"use strict";

var modulo = angular.module( "cisSelectorOrigenMod", [] );

modulo.controller( "cisSelectorOrigenCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisSelectorOrigen", require( "./directiva.js" ) );

module.exports = modulo.name;
