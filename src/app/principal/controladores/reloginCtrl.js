"use strict";

module.exports = reloginCtrl;
reloginCtrl.$inject = [
"$scope",
"$location",
"$timeout",
"Credenciales",
"Token" ];

function reloginCtrl( $scope, $location, $timeout, Credenciales, Token ) {
  var temp = Credenciales.credenciales();
  $scope.usuario = temp.nombre + " " + temp.apellidos;
  $scope.revalidar = function( pass ) {
    $scope.bloqueo = true;
    Token.revalidar( pass, +Credenciales.recordarPor() ).then(
      function( cred ) {
        Credenciales.iniciar( true, cred );
        $timeout( function() {
          $location.path( "/inicio" );
        }, 100 );
      },
      function() {
        $location.path( "/inicio/credenciales/" );
      }
    )["finally"]( function() {
      $scope.bloqueo = false;
    } );
  };
}
