"use strict";

module.exports = PerfilTabs;

PerfilTabs.$inject = [ "Tabs" ];
function PerfilTabs( Tabs ) {
  var funciones = {};
  var tabsBase = [ {
    titulo: "Datos",
    icono: "fa-archive",
    contenido: "perfil/htmls/datos.html"
  }, {
    titulo: "Contraseña",
    icono: "fa-lock",
    contenido: "perfil/htmls/clave.html"
  } ];
  funciones.actual = Tabs.actual;
  funciones.siguiente = Tabs.siguiente;
  funciones.anterior = Tabs.anterior;

  funciones.generar = function() {
    return angular.copy( tabsBase );
  };
  return funciones;
} //tabs
