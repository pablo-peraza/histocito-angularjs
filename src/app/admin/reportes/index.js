"use strict";

var modulo = angular.module( "Proyecto.reportes", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "reporteCtrl", require( "./ctrls/reportesCtrl.js" ) );
modulo.controller( "DiagReporteCtrl", require( "./ctrls/diagReporteCtrl.js" ) );
modulo.controller( "InformeMinisterioCtrl", require( "./ctrls/informeMinisterioCtrl.js" ) );

module.exports = modulo.name;
