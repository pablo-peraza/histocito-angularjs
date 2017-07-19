"use strict";

module.exports = diagnosticoBiopsiaCtrl;

function plantilla( nombre ) {
  return "pacientes/diagnosticos/directivas/biopsias/htmls/" + nombre + ".html";
} //function

function tabs() {
  return [ {
    titulo: "Descripción Macroscópica",
    icono: "fa-th-large",
    contenido: plantilla( "macroscopica" )
  }, {
    titulo: "Descripción Microscópica",
    icono: "fa-th",
    contenido: plantilla( "microscopica" )
  }, {
    titulo: "Diagnóstico",
    icono: "fa-stethoscope",
    contenido: plantilla( "diagnostico" )
  } ];
}

var configurarTeclado = require( "../../modelos/configurarTeclado.js" );

diagnosticoBiopsiaCtrl.$inject = [ "$scope", "hotkeys", "Tabs" ];
function diagnosticoBiopsiaCtrl( $scope, hotkeys, Tabs ) {
  configurarTeclado( $scope, hotkeys );
  if ( _.isUndefined( $scope.modelo ) ) {
    $scope.modelo = {};
  }
  $scope.tabs = tabs();

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
