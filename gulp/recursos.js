"use strict";
var gulp = require( "gulp" );
var rutas = require( "./rutas" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );

module.exports = recursos;

function recursos() {
  return gulp.src( rutas.recursos.principal, {
      base: "./src"
    } )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( gulp.dest( "dist/" ) )
    .on( "error", gutil.log );
}
