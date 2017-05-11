"use strict";

module.exports = loginCtrl;
loginCtrl.$inject = [ "$scope",
"$location",
"$timeout",
"Login",
"Alertas",
"Credenciales" ];
function loginCtrl( $scope, $location, $timeout, Login, Alertas, Credenciales ) {
  $scope.autenticar = function( credenciales ) {
    $scope.bloqueado = true;
    credenciales.recordarPor = credenciales.recordarme ? Credenciales.recordarPor() : 1;
    Login.autenticar( credenciales ).then(
      function( resp ) {
        Credenciales.iniciar( credenciales.recordarme, resp );
        $timeout( function() {
          $location.path( "/inicio" );
          Alertas.limpiar();
        }, 100 );
      },
      function( data ) {
        $scope.form.$setPristine();
        Alertas.agregar( 403 );
        delete $scope.credenciales.password;
      }
    ).finally( function() {
      $scope.bloqueado = false;
      $scope.enviado = true;
    } );
  }; //function
}
