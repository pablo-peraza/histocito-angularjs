"use strict";

var permisos = require( "./modelos/permisos.js" );
module.exports = rutas;

function plantilla( nombre ) {
  return "principal/htmls/" + nombre + ".html";
}

rutas.$inject = [ "$routeProvider", "$locationProvider", "$httpProvider", "hotkeysProvider" ];
function rutas( $routeProvider, $locationProvider, $httpProvider, hotkeysProvider ) {
  if ( window.history && window.history.pushState ) {
    $locationProvider.html5Mode( true );
  } //if

  hotkeysProvider.cheatSheetDescription = "Mostrar/Ocultar la ayuda";
  hotkeysProvider.templateTitle = "Atajos del teclado";

  $httpProvider.interceptors.push( [ "$q", "$location", "Alertas",
    function( $q, $location, Alertas ) {
      return {
        "responseError": function( response ) {
          if ( response.status === 472 || response.status === 473 ) {
            Alertas.limpiar();
            $location.path( "/inicio/credenciales" );
          }
          return $q.reject( response );
        }
      };
    }
  ] );

  $routeProvider.when( "/inicio", {
    templateUrl: plantilla( "inicio" ),
    titulo: "Iniciando",
    permisos: [ permisos.valores.todos ],
    resolve: {
      usuario: [ "$location", "Credenciales",
        function( $location, Credenciales ) {
          switch ( Credenciales.credenciales().tipoUsuario ) {
            case "Médico":
              return $location.path( "/inicio/medico/muestras" );
            case "Facturación":
              return $location.path( "/inicio/facturacion/facturas" );
            default:
              return $location.path( "/inicio/pacientes/muestras" );

          }
        }
      ]
    }
  } );

  function perfilResolve( Perfil, Alertas ) {
    function ok( resp ) {
      return resp.data;
    } //ok

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //error
    return Perfil.rest.usuario().then( ok, error );
  } //perfilResolve

  $routeProvider.when( "/inicio/perfil", {
    templateUrl: "perfil/htmls/inicio.html",
    permisos: [ permisos.valores.todos ],
    titulo: "Mi Perfil",
    controller: "PerfilCtrl",
    resolve: {
      perfil: [ "Perfil", "Alertas", perfilResolve ]
    }
  } );

  $routeProvider.when( "/inicio/credenciales", {
    titulo: "Credenciales Inválidos",
    templateUrl: plantilla( "credencialesinvalidos" ),
    controller: "ControladorCredencialesInvalidos",
    sinLogin: true
  } );

  $routeProvider.when( "/inicio/relogin", {
    templateUrl: plantilla( "relogin" ),
    controller: "ControladorRelogin",
    sinLogin: true
  } );

  $routeProvider.when( "/inicio/noautorizado", {
    templateUrl: plantilla( "noautorizado" ),
    permisos: [ permisos.valores.todos ]
  } );

  $routeProvider.otherwise( {
    titulo: "404: No encontrado",
    templateUrl: plantilla( "noencontrado" ),
    sinLogin: true
  } );
}
