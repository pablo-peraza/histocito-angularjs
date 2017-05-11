"use strict";
var gulp = require( "gulp" );
var less = require( "gulp-less" );
var rename = require( "gulp-rename" );
var path = require( "path" );
var gutil = require( "gulp-util" );
var sourcemaps = require( "gulp-sourcemaps" );
var browserSync = require( "browser-sync" );
var reload = browserSync.reload;
var rutas = require( "./rutas" );
var plumber = require( "gulp-plumber" );
var notify = require( "gulp-notify" );
var CleanCSS = require( "less-plugin-clean-css" );
var AutoPrefix = require( "less-plugin-autoprefix" );

exports.desarrollo = desarrollo;
exports.produccion = produccion;

function desarrollo() {
  return compilador( false )
  .pipe( reload( {
    stream: true
  } ) );
}

function produccion() {
  return compilador( true );
}

function compilador( minificar ) {
  return gulp.src( [ rutas.less.principal ] )
    .pipe( plumber( {
      errorHandler: notify.onError( "Error: <%= error.message %>" )
    } ) )
    .pipe( sourcemaps.init() )
    .pipe( lessc( minificar ) )
    .pipe( sourcemaps.write( "." ) )
    .pipe( rename( "estilos.css" ) )
    .pipe( gulp.dest( "dist/" ) )
    .on( "error", function( e ) {
      gutil.log( e );
      this.emit( "end" );
    } );
}

function lessc( minify ) {
  var plugins = [ new AutoPrefix( { browsers: [ "last 2 versions" ] } ) ];
  if ( minify ) {
    plugins.push( new CleanCSS( { advanced: true } ) );
  }
  return less( {
    paths: [ path.join( __dirname, "less", "includes" ) ],
    plugins: plugins
  } );
}
