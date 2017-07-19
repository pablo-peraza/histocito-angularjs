"use strict";

module.exports = cisTecla;

cisTecla.$inject = [ "$window" ];
function cisTecla( $window ) {
  return {
    restrict: "A",
    template: "<kbd>{{combo}}</kbd> <label class='label label-{{tipo}}''>{{accion}}</label>",
    link: function( scope, elem, attr ) {

      function symbolize( combo ) {
        var map = {
          command: "⌘",
          shift: "⇧",
          left: "←",
          right: "→",
          up: "↑",
          down: "↓",
          enter: "↩",
          backspace: "⌫"
        };
        combo = combo.split( "+" );

        for ( var i = 0; i < combo.length; i = i + 1 ) {

          // try to resolve command / ctrl based on OS:
          if ( combo[i] === "mod" ) {
            if ( $window.navigator && $window.navigator.platform.indexOf( "Mac" ) >= 0 ) {
              combo[i] = "command";
            } else {
              combo[i] = "ctrl";
            }
          }

          combo[i] = map[combo[i]] || combo[i];
        }

        return combo.join( " + " );
      } //symbolize
      scope.combo = symbolize( attr.cisTecla );
      scope.tipo = attr.tipo;
      scope.accion = attr.accion;
    } //link
  };
}
