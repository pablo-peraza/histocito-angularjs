"use strict";

modalFrotisCtrl.$inject = [ "$scope", "$modalInstance", "modelo", "titulo" ];
function modalFrotisCtrl( $scope, $modalInstance, modelo, titulo ) {
  $scope.modelo = modelo;
  $scope.titulo = titulo;
  $scope.enZonas = function( val ) {
    if ( val ) {
      $scope.modelo.limitado = false;
      $scope.modelo.inadecuado = false;
    }
  };
  $scope.limitado = function( val ) {
    if ( val ) {
      $scope.modelo.enZonas = false;
      $scope.modelo.inadecuado = false;
    }
  };
  $scope.inadecuado = function( val ) {
    if ( val ) {
      $scope.modelo.limitado = false;
      $scope.modelo.enZonas = false;
    }
  };
  $scope.ok = function( modelo ) {
    $modalInstance.close( modelo );
  };
} //ctrl
