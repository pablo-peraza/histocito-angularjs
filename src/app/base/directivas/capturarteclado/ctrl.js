"use strict";

module.exports = cisCapturarTecladoCtrl;

cisCapturarTecladoCtrl.$inject = [ "$scope" ];
function cisCapturarTecladoCtrl( $scope ) {
  this.init = function( elemento, tecla, hacer, padre ) {
    if ( padre !== "true" ) {
      $scope.$elemento = elemento;
      elemento.on( "keydown keypress", function( event ) {
        if ( event.which === tecla && hacer ) {
          $scope.$apply( function() {
            $scope.$eval( hacer );
          } );
          event.preventDefault();
        }
      } );
    }
  };
} //ctrl
