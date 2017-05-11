"use strict";

var Nota = require( "../../../src/app/monitoreo/modelos/nota.js" );

describe( "test de modelo de nota", function() {
  beforeEach( function() {
    this.nota = new Nota();
  } );

  it( "debería agregar ids de entidades", agregarEntidadesOK );
  it( "debería no agregar ids de entidades si array es vacio", agregarEntidadesVacio );
  it( "debería no agregar ids de entidades recibe Null o Undefined", agregarEntidadesNull );
  it( "debería agregar ids de personajes", agregarPersonajesOK );
  it( "debería no agregar ids de personajes si array es vacio", agregarPersonajesVacio );
  it( "debería no agregar ids de personajes recibe Null o Undefined", agregarPersonajesNull );
  it( "debería agregar ids de clientes", agregarClientesOK );
  it( "debería no agregar ids de clientes si array es vacio", agregarClientesVacio );
  it( "debería no agregar ids de clientes recibe Null o Undefined", agregarClientesNull );

} );

function agregarClientesOK() {
  var clientes = [
    {nombre: "ICE", _id:"123", mencion: true, ignorar:true},
    {nombre: "INEC", _id:"456", mencion: true, sentimiento: "negativa" }
  ];
  this.nota.agregarClientes( clientes );
  expect( this.nota.clientes ).toEqual( [ {_id:"123", mencion: true,
  ignorar:true, logo:false, sentimiento: "positiva", relaciones:[] },
  {_id:"456", mencion: true, logo:false, sentimiento: "negativa", ignorar:false, relaciones:[] } ] );
}

function agregarClientesVacio() {
  var clientes = [ ];
  this.nota.agregarClientes( clientes );
  expect( this.nota.clientes ).toEqual( [ ] );
}

function agregarClientesNull() {
  var clientes = null;
  this.nota.agregarClientes( clientes );
  expect( this.nota.clientes ).toEqual( [ ] );
}

function agregarEntidadesOK() {
  var entidades = [ {nombre: "ICE", _id:"123", mencion:true },
    {nombre: "INAMU", _id:"456", logo: true} ];
  this.nota.agregarEntidades( entidades );
  expect( this.nota.entidades ).toEqual( [ {_id:"123", mencion:true, logo:false },
  {_id:"456", logo: true, mencion:false} ] );
}

function agregarEntidadesVacio() {
  var entidades = [ ];
  this.nota.agregarEntidades( entidades );
  expect( this.nota.entidades ).toEqual( [ ] );
}

function agregarEntidadesNull() {
  var entidades = null;
  this.nota.agregarEntidades( entidades );
  expect( this.nota.entidades ).toEqual( [ ] );
}

function agregarPersonajesOK() {
  var personajes = [ {nombre: "Fabio", apellido: "Chavez", _id:"123", mencion:false },
  {nombre: "Luis Guillermo", apellido: "Solis", _id:"456", mencion: true} ];
  this.nota.agregarPersonajes( personajes );
  expect( this.nota.personajes ).toEqual( [ {_id:"123", mencion:false },
  {_id:"456", mencion: true} ] );
}

function agregarPersonajesVacio() {
  var personajes = [ ];
  this.nota.agregarPersonajes( personajes );
  expect( this.nota.personajes ).toEqual( [ ] );
}

function agregarPersonajesNull() {
  var personajes = null;
  this.nota.agregarPersonajes( personajes );
  expect( this.nota.personajes ).toEqual( [ ] );
}
