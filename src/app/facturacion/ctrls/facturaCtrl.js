"use strict";

module.exports = FacturaCtrl;

FacturaCtrl.$inject = [
  "$scope",
  "factura",
  "Facturas",
  "Tabs",
  "hotkeys",
  "$location",
  "Alertas",
  "$timeout",
  "$modal"
];
function FacturaCtrl( $scope, factura, Facturas, Tabs, hotkeys, $location, Alertas, $timeout,
  $modal ) {
  $scope.datos = {
    factura: factura
  };

  function configurarTeclado( $scope, hotkeys ) {
    hotkeys.bindTo( $scope )
      .add( {
        combo: "mod+left",
        description: "Paso Anterior",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.anterior();
        }
      } )
      .add( {
        combo: "mod+right",
        description: "Paso Siguiente",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.siguiente();
        }
      } );
  }

  if ( $scope.datos.factura !== 404 ) {
    $scope.tabs = Facturas.tabsFacturas.generar();
    $scope.total = Facturas.logica.total;
    configurarTeclado( $scope, hotkeys );
  }

  function error( resp ) {
    console.debug( resp );
    Alertas.agregar( resp.status );
  }

  $scope.registrarPago = function( pago, form ) {
    $scope.$emit( "show-errors-check-validity" );

    function ok( resp ) {
      $scope.datos.factura = resp.data;
      Alertas.agregar( resp.status, "Se ha registrado el pago correctamente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
      $scope.cancelar( form );
    }
    if ( form.$valid && !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      var temp = Facturas.logica.generarPago( pago.fecha, pago.monto, pago.consecutivo );
      console.debug( temp );
      Facturas.rest.pagar( $scope.datos.factura.id, temp )
        .then( ok, error )
        .finally( finalmente );
    }
  };

  $scope.modalConsecutivo = function() {
    console.debug( "Prueba" );
    modal()
      .result.then(
        function( res ) {
          $scope.datos.factura.consecutivo = res;
        } );
  };

  $scope.eliminarPago = function( pago ) {
    function ok( resp ) {
      $scope.datos.factura.pagos = _.without( $scope.datos.factura.pagos, pago );
      Alertas.agregar( resp.status, "Se ha eliminado el pago correctamente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Facturas.rest.eliminarPago( $scope.datos.factura.id, pago )
        .then( ok, error )
        .finally( finalmente );
    }
  };

  $scope.totalPagos = Facturas.logica.totalPagos;
  $scope.cancelar = function( form ) {
    $scope.$emit( "show-errors-reset" );
    delete $scope.datos.nuevo;
    $scope.datos.mostrarForm = false;
  };

  $scope.anular = function( id ) {
    function ok( resp ) {
      $timeout( function() {
        $location.path( "/inicio/facturacion/facturas" );
        Alertas.agregar( resp.status );
      }, 700 );
    }

    function error( resp ) {
      Alertas.agregar( resp.status );
      console.debug( resp );
      $scope.datos.cargando = false;
    }
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Facturas.rest.borrar( id )
        .then( ok, error );
    }
  };

  $scope.siguiente = function() {
    $scope.tabs = Tabs.siguiente( $scope.tabs );
  };

  $scope.anterior = function() {
    $scope.tabs = Tabs.anterior( $scope.tabs );
  };
  $scope.tabActual = function() {
    return Tabs.actual( $scope.tabs );
  };

  function modal() {
    return $modal.open( {
      templateUrl: "consecutivo.html",
      controller: "ConsecutivoCtrl",
      backdrop: "static",
      resolve: {
        factura: function() {
          return $scope.datos.factura;
        }
      }
    } );
  } //modal
} //FacturaCtrl
