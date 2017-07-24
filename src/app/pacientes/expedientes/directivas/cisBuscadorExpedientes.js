"use strict";

module.exports = cisBuscadorExpedientes;

cisBuscadorExpedientes.$inject = [ "ExpedientesREST", "Alertas" ];
function cisBuscadorExpedientes( ExpedientesREST, Alertas ) {
  return {
    restrict: "A",
    templateUrl: "pacientes/expedientes/htmls/buscadorExpedientes.html",
    require: "ngModel",
    link: link( ExpedientesREST, Alertas ),
    scope: {
      cargando: "="
    }
  };
} //cisBuscadorExpedientes

function link( ExpedientesREST, Alertas ) {
  return function( $scope, elem, atr, ngModelCtrl ) {
    function ok( resp ) {
      return resp.data.lista;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
      return [];
    }

    function ultima() {
      $scope.buscando = false;
    }
    $scope.$on( "show-errors-reset", $scope.limpiar );
    $scope.limpiar = function() {
      delete $scope.paciente;
      ngModelCtrl.$setViewValue( null );
    };
    $scope.$watch( function() {
      return ngModelCtrl.$modelValue;
    }, function( newValue ) {
      if ( !newValue ) {
        delete $scope.paciente;
      }
    } );
    $scope.enSeleccion = function( item, modelo, label ) {
      $scope.cargando = true;

      function ok( resp ) {
        ngModelCtrl.$setViewValue( resp.data );
        delete $scope.paciente;
      }

      function ultimo() {
        $scope.cargando = false;
      }
      ExpedientesREST.obtener( item.id ).then( ok, error ).finally( ultimo );
    };
    $scope.buscar = function( texto ) {
      return ExpedientesREST.buscar( 0, 20, texto ).then( ok, error ).finally( ultima );
    };
  };
} //link
