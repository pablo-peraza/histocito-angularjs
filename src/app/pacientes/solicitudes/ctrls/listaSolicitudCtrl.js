"use strict";

module.exports = ListaSolicitudCtrl;

ListaSolicitudCtrl.$inject = ["solicitudes"];
function ListaSolicitudCtrl( solicitudes ) {
  var vm = this;
  vm.solicitudes = solicitudes;
  vm.convertirAMuestras = convertirAMuestras;

  function convertirAMuestras() {
    alert("Convirtiendo solicitudes a muestras...");
  }
}
