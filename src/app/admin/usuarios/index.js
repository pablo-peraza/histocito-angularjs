"use strict";

var modulo = angular.module( "Proyecto.usuarios", [] );

modulo.config( require( "./rutas" ) );

modulo.controller( "formUsuarioCtrl", require( "./ctrls/usuariosCtrl.js" ) );

modulo.directive( "cisBuscadorMedicos", require( "./ctrls/directivas/cisBuscadorMedicos.js" ) );
modulo.directive( "cisPrecios", require( "./ctrls/directivas/cisPrecios.js" ) );

modulo.factory( "Usuarios", require( "./ctrls/rest/usuariosAPI.js" ) );
modulo.factory( "UsuariosTabs", require( "./ctrls/rest/usuariosTabs.js" ) );

module.exports = modulo.name;
