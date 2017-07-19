"use strict";

module.exports = PatronCedula;

PatronCedula.$inject = [ "$scope" ];
function PatronCedula( $scope ) {
  $scope.patron = function( extranjero ) {
    return extranjero ? /[\d\w]+/ : /^\d{9}$/;
  };
} //PatronCedula
