"use strict";

module.exports = cisGaleriaCtrl;

function subidasNuevas( subidas, mostradas ) {
  return _.filter( subidas, function( subida ) {
    return _.isUndefined( _.find( mostradas, function( mostrada ) {
      return mostrada.id === subida;
    } ) );
  } );
}

cisGaleriaCtrl.$inject = [ "$scope", "$modal", "Imagenes", "Alertas" ];

function cisGaleriaCtrl( $scope, $modal, Imagenes, Alertas ) {
  $scope.vacio = _.isEmpty;
  var isPrivado = esPrivado( $scope.privado ) ? true : $scope.privado;

  function previstas( ids ) {
    $scope.cargando = true;

    function ok( resp ) {
      if ( $scope.imagenes ) {
        $scope.imagenes.lista = _.union( $scope.imagenes.lista, resp.data.lista );
        $scope.imagenes.cantidad = resp.data.cantidad + $scope.imagenes.cantidad;
      } else {
        $scope.imagenes = resp.data;
      }
    } //ok
    function error( resp ) {
      Alertas.agregar( resp.status );
    } //error
    if ( isPrivado ) {
      Imagenes.previstas( ids ).then( ok, error ).finally( function() {
        $scope.cargando = false;
      } );
    } else {
      Imagenes.previstasPublicas( ids ).then( ok, error ).finally( function() {
        $scope.cargando = false;
      } );
    }
  } //previstas

  $scope.$watchCollection( "modelo", function( val ) {
    if ( val && !_.isEmpty( val ) ) {
      if ( !$scope.unico ) {
        var nuevas = subidasNuevas( val, $scope.imagenes ? $scope.imagenes.lista : undefined );
        previstas( nuevas );
      } else {
        previstas( [ val ] );
      } //else
    }
  } );

  $scope.abrir = function( imagen ) {
    $modal.open( {
      templateUrl: "lightbox.html",
      controller: "LightBoxCtrl",
      size: "lg",
      resolve: {
        imagen: function() {
          return imagen;
        }
      } //resolve
    } );
  }; //abrir
}

function esPrivado( privado ) {
  return ( _.isUndefined( privado ) || _.isNull( privado ) );
}
