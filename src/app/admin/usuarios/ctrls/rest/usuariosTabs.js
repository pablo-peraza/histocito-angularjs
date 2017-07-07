"use strict";

module.exports = UsuariosTabs;

UsuariosTabs.$inject = [ "Tabs" ];
function UsuariosTabs( Tabs ) {
  var funciones = {};
  var precios = {
    titulo: "Lista de Precios",
    icono: "fa-money",
    contenido: "precios.html"
  };
  var muestras = {
    titulo: "Historial de Muestras",
    icono: "fa-flask",
    contenido: "admin/usuarios/htmls/muestras.html"
  };
  var tabsBase = [ {
      titulo: "Detalles del Usuario",
      icono: "fa-archive",
      contenido: "usuario.html",
      activo: true
    }, {
      titulo: "Datos de Contacto",
      icono: "fa-phone-square",
      contenido: "contacto.html"
    },
    precios, muestras
  ];
  funciones.actual = Tabs.actual;
  funciones.siguiente = Tabs.siguiente;
  funciones.anterior = Tabs.anterior;

  funciones.generar = function( tipoUsuario ) {
    return tipoUsuario === "Médico" ? angular.copy( tabsBase ) :
      Tabs.rechazar( Tabs.rechazar( angular.copy( tabsBase ), "Lista de Precios" ),
      "Historial de Muestras" );
  };

  function esListaPrecios( tab ) {
    return tab.titulo === "Lista de Precios" || tab.titulo === "Historial de Muestras";
  } //esListaPrecios

  function quitarPrecios( tabs ) {
    return _.reject( tabs, esListaPrecios );
  } //quitarAgo

  function agregarPrecios( tabs ) {
    if ( _.find( tabs, esListaPrecios ) ) {
      return tabs;
    } else {
      var temp = angular.copy( tabs );
      temp.push( precios );
      temp.push( muestras );
      return temp;
    }
  } //agregarAgo

  funciones.gestionTipo = function( tabs, esMedico ) {
    return esMedico ? agregarPrecios( tabs ) : quitarPrecios( tabs );
  };

  return funciones;
}
