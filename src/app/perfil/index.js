"use strict";

var modulo = angular.module( "Proyecto.perfil", [] );

modulo.controller( "PerfilCtrl", require( "./ctrls/perfilCtrl.js" ) );

modulo.factory( "Perfil", require( "./servicios/perfil.js" ) );
modulo.factory( "PerfilTabs", require( "./servicios/perfilTabs.js" ) );
modulo.factory( "PerfilRest", require( "./ctrls/rest/perfilAPI.js" ) );

module.exports = modulo.name;
