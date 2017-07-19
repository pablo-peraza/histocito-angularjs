"use strict";

var modulo = angular.module( "Proyecto.diagnosticoCitologiaMod", [] );

modulo.directive( "diagnosticoCitologia", require( "./directiva.js" ) );
modulo.controller( "diagnosticoCitologiaCtrl", require( "./ctrl.js" ) );
modulo.controller( "modalEtitrocitosCtrl", require( "./modalEtitrocitos.js" ) );
modulo.controller( "modalFrotisCtrl", require( "./modalFrotis.js" ) );

module.exports = modulo.name;
