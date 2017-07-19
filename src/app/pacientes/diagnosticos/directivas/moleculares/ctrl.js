"use strict";

module.exports = diagnosticoMolecularCtrl;

function plantilla( nombre ) {
  return "pacientes/diagnosticos/directivas/moleculares/htmls/" + nombre + ".html";
} //function

function tabs() {
  return [ {
    titulo: "Resultado",
    icono: "fa-tasks",
    contenido: plantilla( "resultado" )
  }, {
    titulo: "Observaciones",
    icono: "fa-eye",
    contenido: plantilla( "observaciones" )
  } ];
}

var configurarTeclado = require( "../../modelos/configurarTeclado.js" );

diagnosticoMolecularCtrl.$inject = [ "$scope", "hotkeys", "Tabs" ];
function diagnosticoMolecularCtrl( $scope, hotkeys, Tabs ) {
  configurarTeclado( $scope, hotkeys );
  if ( _.isUndefined( $scope.modelo ) ) {
    $scope.modelo = {};
  }
  if ( _.isUndefined( $scope.modelo.observaciones ) ) {
    $scope.modelo.observaciones = "Los resultados de esta prueba deben ser interpretados junto a la información que posee su médico tras la evaluación y procedimientos realizados";
  }
  if ( _.isUndefined( $scope.modelo ) ) {
    $scope.modelo = {};
  }
  $scope.tabs = tabs();

  function mover( delta ) {
    var i = Tabs.actual( $scope.tabs );
    if ( i + delta < $scope.tabs.length ) {
      $scope.tabs[i + delta].activo = true;
    }
  } //mover

  $scope.siguiente = function() {
    $scope.tabs = Tabs.siguiente( $scope.tabs );
  };

  $scope.anterior = function() {
    $scope.tabs = Tabs.anterior( $scope.tabs );
  };
  $scope.tabActual = function() {
    return Tabs.actual( $scope.tabs );
  };
} //ctrl
