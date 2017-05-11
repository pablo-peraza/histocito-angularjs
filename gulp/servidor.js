"use strict";

var browserSync = require( "browser-sync" );
var historyApiFallback = require( "connect-history-api-fallback" );

module.exports = servidor;

function servidor() {
  return browserSync( {
    server: {
      baseDir: "./dist",
      middleware: [ historyApiFallback ]
    },
    online: false,
    notify: true,
    reloadDelay: 2000,
    injectChanges: true,
    host: "0.0.0.0",
    logLevel: "debug",
    logPrefix: "[Servidor HTTP]",
    ghostMode: false
  } );
}
