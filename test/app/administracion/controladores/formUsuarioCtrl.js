"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormUsuarioCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

var auth = {
  getPayload: function() {
    return {permisos:{usuario: {crear:"crear"}}};
  }
};

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormUsuarioCtrl", {usuario: valor, $auth: auth } );
  expect( ctrl.usuario.nombre ).toEqual( valor.nombre );
  expect( ctrl.usuario.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormUsuarioCtrl", {usuario: {}, $stateParams: {editar: "true"}, $auth: auth} );
  expect( ctrl.usuario.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormUsuarioCtrl", {usuario: {}, $stateParams: {editar: "false"}, $auth: auth} );
  expect( ctrl.usuario.editando ).toEqual( false );
}
