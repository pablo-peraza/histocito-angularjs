"use strict";

var proyecto = require( "../../../../package.json" ).name;

describe( "Test de ListadoGuionCtrl", function() {
  beforeEach( angular.mock.module( proyecto ) );
  describe( "Parámetros iniciales", function() {
    it( "deberia asignar al scope un valor", angular.mock.inject( asignarValor ) );
  } );
} );

function asignarValor ( $controller ) {
  var resp = { docs:[], contador: 0 };
  var ctrl = $controller( "ListadoGuionCtrl", { listadoGuiones: resp } );
  expect( ctrl.listado.docs ).toEqual( resp.docs );
  expect( ctrl.pagina ).toEqual( 1 );
  expect( ctrl.cantidad ).toEqual( 10 );
}
