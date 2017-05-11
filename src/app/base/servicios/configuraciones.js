"use strict";

module.exports = configuraciones;

configuraciones.$inject = [ "$http" ];

function configuraciones( $http ) {
  var funciones = {};
  funciones.setHeaders = function( token ) {
    $http.defaults.headers.common.Authorization = "JWT " + token;
  };
  return funciones;
}
