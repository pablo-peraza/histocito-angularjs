"use strict";
var gulp = require( "gulp" );
var mainBowerFiles = require( "main-bower-files" );
var concat = require( "gulp-concat" );
var uglify = require( "gulp-uglify" );
var rename = require( "gulp-rename" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );
var _ = require( "lodash" );

exports.desarrollo = bowerDes;
exports.produccion = bowerProd;

function bowerDes() {
  var stream = src()
    .pipe( plumber( {errorHandler: notify.onError( "Error: <%= error.message %>" )} ) )
    .pipe( concat( "vendor.min.js" ) );
  return dist( stream );
}

function bowerProd() {
  var stream = src()
    .pipe( concat( "vendor.js" ) )
    .pipe( uglify().on( "error", function( e ) {
      console.log( "\x07", e.message );
    } ) )
    .pipe( rename( "vendor.min.js" ) );
  return dist( stream );
}

function src() {
  var libs = mainBowerFiles( {
      filter: /^.*\.js$/
    } );
  var regex = /ng-file-upload/;
  var clean = _.reject( libs, function( lib ) {
    return regex.test( lib );
  } );
  var ngFileUpload = _.filter( libs, function( lib ) {
    return regex.test( lib );
  } );
  ngFileUpload.sort();
  var libsOrdenadas = _.union( clean, ngFileUpload );
  return gulp.src( libsOrdenadas, {
      base: "./bower_components"
    } )
    .pipe( plumber( {errorHandler: notify.onError( "Error: <%= error.message %>" )} ) );
}

function dist( stream ) {
  return stream.pipe( gulp.dest( "dist" ) )
  .on( "error", gutil.log )
  .on( "error", notify );
}
