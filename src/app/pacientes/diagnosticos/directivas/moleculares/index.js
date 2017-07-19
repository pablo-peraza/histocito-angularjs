"use strict";

var modulo = angular.module( "Proyecto.diagnosticoMolecularMod", [] );

modulo.directive( "diagnosticoMolecular", require( "./directiva.js" ) );
modulo.controller( "diagnosticoMolecularCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
