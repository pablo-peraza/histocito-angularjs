"use strict";

var modulo = angular.module( "Proyecto.cisDatosPacienteMod", [] );

modulo.directive( "cisDatosExpediente", require( "./directiva.js" ) );
modulo.controller( "cisDatosExpedienteCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
