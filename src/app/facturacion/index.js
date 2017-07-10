"use strict";

var modulo = angular.module( "Proyecto.facturacion", [] );

modulo.config( require( "./rutas" ) );

modulo.controller( "AdminFacturasCtrl", require( "./ctrls/adminFacturasCtrl.js" ) );
modulo.controller( "ConsecutivoCtrl", require( "./ctrls/consecutivoCtrl.js" ) );
modulo.controller( "FacturaCtrl", require( "./ctrls/facturaCtrl.js" ) );
modulo.controller( "MedicoFacturasCtrl", require( "./ctrls/medicoFacturasCtrl.js" ) );
modulo.controller( "MuestasNoFacturadasCtrl", require( "./ctrls/muestrasNoFacturadasCtrl.js" ) );

modulo.factory( "FacturacionLogica", require( "./servicios/facturacionLogica.js" ) );
modulo.factory( "FacturacionTabs", require( "./servicios/facturacionTabs.js" ) );
modulo.factory( "FacturasTabs", require( "./servicios/facturasTabs.js" ) );
modulo.factory( "Facturas", require( "./servicios/facturas.js" ) );
modulo.factory( "FacturasREST", require( "./ctrls/rest/facturasAPI.js" ) );

module.exports = modulo.name;
