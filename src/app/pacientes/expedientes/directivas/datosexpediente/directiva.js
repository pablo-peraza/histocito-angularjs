"use strict";

module.exports = cisDatosExpediente;

function cisDatosExpediente() {
  return {
    restrict: "A",
    require: "ngModel",
    templateUrl: "pacientes/expedientes/directivas/datosexpediente/plantilla.html",
    scope: {
      editando: "=",
      cargando: "=ngDisabled",
      fur: "=?"
    },
    link: link,
    controller: "cisDatosExpedienteCtrl"
  };
} //cisDatosExpediente

function link( $scope, elem, atr, ngModelCtrl ) {
  $scope.$watch( function() {
    return ngModelCtrl.$modelValue;
  }, function( val ) {
    if ( val && val.ficha && val.ficha.cedula && !esNacional( val.ficha.cedula ) ) {
      $scope.temp.extranjero = true;
    }
    $scope.modelo = ngModelCtrl.$modelValue;
    if ( $scope.modelo && !$scope.modelo.ficha ) {
      $scope.modelo.ficha = {
        sexo: encontrarSeleccion( $scope.sexos, "Femenino" )
      };
    }
    if ( $scope.modelo && !$scope.modelo.fichaMedica ) {
      $scope.modelo.fichaMedica = {
        ago: initAGO()
      };
    }
    if ( !$scope.modelo ) {
      $scope.modelo = {};
    }
  } );
  $scope.$watch( "modelo", function( val ) {
    ngModelCtrl.$setViewValue( val );
  } );
} //link

function esNacional( cedula ) {
  return /^\d{9}$/.test( cedula );
}

function encontrarSeleccion( selecciones, aencontrar ) {
  if ( selecciones ) {
    return selecciones[_.indexOf( selecciones, aencontrar )];
  }
} //encontrarSeleccion

function initAGO() {
  return {
    menopausia: {
      activo: false
    },
    embarazo: {
      activo: false
    },
    contraceptivo: {
      activo: false
    },
    gestas: 0,
    abortos: 0,
    paras: 0,
    cesareas: 0
  };
} //init
