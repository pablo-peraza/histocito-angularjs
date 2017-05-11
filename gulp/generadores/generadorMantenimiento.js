"use strict";

var fs = require( "fs" );
var mkdirp = require( "mkdirp" );
var Log = require( "log" );
var log = new Log( "info" );

module.exports = generador;

function tests( nombre, modulo, archivo, ars ) {
  mkdirp( ruta( modulo, "./test/app/modulo/controladores" ), function() {
    fs.writeFile( ruta( modulo, "test/app/modulo/controladores/form" +
     nombre + "Ctrl.js" ), ars.formCtrlTest );
     fs.writeFile( ruta( modulo, "test/app/modulo/controladores/listado" +
      nombre + "Ctrl.js" ), ars.listadoCtrlTest );
  } );
}

function normal( nombre, modulo, archivo, ars ) {
  mkdirp( ruta( modulo, "./src/app/modulo/modelos" ), function() {
    fs.writeFile( ruta( modulo, "src/app/modulo/modelos/" + archivo + ".js" ), ars.modelo );
  } );
  mkdirp( ruta( modulo, "./src/app/modulo/controladores/rest" ), function() {
    fs.writeFile( ruta( modulo, "src/app/modulo/controladores/rest/" +
     archivo + "API.js" ), ars.rest );
  } );
  fs.writeFile( ruta( modulo, "src/app/modulo/vistas/lista" + nombre + ".html" ), ars.lista );
  fs.writeFile( ruta( modulo, "src/app/modulo/vistas/form" + nombre + ".html" ), ars.uno );
  fs.writeFile( ruta( modulo, "src/app/modulo/controladores/listado" +
   nombre + "Ctrl.js" ), ars.listaCtrl );
  fs.writeFile( ruta( modulo, "src/app/modulo/controladores/form" +
   nombre + "Ctrl.js" ), ars.formCtrl );

  fs.writeFile( ruta( modulo, "src/app/modulo/rutas.js" ), agregarRutas( modulo, ars.rutas ) );
  fs.writeFile( ruta( modulo, "src/app/modulo/index.js" ),
   agregarAngular( modulo, ars.angular ) );
}

function generador( cb ) {
  try {
    var nombre = capitalizar( require( "yargs" ).argv.nombre );
    var modulo = require( "yargs" ).argv.modulo.toLowerCase();
    var archivo = nombre.toLowerCase();
    var ars = archivos( nombre, archivo, modulo );

    normal( nombre, modulo, archivo, ars );
    tests( nombre, modulo, archivo, ars );

    log.info( "Mantenimiento generado." );
    cb();
  } catch ( es ) {
    log.error( es );
  }
}

function agregarRutas( modulo, rutas ) {
  var rutasActuales = fs.readFileSync( ruta( modulo, "./src/app/modulo/rutas.js" ), "utf-8" );
  var temp = rutasActuales.substring( 0, rutasActuales.lastIndexOf( "}" ) );
  return temp + "\n\n" + rutas + "\n\n}";
}

function agregarAngular( modulo, angular ) {
  var indexActual = fs.readFileSync( ruta( modulo, "./src/app/modulo/index.js" ), "utf-8" );
  var temp = indexActual.substring( 0, indexActual.lastIndexOf( "module.exports = modulo;" ) );
  return temp + "\n\n" + angular + "\n\nmodule.exports = modulo;";
}

function archivos( nombre, archivo, modulo ) {
  var modelo = fs.readFileSync( "gulp/generadores/mantenimiento/modelo.js", "utf-8" );
  var rest = fs.readFileSync( "gulp/generadores/mantenimiento/rest.js", "utf-8" );
  var lista = fs.readFileSync( "gulp/generadores/mantenimiento/lista.html", "utf-8" );
  var uno = fs.readFileSync( "gulp/generadores/mantenimiento/uno.html", "utf-8" );
  var listaCtrl = fs.readFileSync( "gulp/generadores/mantenimiento/listadoCtrl.js", "utf-8" );
  var formCtrl = fs.readFileSync( "gulp/generadores/mantenimiento/formCtrl.js", "utf-8" );
  var rutas = fs.readFileSync( "gulp/generadores/mantenimiento/rutas.js", "utf-8" );
  var angular = fs.readFileSync( "gulp/generadores/mantenimiento/angular.js", "utf-8" );

  var formCtrlTest = fs.readFileSync( "gulp/generadores/mantenimiento/formCtrlTest.js", "utf-8" );
  var listadoCtrlTest =
    fs.readFileSync( "gulp/generadores/mantenimiento/listadoCtrlTest.js", "utf-8" );

  return {
    modelo: modelo.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    rest: rest.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    lista: lista.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    uno: uno.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    listaCtrl: listaCtrl.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    formCtrl: formCtrl.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    rutas: rutas.replace( /NOMBRE/g, nombre )
      .replace( /ARCHIVO/g, archivo ).replace( /MODULO/g, modulo ),
    angular: angular.replace( /NOMBRE/g, nombre )
      .replace( /ARCHIVO/g, archivo ).replace( /MODULO/g, modulo ),
    formCtrlTest: formCtrlTest.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo ),
    listadoCtrlTest: listadoCtrlTest.replace( /NOMBRE/g, nombre ).replace( /ARCHIVO/g, archivo )
  };
}

function ruta( modulo, url ) {
  return url.replace( "modulo", modulo );
}

function capitalizar( string ) {
  var lower = string.toLowerCase();
  return lower.charAt( 0 ).toUpperCase() + lower.slice( 1 );
}
