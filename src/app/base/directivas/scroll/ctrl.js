"use strict";

module.exports = cisScrollCtrl;

cisScrollCtrl.$inject = [ "$document", "$window", "$scope" ];
function cisScrollCtrl( $document, $window, $scope ) {

  $scope.mostrarBoton = function() {
    return $window.innerHeight >= document.body.clientHeight - parseInt( $scope.umbral ) &&
    $scope.debeCargar;
  };

  $scope.cargar = function() {
    if ( $scope.debeCargar &&
      document.body.clientHeight - $window.innerHeight <= $window.pageYOffset ) {
      $scope.cargador();
    } //if
  };

  $scope.cargarConBoton = function() {
    if ( $scope.debeCargar ) {
      $scope.cargador();
    } //if
  };
  $window.onscroll = function() {

    $scope.cargar();
  };
} //function
