"use strict";

module.exports = MuestrasTabs;

function plantilla( nombre ) {
  return "pacientes/muestras/htmls/" + nombre + ".html";
}

MuestrasTabs.$inject = [ "Tabs" ];
function MuestrasTabs( Tabs ) {
  var funciones = {};
  var tabsBase = [ {
    titulo: "Muestra",
    icono: "fa-newspaper-o",
    contenido: plantilla( "encabezado" ),
    activo: true
  }, {
    titulo: "Paciente",
    icono: "fa-archive",
    contenido: plantilla( "paciente" )
  }, {
    titulo: "Historial",
    icono: "fa-ambulance",
    contenido: "historial.html"
  }, {
    titulo: "Clientes",
    icono: "fa-user-md",
    contenido: plantilla( "medico" )
  }, {
    titulo: "Equipo",
    icono: "fa-users",
    contenido: plantilla( "equipo" )
  }, {
    titulo: "Imágenes",
    icono: "fa-image",
    contenido: "imagenes.html"
  }, {
    titulo: "Observaciones",
    icono: "fa-pencil",
    contenido: "observaciones.html"
  }, {
    titulo: "Revisión",
    icono: "fa-eye",
    contenido: "revision.html"
  } ];
  funciones.actual = Tabs.actual;

  funciones.generar = function( id, medico ) {
    var tabs = medico ? Tabs.rechazar( Tabs.rechazar( angular.copy( tabsBase ), "Equipo" ),
    "Médico" ) : angular.copy( tabsBase );
    return id ? Tabs.rechazar( tabs, "Revisión" ) : Tabs.rechazar( tabs, "Imágenes" );
  };
  return funciones;
}
