"use strict";

module.exports = cisCargando;

function cisCargando() {
  return {
    restrict: "A",
    scope: {
      modelo: "="
    },
    transclude: true,
    templateUrl: "base/htmls/ciscargando.html"
  };
}
