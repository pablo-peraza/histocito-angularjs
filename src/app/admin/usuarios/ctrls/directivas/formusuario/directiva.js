"use strict";

module.exports = cisFormUsuario;

function cisFormUsuario() {
  return {
    restrict: "A",
    require: "?cisCapturarTeclado",
    templateUrl: "admin/usuarios/ctrls/directivas/formusuario/plantilla.html",
    scope: {
      modelo: "=",
      editando: "=",
      cargando: "=",
      onChange: "&?",
      soloMedicos: "@?"
    },
    link: function( scope, elem, attr, cisCapturarTecladoCtrl ) {
      if ( cisCapturarTecladoCtrl ) {
        scope.tecla = attr.cisCapturarTeclado * 1;
        scope.hacer = attr.hacer;
      }
    },
    controller: "cisFormUsuarioCtrl"
  };
}
