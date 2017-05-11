"use strict";

var Cliente = require( "../../../../src/app/administracion/cliente/modelos/cliente.js" );

describe( "test de modelo de cliente", function() {
  beforeEach( function() {
    this.cliente = new Cliente();
  } );

  it( "deshabilitar un usuario habilitado", deshabilitarHabilitado );
  it( "deshabilitar un usuario deshabilitado", deshabilitarDeshabilitado );
  it( "habilitar un usuario habilitado", habilitarHabilitado );
  it( "habilitar un usuario deshabilitado", habilitarDeshabilitado );
  it( "deberia agregar un tema si recibe un string no vacio", agregarTemaOk );
  it( "deberia no agregar un tema si recibe un string vacio", agregarTemaVacio );
  it( "deberia no agregar un tema si recibe diferente de string", agregarTemaNoString );
  it( "debería agregar un id de entidad si recibe un Objeto Entidad", agregarEntidadOk );
  it( "debería no agregar entidad si recibe null", agregarEntidadNull );
  it( "debería no agregar entidad si recibe undefined", agregarEntidadUndefined );
  it( "debería no agregar entidad si recibe arreglo vacio", agregarEntidadVacio );
  it( "debería no agregar entidad si recibe diferente de array", agregarEntidadNoArray );
  it( "debería agregar un id de personjae si recibe un Objeto Personaje", agregarPersonajeOk );
  it( "debería no agregar personaje si recibe null", agregarPersonajeNull );
  it( "debería no agregar personaje si recibe undefined", agregarPersonajeUndefined );
  it( "debería no agregar personaje si recibe arreglo vacio", agregarPersonajeVacio );
  it( "debería no agregar personaje si recibe diferente de array", agregarPersonajeNoArray );
} );

function agregarPersonajeVacio() {
  var personajes = [ ];
  this.cliente.agregarPersonajes( personajes );
  expect( this.cliente.personajes ).toEqual( [ ] );
}

function agregarPersonajeNoArray() {
  var personajes = { "tipoRelacion" : "Contexto", "_id" : "566dd70ef0861cc93de8374c" };
  this.cliente.agregarPersonajes( personajes );
  expect( this.cliente.personajes ).toEqual( [ ] );
}

function agregarPersonajeUndefined() {
  var personajes;
  this.cliente.agregarPersonajes( personajes );
  expect( this.cliente.personajes ).toEqual( [ ] );
}

function agregarPersonajeNull() {
  var personajes = null;
  this.cliente.agregarPersonajes( personajes );
  expect( this.cliente.personajes ).toEqual( [ ] );
}

function agregarPersonajeOk() {
  var personajes = [ { "tipoRelacion" : "Contexto", "_id" : "566dd70ef0861cc93de8374c" } ];
  this.cliente.agregarPersonajes( personajes );
  expect( this.cliente.personajes ).toEqual( [ { "tipoRelacion" : "Contexto", "_id" : "566dd70ef0861cc93de8374c" } ] );
}

function agregarEntidadOk() {
  var entidades = [ { "tipoRelacion" : "Directa", "_id" : "5669b1c9fe2b46b11d050ebe" } ];
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ { "tipoRelacion" : "Directa", "_id" : "5669b1c9fe2b46b11d050ebe" } ] );
}

function agregarEntidadVacio() {
  var entidades = [ ];
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ ] );
}

function agregarEntidadNoArray() {
  var entidades = { "tipoRelacion" : "Directa", "_id" : "5669b1c9fe2b46b11d050ebe" };
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ ] );
}

function agregarEntidadUndefined() {
  var entidades;
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ ] );
}

function agregarEntidadNull() {
  var entidades = null;
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ ] );
}

function agregarEntidadOk() {
  var entidades = [ { "tipoRelacion" : "Directa", "_id" : "5669b1c9fe2b46b11d050ebe" } ];
  this.cliente.agregarEntidades( entidades );
  expect( this.cliente.entidades ).toEqual( [ { "tipoRelacion" : "Directa", "_id" : "5669b1c9fe2b46b11d050ebe" } ] );
}

function agregarTemaOk() {
  var tema = "Combustibles";
  this.cliente.agregarTema( tema );
  expect( this.cliente.temas ).toEqual( [ "Combustibles" ] );
}

function agregarTemaVacio() {
  var tema = "";
  this.cliente.agregarTema( tema );
  expect( this.cliente.temas ).toEqual( [  ] );
}

function agregarTemaNoString() {
  var tema1 = 1;
  var tema2 = {};
  var tema3;
  this.cliente.agregarTema( tema1 );
  this.cliente.agregarTema( tema2 );
  this.cliente.agregarTema( tema3 );
  expect( this.cliente.temas ).toEqual( [  ] );
}

function deshabilitarHabilitado() {
  this.cliente.habilitado = true;
  this.cliente.deshabilitar();
  expect( this.cliente.habilitado ).toBe( false );
}

function deshabilitarDeshabilitado() {
  this.cliente.habilitado = false;
  this.cliente.deshabilitar();
  expect( this.cliente.habilitado ).toBe( false );
}

function habilitarHabilitado() {
  this.cliente.habilitado = true;
  this.cliente.habilitar();
  expect( this.cliente.habilitado ).toBe( true );
}

function habilitarDeshabilitado() {
  this.cliente.habilitado = false;
  this.cliente.habilitar();
  expect( this.cliente.habilitado ).toBe( true );
}
