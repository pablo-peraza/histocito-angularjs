"use strict";

var modulo = angular.module( "cisDimensionesMod", [] );

modulo.controller( "cisDimensionesCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisDimensiones", require( "./directiva.js" ) );

module.exports = modulo.name;
