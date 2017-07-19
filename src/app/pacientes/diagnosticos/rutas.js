"use strict";

module.exports = rutas;
var permisos = require( "../../principal/modelos/permisos.js" );
var GestorMuestras = require( "../comun.js" ).GestorMuestras;
var enriquecerMedico = require( "../comun.js" ).enriquecerMedico;

rutas.$inject = [ "$routeProvider" ];
function rutas( $routeProvider ) {
  $routeProvider.when( "/inicio/pacientes/muestras/:muestra/diagnostico", {
    templateUrl: "pacientes/diagnosticos/htmls/diagnosticoUno.html",
    controller: "DiagnosticoCtrl",
    titulo: "Diagnóstico",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.patologo,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo,
      permisos.valores.digitador
    ],
    resolve: {
      params: [ "$route", "$rootScope", "Muestras", "Alertas", "Futuros", paraDiagnostico ]
    }
  } );

  $routeProvider.when( "/inicio/pacientes/muestras/:muestra/diagnostico/reporte", {
    templateUrl: "pacientes/diagnosticos/htmls/reportesUno.html",
    controller: "ReporteCtrl",
    titulo: "Reporte del Diagnóstico",
    permisos: [
      permisos.valores.laboratorio,
      permisos.valores.patologo,
      permisos.valores.histotecnologo,
      permisos.valores.citotecnologo,
      permisos.valores.digitador,
      permisos.valores.medico
    ],
    resolve: {
      params: [ "$route", "Muestras", "Alertas", "Futuros", paraReporte ], //muestra
      isPrivado: function() { return true; }
    }
  } );

  $routeProvider.when( "/informe/:hash", {
    templateUrl: "pacientes/diagnosticos/htmls/reportesUno.html",
    controller: "ReporteCtrl",
    titulo: "Diagnóstico de muestra",
    sinLogin: true,
    resolve: {
      params: [ "$route", "Muestras", "Alertas", "Futuros", paraReportePublico ], //muestra
      isPrivado: function() { return false; }
    }
  } );

  function paraDiagnostico( $route, $rootScope, Muestras, Alertas, Futuros ) {
    var muestra = $route.current.params.muestra;
    var gestor = new GestorMuestras( Muestras, Alertas, Futuros );
    return gestor.obtenerMuestra( muestra ).then( function( resp ) {
      if ( resp.muestra === 404 ) {
        return resp;
      }
      if ( !resp.muestra.diagnostico && $rootScope.puedePasar( [ $rootScope.permisos.digitador ] ) )
      {
        return {
          muestra: 401
        };
      }
      return gestor.obtenerProcedimiento( resp.muestra.idProcedimiento, resp )
      .then( function( resp ) {
        return gestor.obtenerTipo( resp.procedimiento.tipo, resp ).then( function( resp ) {
          var histo = "Citología" === resp.tipo.categoria && $rootScope.puedePasar( [
            $rootScope.permisos.histotecnologo ] );
          var cito = "Biopsia" === resp.tipo.categoria && $rootScope.puedePasar( [
            $rootScope.permisos.citotecnologo ] );
          if ( histo || cito ) {
            return {
              muestra: 401
            };
          }
          return gestor.obtenerExpediente( resp.muestra.idExpediente, resp )
          .then( function( resp ) {
            return gestor.obtenerOrigen( resp.procedimiento.origen, resp )
            .then( function( resp ) {
              return gestor.obtenerUsuario( resp.muestra.idUsuario, resp.muestra.autorizados, resp )
              .then( function( resp ) {
                return gestor.obtenerClinica( resp.muestra.idClinica, resp )
                .then( function( resp ) {
                  return gestor.obtenerMedico( resp.muestra.idMedico, resp );
                } );
              } );
            } );
          } );
        } );
      } );
    } );
  } //paraDiagnostico

  function paraReporte( $route, Muestras, Alertas, Futuros ) {
    return Muestras.informePrivado( $route.current.params.muestra ).then( function( resp ) {
      var data = resp.data;
      data.medico = enriquecerMedico( data.medico );
      return data;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del informe" );
      return Futuros.aFuturo( resp, 1 );
    } );
  } //paraReporte

  function paraReportePublico( $route, Muestras, Alertas, Futuros ) {
    return Muestras.informePublico( $route.current.params.hash ).then( function( resp ) {
      var data = resp.data;
      data.medico = enriquecerMedico( data.medico );
      return data;
    }, function( resp ) {
      Alertas.agregar( resp.status, "Hubo un problema al cargar los datos del informe" );
      return Futuros.aFuturo( resp, 1 );
    } );
  } //paraReporte
}
