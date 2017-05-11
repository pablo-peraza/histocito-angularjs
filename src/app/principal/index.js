"use strict";

var modulo = angular.module( "Proyecto.principal", [] );

modulo.config( require( "./rutas" ) );

modulo.controller( "PrincipalCtrl", require( "./controladores/principalCtrl.js" ) );
modulo.controller( "AlertasCtrl", require( "./controladores/alertasCtrl.js" ) );
modulo.controller( "ControladorNavegacion", require( "./controladores/navegacionCtrl.js" ) );
modulo.controller( "ControladorRelogin", require( "./controladores/reloginCtrl.js" ) );
modulo.controller( "ControladorResultados", require( "./controladores/resultadosCtrl.js" ) );
modulo.controller( "ControladorCredencialesInvalidos", require( "./controladores/CICtrl.js" ) );
modulo.controller( "InicioCtrl", require( "./controladores/inicioCtrl.js" ) );

module.exports = modulo.name;
