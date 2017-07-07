"use strict";

var modulo = angular.module( "cisBuscarPorMod", [] );

modulo.controller( "cisBuscarPorCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisBuscarNombre", require( "./buscarCedula.js" ) );
modulo.directive( "cisBuscarCedula", require( "./buscarNombre.js" ) );

module.exports = modulo.name;
