"use strict";

var gulp = require( "gulp" );
var gutil = require( "gulp-util" );
var source = require( "vinyl-source-stream" );
var watchify = require( "watchify" );
var browserify = require( "browserify" );
var rutas = require( "./rutas" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );
var buffer = require( "vinyl-buffer" );
var uglify = require( "gulp-uglify" );
var sourcemaps = require( "gulp-sourcemaps" );

exports.watch = watch;
exports.desarrollo = desarrollo;
exports.produccion = produccion;

function produccion() {
  return logger( browserificador( false ), streamProduccion );
}

function desarrollo() {
  return logger( browserificador( true ), streamDesarrollo );
}

function watch() {
  var b = watchify( browserificador( true ) );
  b.on( "update", function() {
    streamDesarrollo( b );
  } );
  return logger( b, streamDesarrollo );
}

function logger( b, stream ) {
  b.on( "log", gutil.log );
  b.on( "error", gutil.log.bind( gutil, "Browserify Error" ) );
  return stream( b );
}

function browserificador( debug ) {
  return browserify( rutas.scripts.principal, {
    debug: debug,
    fullPaths: true
  } );
}

function streamDesarrollo( b ) {
  return escribir( compilar( b ) );
}

function streamProduccion( b ) {
  var comp = compilar( b );
  comp.pipe( uglify() );
  return escribir( comp );
}

function compilar( b ) {
  function notificar( err ) {
    notify( "Error de Browserify" );
    this.emit( "end" );
    gutil.log( err );
  }

  return b.bundle().on( "error", notificar )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( source( "logica.js" ) )
    .pipe( buffer() )
    .pipe( sourcemaps.init( {loadMaps: true} ) );
}

function escribir( stream ) {
  return stream
  .pipe( sourcemaps.write( "./" ) )
  .pipe( gulp.dest( "./dist" ) );
}
