"use strict";

var modulo = angular.module( "cisSubidaImagenesMod", [] );

modulo.controller( "SubidaImagenesCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisSubidaImagenes", require( "./directiva.js" ) );

module.exports = modulo.name;
