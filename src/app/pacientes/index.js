"use strict";

var modulo = angular.module( "Proyecto.pacientes", [
  require( "./diagnosticos" ),
  require( "./expedientes" ),
  require( "./muestras" )
] );

module.exports = modulo.name;
