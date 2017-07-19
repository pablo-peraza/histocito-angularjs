"use strict";

var modulo = angular.module( "Proyecto.cisDatosExpedienteMod", [] );

modulo.directive( "cisDatosPaciente", require( "./directiva.js" ) );
modulo.controller( "cisDatosPacienteCtrl", require( "./ctrl.js" ) );

module.exports = modulo.name;
