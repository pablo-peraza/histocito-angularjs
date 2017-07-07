"use strict";

var modulo = angular.module( "Proyecto.clinicas", [] );

modulo.config( require( "./rutas" ) );
modulo.controller( "ClinicasCtrl", require( "./ctrls/clinicasCtrl.js" ) );
modulo.factory( "Clinicas", require( "./ctrls/rest/clinicasAPI.js" ) );

module.exports = modulo.name;
