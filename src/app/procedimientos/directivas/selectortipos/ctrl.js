"use strict";

module.exports = cisSelectorTiposCtrl;

cisSelectorTiposCtrl.$inject = [ "Procedimientos", "Alertas" ];
function cisSelectorTiposCtrl( Procedimientos, Alertas ) {
  var vm = this;
  vm.buscar = buscar;
  vm.enSeleccion = enSeleccion;

  function buscar( texto ) {
    vm.buscando = true;

    function ok( resp ) {
      return resp.data.lista;
    } //function
    return Procedimientos.tipos.buscar( 0, 10, texto, [] ).then( ok, error ).finally( ultima );
  } //function

  function enSeleccion( item ) {
    vm.buscando = true;

    function ok( resp ) {
      vm.modelo = resp.data;
    }
    Procedimientos.tipos.obtener( item ).then( ok, error ).finally( ultima );
  } //function

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
    return [];
  } //function

  function ultima() {
    vm.buscando = false;
  } //function

} //function
