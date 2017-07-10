"use strict";

module.exports = FacturasTabs;

FacturasTabs.$inject = [ "Tabs" ];
function FacturasTabs( Tabs ) {
  var funciones = {};
  var tabsBase = [ {
    titulo: "Factura",
    icono: "fa-file-excel-o",
    contenido: "facturacion/htmls/factura.html",
    activo: true
  }, {
    titulo: "Pagos",
    icono: "fa-money",
    contenido: "facturacion/htmls/pagos.html"
  } ];
  funciones.actual = Tabs.actual;
  funciones.siguiente = Tabs.siguiente;
  funciones.anterior = Tabs.anterior;

  funciones.generar = function() {
    return angular.copy( tabsBase );
  };

  return funciones;
}
