"use strict";
module.exports = formCtrl;
formCtrl.$inject = [ "$rootScope",
"$scope",
"ServiciosIndex",
"ServicioAlertas" ];

function validateEmail( email ) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test( email );
}

function formCtrl( $rootScope, $scope, ServiciosIndex, Alertas ) {
  $scope.enviando = false;
  $scope.correoValidado = false;
  $scope.validarCorreo = function( correo, campo ) {
    if ( validateEmail( correo ) ) {
      $rootScope.cargando = true;
      try {
        ServiciosIndex.buscarPorCorreo( correo ).then(
          function() {
            $rootScope.cargando = false;
            $scope.correoValidado = true;
            campo.$setValidity( "yaexiste", true );
          },
          function( data ) {
            $rootScope.cargando = false;
            switch ( data.status ) {
              case 471:
                campo.$setValidity( "yaexiste", false );
                $scope.correoValidado = false;
                break;
              default:
                var str = "No se ha podido realizar la validación del correo";
                $rootScope.alerta = Alertas.alerta( 400, str );
                $scope.correoValidado = true;
                break;
            } //switch
          }
        );
      } catch ( ex ) {
        $scope.correoValidado = true;
      } //catch
    } //if
  }; //function

  $scope.enviar = function( usuario ) {
    $rootScope.cargando = true;
    ServiciosIndex.registrarUsuario( usuario ).then(
      function( data ) {
        $scope.usuario = undefined;
        $scope.formRegistro.$setPristine();
        $rootScope.cargando = false;
        $rootScope.alerta = Alertas.alerta( data.status );
      },
      function( data ) {
        $rootScope.cargando = false;
        $rootScope.alerta = Alertas.alerta( data.status );
      }
    );
  }; //function
}
