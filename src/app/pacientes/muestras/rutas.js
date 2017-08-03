"use strict";

module.exports = rutas;
var permisos = require( "../../principal/modelos/permisos.js" );
var GestorMuestras = require( "../comun.js" ).GestorMuestras;

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/pacientes/muestras", {
    templateUrl: "pacientes/muestras/htmls/lista.html",
    controller: "ListaMuestraCtrl",
    titulo: "Administración de Muestras",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.medico,
      permisos.valores.patologo,
      permisos.valores.digitador,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo
    ],
    resolve: {
      muestras: [ "Muestras", "Alertas", "Credenciales",
        function( Muestras, Alertas, Credenciales ) {
          var tipo = Credenciales.credenciales().tipoUsuario;
          if ( tipo === "Citotecnólogo" ) {
            return muestras( 0, 50, [ {
              categoria: [ "citología" ]
            }, {
              estado: [ "diagnostico", "espera" ]
            } ] )( Muestras, Alertas );
          } //if
          if ( tipo === "Patólogo" ) {
            return muestras( 0, 50, [ {
              estado: [ "diagnostico" ]
            } ] )( Muestras, Alertas );
          }
          return muestras( 0, 50 )( Muestras, Alertas );
        }
      ],
      dimensiones: [ "Muestras", "Alertas", "Credenciales",
        function( Muestras, Alertas, Credenciales ) {
          var tipo = Credenciales.credenciales().tipoUsuario;
          if ( tipo === "Citotecnólogo" ) {
            return [];
          }
          return ( muestras( 0, 0 )( Muestras, Alertas ) ).then( function( datos ) {
            Muestras.rest.etiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    } //resolve
  } );

  $routeProvider.when( "/inicio/pacientes/muestras/nuevo", {
    templateUrl: "pacientes/muestras/htmls/una.html",
    controller: "FormMuestraCtrl",
    titulo: "Nueva Muestra",
    permisos: [ permisos.valores.laboratorio, permisos.valores.digitador ],
    resolve: {
      params: [ "Muestras", "Alertas", "Futuros", paraNuevaMuestra ] //muestra
    } //resolve
  } );

  $routeProvider.when( "/inicio/pacientes/muestras/:id", {
    templateUrl: "pacientes/muestras/htmls/una.html",
    controller: "FormMuestraCtrl",
    titulo: "Muestra",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.medico,
      permisos.valores.patologo,
      permisos.valores.digitador,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo
    ],
    resolve: {
      params: [ "$route", "Muestras", "Alertas", "Futuros", paraMuestra ] //muestra
    }
  } );

  $routeProvider.when( "/inicio/medico/muestras", {
    titulo: "Mis Muestras",
    templateUrl: "pacientes/muestras/htmls/muestras.html",
    controller: "MuestrasMedicoCtrl",
    permisos: [ permisos.valores.medico ],
    resolve: {
      muestras: [ "Muestras", "Alertas", muestras( 0, 50 ) ],
      dimensiones: [ "Muestras", "Alertas",
        function( Muestras, Alertas ) {
          return ( muestras( 0, 0 )( Muestras, Alertas ) ).then( function( datos ) {
            Muestras.rest.etiquetas( datos.dimensiones );
            return datos.dimensiones;
          } );
        }
      ],
      elementoActual: function() {
        return 50;
      }
    } //resolve
  } );

  function muestras( pagina, cantidad, dims ) {
    return function( Muestras, Alertas ) {
      return Muestras.rest.buscar( pagina, cantidad, "", dims ).then(
        function( resp ) {
          return resp.data;
        }, function( error ) {
          Alertas.agregar( error.status );
          console.error( error );
        } );
    };
  } //busqueda

  function paraNuevaMuestra() {
    return {
      muestra: {
        nuevo: true,
        editando: true,
        estado: "Registrada",
        enviada: false,
        imagenes: [],
        correos: []
      }
    };
  } //paraNuevaMuestra

  function paraMuestra( $route, Muestras, Alertas, Futuros ) {
    var id = $route.current.params.id;
    var gestor = new GestorMuestras( Muestras, Alertas, Futuros );
    return gestor.obtenerMuestra( id ).then( function( resp ) {
      if ( resp.muestra === 404 ) {
        return resp;
      }
      return gestor.obtenerProcedimiento( resp.muestra.idProcedimiento, resp )
      .then( function( resp ) {
        return gestor.obtenerUsuario( resp.muestra.idUsuario, resp.muestra.autorizados, resp )
        .then( function( resp ) {
          return gestor.obtenerExpediente( resp.muestra.idExpediente, resp )
          .then( function( resp ) {
            return gestor.obtenerClinica( resp.muestra.idClinica, resp )
            .then( function( resp ) {
              return gestor.obtenerMedico( resp.muestra.idMedico, resp );
            } );
          } );
        } );
      } );
    } );
  } //paraMuestra
}
