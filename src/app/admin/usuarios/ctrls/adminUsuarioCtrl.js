"use strict";

module.exports = AdminUsuariosCtrl;

AdminUsuariosCtrl.$inject = [ "$rootScope", "$scope", "$location", "usuarios", "dimensiones",
"elementoActual", "Usuarios", "Alertas", "hotkeys" ];
function AdminUsuariosCtrl( $rootScope, $scope, $location, usuarios, dimensiones, elementoActual,
  Usuarios, Alertas, hotkeys ) {
  $scope.datos = {
    usuarios: usuarios,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.usuarios = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    Usuarios.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, $scope.filtros )
    .then( ok, error ).finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.aplicarDimension = function( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.usuarios.lista.concat( res.lista );
      return res;
    } );
  };

  $scope.cambiarHabilitacion = function( usuario ) {
    Usuarios.cambiarHabilitacion( usuario ).then( function() {
      usuario.habilitado = !usuario.habilitado;
    }, function( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } );
  };

  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+shift+enter",
      allowIn: [ "input", "select", "textarea" ],
      description: "Crear un nuevo usuario",
      callback: function() {
        if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) ) {
          $location.path( "/inicio/admin/usuarios/nuevo" );
        }
      }
    } );
} //controller
