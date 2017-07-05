"use strict";

var modulo = angular.module( "cisGaleriaMod", [] );

modulo.directive( "cisGaleria", require( "./directiva.js" ) );

modulo.controller( "cisGaleriaCtrl", require( "./ctrl.js" ) );
modulo.controller( "LightBoxCtrl", require( "./lightbox.js" ) );

modulo.factory( "Imagenes", require( "./imagenes.js" ) );

module.exports = modulo.name;
