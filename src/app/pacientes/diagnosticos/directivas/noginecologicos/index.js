"use strict";

var modulo = angular.module( "Proyecto.diagnosticoNoginecologicoMod", [] );

modulo.directive( "diagnosticoNoginecologico", require( "./directiva.js" ) );
modulo.controller( "diagnosticoNoginecologicoCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
