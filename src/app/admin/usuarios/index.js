"use strict";

var modulo = angular.module( "Proyecto.usuarios", [
  require( "./ctrls/directivas/datosusuario" ),
  require( "./ctrls/directivas/formusuario" )
] );

modulo.config( require( "./rutas" ) );

modulo.controller( "formUsuarioCtrl", require( "./ctrls/usuariosCtrl.js" ) );
modulo.controller( "AdminUsuariosCtrl", require( "./ctrls/adminUsuarioCtrl.js" ) );
modulo.controller( "BuscadorUsuarios", require( "./ctrls/buscadorUsuariosCtrl.js" ) );

modulo.directive( "cisBuscadorMedicos", require( "./ctrls/directivas/cisBuscadorMedicos.js" ) );
modulo.directive( "cisPrecios", require( "./ctrls/directivas/cisPrecios.js" ) );

modulo.factory( "Usuarios", require( "./ctrls/rest/usuariosAPI.js" ) );
modulo.factory( "UsuariosTabs", require( "./ctrls/rest/usuariosTabs.js" ) );

module.exports = modulo.name;
