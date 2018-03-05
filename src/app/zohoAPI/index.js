"use strict";

var modulo = angular.module( "Proyecto.zohoAPI", [] );

modulo.factory( "ZohoAPI", require( "./ctrls/rest/clienteZojoAPI.js" ) );

module.exports = modulo.name;
