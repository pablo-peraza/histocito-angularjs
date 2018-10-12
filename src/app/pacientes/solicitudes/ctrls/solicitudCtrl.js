"use strict";

module.exports = SolicitudCtrl;

var _ = require( "lodash" );

SolicitudCtrl.$inject = [ "solicitudes", "SolicitudAPI", "Alertas" ];
function SolicitudCtrl( solicitudes, SolicitudAPI, Alertas ) {
  var vm = this;
  vm.checkTodos = false;
  vm.mostrarBtnConvertir = false;
  vm.solicitudes = solicitudes;
  vm.seleccionarTodo = seleccionarTodo;
  vm.setMostrarBtnConvertir = setMostrarBtnConvertir;
  vm.cargarMas = cargarMas;
  vm.convertirAMuestras = convertirAMuestras;
  vm.elementoActual = 100;
  vm.tabs = [
    {
      titulo: "Paso 1. Seleccionar",
      icono: "fa-check",
      contenido: "pacientes/solicitudes/htmls/seleccionar.html",
      inhabilitado: false,
      activo: true
    },
    {
      titulo: "Paso 2. Convertir",
      icono: "fa-exchange",
      contenido: "pacientes/solicitudes/htmls/convertir.html",
      inhabilitado: true,
      activo: false
    }
  ];

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
    vm.tabs[0].activo = false;
    vm.tabs[1].activo = true;
  }
}
