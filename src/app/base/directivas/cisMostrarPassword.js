"use strict";

module.exports = cisMostrarPassword;

function cisMostrarPassword() {
  return {
    restrict: "A",
    templateUrl: "base/htmls/password.html'",
    scope: {
      modelo: "=",
      clases: "@"
    }
  };
}
