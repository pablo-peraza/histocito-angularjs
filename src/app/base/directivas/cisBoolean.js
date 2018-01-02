"use strict";
module.exports = cisBoolean;

cisBoolean.$inject = [ "$timeout" ];
function cisBoolean( $timeout ) {
  return {
    restrict: "A",
    require: [ "ngModel", "?cisCapturarTeclado" ],
    scope: {
      inhabilitar: "=",
      relacionado: "=?"
    },
    templateUrl: "base/htmls/boolean.html",
    link: function( scope, elem, attr, controles ) {
      var ngModelCtrl = controles[0];
      var cisCapturarTecladoCtrl = controles[1];
      if ( cisCapturarTecladoCtrl ) {
        cisCapturarTecladoCtrl.init( elem.find( "button" ),
         attr.cisCapturarTeclado * 1, attr.hacer );
      }

      if ( scope.$eval( attr.focus ) ) {
        elem.find( "button" )[0].focus();
      }

      ngModelCtrl.$formatters.push( function( modelValue ) {
        return modelValue;
      } );

      ngModelCtrl.$parsers.push( function( viewValue ) {
        return viewValue;
      } );

      ngModelCtrl.$render = function() {
        scope.modelo = ngModelCtrl.$viewValue || false;
      };

      function hacer( bool ) {
        if ( !scope.inhabilitar ) {
          scope.modelo = bool;
          ngModelCtrl.$setViewValue( scope.modelo );
          if ( scope.relacionado && scope.modelo === false ) {
            delete scope.relacionado;
          }
        }
      } //function
      scope.cambiar = function() {
        hacer( !scope.modelo );
      };

      function aplicar( bool ) {
        scope.$apply( function() {
          scope.modelo = bool;
          hacer( bool );
        } );
      } //function

      $timeout( function() {
        if ( _.isUndefined( ngModelCtrl.$viewValue ) ) {
          hacer( false );
        }
      }, 150 );

      elem.find( "button" ).on( "keydown keypress", function( event ) {
        if ( !scope.inhabilitar ) {
          switch ( event.which ) {
            case 32: //espacio
              aplicar( !scope.modelo );
              event.preventDefault();
              break;
          }
        }
      } );
    }
  };
}
