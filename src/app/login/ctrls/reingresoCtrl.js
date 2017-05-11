"use strict";
module.exports = reingresoCtrl;

reingresoCtrl.$inject = [ "$scope",
"$timeout",
"$location",
"Credenciales",
"Token" ];
function reingresoCtrl( $scope, $timeout, $location, Credenciales, Token ) {
  $scope.estado = "verificado";

  function malo() {
    Credenciales.borrarCredenciales();
    $scope.estado = "malo";
    $timeout( function() {
      $location.path( "/" );
    }, 3000 );
  } //function
  try {
    Token.verificarToken( Credenciales.credenciales().token ).then(
      function() {
        $scope.estado = "bueno";
        $scope.usuario = Credenciales.credenciales().nombre;
        $timeout( function() {
          $location.path( "/inicio" );
        }, 3000 );
      }, malo
    );
  } catch ( err ) {
    console.error( err );
    malo();
  }
}
