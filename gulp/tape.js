"use strict";

var gulp = require( "gulp" );
var tape = require( "gulp-tape" );
var rutas = require( "./rutas.js" );

module.exports = {
  test: test
};

function test() {
  return gulp.src( rutas.tests.base )
    .pipe( tape( {
      bail: false // no detener al haber fail
    } ) );
}
