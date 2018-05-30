"use strict";

var modulo = angular.module( "Proyecto.admin", [
  require( "./clinicas" ),
  require( "./medicos" ),
  require( "./observaciones" ),
  require( "./reportes" ),
  require( "./usuarios" ),
  require( "./relaciones" )
] );

module.exports = modulo.name;
