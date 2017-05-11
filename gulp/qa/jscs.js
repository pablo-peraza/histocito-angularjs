"use strict";

var gulp = require( "gulp" );
var jscs = require( "gulp-jscs" );
var rutas = require( "../rutas" );
var gutil = require( "gulp-util" );

module.exports = jscs;

function jscs() {
  return gulp.src( rutas.scripts.watch )
    .pipe( jscs( {fix: true} ) )
    .pipe( jscs.reporter() )
    .pipe( gulp.dest( rutas.scripts.base ) )
    .on( "error", gutil.log );
}
