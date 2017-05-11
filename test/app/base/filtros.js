"use strict";

var nombre = require( "../../../package.json" ).name;
describe( "Test de filtros base", function() {

  beforeEach( angular.mock.module( nombre ) );

  describe( "Filtro de fecha", function() {
    it( "debe instanciar una fecha a partir de un string con el formato YYYY-MM-DDTHH:mm:ss.sssZ",
     angular.mock.inject(pruebaFechaString) );
    it( "debe instanciar una fecha a partir de una fecha",
     angular.mock.inject(pruebaFechaMoment) );
    it( "debe devolver 'Fecha Inválida' para un string no fecha",
     angular.mock.inject(pruebaFechaStringMalo) );
    it( "debe devolver 'Fecha Inválida' para cualquier valor no fecha",
     angular.mock.inject(pruebaFechaOtros) );

  } );

  describe( "Filtro de porcentaje", function() {
    it( "debe devolver un número con 2 decimales y el signo de porcentaje",
      angular.mock.inject(pruebaBasica) );
    it( "debe devolver un número con 2 decimales y el signo de porcentaje cuando recibe un string",
        angular.mock.inject(pruebaString) );
    it( "debe devolver 'No Definido' cuando recibe un string con coma",
      angular.mock.inject(pruebaString2) );
    it( "debe devolver 'No Definido' cuando recibe un null",
      angular.mock.inject(pruebaNull) );
    it( "debe devolver 'No Definido' cuando recibe un undefined",
      angular.mock.inject(pruebaUndefined) );
    it( "debe devolver 'No Definido' cuando recibe otra cosa",
      angular.mock.inject(pruebaOtros) );
  } );

} );

function pruebaFechaString($filter) {
  var filtro = $filter( "Fecha" );
  var param = "2014-10-10T07:43:22.000Z";
  var esperado = moment( param, "YYYY-MM-DDTHH:mm:ss.sssZ" ).format( "HH:MM" );
  expect( filtro( param, "HH:MM" ) ).toEqual( esperado );
}

function pruebaFechaMoment($filter) {
  var filtro = $filter( "Fecha" );
  var param = moment();
  var esperado = param.format( "LL" );
  expect( filtro( param, "LL" ) ).toEqual( esperado );
}

function pruebaFechaStringMalo($filter) {
  var filtro = $filter( "Fecha" );
  var param = "String que no es fecha";
  var esperado = "Fecha Inválida";
  expect( filtro( param, "LL" ) ).toEqual( esperado );
}

function pruebaFechaOtros($filter) {
  var filtro = $filter( "Fecha" );
  var esperado = "Fecha Inválida";
  expect( filtro( {valor: 1}, "LL" ) ).toEqual( esperado );
}

function pruebaBasica($filter) {
  var filtro = $filter( "Porcentaje" );
  var param = 0.2245;
  var esperado = "22,45%";
  expect( filtro( param ) ).toBe( esperado );
}

function pruebaString($filter) {
  var filtro = $filter( "Porcentaje" );
  var param = "0.2245";
  var esperado = "22,45%";
  expect( filtro( param ) ).toBe( esperado );
}
function pruebaString2($filter) {
  var filtro = $filter( "Porcentaje" );
  var param = "0,2245";
  var esperado = "No Definido";
  expect( filtro( param ) ).toBe( esperado );
}
function pruebaNull($filter) {
  var filtro = $filter( "Porcentaje" );
  var esperado = "No Definido";
  expect( filtro( null ) ).toBe( esperado );
}
function pruebaUndefined($filter) {
  var filtro = $filter( "Porcentaje" );
  var esperado = "No Definido";
  expect( filtro( undefined ) ).toBe( esperado );
}
function pruebaOtros($filter) {
  var filtro = $filter( "Porcentaje" );
  var esperado = "No Definido";
  expect( filtro( {} ) ).toBe( esperado );
  expect( filtro( true ) ).toBe( esperado );
  expect( filtro( "String" ) ).toBe( esperado );
  expect( filtro( [] ) ).toBe( esperado );
}
