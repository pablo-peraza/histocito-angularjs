"use strict";

var gulp = require( "gulp" );
var rimraf = require( "rimraf" );
var conf = require( "./config.js" );
var tape = require( "./tape.js" );
require( "./qa/tareas.js" );
require( "./generadores/tareas.js" );
require( "./otros/tareas.js" );

gulp.task( "help", require( "./ayuda.js" ) );

gulp.task( "clean", clean );
gulp.task( "recursos", require( "./recursos" ) );

gulp.task( "backend", conf );

gulp.task( "build:js", require( "./browserify" ).desarrollo );
gulp.task( "build:bower", require( "./bower" ).desarrollo );
gulp.task( "build:html", require( "./plantillas" ).desarrollo );
gulp.task( "build:less", require( "./less" ).desarrollo );
gulp.task( "build",
[ "build:js", "build:bower", "build:html", "build:less", "recursos", "backend", "html-inicial" ],
function( cb ) {
  return cb();
} );

gulp.task( "dist:js", require( "./browserify" ).produccion );
gulp.task( "dist:bower", require( "./bower" ).produccion );
gulp.task( "dist:html", require( "./plantillas" ).produccion );
gulp.task( "dist:less", require( "./less" ).produccion );
gulp.task( "dist", [ "dist:js", "dist:bower", "dist:html", "dist:less", "recursos", "backend",
"html-inicial" ],
function( cb ) {
  return cb();
} );

gulp.task( "watch:js", require( "./browserify" ).watch );
gulp.task( "watch", [ "watch:js" ], require( "./watch" ) );

gulp.task( "serve:dev", [ "clean", "build", "watch" ], require( "./servidor" ) );
gulp.task( "serve:dist", [ "clean", "dist" ], require( "./servidor" ) );

gulp.task( "serve", require( "./servidor" ) );
gulp.task( "default", [ "serve:dev" ] );

gulp.task( "html-inicial", require( "./html-inicial.js" ) );
gulp.task( "bump", require( "./githooks.js" ) );
gulp.task( "test", tape.test );

function clean( callback ) {
  rimraf.sync( "./dist" );
  rimraf.sync( "./size" );
  return callback();
}
