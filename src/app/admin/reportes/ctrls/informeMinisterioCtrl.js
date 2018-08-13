"use strict";

module.exports = InformeMinisterioCtrl;

InformeMinisterioCtrl.$inject = [ "$scope", "$modalInstance", "$http", "node" ];
function InformeMinisterioCtrl( $scope, $modalInstance, $http, node ) {
  $scope.form = {
    fechaInicio: moment(),
    fechaFin: moment()
  };
  $scope.ok = ok;
  $scope.cancelar = cancelar;
  $scope.cargando = false;

  function ok(form) {
    $scope.cargando = true;
    $http
      .get( node + "/api/ministerio/" +
        formatear( form.fechaInicio ) + "/" +
        formatear( form.fechaFin ),
        { responseType: "arraybuffer" })
      .then( descargar )
      .finally( function() {
        $scope.cargando = false;
      });
  }

  function cancelar() {
    $modalInstance.dismiss();
  }

  function formatear(fecha) {
    return moment(fecha).format("YYYY-MM-DD");
  }

  function descargar(resp) {
    var blob = new Blob( [resp.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    } );
    var elemDescarga = document.createElement( "a" );
    document.body.appendChild( elemDescarga );
    elemDescarga.setAttribute( "type", "hidden" );
    elemDescarga.href = URL.createObjectURL( blob );
    elemDescarga.target = "_blank";
    elemDescarga.download = "INFORME_MINISTERIO.xlsx";
    elemDescarga.click();
  }
}
