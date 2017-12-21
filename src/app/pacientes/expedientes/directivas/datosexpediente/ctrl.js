"use strict";

module.exports = cisDatosExpedienteCtrl;

cisDatosExpedienteCtrl.$inject = [ "$scope", "$rootScope", "Selecciones", "Fechas" ];
function cisDatosExpedienteCtrl( $scope, $root, Selecciones, Fechas ) {
  $scope.patron = function( extranjero ) {
    return extranjero ? /[\d\w]+/ : /^\d{9}$/;
  };

  $scope.minimo = moment()
    .subtract( 100, "y" );
  $scope.hoy = moment()
    .endOf( "day" );
  $scope.eliminarAGO = function( sexo ) {
    if ( sexo === "Masculino" ) {
      delete $scope.modelo.fichaMedica.ago;
    } else {
      $scope.modelo.fichaMedica.ago = initAGO();
    }
  };

  $scope.calcularEdad = function( edad ) {
    $scope.modelo.ficha.fechaNacimiento = moment()
      .subtract( edad, "y" );
  };

  Selecciones.sexo()
    .then( function( resp ) {
      $scope.sexos = resp.lista;
      if ( !$scope.modelo.ficha.sexo ) {
        $scope.modelo.ficha.sexo = encontrarSeleccion( $scope.sexos, "Femenino" );
      }
    } );
  $scope.agregarGesta = function( bool ) {
    $scope.embarazar( bool );
    if ( bool ) {
      $scope.modelo.fichaMedica.ago.gestas += 1;
    } else {
      $scope.modelo.fichaMedica.ago.gestas -= 1;
    }
  };

  $scope.menopausar = function( bool ) {
    if ( bool ) {
      $scope.$broadcast( "show-errors-reset" );
      $scope.modelo.fichaMedica.ago.embarazo.activo = false;
      delete $scope.modelo.fichaMedica.ago.embarazo.semanas;
      $scope.modelo.fichaMedica.ago.contraceptivo.activo = false;
      delete $scope.modelo.fichaMedica.ago.contraceptivo.tipo;
      delete $scope.modelo.fichaMedica.ago.fur;
    }
  };
  $scope.embarazar = function( bool ) {
    if ( bool ) {
      $scope.modelo.fichaMedica.ago.contraceptivo.activo = false;
      delete $scope.modelo.fichaMedica.ago.contraceptivo.tipo;
      $scope.modelo.fichaMedica.ago.menopausia.activo = false;
      delete $scope.modelo.fichaMedica.ago.menopausia.fecha;
    }
  }; //embarazar

  function calcularEmbarazo() {
    if ( $scope.modelo.embarazo && $scope.modelo.embarazo.activo ) {
      var semanas = calcularSemanasEmbarazo(
        Fechas.deServidor( $scope.modelo.fechaActualizacion ) );
      if ( ( semanas + $scope.modelo.embarazo.semanas ) > 43 ) {
        delete $scope.modelo.fichaMedica.ago.embarazo;
        $scope.modelo.fichaMedica.paras += 1;
      } else {
        $scope.modelo.embarazo.semanas = $scope.modelo.embarazo.semanas + semanas;
      }
    } //if
  } //calcularEmbarazo

  var fun = $scope.$watch( "modelo", function( val ) {
    if ( val && val.id ) {
      calcularEmbarazo();
      fun();
    }
  } );

} //cisDatosExpedienteCtrl

function calcularSemanasEmbarazo( ultimaActualizacion ) {
  return moment()
    .diff( ultimaActualizacion, "weeks" );
} //function

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
