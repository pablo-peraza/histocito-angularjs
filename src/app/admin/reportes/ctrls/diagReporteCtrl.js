"use strict";

module.exports = DiagReporteCtrl;

DiagReporteCtrl.$inject = [ "Credenciales", "$http", "node" ];
function DiagReporteCtrl( Credenciales, $http, node ) {
  var vm = this;
  vm.rango = {
    desde: null,
    hasta: null
  };
  vm.buscar = buscar;
  vm.calConfig = {
    datepickerMode: "'month'",
    minMode: "month"
  };

  function buscar( rango ) {
    var params = formatearParams( rango );
    $http.get( node + "/api/reportes/citologias", params ).then( function( resp ) {
      vm.resultados = procesarResul( resp.data );
    } );
  }

  function formatearParams( rango ) {
    return {
      params: {
        desde: moment( rango.desde, "YYYY-MM-DD" ).format(),
        hasta: moment( rango.hasta, "YYYY-MM-DD" ).endOf( "month" ).format(),
        id: Credenciales.credenciales().id
      }
    };
  }

  function procesarResul( data ) {
    return !_.isEmpty( data ) ? data : null;
  }
}
