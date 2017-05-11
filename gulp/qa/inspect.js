"use strict";

var gulp = require( "gulp" );
var jsinspect = require( "gulp-jsinspect" );
var rutas = require( "../rutas" );
var gutil = require( "gulp-util" );

module.exports = inspeccionar;

function inspeccionar() {
  return gulp.src( rutas.scripts.watch )
    .pipe( jsinspect( {
      "threshold": 30,
      "identifiers": true,
      "suppress": 100
    } ) )
    .on( "error", gutil.log );
}
