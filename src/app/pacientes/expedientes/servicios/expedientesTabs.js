"use strict";

module.exports = ExpedientesTabs;

ExpedientesTabs.$inject = [ "Tabs" ];
function ExpedientesTabs( Tabs ) {
  var funciones = {};
  var tabsBase = [ {
    titulo: "Paciente",
    icono: "fa-archive",
    contenido: "paciente.html",
    activo: true
  }, {
    titulo: "Datos de Contacto",
    icono: "fa-phone-square",
    contenido: "contacto.html"
  }, {
    titulo: "Historial de Muestras",
    icono: "fa-flask",
    contenido: "historial.html"
  } ];
  funciones.actual = Tabs.actual;

  funciones.generar = function( id ) {
    return id ? angular.copy( tabsBase ) : Tabs.rechazar( angular.copy( tabsBase ),
    "Historial de Muestras" );
  };

  return funciones;
}
