"use strict";

module.exports = Configuracion;
Configuracion.$inject = [ "$compileProvider" ];
function Configuracion( $compileProvider ) {
  $compileProvider.aHrefSanitizationWhitelist( /^\s*\w*/ );
}
