"use strict";

var fs = require( "fs" );
var mkdirp = require( "mkdirp" );
var Log = require( "log" );
var log = new Log( "info" );

module.exports = generador;

function generador( cb ) {
  try {
    var archivo = require( "yargs" ).argv.nombre.toLowerCase();
    var nombreModulo = capitalizar( archivo );
    var ars = archivos( nombreModulo, archivo );
    mkdirp( ruta( archivo, "./src/app/modulo/controladores" ), function() {
      fs.writeFile( ruta( archivo, "src/app/modulo/index.js" ), ars.index );
      fs.writeFile( ruta( archivo, "src/app/modulo/rutas.js" ), ars.rutas );
      fs.writeFile( ruta( archivo, "src/app/modulo/controladores/" +
       archivo + "Ctrl.js" ), ars.ctrl );
    } );
    mkdirp( ruta( archivo, "./src/app/modulo/vistas" ), function() {
      fs.writeFile( ruta( archivo, "src/app/modulo/vistas/inicio.html" ), ars.html );
    } );
    log.info( "Módulo generado." +
     " Recuerde agregar el módulo a src/app/index.js para que sea cargado" );
    cb();
  } catch ( es ) {
    log.error( es );
  }
}

function archivos( modulo, archivo ) {
  var index = fs.readFileSync( "gulp/generadores/modulo/index.js", "utf-8" );
  var rutas = fs.readFileSync( "gulp/generadores/modulo/rutas.js", "utf-8" );
  var ctrl = fs.readFileSync( "gulp/generadores/modulo/ctrl.js", "utf-8" );
  var html = fs.readFileSync( "gulp/generadores/modulo/inicio.html", "utf-8" );

  return {
    index: index.replace( /\bNOMBREMODULO/g, modulo ).replace( /\bARCHIVOMODULO/g, archivo ),
    rutas: rutas.replace( /\bNOMBREMODULO/g, modulo ).replace( /\bARCHIVOMODULO/g, archivo ),
    ctrl: ctrl.replace( /\bNOMBREMODULO/g, modulo ).replace( /\bARCHIVOMODULO/g, archivo ),
    html: html.replace( /\bNOMBREMODULO/g, modulo ).replace( /\bARCHIVOMODULO/g, archivo )
  };
}

function ruta( modulo, url ) {
  return url.replace( "modulo", modulo );
}

function capitalizar( string ) {
  var lower = string.toLowerCase();
  return lower.charAt( 0 ).toUpperCase() + lower.slice( 1 );
}
