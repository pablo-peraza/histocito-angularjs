"use strict";

var gulp = require( "gulp" );
var jshint = require( "gulp-jshint" );
var rutas = require( "../rutas" );
var gutil = require( "gulp-util" );

module.exports = jsHint;

function jsHint() {
  return gulp.src( rutas.scripts.watch )
    .pipe( jshint() )
    .pipe( jshint.reporter( "jshint-stylish" ) )
    .on( "error", gutil.log );
}
