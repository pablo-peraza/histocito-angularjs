"use strict";

var modulo = angular.module( "Proyecto.procedimientos", [
  require( "./directivas/categoria" ),
  require( "./directivas/buscarorigenes" ),
  require( "./directivas/selectororigen" ),
  require( "./directivas/selectortipos" ),
  require( "./directivas/buscartipos" )
] );

modulo.config( require( "./rutas.js" ) );

modulo.controller( "OrigenesCtrl", require( "./ctrls/origenesCtrl.js" ) );
modulo.controller( "ProcedimientosCtrl", require( "./ctrls/procedimientosCtrl.js" ) );
modulo.controller( "BuscarProcedimiento", require( "./ctrls/buscarProcedimientoCtrl.js" ) );
modulo.controller( "ProcedimientosMedicosCtrl", require( "./ctrls/procedimientosMedicosCtrl.js" ) );
modulo.controller( "TiposCtrl", require( "./ctrls/tiposCtrl.js" ) );

modulo.factory( "Procedimientos", require( "./ctrls/rest/procedimientosAPI.js" ) );

module.exports = modulo.name;
