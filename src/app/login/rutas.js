"use strict";

module.exports = rutas;

function plantilla( nombre ) {
  return "login/htmls/" + nombre + ".html";
}

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {

  $routeProvider.when( "/", {
    titulo: "Ingreso",
    sinLogin: true,
    templateUrl: plantilla( "inicio" ),
    controller: "ControladorLogin",
    resolve: {
      res: [ "$location", "Credenciales",
        function( $location, Credenciales ) {
          if ( Credenciales.estaLogueado() ) {
            $location.path( "/reingreso" );
          }
        }
      ]
    } //resilve
  } );

  $routeProvider.when( "/reingreso", {
    titulo: "Re-Ingreso",
    sinLogin: true,
    templateUrl: plantilla( "reingreso" ),
    controller: "ControladorReingreso"
  } );

  $routeProvider.when( "/recuperaringreso", {
    titulo: "Recuperar Contraseña",
    sinLogin: true,
    templateUrl: plantilla( "recuperarIngreso" ),
    controller: "ControladorRecuperacion",
    resolve: {
      vista: recuperarClave
    }
  } );
  recuperarClave.$inject = [ "Login", "$location" ];

  function recuperarClave( Login, $location ) {
    var params = $location.search().q;
    if ( _.isUndefined( params ) ) {
      return "nueva";
    }
    return Login.existeRecuperacion( params ).then(
      function() {
        return "existe";
      },
      function() {
        return "nueva";
      }
    );
  } //recuperarClave

}
