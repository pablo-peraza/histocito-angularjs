"use strict";

var gulp = require( "gulp" );
var complexity = require( "gulp-complexity" );
var rutas = require( "../rutas" );
var gutil = require( "gulp-util" );

module.exports = complejidad;

function complejidad() {
  return gulp.src( rutas.scripts.watch )
    .pipe( complexity( {
      "breakOnErrors": false
    } ) )
    .on( "error", gutil.log );
}
