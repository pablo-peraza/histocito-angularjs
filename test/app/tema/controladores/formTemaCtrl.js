"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormTemaCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormTemaCtrl", {tema: valor } );
  expect( ctrl.tema.nombre ).toEqual( valor.nombre );
  expect( ctrl.tema.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormTemaCtrl", {tema: {}, $stateParams: {editar: "true"}} );
  expect( ctrl.tema.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormTemaCtrl", {tema: {}, $stateParams: {editar: "false"}} );
  expect( ctrl.tema.editando ).toEqual( false );
}
