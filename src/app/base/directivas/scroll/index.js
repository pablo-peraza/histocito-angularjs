"use strict";

var modulo = angular.module( "cisScrollMod", [] );

modulo.controller( "cisScrollCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisScroll", require( "./directiva.js" ) );

module.exports = modulo.name;
