"use strict";

var modulo = angular.module( "Proyecto.diagnosticos", [
  require( "./directivas/biopsias" ),
  require( "./directivas/citologias" ),
  require( "./directivas/moleculares" ),
  require( "./directivas/noginecologicos" )
] );

modulo.controller( "DiagnosticoCtrl", require( "./ctrls/diagnosticoCtrl.js" ) );
modulo.controller( "ReporteCtrl", require( "./ctrls/reporteCtrl.js" ) );

module.exports = modulo.name;
