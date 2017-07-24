"use strict";

var modulo = angular.module( "cisTelefonosMod", [] );

modulo.controller( "cisTelefonosCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisTelefonos", require( "./directiva.js" ) );

module.exports = modulo.name;
