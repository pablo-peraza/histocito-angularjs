"use strict";

var gulp = require( "gulp" );
var gutil = require( "gulp-util" );
var ngConstant = require( "gulp-ng-constant" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );
var rename = require( "gulp-rename" );

module.exports = configurar;

function configurar( ) {
  var variable = require( "yargs" ).argv.backend || "http://localhost:3001";
  return ngConstant( {
      name: "Backend",
      constants: {
        "urlApi": variable
      },
      stream: true
    } )
    .pipe( rename( "urlApi.js" ) )
    .on( "error", gutil.log )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( gulp.dest( "dist" ) )
    .on( "error", gutil.log );
}
