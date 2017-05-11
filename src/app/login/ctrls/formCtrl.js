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

function formCtrl( $root, $scope, ServiciosIndex, Alertas ) {
  $scope.enviando = false;
  $scope.correoValidado = false;
  $scope.validarCorreo = function( correo, campo ) {
    if ( validateEmail( correo ) ) {
      $root.cargando = true;
      try {
        ServiciosIndex.buscarPorCorreo( correo ).then(
          function() {
            $root.cargando = false;
            $scope.correoValidado = true;
            campo.$setValidity( "yaexiste", true );
          },
          function( data ) {
            $root.cargando = false;
            switch ( data.status ) {
              case 471:
                campo.$setValidity( "yaexiste", false );
                $scope.correoValidado = false;
                break;
              default:
                var str = "No se ha podido realizar la validación del correo";
                $root.alerta = Alertas.alerta( 400, str );
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
    $root.cargando = true;
    ServiciosIndex.registrarUsuario( usuario ).then(
      function( data ) {
        $scope.usuario = undefined;
        $scope.formRegistro.$setPristine();
        $root.cargando = false;
        $root.alerta = Alertas.alerta( data.status );
      },
      function( data ) {
        $root.cargando = false;
        $root.alerta = Alertas.alerta( data.status );
      }
    );
  }; //function
}
