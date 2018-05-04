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
      function ok( resp ) {
        return resp.data.lista;
      }
      if ( resp.data.cantidad == 0 ) {
        var texto = resp.config.params.texto;
        var regex = /\d{9}/g;
        if ( regex.test( texto ) ) {
          return ExpedientesREST.buscarWebService( texto ).then( ok, error );
        } else {
          Alertas.agregar( "La expresión no corresponde a un número de cédula para " +
          "buscar en los registros del Servicio Web." );
        }
      } else {
        return resp.data.lista;
      }
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
      if ( !_.isEmpty( item.id ) ) {
        ExpedientesREST.obtener( item.id ).then( ok, error ).finally( ultimo );
      } else {
        ok( { "data": {
          "ficha": item
        } } );
        ultimo();
      }
    };
    $scope.buscar = function( texto ) {
      return ExpedientesREST.buscarNuevo( 0, 20, texto ).then( ok, error ).finally( ultima );
    };
  };
} //link
