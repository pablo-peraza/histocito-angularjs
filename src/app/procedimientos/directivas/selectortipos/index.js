"use strict";

var modulo = angular.module( "cisSelectorTiposMod", [] );

modulo.controller( "cisSelectorTiposCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisSelectorTipos", require( "./directiva.js" ) );

module.exports = modulo.name;
