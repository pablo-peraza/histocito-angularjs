/**
  Proyecto Base Ciris Informatic Solutions
  Enero 2015
  Recursos y lecturas
  Guia de estilo: https://github.com/johnpapa/angularjs-styleguide
  Otra guia de estilo: http://toddmotto.com/opinionated-angular-js-styleguide-for-teams/
  Sobre los controladores: http://toddmotto.com/rethinking-angular-js-controllers/
  Estilos Bootstrap: http://getbootstrap.com/css/
  Tema base de bootstrap: http://bootswatch.com/paper/
  notificaciones: https://github.com/Foxandxss/angular-toastr
*/
"use strict";
var permisos = require( "./principal/modelos/permisos.js" );

//moment.locale( "es" );

//URL del backend en constante "urlApi"
var modulo = angular.module( "Proyecto", [
  "ngRoute",
  "ngAnimate",
  "ngTouch",
  "ngStorage",
  "ui.bootstrap",
  "angular-loading-bar",
  "duScroll",
  "snap",
  "ui.sortable",
  "ui.bootstrap.showErrors",
  "truncate",
  "pasvaz.bindonce",
  "textAngular",
  "cfp.hotkeys",
  "Backend",
  require( "./base" ),
  require( "./principal" ),
  require( "./login" )
] );

modulo.run( run );

run.$inject = [
  "$rootScope",
  "$location",
  "Credenciales",
  "Token",
  "Configuraciones",
  "Navbar",
  "$timeout",
  "Alertas"
];

function run( $root, $location, Credenciales, Token, Configuraciones, Navbar, $timeout, Alertas ) {
  var configurado = false;
  $root.location = $location;
  $root.permisos = permisos.valores;
  $root.vacio = _.isEmpty;
  $root.hoy = moment().endOf( "day" );
  $root.puedePasar = puedePasar;
  $root.clickEn = clickEn;
  $root.$on( "$routeChangeStart", routeChangeStart );
  $root.$on( "$routeChangeSuccess", routeChangeSuccess );

  function puedePasar( deUsuario ) {
    return Credenciales.estaLogueado() &&
      permisos.funciones.puedePasar( deUsuario, Credenciales.credenciales().tipoUsuario );
  }

  function clickEn( id ) {
    $timeout( function() {
      document.getElementById( id ).click();
    }, 30 );
    return false;
  }

  function routeChangeStart( event, currentRoute ) {
    Alertas.limpiar();
    if ( !currentRoute.sinLogin ) { //la ruta necesita que el usuario este logueado
      if ( Credenciales.estaLogueado() ) { //verificacion de que el usuario este logueado
        if ( !configurado ) { //solo ejecutar la primera vez
          Configuraciones.setHeaders( Credenciales.credenciales().token );
          configurado = true;
        } //if
        //si el usuario no tiene permisos sobre la ruta solicitada
        if ( !$root.puedePasar( currentRoute.permisos ) ) {
          $location.path( "/inicio/noautorizado" );
        } //if
      } else {
        $location.path( "/inicio/credenciales" );
      } //else
    } //if
  }

  function routeChangeSuccess( event, currentRoute ) {
    Navbar.colapsado = true;
    $root.titulo = currentRoute.titulo;
  }

}

module.exports = modulo;

String.prototype.capitalize = function() {
  return this.charAt( 0 )
    .toUpperCase() + this.slice( 1 );
};

angular.element( document ).ready( function() {
  angular.bootstrap( document, [ modulo.name ], {
    strictDi: true
  } );
} );
