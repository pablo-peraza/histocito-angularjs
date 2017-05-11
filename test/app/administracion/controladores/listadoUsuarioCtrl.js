"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de ListadoUsuarioCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
  } );

} );

var auth = {
  getPayload: function() {
    return {};
  }
};

function asignarValor( $controller ) {
  var valor = {docs: [], contador: 0};
  var ctrl = $controller( "ListadoUsuarioCtrl", { listado: valor, $auth: auth } );
  expect( ctrl.listado.docs ).toEqual( valor.docs );
  expect( ctrl.pagina ).toEqual( 1 );
  expect( ctrl.cantidad ).toEqual( 10 );
}
