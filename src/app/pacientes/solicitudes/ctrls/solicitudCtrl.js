"use strict";

module.exports = SolicitudCtrl;

var _ = require( "lodash" );

SolicitudCtrl.$inject = [ "solicitudes", "SolicitudAPI", "Alertas", "$modal" ];
function SolicitudCtrl( solicitudes, SolicitudAPI, Alertas, $modal ) {
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
    vm.solicitudes.docs = _.map( docs, function( doc ) {
      doc.seleccionado = valor;
      return doc;
    } );
  }

  function setMostrarBtnConvertir( docs ) {
    vm.mostrarBtnConvertir = _.some( docs, "seleccionado" );
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
    } );
  }
}
