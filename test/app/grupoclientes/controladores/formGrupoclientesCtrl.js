"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormGrupoclientesCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormGrupoclientesCtrl", {grupoclientes: valor } );
  expect( ctrl.grupoclientes.nombre ).toEqual( valor.nombre );
  expect( ctrl.grupoclientes.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormGrupoclientesCtrl", {grupoclientes: {}, $stateParams: {editar: "true"}} );
  expect( ctrl.grupoclientes.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormGrupoclientesCtrl", {grupoclientes: {}, $stateParams: {editar: "false"}} );
  expect( ctrl.grupoclientes.editando ).toEqual( false );
}
