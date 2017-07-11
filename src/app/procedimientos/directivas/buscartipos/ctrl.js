"use strict";

module.exports = cisBuscarTiposCtrl;

cisBuscarTiposCtrl.$inject = [ "$scope", "Procedimientos", "Alertas" ];
function cisBuscarTiposCtrl( $scope, Procedimientos, Alertas ) {
  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  }

  function ultima() {
    $scope.buscando = false;
  }

  function aDimension( cat ) {
    if ( cat === "Citología" || cat === "Biopsia" ) {
      return cat.toLowerCase();
    }
    if ( cat === "Citología no ginecológica" ) {
      return "noginecológica";
    }
    if ( cat === "Patología molecular" ) {
      return "patología";
    }
  } //aDimension

  function dimensiones() {
    if ( $scope.categoria ) {
      return [ {
        "categoria": [ aDimension( $scope.categoria ) ]
      } ];
    }
    return [];
  } //dimensiones

  $scope.buscar = function( texto ) {
    $scope.buscando = true;

    function ok( resp ) {
      return resp.data.lista;
    }
    return Procedimientos.tipos.buscar( 0, 10, texto, dimensiones() )
    .then( ok, error ).finally( ultima );
  };

  $scope.enSeleccion = function( item ) {
    $scope.buscando = true;

    function ok( resp ) {
      $scope.modelo = resp.data;
    }
    Procedimientos.tipos.obtener( item ).then( ok, error ).finally( ultima );
  };
  if ( _.isString( $scope.modelo ) ) {
    $scope.enSeleccion( $scope.modelo );
  }
}
