"use strict";

module.exports = PerfilCtrl;

PerfilCtrl.$inject = [ "$scope", "Perfil", "perfil", "hotkeys", "Credenciales", "Alertas" ];
function PerfilCtrl( $scope, Perfil, perfil, hotkeys, Credenciales, Alertas ) {
  var original;
  $scope.datos = {
    perfil: perfil,
    recordarPor: Credenciales.recordarPor(),
    credenciales: Credenciales.credenciales()
  };
  $scope.editar = editar;
  $scope.cancelar = cancelar;
  $scope.guardar = guardar;

  function editar( datos ) {
    original = angular.copy( datos );
    $scope.datos.perfil.editando = true;
  } //editar

  function guardar( perfil, credenciales, form ) {
    $scope.$broadcast( "show-errors-check-validity" );

    function ok( resp ) {
      Alertas.agregar( resp.status );
      Credenciales.recordarPor( $scope.datos.recordarPor * 1 );
      $scope.$broadcast( "show-errors-reset" );
      form.$setPristine();
      delete $scope.datos.password;
      $scope.datos.perfil.editando = false;
    } //ok
    function error( resp ) {
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    } //ultima
    if ( !$scope.datos.cargando && form.$valid ) {
      $scope.datos.cargando = true;
      Perfil.rest.guardar( perfil, credenciales ).then( ok, error ).finally( ultima );
    } //if
  } //guardar

  function cancelar( form ) {
    if ( !$scope.datos.cargando ) {
      $scope.$broadcast( "show-errors-reset" );
      form.$setPristine();
      $scope.datos = original;
    }
  } //function
} //ctrl
