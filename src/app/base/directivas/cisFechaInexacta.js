"use strict";

module.exports =  cisFechaInexacta;
var formato = "YYYY-MM-DDTHH:mm:ss.SSSZ";

function cisFechaInexacta() {
  return {
    restrict: "A",
    replace: true,
    templateUrl: "base/htmls/fechainexacta.html",
    require: "?ngModel",
    scope: {
      inhabilitar: "=ngDisabled",
      requerido: "=?ngRequired"
    },
    link: link
  };
} //cisFechaInexacta

function limpiar( val ) {
  if ( val ) {
    var temp = val.toString().replace( /[\D]+/g, "" ) * 1;
    return temp;
  }
  return val;
}

function generar( ano, mes, dia ) {
  return moment( {
    year: ano,
    month: mes,
    day: dia
  } );
} //generar

function link( scope, elem, atr, ngModelCtrl ) {
  function descomponer( fecha ) {
    if ( !fecha ) {
      return undefined;
    }
    return {
      ano: fecha.year(),
      mes: fecha.month() + 1,
      dia: fecha.date()
    };
  } //descomponer

  scope.max = atr.max ? moment( atr.max, formato ) : undefined;
  scope.min = atr.min ? moment( atr.min, formato ) : undefined;

  scope.label = atr.label;
  var anoE = angular.element( elem.find( "input" )[0] );
  var mesE = angular.element( elem.find( "input" )[1] );
  var diaE = angular.element( elem.find( "input" )[2] );

  function validar() {
    if ( scope.requerido ) {
      ngModelCtrl.$setValidity( "required", !_.isUndefined( ngModelCtrl.$modelValue ) );
    }
    ngModelCtrl.$setValidity( "fechaInvalida", moment( ngModelCtrl.$modelValue ).isValid() );
    if ( scope.min ) {
      ngModelCtrl.$setValidity( "fechaMinima", !moment( ngModelCtrl.$modelValue )
      .isBefore( scope.min ) );
    }
    if ( scope.max ) {

      ngModelCtrl.$setValidity( "fechaMaxima", !moment( ngModelCtrl.$modelValue )
      .isAfter( scope.max ) );
    }
    if ( scope.anoMin ) {
      ngModelCtrl.$setValidity( "fechaMinima", moment( ngModelCtrl.$modelValue )
      .isBefore( scope.min ) );
    }
  }
  scope.$on( "show-errors-check-validity", function( e ) {
    validar();
  } );
  scope.$on( "show-errors-reset", function( e ) {
    if ( scope.requerido ) {
      ngModelCtrl.$setValidity( "required", true );
    }
    ngModelCtrl.$setValidity( "fechaInvalida", true );
    if ( scope.min ) {
      ngModelCtrl.$setValidity( "fechaMinima", true );
    }
    if ( scope.max ) {
      ngModelCtrl.$setValidity( "fechaMaxima", true );
    }
    ngModelCtrl.$setPristine();
  } );

  function init() {
    if ( fechaInicial ) {
      ngModelCtrl.$setViewValue( descomponer( fechaInicial ) );
      scope.ano = ngModelCtrl.$viewValue.ano;
      scope.mes = ngModelCtrl.$viewValue.mes;
      scope.dia = ngModelCtrl.$viewValue.dia;
    }
  } //init()
  init();

  if ( ngModelCtrl ) {
    var fechaInicial = ngModelCtrl.$modelValue ? moment( ngModelCtrl.$modelValue ) : undefined;
    ngModelCtrl.$render = function() {
      if ( ngModelCtrl.$viewValue ) {
        scope.ano = ngModelCtrl.$viewValue.ano;
        scope.mes = ngModelCtrl.$viewValue.mes;
        scope.dia = ngModelCtrl.$viewValue.dia;
      } else {
        delete scope.ano;
        delete scope.mes;
        delete scope.dia;
      }
    };
    ngModelCtrl.$formatters.push( descomponer );
    ngModelCtrl.$formatters.push( function( fecha ) {
      if ( typeof fecha === "string" ) {
        return moment( fecha, formato );
      }
      return fecha;
    } );

    ngModelCtrl.$parsers.push( function( viewValue ) {
      return viewValue ? generar( viewValue.ano, viewValue.mes - 1, viewValue.dia ) : undefined;
    } );
    scope.$watch( "ano + mes + dia", function( ano, mes, dia ) {
      if ( scope.ano || scope.mes || scope.dia ) {
        ngModelCtrl.$setViewValue( {
          ano: scope.ano,
          mes: scope.mes,
          dia: scope.dia
        } );
      }
      validar();
    } );
  } //if

} //link
