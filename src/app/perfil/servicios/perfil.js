"use strict";

module.exports = Perfil;

Perfil.$inject = [ "PerfilTabs", "PerfilRest" ];
function Perfil( PerfilTabs, PerfilRest ) {
  var funciones = {};
  funciones.tabs = PerfilTabs;
  funciones.rest = PerfilRest;
  return funciones;
} //Perfil
