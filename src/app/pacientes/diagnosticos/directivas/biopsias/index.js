"use strict";

var modulo = angular.module( "Proyecto.diagnosticoBiopsiaMod", [] );

modulo.directive( "diagnosticoBiopsia", require( "./directiva.js" ) );
modulo.controller( "diagnosticoBiopsiaCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
