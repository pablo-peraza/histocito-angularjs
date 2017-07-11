"use strict";

module.exports = ProcedimientosCtrl;

ProcedimientosCtrl.$inject = [
  "$rootScopeScope",
  "$scope",
  "$timeout",
  "procedimientos",
  "dimensiones",
  "elementoActual",
  "Alertas",
  "hotkeys",
  "Procedimientos"
];
function ProcedimientosCtrl( $rootScope, $scope, $timeout, procedimientos, dimensiones,
  elementoActual, Alertas, hotkeys, Procedimientos ) {

  function configurarTeclado( $scope, hotkeys, $timeout ) {
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
        combo: "mod+return",
        description: "Guardar",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $timeout( function() {
            document.getElementById( "guardarProc" ).click();
          }, 50 );
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
  configurarTeclado( $scope, hotkeys, $timeout );
  $scope.datos = {
    procedimientos: procedimientos,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };

  $scope.vacio = _.isEmpty;
  $scope.filtrar = filtrar;
  $scope.aplicarDimension = aplicarDimension;
  $scope.cargarMas = cargarMas;
  $scope.buscar = buscar;
  $scope.guardar = guardar;
  $scope.cancelar = cancelar;
  $scope.editar = editar;

  //definiciones

  function editar( cat ) {
    if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) ) {
      original = angular.copy( $scope.datos.procedimientos.lista );
      $scope.datos.temp = cat;
    }
  } //function

  function cancelar() {
    if ( !$scope.datos.cargando ) {
      $scope.$emit( "show-errors-reset" );
      if ( $scope.datos.temp && $scope.datos.temp.id ) {
        $scope.datos.procedimientos.lista = original;
        original = void 0;
      }
      delete $scope.datos.temp;
    }
  } //function

  function guardar( cat, form ) {
    console.debug( form.$valid, form );

    function recargar() {
      $timeout( function() {
        delete $scope.datos.filtro;
        $scope.buscar();
      }, 1000 );
    } //recargar

    function ok( resp ) {
      $scope.cancelar( form );
      Alertas.agregar( resp.status );
      delete $scope.datos.temp;
      $scope.$broadcast( "show-errors-reset" );
      form.$setPristine();
      recargar();
    } //ok
    function error( resp ) {
      console.error( resp );
      if ( resp.status === 409 ) {
        Alertas.agregar( resp.status, "Ya existe un procedimiento con los mismos parámetros" );
      } else {
        Alertas.agregar( resp.status );
      }
    }

    function ultima() {
      $scope.datos.cargando = false;
      $scope.datos.form = false;
    }
    $scope.$emit( "show-errors-check-validity" );
    if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) && !$scope.datos.cargando &&
    form.$valid ) {
      $scope.datos.cargando = true;
      Procedimientos.procedimientos.guardar( cat ).then( ok, error ).finally( ultima );
    }
  } //function

  function filtrar( procesarResultado ) {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.procedimientos = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function ultima() {
      $scope.datos.cargando = false;
    }
    Procedimientos.procedimientos.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro,
      $scope.filtros ).then( ok, error )["finally"]( ultima );
  } //function

  function aplicarDimension( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  } //function

  function cargarMas() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.procedimientos.lista.concat( res.lista );
      return res;
    } );
  } //function

  function buscar() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      Procedimientos.procedimientos.etiquetas( res.dimensiones );
      return res;
    } );
  } //function

} //ctrl
