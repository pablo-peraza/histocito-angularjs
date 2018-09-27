"use strict";

module.exports = OrigenesCtrl;

OrigenesCtrl.$inject = [
  "$rootScope",
  "$scope",
  "origenes",
  "elementoActual",
  "Alertas",
  "hotkeys",
  "Procedimientos",
  "$timeout"
];
function OrigenesCtrl( $rootScope, $scope, origenes, elementoActual, Alertas, hotkeys,
  Procedimientos, $timeout ) {

  function configurarTeclado( $scope, hotkeys ) {
    hotkeys.bindTo( $scope )
      .add( {
        combo: "mod+shift+return",
        description: "Nueva Categoría",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.datos.mostrarForm = true;
        }
      } )
      .add( {
        combo: "mod+return",
        description: "Guardar",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          if ( !_.isUndefined( $scope.datos.temp ) ) {
            $scope.guardar( $scope.datos.temp );
          }
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
  $scope.datos = {
    origenes: origenes,
    elementoActual: elementoActual
  };
  $scope.vacio = _.isEmpty;
  $scope.nombreForm = function( nombre ) {
    $scope.datos.form = nombre;
  };

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.origenes = procesarResultado( resp.data );
      $scope.datos.elementoActual += 100;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    Procedimientos.origenes.buscar( $scope.datos.elementoActual, 100, $scope.datos.filtro )
    .then( ok, error )["finally"]( ultima );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.origenes.lista.concat( res.lista );
      return res;
    } );
  };

  $scope.guardar = function( cat ) {
    function ok( resp ) {
      $timeout( $scope.buscar, 1000 );
      delete $scope.datos.temp;
      $scope.datos.mostrarForm = false;
      $scope.datos.form.$setPristine();
      Alertas.agregar( resp.status );
    } //ok
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
      console.debug( $scope.datos.form );
      $scope.datos.form.$setSubmitted();
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Procedimientos.origenes.guardar( cat ).then( ok, error ).finally( ultima );
    }
  };

  $scope.editar = function( cat ) {
    if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) ) {
      original = angular.copy( $scope.datos.origenes );
      $scope.datos.temp = angular.copy( cat );
      $scope.datos.mostrarForm = true;
    }
  };

  $scope.eliminar = function( cat ) {
    var texto = "¿Está seguro que desea eliminar este origen de muestra?";

    function ok( resp ) {
      Alertas.agregar( resp.status );
      $scope.datos.origenes.cantidad -= 1;
      $scope.datos.origenes.lista = _.reject( $scope.datos.origenes.lista, function( c ) {
        return c.id === cat.id;
      } );
    }

    function error( resp ) {
      var texto =
      "No se puede borrar el origen porque hay tipos de procedimientos que dependen de él";
      Alertas.agregar( resp.status, resp.status === 409 ? texto : undefined );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( confirm( texto ) ) {
      $scope.datos.cargando = true;
      Procedimientos.origenes.eliminar( cat.id ).then( ok, error ).finally( ultima );
    }
  };

  $scope.cancelar = function() {
    if ( !$scope.datos.cargando ) {
      if ( $scope.datos.temp && $scope.datos.temp.id ) {
        $scope.datos.origenes = original;
      } else {
        delete $scope.datos.temp;
      }
      $scope.datos.mostrarForm = false;
    }
  };

} //ctrl
