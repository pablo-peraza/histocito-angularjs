"use strict";

var modulo = angular.module( "cisCapturarTecladoMod", [] );

modulo.controller( "cisCapturarTecladoCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisCapturarTeclado", require( "./directiva.js" ) );

module.exports = modulo.name;
