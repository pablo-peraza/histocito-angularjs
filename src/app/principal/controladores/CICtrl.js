"use strict";

module.exports = CICtrl;
CICtrl.$inject = [ "Credenciales", "$timeout", "$location" ];

function CICtrl( Credenciales, $timeout, $location ) {
  Credenciales.borrarCredenciales();
  $timeout( function() {
    $location.path( "/" );
  }, 3000 );
}
