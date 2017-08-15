"use strict";

module.exports = MuestrasMedicoCtrl;

MuestrasMedicoCtrl.$inject = [
    "$rootScope",
    "$scope",
    "muestras",
    "dimensiones",
    "elementoActual",
    "FacturasREST",
    "Muestras",
    "ExpedientesREST",
    "Alertas",
    "Credenciales",
    "$modal",
    "Usuarios"
  ];
function MuestrasMedicoCtrl( $rootScope, $scope, muestras, dimensiones, elementoActual,
    FacturasREST, Muestras, ExpedientesREST, Alertas, Credenciales, $modal, Usuarios ) {
  $scope.datos = {
    muestras: muestras,
    dimensiones: dimensiones,
    elementoActual: elementoActual
  };

  $scope.seleccionadas = function( muestras ) {
    return _.filter( muestras, function( muestra ) {
      return muestra.seleccionada;
    } );
  };

  $scope.seleccionarTodas = function( bool, muestras ) {
    return _.map( muestras, function( muestra ) {
      muestra.seleccionada = bool;
      return muestra;
    } );
  };
  $scope.sonDeEstado = function( muestras, campo, estado ) {
    if ( _.isEmpty( muestras ) || _.isUndefined( muestras ) ) {
      return false;
    }
    return _.every( muestras, function( muestra ) {
      return muestra[campo] === estado;
    } );
  };

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;
    $scope.datos.seleccionadas = false;

    function ok( resp ) {
      $scope.datos.muestras = procesarResultado( resp.data );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;

    }
    Muestras.rest.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, $scope.filtros )
    .then( ok, error ).finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.aplicarDimension = function( activas ) {
    $scope.filtros = activas;
    $scope.buscar();
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.muestras.lista.concat( res.lista );
      return res;
    } );
  };

  function modalEnvioCorreos( muestra ) {
    return $modal.open( {
      templateUrl: "mensajeCortoCorreoMuestras.html",
      controller: "EnviarCorreosCtrl",
      size:"lg",
      backdrop: "static",
      resolve: {
        muestras: function() {
          var usuariosParaCorreos = {listaUsuarios: []};
          return Muestras.rest.obtener( muestra.id ).then( function( resulMuestra ) {
            return ExpedientesREST.obtener( resulMuestra.data.idExpediente ).then(
              function( resultExp ) {
                resultExp.data.ficha.datosContacto.enviarCorreo = false;
                return Usuarios.obtener( resulMuestra.data.idUsuario )
                .then( function( resuldueno ) {
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
                    "correosAdicionales": "",
                    "comentarioAdicional": "",
                    "expediente": resultExp.data,
                    "usuariosParaCorreos": usuariosParaCorreos.listaUsuarios
                  };
                } );
              } );
          } );
        }
      }
    } );
  } //modalEnvioCorreos

  $scope.enviarCorreoConComentario = function( muestra ) {
    modalEnvioCorreos( muestra ).result.then( function( res ) {
        function ok( resp ) {
          Alertas.agregar( resp.status );
        } //ok
        function error( resp ) {
          console.error( resp );
          Alertas.agregar( resp.status );
        } //error
        function ultima() {
          $scope.datos.cargando = false;
          if ( res.expediente.ficha.datosContacto.enviarCorreo ) {
            muestra.enviada = true;
          }//ultima
        }
        var listaTemp = _.chain( res.usuariosParaCorreos )
          .filter( function( usuario ) {
            return usuario.enviarcorreo === true;
          } )
          .map( function( usuario ) {
            return usuario.nombre + " " +
            usuario.apellidos + " <" + usuario.correo + ">";
          } )
          .value();
        if ( res.correosAdicionales && ( res.correosAdicionales ).trim().length ) {
          var correos = res.correosAdicionales.split( /[ :;,-]+/ );
          listaTemp = listaTemp.concat( correos );
        }
        if ( res.muestra.estado === "Completada" && !$scope.datos.cargando &&
        $rootScope.puedePasar( [
          $rootScope.permisos.laboratorio, $rootScope.permisos.patologo, $rootScope.permisos.medico
        ] ) ) {
          $scope.datos.cargando = true;
          ExpedientesREST.guardar( res.expediente );
          Muestras.rest.enviarCorreo( res.muestra.id, res.comentarioAdicional, listaTemp,
          res.expediente.ficha.datosContacto.enviarCorreo )
          .then( ok, error ).finally( ultima );
        }
      } );
  };
} //ctrl
