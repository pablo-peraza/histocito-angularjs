"use strict";

var modulo = angular.module( "Proyecto.reportes", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "reporteCtrl", require( "./ctrls/reportesCtrl.js" ) );

module.exports = modulo.name;
