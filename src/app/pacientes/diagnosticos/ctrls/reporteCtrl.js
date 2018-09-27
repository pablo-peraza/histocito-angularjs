"use strict";

module.exports = ReporteCtrl;

ReporteCtrl.$inject = [
  "$scope",
  "params",
  "isPrivado"
];
function ReporteCtrl( $scope, params, isPrivado ) {
  $scope.datos = {
    muestra: params.muestra,
    procedimiento: params.procedimiento,
    tipo: params.tipo,
    expediente: params.expediente,
    medico: params.medico,
    clinica: params.clinica,
    isPrivado: isPrivado
  };
  if ( params.patologo ) {
    $scope.datos.patologo = params.patologo;

    // if (params.patologo.firma && params.patologo.firma.imagen) {
    //   firmaPatologo(params.patologo.firma.imagen);
    // }
  }
  $scope.repetirTratamiento = function( modelo ) {
    var temp = [];
    if ( modelo.antiInflamatorio ) {
      temp.push( "Anti-inflamatorio" );
    }
    if ( modelo.hormonal ) {
      temp.push( "Hormonal local / Estrogenizar" );
    }
    if ( modelo.estrogenizar ) {
      temp.push( "Leer descripción" );
    }
    return _.reduce( temp, function( acum, val, i ) {
      return acum + " - " + ( i + 1 ) + ". " + val;
    }, "" );
  };
  $scope.lesion = function( tipo ) {
    switch ( tipo ) {
      case "Condiloma (VPH)":
        return "Lesión Intraepitelial de bajo grado con cambios compatibles asociados a infección por virus del papiloma humano.";
      case "Displasia leve NIC I":
        return "Lesión Intraepitelial de bajo grado. Displasia leve. NIC I.";
      case "Displasia moderada":
        return "Lesión Intraepitelial de alto grado. Displasia moderada. NIC II";
      case "Displasia Severa":
        return "Lesión Intraepitelial de alto grado. Displasia severa. NIC III";
      case "Carcinoma in situ":
        return "Lesión Intraepitelial de alto grado. Carcinoma in situ";
      case "De significado indeterminado ASC-US":
        return "Células escamosas atípicas de significado indeterminado (ASC-US)";
      case "A favor de LIE de Alto Grado ASC-H":
        return "Células escamosas atípicas a favor de lesión intraepitelial de alto grado (ASC-H)";
      default:
        return tipo;
    }
  };

  // function firmaPatologo(id) {
  //   function ok(resp) {
  //     $scope.datos.firmaPatologo = resp.data;
  //   } //ok
  //   function error(resp) {
  //     console.error(resp);
  //   } //error
  //   Imagenes.obtener(id).then(ok, error);
  // } //previstas
} //ctrl
