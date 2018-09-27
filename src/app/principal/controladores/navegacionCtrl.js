"use strict";

module.exports = navegacionCtrl;

navegacionCtrl.$inject = [
  "$scope",
  "$location",
  "$route",
  "$timeout",
  "Credenciales",
  "Navbar"
];

function navegacionCtrl( $scope, $location, $route, $timeout, Credenciales, Navbar ) {
  function buscar( texto ) {
    $location.search( "busqueda", texto ).path( "/inicio/pacientes/expedientes" );
  }
  $scope.version = require( "../../../../package.json" ).version;
  $scope.buscar = buscar;
  $scope.colapsado = function() {
    return Navbar.colapsado;
  };
  $scope.colapsar = function() {
    Navbar.colapsado = !Navbar.colapsado;

  };
  $scope.sinLogin = function() {
    return ( !_.isUndefined( $route.current.$$route ) ) &&
     !_.isUndefined( $route.current.$$route.sinLogin );
  };

  $scope.salir = function() {
    $location.path( "/" );
    Credenciales.borrarCredenciales();
  };
  $scope.logueado = Credenciales.estaLogueado;
  $scope.nombreUsuario = function() {
    if ( Credenciales.estaLogueado() ) {
      var temp = Credenciales.credenciales();
      return temp.nombre + " " + temp.apellidos;
    } //if
  };

}
