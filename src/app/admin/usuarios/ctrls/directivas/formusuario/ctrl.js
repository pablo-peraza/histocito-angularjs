"use strict";

module.exports = cisFormUsuarioCtrl;

cisFormUsuarioCtrl.$inject = [ "$scope", "Selecciones", "Usuarios", "Alertas" ];
function cisFormUsuarioCtrl( $scope, Selecciones, Usuarios, Alertas ) {
  Selecciones.usuario().then( function( resp ) {
      $scope.tipos = resp.lista;
    } );
  $scope.isUndefined = _.isUndefined;

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }
  $scope.buscar = function( cedula ) {
    var dim = $scope.soloMedicos ? [ {
      tipoUsuario: [ "médico" ]
    } ] : [];

    function ok( resp ) {
      return resp.data.lista;
    }
    return Usuarios.buscar( 0, 15, cedula, dim ).then( ok, error );
  };
  $scope.seleccionar = function( usuario ) {
    function ok( resp ) {
      $scope.onChange( {
        usuario: resp.data
      } );
      $scope.modelo = resp.data;
    }
    Usuarios.obtener( usuario.id ).then( ok, error );
  };
} //controller
