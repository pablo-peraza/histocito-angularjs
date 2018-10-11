"use strict";

module.exports = ListaSolicitudCtrl;

ListaSolicitudCtrl.$inject = ["solicitudes", "SolicitudAPI", "Alertas"];
function ListaSolicitudCtrl( solicitudes, SolicitudAPI, Alertas ) {
  var vm = this;
  vm.checkTodos = false;
  vm.mostrarBtnConvertir = false;
  vm.solicitudes = solicitudes;
  vm.seleccionarTodo = seleccionarTodo;
  vm.setMostrarBtnConvertir = setMostrarBtnConvertir;
  vm.cargarMas = cargarMas;
  vm.elementoActual = 100;

  function seleccionarTodo(docs, valor) {
    vm.solicitudes.docs = _.map(docs, function(doc) {
      doc.seleccionado = valor;
      return doc;
    });
  }

  function setMostrarBtnConvertir(docs) {
    vm.mostrarBtnConvertir = _.some(docs, "seleccionado");
  }

  function cargarMas() {
    SolicitudAPI.listar( vm.elementoActual, 100 )
      .then( function( resp ) {
        vm.elementoActual += 100;
        vm.solicitudes.docs.concat( resp.docs );
      } )
      .catch( function( err ) {
        Alertas.agregar( err.status );
      } )
      .finally( function() {
        vm.cargando = false;
      } );
  }
}
