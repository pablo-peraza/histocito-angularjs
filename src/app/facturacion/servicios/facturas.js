"use strict";

module.exports = Facturas;

Facturas.$inject = [ "FacturacionTabs", "FacturacionLogica", "FacturasREST", "FacturasTabs" ];
function Facturas( FacturacionTabs, FacturacionLogica, FacturasREST, FacturasTabs ) {
  var funciones = {};
  funciones.tabs = FacturacionTabs;
  funciones.logica = FacturacionLogica;
  funciones.rest = FacturasREST;
  funciones.tabsFacturas = FacturasTabs;
  return funciones;
} //Facturas
