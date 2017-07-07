"use strict";

var modulo = angular.module( "Proyecto.medicos", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "MedicosCtrl", require( "./ctrls/medicosCtrl.js" ) );
modulo.factory( "Medicos", require( "./ctrls/rest/medicosAPI.js" ) );

module.exports = modulo.name;
