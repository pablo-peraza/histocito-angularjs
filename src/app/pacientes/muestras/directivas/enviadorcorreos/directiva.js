"use strict";

module.exports = cisEnviadorCorreos;

cisEnviadorCorreos.$inject = [
  "$rootScope",
  "$modal",
  "Muestras",
  "ExpedientesREST",
  "Usuarios",
  "Alertas"
];

function cisEnviadorCorreos( $rootScope, $modal, Muestras, ExpedientesREST, Usuarios, Alertas ) {
  return {
    restrict: "E",
    templateUrl: "pacientes/muestras/directivas/enviadorcorreos/plantilla.html",
    scope: {
      muestra: "=",
    },
    link: function( $scope ) {
      $scope.cargando = false;
      $scope.enviarCorreoMuestrasUna = enviarCorreoMuestrasUna;

      function modalEnvioCorreosMuestrasUna( muestra ) {
        return $modal.open( {
          templateUrl: "pacientes/muestras/htmls/mensajeCortoCorreoMuestraUna.html",
          controller: "EnviarCorreosCtrl",
          size:"lg",
          backdrop: "static",
          resolve: {
            muestras: function() {
              var usuariosParaCorreos = {listaUsuarios: []};
              return Muestras.rest.obtener( muestra.id ).then( function( resulMuestra ) {
                return ExpedientesREST.obtener( resulMuestra.data.idExpediente )
                .then( function( resultExp ) {
                  resultExp.data.ficha.datosContacto.enviarCorreo = false;
                  return Usuarios.obtener( resulMuestra.data.idUsuario ).then( function( resuldueno ) {
                    resuldueno.data.enviarcorreo = false;
                    resuldueno.data.tipoUsuario = "dueno";
                    delete resuldueno.data.id;
                    delete resuldueno.data.precios;
                    delete resuldueno.data.telefonos;
                    delete resuldueno.data.configuracion;
                    usuariosParaCorreos.listaUsuarios.push( resuldueno.data );
                    _.forEach( resulMuestra.data.autorizados, function( idUsuarioAutorizado ) {
                      Usuarios.obtener( idUsuarioAutorizado ).then( function( resulAutorizado ) {
                        resulAutorizado.data.enviarcorreo = false;
                        resulAutorizado.data.tipoUsuario = "autorizado";
                        delete resulAutorizado.data.id;
                        delete resulAutorizado.data.precios;
                        delete resulAutorizado.data.telefonos;
                        delete resulAutorizado.data.configuracion;
                        usuariosParaCorreos.listaUsuarios.push( resulAutorizado.data );
                      } );
                    } );
                    return {
                      "muestra": resulMuestra.data,
                      "expediente": resultExp.data,
                      "usuariosParaCorreos": usuariosParaCorreos.listaUsuarios
                    };
                  } );
                } );
              } );
            }
          }
        } );
      }

      function enviarCorreoMuestrasUna( muestra ) {
        modalEnvioCorreosMuestrasUna( muestra ).result.then( function( res ) {
          function ok( resp ) {
            Alertas.agregar( resp.status );
            muestra.enviada = true;
          } //ok
          function error( resp ) {
            console.error( resp );
            Alertas.agregar( resp.status );
          } //error
          function ultima() {
            $scope.cargando = false;
          }
          var listaTemp = [];
          _.forEach( res.usuariosParaCorreos, function( usuario ) {
            if ( usuario.enviarcorreo ) {
              listaTemp.push( usuario.nombre + " " + usuario.apellidos + " <" + usuario.correo + ">" );
            }

            res.comentarioAdicional = ( typeof res.comentarioAdicional === "undefined" ) ?
            "" : res.comentarioAdicional;
          } );

          if ( typeof res.correosAdicionales !== "undefined" ) {
            if ( res.correosAdicionales.length !== 0 || ( res.correosAdicionales ).trim() ) {
              var correos = res.correosAdicionales.split( /[ :;,-]+/ );
              _.forEach( correos, function( correo ) {
                  listaTemp.push( " <" + correo + ">" );
                } );
            }
          }

          if ( res.muestra.estado === "Completada" && !$scope.cargando && $rootScope.puedePasar( [
            $rootScope.permisos.laboratorio, $rootScope.permisos.patologo, $rootScope.permisos.medico
          ] ) ) {
            $scope.cargando = true;
            ExpedientesREST.guardar( res.expediente );
            Muestras.rest.enviarCorreo( res.muestra.id, res.comentarioAdicional, listaTemp,
            res.expediente.ficha.datosContacto.enviarCorreo )
            .then( ok, error ).finally( ultima );
          }
        } );
      }
    },
  };
}
