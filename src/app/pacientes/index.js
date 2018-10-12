"use strict";

var modulo = angular.module( "Proyecto.pacientes", [
  require( "./diagnosticos" ),
  require( "./expedientes" ),
  require( "./muestras" ),
  require( "./solicitudes" )
] );

module.exports = modulo.name;
