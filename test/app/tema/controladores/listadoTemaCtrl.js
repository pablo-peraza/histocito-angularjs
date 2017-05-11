"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de ListadoTemaCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {docs: [], contador: 0};
  var ctrl = $controller( "ListadoTemaCtrl", { listado: valor } );
  expect( ctrl.listado.docs ).toEqual( valor.docs );
  expect( ctrl.pagina ).toEqual( 1 );
  expect( ctrl.cantidad ).toEqual( 10 );
}
