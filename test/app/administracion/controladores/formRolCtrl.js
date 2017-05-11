"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormRolCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormRolCtrl", {rol: valor} );
  expect( ctrl.rol.nombre ).toEqual( valor.nombre );
  expect( ctrl.rol.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormRolCtrl", {rol: {}, $stateParams: {editar: "true"}} );
  expect( ctrl.rol.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormRolCtrl", {rol: {}, $stateParams: {editar: "false"}} );
  expect( ctrl.rol.editando ).toEqual( false );
}
