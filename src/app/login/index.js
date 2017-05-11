"use strict";

var modulo = angular.module( "Proyecto.login", [] );

modulo.config( require( "./rutas" ) );

modulo.controller( "ControladorLogin", require( "./ctrls/loginCtrl.js" ) );
modulo.controller( "ControladorForm", require( "./ctrls/formCtrl.js" ) );
modulo.controller( "ControladorReingreso", require( "./ctrls/reingresoCtrl.js" ) );
modulo.controller( "ControladorRecuperacion", require( "./ctrls/recuperacionCtrl.js" ) );

modulo.factory( "Login",  require( "./ctrls/rest/loginAPI.js" ) );

module.exports = modulo.name;
