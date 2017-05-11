"use strict";
var gulp = require( "gulp" );

gulp.task( "generarModulo", require( "./generadorModulos.js" ) );
gulp.task( "generarMantenimiento", require( "./generadorMantenimiento.js" ) );
