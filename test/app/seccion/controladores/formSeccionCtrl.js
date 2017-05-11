"use strict";

var nombre = require( "../../../../package.json" ).name;

describe( "Test de FormSeccionCtrl", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Parámetros iniciales", function() {
    it( "Debería asignar al scope un valor", angular.mock.inject( asignarValor ) );
    it( "Debería estar siendo editado", angular.mock.inject( edicion ) );
    it( "No Debería estar siendo editado", angular.mock.inject( ver ) );
  } );

} );

function asignarValor( $controller ) {
  var valor = {nombre: "Prueba"};
  var ctrl = $controller( "FormSeccionCtrl", {seccion: valor } );
  expect( ctrl.seccion.nombre ).toEqual( valor.nombre );
  expect( ctrl.seccion.editando ).toEqual( false );
}

function edicion( $controller ) {
  var ctrl = $controller( "FormSeccionCtrl", {seccion: {}, $stateParams: {editar: "true"}} );
  expect( ctrl.seccion.editando ).toEqual( true );
}

function ver( $controller ) {
  var ctrl = $controller( "FormSeccionCtrl", {seccion: {}, $stateParams: {editar: "false"}} );
  expect( ctrl.seccion.editando ).toEqual( false );
}
