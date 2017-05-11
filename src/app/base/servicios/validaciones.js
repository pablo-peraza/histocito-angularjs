"use strict";

module.exports = Validaciones;

Validaciones.$inject = [ "$auth" ];

function Validaciones( $auth ) {
  Validaciones.dejarPasar = dejarPasar;
  return Validaciones;

  function dejarPasar( params, nombrePermisos ) {
    var permisos = $auth.getPayload().permisos[nombrePermisos];
    //if ( !params.id && permisos.crear ) {
    //  return true;
    //}
    //if ( params.id && params.editar === "true" && permisos.editar ) {
    //  return true;
    //}
    //if ( params.id && ( !params.editar || params.editar === "false" ) && permisos.ver ) {
    //  return true;
    //}
    //return false;
    return ( !params.id && permisos.crear ) ||  // para crear
      ( params.id && params.editar === "true" && permisos.editar ) || // para editar
      ( params.id && ( !params.editar || params.editar === "false" ) && permisos.ver ); // para ver
  }
}
