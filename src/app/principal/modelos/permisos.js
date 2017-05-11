"use strict";

var permisos = {
  medico: "Médico",
  patologo: "Patólogo",
  laboratorio: "Laboratorio",
  digitador: "Digitador",
  histotecnologo: "Histotecnólogo",
  citotecnologo: "Citotecnólogo",
  facturacion: "Facturación",
  todos: "Todos"
};
var funciones = {
  puedePasar: function( deRuta, deUsuario ) {
    function todos() {
      return _.contains( deRuta, deUsuario );
    } //function
    return _.contains( deRuta, deUsuario ) || _.contains( deRuta, permisos.todos );
  }
};

module.exports = {
  valores: permisos,
  funciones: funciones
};
