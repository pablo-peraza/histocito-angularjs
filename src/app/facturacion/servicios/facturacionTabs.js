"use strict";

module.exports = FacturacionTabs;

FacturacionTabs.$inject = [ "Tabs" ];
function FacturacionTabs( Tabs ) {
  var funciones = {};
  var tabsBase = [ {
    titulo: "Paso 1. Seleccionar",
    icono: "fa-check-circle",
    contenido: "facturacion/htmls/listaMuestras.html",
    activo: true
  }, {
    titulo: "Paso 2. Agrupar",
    icono: "fa-wrench",
    contenido: "facturacion/htmls/grupos.html",
    inhabilitado: true
  }, {
    titulo: "Paso 3. Prevista",
    icono: "fa-plug",
    contenido: "facturacion/htmls/prevista.html",
    inhabilitado: true
  } ];
  funciones.actual = Tabs.actual;
  funciones.siguiente = Tabs.siguiente;
  funciones.anterior = Tabs.anterior;

  funciones.generar = function() {
    return angular.copy( tabsBase );
  };

  return funciones;
}
