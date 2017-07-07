"use strict";

var angular = window.angular;

var modulo = angular.module( "Proyecto.base", [
  require( "./directivas/galeria" ),
  require( "./directivas/dimensiones" ),
  require( "./directivas/buscarpor" )
] );

//modulo.config( require( "./rutas" ) );

modulo.controller( "NavegacionCtrl", require( "./servicios/navegacionCtrl.js" ) );

modulo.factory( "Notificaciones", require( "./servicios/notificaciones" ) );
modulo.factory( "Futuros", require( "./servicios/futuros" ) );
modulo.factory( "Validaciones", require( "./servicios/validaciones.js" ) );
modulo.factory( "Cache", require( "./servicios/cacheClaves.js" ) );
modulo.factory( "Util", require( "./servicios/util.js" ) );
modulo.factory( "Navbar", require( "./servicios/navbar.js" ) );
modulo.factory( "Configuraciones", require( "./servicios/configuraciones.js" ) );
modulo.factory( "Token", require( "./servicios/token.js" ) );
modulo.factory( "Credenciales", require( "./servicios/credenciales.js" ) );
modulo.factory( "Alertas", require( "./servicios/alertas.js" ) );
modulo.factory( "Dimensionador", require( "./servicios/dimensionador.js" ) );
modulo.factory( "Dimensionador", require( "./servicios/tabs.js" ) );

modulo.directive( "clickEn", require( "./directivas/clickEn.js" ) );
modulo.directive( "cisSwitch", require( "./directivas/cisSwitch.js" ) );
modulo.directive( "cisTitulo", require( "./directivas/cisTitulo.js" ) );
modulo.directive( "cisMinimizar", require( "./directivas/cisMinimizar.js" ) );
modulo.directive( "numerico", require( "./directivas/cisInputNumerico.js" ) );
modulo.directive( "cisEnter", require( "./directivas/cisEnter.js" ) );
modulo.directive( "cisUpload", require( "./directivas/cisUpload.js" ) );
modulo.directive( "ocultarAccion", require( "./directivas/ocultarAccion.js" ) );
modulo.directive( "btnVolver", require( "./directivas/btnVolver.js" ) );

var filtros = require( "./filtros" );
modulo.filter( "Duracion", filtros.duracion );
modulo.filter( "Fecha", filtros.fecha );
modulo.filter( "Porcentaje", filtros.porcentaje );
modulo.filter( "Booleano", filtros.bool );
modulo.filter( "TrustAsResourceUrl", filtros.trustAsResourceUrl );
modulo.filter( "Numero", filtros.numero );

module.exports = modulo.name;
