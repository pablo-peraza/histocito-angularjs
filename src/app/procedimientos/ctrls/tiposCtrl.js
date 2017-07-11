"use strict";

module.exports = TiposCtrl;

TiposCtrl.$inject = [
  "$rootScope",
  "$scope",
  "$timeout",
  "tipos",
  "dimensiones",
  "elementoActual",
  "Alertas",
  "hotkeys",
  "Procedimientos",
  "Selecciones"
];
function TiposCtrl( $rootScope, $scope, $timeout, tipos, dimensiones, elementoActual, Alertas,
  hotkeys, Procedimientos, Selecciones ) {
  function configurarTeclado( $scope, hotkeys ) {
    hotkeys.bindTo( $scope )
      .add( {
        combo: "mod+shift+return",
        description: "Nueva Categoría",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.datos.form = true;
        }
      } )
      .add( {
        combo: "mod+backspace",
        description: "Cancelar",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.cancelar();
        }
      } );
  } //function

  var original;
  configurarTeclado( $scope, hotkeys );
  Selecciones.categoria().then( function( resp ) {
    $scope.categorias = resp.lista;
  } );
  $scope.datos = {
    tipos: tipos,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };
  $scope.vacio = _.isEmpty;

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.tipos = procesarResultado( resp.data );
      $scope.datos.elementoActual += 10;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    Procedimientos.tipos.buscar( $scope.datos.elementoActual, 10, $scope.datos.filtro,
      $scope.filtros ).then( ok, error )["finally"]( ultima );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      Procedimientos.tipos.etiquetas( res.dimensiones );
      return res;
    } );
  };

  $scope.aplicarDimension = function( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.tipos.lista.concat( res.lista );
      return res;
    } );
  };

  function recargar() {
    $timeout( function() {
      delete $scope.datos.filtro;
      $scope.buscar();
    }, 1000 );
  } //recargar

  $scope.guardar = function( cat ) {

    function ok( resp ) {
      delete $scope.datos.temp;
      $scope.datos.form = false;
      Alertas.agregar( resp.status );
      recargar();
    } //ok
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) && !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Procedimientos.tipos.guardar( cat ).then( ok, error ).finally( ultima );
    }
  };

  $scope.editar = function( cat ) {
    if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) ) {
      original = angular.copy( $scope.datos.tipos );
      $scope.datos.temp = angular.copy( cat );
      $scope.datos.form = true;
    }
  };

  $scope.eliminar = function( cat ) {
    var texto = "¿Está seguro que desea eliminar este tipo de procedimiento?";

    function ok( resp ) {
      Alertas.agregar( resp.status );
      $scope.datos.tipos.cantidad -= 1;
      $scope.datos.tipos.lista = _.reject( $scope.datos.tipos.lista, function( c ) {
        return c.id === cat.id;
      } );
      recargar();
    }

    function error( resp ) {
      var texto =
      "No se puede borrar el procedimiento porque hay procedimientos que dependen de él";
      Alertas.agregar( resp.status, resp.status === 409 ? texto : undefined );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( confirm( texto ) ) {
      $scope.datos.cargando = true;
      Procedimientos.tipos.eliminar( cat.id ).then( ok, error ).finally( ultima );
    }
  };

  $scope.cancelar = function() {
    if ( !$scope.datos.cargando ) {
      if ( $scope.datos.temp && $scope.datos.temp.id ) {
        $scope.datos.tipos = original;
      }
      delete $scope.datos.temp;
      $scope.datos.form = false;
    }
  };

} //ctrl
