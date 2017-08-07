"use strict";

var modulo = angular.module( "Proyecto.muestras", [
  require( "./directivas/datospaciente" )
] );

modulo.config( require( "./rutas.js" ) );

modulo.controller( "FormMuestraCtrl", require( "./ctrls/formMuestraCtrl.js" ) );
modulo.controller( "ListaMuestraCtrl", require( "./ctrls/listaMuestraCtrl.js" ) );
modulo.controller( "ModalOpcionesCtrl", require( "./ctrls/modalOpcionesCtrl.js" ) );
modulo.controller( "MotivoCtrl", require( "./ctrls/motivoCtrl.js" ) );
modulo.controller( "imagenesMedico", require( "./ctrls/imagenesMedico.js" ) );
modulo.controller( "MuestrasMedicoCtrl", require( "./ctrls/muestrasMedicoCtrl.js" ) );
modulo.controller( "EnviarCorreosCtrl", require( "./ctrls/enviarCorreosCtrl.js" ) );
modulo.controller( "EnviarCorreosMuestrasUnaCtrl",
require( "./ctrls/enviarCorreosMuestraUnaCtrl.js" ) );

modulo.factory( "LogicaRecomendaciones", require( "./servicios/logicaRecomendaciones.js" ) );
modulo.factory( "MuestrasEstados", require( "./servicios/muestrasEstados.js" ) );
modulo.factory( "MuestrasTabs", require( "./servicios/muestrasTabs.js" ) );
modulo.factory( "Muestras", require( "./servicios/muestras.js" ) );
modulo.factory( "MuestrasREST", require( "./ctrls/rest/muestrasAPI.js" ) );

modulo.directive( "multipleEmails", require( "./directivas/multipleEmails.js" ) );

module.exports = modulo.name;
