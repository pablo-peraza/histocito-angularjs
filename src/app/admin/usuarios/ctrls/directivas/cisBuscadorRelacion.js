"use strict";

module.exports = cisBuscadorRelacion;

var _ = require( "lodash" );

cisBuscadorRelacion.$inject = [ "Muestras", "Alertas", "RelacionesAPI" ];
function cisBuscadorRelacion( Muestras, Alertas, RelacionesAPI ) {
  return {
    restrict: "A",
    templateUrl: "admin/usuarios/ctrls/directivas/buscadorMedicos.html",
    require: "ngModel",
    link: linkBuscadorRelacion,
    scope: {
      cargando: "=",
      exec: "=?"
    }
  };

  function linkBuscadorRelacion( $scope, elem, atr, ngModelCtrl ) {
    function ok( resp ) {
      return resp.data.lista;
    }

    function error( resp ) {
      Alertas.agregar( resp.status );
      return [];
    }

    function ultima() {
      $scope.buscando = false;
    }

    function parsearRelacion( rel ) {
      var props = ["dueno", "medico", "clinica", "patologo", "histotecnologo", "citotecnologo"];
      props.forEach( function( p ) {
        if ( rel[p] ) {
          rel[p].id = rel[p]._id;
        }
      } );
      rel.medico.nombreCompleto = rel.medico.titulo + " " + rel.medico.nombre;
      rel.autorizados = _.map( rel.autorizados, function( aut ) {
        aut.id = aut._id;
        aut.nombreCompleto = aut.nombre + " " + aut.apellidos;
        aut.display = aut.nombreCompleto + " (" + aut.correo + ")";
        return aut;
      } );
      return rel;
    }
    $scope.$on( "show-errors-reset", $scope.limpiar );
    $scope.limpiar = function() {
      if ( $scope.exec ) {
        $scope.exec();
      }
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
        var modelValue = resp ? parsearRelacion( resp ) : null;
        ngModelCtrl.$setViewValue( modelValue );
      }

      function ultimo() {
        $scope.cargando = false;
      }
      RelacionesAPI.obtener( item.id ).then( ok, error ).finally( ultimo );
    };
    $scope.buscar = function( texto ) {
      return Muestras.buscarMedicos( 0, 20, texto ).then( ok, error ).finally( ultima );
    };
  };
} //cisBuscadorRelacion
