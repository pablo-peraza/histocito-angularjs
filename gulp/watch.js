"use strict";

var gulp = require( "gulp" );
var rutas = require( "./rutas" );
var browserSync = require( "browser-sync" );
var reload = browserSync.reload;

module.exports = watch;

function watch() {
  gulp.watch( rutas.scripts.watch, [ "js:hint", reload ] );
  gulp.watch( rutas.less.watch, [ "build:less" ] );
  gulp.watch( rutas.plantillas.watch, [ "build:html", reload ] );
  gulp.watch( rutas.recursos.principal, [ "recursos", reload ] );
}
