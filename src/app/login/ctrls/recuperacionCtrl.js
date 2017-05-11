"use strict";

module.exports = recuperacionCtrl;

recuperacionCtrl.$inject = [ "$scope",
"$location",
"Login",
"Alertas",
"vista" ];
function recuperacionCtrl( $scope, $location, Login, Alertas, vista ) {
  $scope.vista = vista;
  $scope.datos = {
    correo: ""
  };
  $scope.vacio = _.isUndefined;
  $scope.enviarCorreo = function( correo, form ) {
    $scope.$broadcast( "show-errors-check-validity" );
    if ( !$scope.datos.cargando && form.$valid ) {
      $scope.datos.cargando = true;
      Login.pedirRecuperacion( correo ).then(
        function() {
          Alertas.agregar( 200, "Se ha realizado el pedido de recuperación de contraseña." +
            " En breve recibirá un correo a la dirección " + correo );
        },
        function( res ) {
          Alertas.agregar( res.status, "El correo no está registrado" );
        }
      ).finally( function() {
        $scope.datos.cargando = false;
        delete $scope.datos.correo;
        form.$setPristine();
        $scope.$broadcast( "show-errors-reset" );
      } );
    }
  };
  $scope.recuperar = function( clave, form ) {
    $scope.$broadcast( "show-errors-check-validity" );
    if ( !$scope.datos.cargando && form.$valid ) {
      $scope.datos.cargando = true;

      Login.recuperar( $location.search().q, clave ).then(
        function() {
          $location.path( "/" );
          Alertas.agregar( 200, "Se ha cambiado su contraseña correctamente" );
        },
        function( res ) {
          Alertas.agregar( res.status );
        }
      )["finally"]( function() {
        $scope.datos.cargado = false;
        delete $scope.datos.correo;
        form.$setPristine();
        $scope.$broadcast( "show-errors-reset" );
      } );
    }

  };
}
