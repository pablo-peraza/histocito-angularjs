"use strict";

var modulo = angular.module( "cisCategoriasMod", [] );

modulo.controller( "cisCategoriasCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisCategorias", require( "./directiva.js" ) );

module.exports = modulo.name;
