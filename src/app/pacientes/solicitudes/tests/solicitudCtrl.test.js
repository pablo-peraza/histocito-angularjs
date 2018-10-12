"use strict";

var test = require( "tape" );
var archivo = require( "../ctrls/solicitudCtrl.js" );

test( "SolicitudCtrl: Seleccionar todo", function( assert ) {
  var ctrl = instanciar( [
    { seleccionado: false },
    { seleccionado: false }
  ] );
  var esperado = [
    { seleccionado: true },
    { seleccionado: true }
  ];
  ctrl.seleccionarTodo( ctrl.solicitudes.docs, true );
  assert.deepEqual( ctrl.solicitudes.docs, esperado );
  assert.end();
} );

test( "SolicitudCtrl: Deseleccionar todo", function( assert ) {
  var ctrl = instanciar( [
    { seleccionado: true },
    { seleccionado: true }
  ] );
  var esperado = [
    { seleccionado: false },
    { seleccionado: false }
  ];
  ctrl.seleccionarTodo( ctrl.solicitudes.docs, false );
  assert.deepEqual( ctrl.solicitudes.docs, esperado );
  assert.end();
} );

test( "SolicitudCtrl: Mostrar botón de convertir", function( assert ) {
  var ctrl = instanciar( [
    { seleccionado: true },
    { seleccionado: false }
  ] );
  ctrl.setMostrarBtnConvertir( ctrl.solicitudes.docs );
  assert.equal( ctrl.mostrarBtnConvertir, true );
  assert.end();
} );

test( "SolicitudCtrl: NO mostrar botón de convertir", function( assert ) {
  var ctrl = instanciar( [
    { seleccionado: false },
    { seleccionado: false }
  ] );
  ctrl.setMostrarBtnConvertir( ctrl.solicitudes.docs );
  assert.equal( ctrl.mostrarBtnConvertir, false );
  assert.end();
} );

test( "SolicitudCtrl: Pasar del tab 1 al tab 2", function( assert ) {
  var ctrl = instanciar();
  ctrl.convertirAMuestras();
  assert.equal( ctrl.tabs[0].activo, false );
  assert.equal( ctrl.tabs[1].activo, true );
  assert.end();
} );

test( "SolicitudCtrl: Cargar más solicitudes", function( assert ) {
  var docs = [];
  for ( var i = 0; i < 100; i += 1 ) {
    docs.push( { seleccionado: false } );
  }
  var ctrl = instanciar( docs );
  ctrl.cargarMas( ctrl.elementoActual, 100 );
  setTimeout( function() {
    assert.equal( ctrl.elementoActual, 200 );
    assert.equal( ctrl.solicitudes.docs.length, 101 );
    assert.end();
  }, 0 );
} );

Promise.prototype.finally = function( cb ) {
  cb();
};

function instanciar( pdocs ) {
  var docs = pdocs ? pdocs : [
    { seleccionado: true },
    { seleccionado: false }
  ];
  var solicitudes = {
    docs: docs,
    cant: docs.length
  };
  var SolicitudAPI = {
    listar: function() {
      return new Promise( function( resolve ) {
        resolve( {
          docs: [
            { seleccionado: false }
          ]
        } );
      } );
    }
  };
  return new archivo( solicitudes, SolicitudAPI );
}
