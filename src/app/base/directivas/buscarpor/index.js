"use strict";

var modulo = angular.module( "cisBuscarPorMod", [] );

modulo.controller( "cisBuscarPorCtrl", require( "./ctrl.js" ) );
modulo.directive( "cisBuscarNombre", require( "./buscarNombre.js" ) );
modulo.directive( "cisBuscarCedula", require( "./buscarCedula.js" ) );

module.exports = modulo.name;
