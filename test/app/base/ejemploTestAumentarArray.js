"use strict";

//Estamos usando jasmine
//http://jasmine.github.io/2.3/introduction.html
describe( "Función de sumar 1 a los elementos de un array", function() {
  it( "debe sumarle uno a cada elemento", probarAumentarArray );
  it( "devolver una lista vacía cuando recibe una lista vacía", probarAumentarArray2 );
  it( "devolver null cuando recibe null", probarAumentarArray3 );
  it( "devolver undefined cuando recibe undefined", probarAumentarArray4 );
  it( "devolver undefined cuando recibe una lista de otra cosa que no sean Números",
   probarAumentarArray5 );
  it( "devolver undefined cuando recibe un objeto", probarAumentarArray6 );
} );

var prueba = require( "../../../src/app/base/aumentarArray.js" );

function probarAumentarArray() {
  var datoPrueba = [1, 2, 3];
  var respuestaEsperada = [2, 3, 4];
  expect( prueba( datoPrueba ) ).toEqual( respuestaEsperada );
}

function probarAumentarArray2() {
  var datoPrueba = [];
  var respuestaEsperada = [];
  expect( prueba( datoPrueba ) ).toEqual( respuestaEsperada );
}

function probarAumentarArray3() {
  var datoPrueba = null;
  var respuestaEsperada = null;
  expect( prueba( datoPrueba ) ).toEqual( respuestaEsperada );
}

function probarAumentarArray4() {
  expect( prueba( undefined ) ).toEqual( undefined );
}

function probarAumentarArray5() {
  var datoPrueba = ["1", "asd", "asdddd"];
  expect( prueba( datoPrueba ) ).toEqual( undefined );
}

function probarAumentarArray6() {
  var datoPrueba = {hola: 1, otro: true};
  expect( prueba( datoPrueba ) ).toEqual( undefined );
}
