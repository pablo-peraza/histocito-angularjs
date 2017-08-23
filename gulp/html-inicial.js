"use strict";
var gulp = require( "gulp" );
var handlebars = require( "gulp-compile-handlebars" );
var notify = require( "gulp-notify" );

module.exports = htmlInicial;

function htmlInicial() {
  return gulp.src( [ "src/index.html", "src/index-original.html" ], {
      base: "./src"
    } )
    .pipe( handlebars( {version: require( "../package.json" ).version} ) )
    .pipe( gulp.dest( "dist" ) )
    .on( "error", notify.onError( "Error copiando los recursos" ) );
}
