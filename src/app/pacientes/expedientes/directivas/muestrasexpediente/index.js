"use strict";

var modulo = angular.module( "Proyecto.cisMuestrasExpedienteMod", [] );

modulo.directive( "cisMuestrasExpediente", require( "./directiva.js" ) );
modulo.controller( "cisMuestrasExpedienteCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
