"use strict";

module.exports = Tabs;

function Tabs() {
  var funciones = {};
  funciones.rechazar = function( tabs, nombre ) {
    return _.reject( tabs, function( tab ) {
      return tab.titulo === nombre;
    } );
  };

  funciones.actual = function( tabs ) {
    return _.findIndex( tabs, function( tab ) {
      return tab.activo === true;
    } );
  };

  function mover( tabs, delta ) {
    var i = funciones.actual( tabs );
    if ( i + delta < tabs.length && i + delta >= 0 ) {
      tabs[i + delta].activo = true;
    }
    return tabs;
  } //mover

  funciones.siguiente = function( tabs ) {
    return mover( tabs, 1 );
  };

  funciones.anterior = function( tabs ) {
    return mover( tabs, -1 );
  };

  return funciones;
}
