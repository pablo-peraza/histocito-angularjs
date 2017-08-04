"use strict";
module.exports = cisDimensionesCtrl;

cisDimensionesCtrl.$inject = [ "$scope" ];
function cisDimensionesCtrl( $scope ) {
  $scope.vacio = _.isEmpty;
  $scope.modelo = {};

  this.init = function( dimensiones, eliminar ) {
    $scope.eliminarDimensiones = function( dims ) {
      return _.omit( dims, eliminar );
    };
    $scope.modelo.dimensiones = $scope.eliminarDimensiones( dimensiones );
    $scope.modelo.llaves = _.keys( $scope.eliminarDimensiones( dimensiones ) );
  };

  function actualizar( nuevas ) {
    function encontrar( lista, valor ) {
      return _.find( lista, function( v ) {
        return v.nombre === valor.nombre;
      } );
    } //encontrar
    function cantidadesActualizadas( original, nuevas, llave ) {
      return _.map( original[llave], function( obj ) {
        var encontrado = encontrar( nuevas[llave], obj );
        obj.cantidad = encontrado ? encontrado.cantidad : 0;
        return obj;
      } );
    } //function
    function agregarPosiblesNuevasDimensiones() {
      _.forEach( _.keys( nuevas ), function( llave ) {
        if ( !$scope.modelo.dimensiones[llave] ) {
          $scope.modelo.dimensiones[llave] = nuevas[llave];
          $scope.modelo.llaves = _.keys( $scope.modelo.dimensiones );
        } else {
          var nuevasDim = _.filter( nuevas[llave], function( obj ) {
            return !encontrar( $scope.modelo.dimensiones[llave], obj );
          } );
          $scope.modelo.dimensiones[llave] = _.union( $scope.modelo.dimensiones[llave], nuevasDim );
        }
      } );
    } //agregarPosiblesNuevasDimensiones

    agregarPosiblesNuevasDimensiones();
    _.forEach( $scope.modelo.llaves, function( llave ) {
      var temp = cantidadesActualizadas( $scope.modelo.dimensiones, nuevas, llave );
      $scope.modelo.dimensiones[llave] = temp;
    } );
    $scope.modelo.dimensiones = $scope.eliminarDimensiones( $scope.modelo.dimensiones );
    $scope.modelo.llaves = _.keys( $scope.eliminarDimensiones( $scope.modelo.dimensiones ) );

  } //actualizar

  function filtrarDimenciones() {
    var dimensionesActivas = $scope.activas();
    var activarFiltros = _.find( dimensionesActivas, function( o ) {
      if ( o.estado !== undefined ) {
        return o.estado[0] === "diagnostico";
      } else {
        return undefined;
      }
    } );
    if ( activarFiltros ) {
      $rootScope.activado = true;
    } else {
      $rootScope.activado = false;
    }
  } //filtrarDimenciones

  $scope.$watch( "actuales", function( val ) {
    if ( val ) {
      $scope.dimensiones = actualizar( val );
    } //if
  } );

  $scope.activas = function() {
    var mapeados = _.map( $scope.modelo.llaves, function( llave ) {
      var soloActivos = _.filter( $scope.modelo.dimensiones[llave], function( obj ) {
        return obj.activado === true;
      } );
      var temp = {};
      temp[llave] = _.pluck( soloActivos, "nombre" );
      return temp;
    } );
    var filtrados = _.filter( mapeados, function( obj ) {
      for ( var first in obj ) {break;}
      return !_.isEmpty( obj[first] );
    } );
    return filtrados;
  };

  $scope.cambiar = function( val ) {
    if ( !$scope.cargando ) {
      val.activado = !val.activado;
      $scope.onChange( {
        dimensiones: $scope.activas()
      } );
    }
    filtrarDimenciones();
  };
}
