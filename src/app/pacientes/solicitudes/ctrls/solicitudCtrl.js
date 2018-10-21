"use strict";

module.exports = SolicitudCtrl;

var map = require( "lodash/collection/map" );
var some = require( "lodash/collection/some" );

SolicitudCtrl.$inject = [ "solicitudes", "SolicitudAPI", "Alertas", "$modal", "$route" ];
function SolicitudCtrl( solicitudes, SolicitudAPI, Alertas, $modal, $route ) {
  var vm = this;
  vm.checkTodos = false;
  vm.mostrarBtnConvertir = false;
  vm.solicitudes = solicitudes;
  vm.premuestras = [];
  vm.seleccionarTodo = seleccionarTodo;
  vm.setMostrarBtnConvertir = setMostrarBtnConvertir;
  vm.cargarMas = cargarMas;
  vm.convertirAMuestras = convertirAMuestras;
  vm.elementoActual = 100;

  function seleccionarTodo( docs, valor ) {
    vm.mostrarBtnConvertir = valor;
    vm.solicitudes.docs = map( docs, function( doc ) {
      doc.seleccionado = valor;
      return doc;
    } );
  }

  function setMostrarBtnConvertir( docs ) {
    vm.mostrarBtnConvertir = some( docs, "seleccionado" );
  }

  function cargarMas() {
    return SolicitudAPI.listar( vm.elementoActual, 100 )
      .then( function( resp ) {
        vm.elementoActual += 100;
        vm.solicitudes.docs = vm.solicitudes.docs.concat( resp.docs );
      } )
      .catch( function( err ) {
        Alertas.agregar( err.status );
      } )
      .finally( function() {
        vm.cargando = false;
      } );
  }

  function convertirAMuestras() {
    return $modal.open( {
      templateUrl: "pacientes/solicitudes/htmls/convertir.html",
      controller: "PremuestraModalCtrl",
      backdrop: "static",
      size: "lg",
      resolve: {
        solicitudes: function() {
          return vm.solicitudes.docs;
        }
      }
    } )
    .result.then( function() {
      $route.reload();
      Alertas.agregar( 200 );
    }, function() {
      $route.reload();
    } );
  }
}
