"use strict";

module.exports = cisBuscadorMedicos;

cisBuscadorMedicos.$inject = [ "Usuarios", "Alertas" ];
function cisBuscadorMedicos( Usuarios, Alertas ) {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/buscadorMedicos.html",
    require: "ngModel",
    link: linkBuscadorMedicos( Usuarios, Alertas ),
    scope: {
      cargando: "=",
      exec: "=?"
    }
  };
} //cisBuscadorMedicos

function linkBuscadorMedicos( Usuarios, Alertas ) {
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
      if ( $scope.exec ) {
        $scope.exec();
      }
      delete $scope.medico;
      ngModelCtrl.$setViewValue( null );
    };
    $scope.$watch( function() {
      return ngModelCtrl.$modelValue;
    }, function( newValue ) {
      if ( !newValue ) {
        delete $scope.medico;
      }
    } );
    $scope.enSeleccion = function( item ) {
      $scope.cargando = true;

      function ok( resp ) {
        delete $scope.medico;
        ngModelCtrl.$setViewValue( resp.data );
      }

      function ultimo() {
        $scope.cargando = false;
      }
      Usuarios.obtener( item.id ).then( ok, error ).finally( ultimo );
    };
    $scope.buscar = function( texto ) {
      var dim = [ {
        tipoUsuario: [ "médico" ]
      } ];
      return Usuarios.buscar( 0, 20, texto, dim ).then( ok, error ).finally( ultima );
    };
  };
} //linkBuscadorMedicos
