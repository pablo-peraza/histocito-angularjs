"use strict";

var gulp = require( "gulp" );
var minifyHTML = require( "gulp-minify-html" );
var ngTemplate = require( "gulp-angular-templatecache" );
var rutas = require( "./rutas" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );

var ngTemplateOpts = {
  module: require( "../package.json" ).name
};

exports.desarrollo = desarrollo;
exports.produccion = produccion;

function desarrollo() {
  var minifyOpts = {
    empty: true,
    spare: true,
    quotes: true,
    comments: true
  };
  return compilar( minifyOpts );
}

function produccion() {
  var minifyOpts = {
    empty: false,
    spare: false,
    quotes: true,
    comments: false
  };
  return compilar( minifyOpts );
}

function compilar( minifyOpt ) {
  return gulp.src( rutas.plantillas.watch )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( minifyHTML( minifyOpt ) )
    .pipe( ngTemplate( "plantillas.js", ngTemplateOpts ) )
    .pipe( gulp.dest( "./dist/" ) )
    .on( "error", gutil.log );
}
