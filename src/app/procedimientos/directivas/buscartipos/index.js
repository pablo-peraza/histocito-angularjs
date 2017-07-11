"use strict";

var modulo = angular.module( "cisBuscarTiposMod", [] );

modulo.controller( "cisBuscarTiposCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisBuscarTipos", require( "./directiva.js" ) );

module.exports = modulo.name;
