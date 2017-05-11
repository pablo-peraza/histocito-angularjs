"use strict";

var nombre = require( "../../../package.json" ).name;

var modulo = angular.module( nombre + ".NOMBREMODULO", [] );
modulo.config( require( "./rutas" ) );

modulo.controller( "NOMBREMODULOCtrl", require( "./controladores/ARCHIVOMODULOCtrl.js" ) );

module.exports = modulo;
