"use strict";

module.exports = FormMuestraCtrl;

function configurarTeclado( $scope, hotkeys, $timeout ) {
  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+return",
      description: "Guardar la muestra",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $timeout( function() {
          document.getElementById( "enviarForm" ).click();
        }, 10 );
      }
    } )
    .add( {
      combo: "mod+shift+return",
      description: "Editar la muestra",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.editar( $scope.datos );
      }
    } )
    .add( {
      combo: "mod+backspace",
      description: "Cancelar edición",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $timeout( function() {
          document.getElementById( "resetForm" ).click();
        }, 10 );
      }
    } )
    .add( {
      combo: "mod+left",
      description: "Paso Anterior",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.anterior();
      }
    } )
    .add( {
      combo: "mod+right",
      description: "Paso Siguiente",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        $scope.siguiente();
      }
    } );
} //configurarTeclado

function esCupula( nombre ) {
  return /c[úu]pula/i.test( nombre );
}

FormMuestraCtrl.$inject = [
  "$rootScope",
  "$scope",
  "$window",
  "$location",
  "params",
  "hotkeys",
  "Muestras",
  "Alertas",
  "$route",
  "$modal",
  "Tabs",
  "$timeout",
  "Credenciales"
];
function FormMuestraCtrl( $root, $scope, $window, $location, params, hotkeys, Muestras, Alertas,
                         $route, $modal, Tabs, $timeout, Credenciales ) {
  var original;
  $scope.limpiarAutorizados = limpiarAutorizados;
  $scope.cambiarSecuencia = function( sec ) {
    if ( sec === undefined ) {
      sec = "";
    }
    var str = "" + sec;
    var pad = "00000";
    var ans = pad.substring( 0, pad.length - str.length ) + str;
    $scope.datos.muestra.consecutivoManual = ans;
    $scope.datos.muestra.consecutivo = $scope.datos.fecha + ans;
  };
  $scope.datos = {
    muestra: params.muestra,
    procedimiento: params.procedimiento,
    dueno: params.dueno,
    expediente: params.expediente,
    medico: params.medico,
    clinica: params.clinica,
    autorizados: _.map( params.autorizados, displayUsuario ),
    fecha: new Date().getFullYear() + "-"
  };
  $scope.minimo = moment().subtract( 1, "y" ).startOf( "day" );
  restriccionFur( $scope.datos.procedimiento );

  //watch para setear los correos de notificacion
  $scope.$watch(
    function() {

      //no encontré una mejor forma de hacer esta verificacion
      if ( $scope.datos.muestra.editando && !!$scope.datos.expediente &&
          !!$scope.datos.expediente.ficha && !!$scope.datos.expediente.ficha.datosContacto &&
          !!$scope.datos.expediente.ficha.datosContacto.correos ) {
        return $scope.datos.expediente.ficha.datosContacto.correos;
      }
      return undefined;
    },
    function( nuevo, viejo ) {
      if ( !!nuevo && !!viejo && nuevo !== viejo ) {
        $scope.datos.muestra.correos = angular.copy( _.map( nuevo, "correo" ) );
      }
    }
  );

  if ( $scope.datos.muestra !== 404 ) {
    configurarTeclado( $scope, hotkeys, $timeout );
    $scope.tabs = Muestras.tabs.generar( $scope.datos.muestra.id,
      Credenciales.credenciales().tipoUsuario === "Médico" );
  }

  function error( resp ) {
    Alertas.agregar( resp.status );
  } //error

  function pasar( resp ) {
    Alertas.agregar( resp.status );
    $scope.datos.muestra = resp.data;
  }

  function deLista( resp ) {
    Alertas.agregar( resp.status );
    delete $scope.datos.muestra.estadoAnterior;
    $scope.datos.muestra.estado = resp.data.lista[0].estado;
  }

  function descargar() {
    $scope.datos.cargando = false;
  }

  $scope.aRegistrada = function( muestra ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( muestra.id ).aRegistrada().then( pasar, error ).finally( descargar );
    }
  };

  $scope.analizar = function( muestra ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( muestra.id ).aAnalisis().then( deLista, error ).finally( descargar );
    }
  };

  $scope.adiagnostico = function( muestra ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( muestra.id ).aDiagnostico().then( deLista, error )
      .finally( descargar );
    }
  };

  function modal() {
    return $modal.open( {
      templateUrl: "motivo.html",
      controller: "MotivoCtrl",
      backdrop: "static"
    } );
  } //modal

  $scope.pausar = function( muestra ) {
    modal().result.then(
      function( res ) {
        if ( !$scope.datos.cargando ) {
          $scope.datos.cargando = true;
          Muestras.rest.estados( muestra.id ).aEspera( res ).then( pasar, error )
          .finally( descargar );
        }
      } );
  };

  $scope.editar = function( datos ) {
    if ( $root.puedePasar( [ $root.permisos.laboratorio, $root.permisos.digitador ] ) ) {
      original = angular.copy( datos );
      $scope.datos.muestra.editando = true;
      $scope.datos.muestra.consecutivoManual = $scope.datos.muestra.consecutivo.split( "-" )[1];
    }
  };

  $scope.eliminar = function( muestra ) {
    var texto = "¿Está seguro que desea eliminar la muestra?";

    function ok( resp ) {
      Alertas.agregar( resp.status );
      $location.path( "/inicio/pacientes/muestras" );
    } //ok
    function error( resp ) {
      console.debug( resp );
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    } //ultima
    var temp = confirm( texto );
    if ( !muestra.nuevo && muestra.estado === "Registrada" && $root.puedePasar( [
      $root.permisos.laboratorio, $root.permisos.digitador ] ) && !$scope.datos.cargando && temp ) {
      $scope.datos.cargando = true;
      Muestras.rest.eliminar( muestra.id ).then( ok, error )["finally"]( ultima );
    } //if
  };

  function opcionesFinales() {
    return $modal.open( {
      templateUrl: "opciones.html",
      backdrop: "static",
      keyboard: false,
      size: "lg",
      controller: "ModalOpcionesCtrl"
    } );
  }

  function modalImagenesMedico( muestra ) {
    return $modal.open( {
      templateUrl: "imagenesMedico.html",
      backdrop: "static",
      keyboard: false,
      size: "lg",
      controller: "imagenesMedico",
      resolve: {
        muestra: function() {
          return muestra;
        }
      }
    } );
  } //modalImagenesMedico

  $scope.modalImagenesMedico = function( muestra ) {
    modalImagenesMedico( muestra ).result.then( function( nueva ) {
      $scope.datos.muestra = nueva;
    } );
  };

  $scope.guardar = function( muestra, procedimiento, paciente, dueno, medico, clinica, autorizados,
    form ) {
    function ok( resp ) {
      Alertas.limpiar();
      Alertas.agregar( resp.status, "Se ha guardado la muestra correctamente" );
      if ( muestra.id ) {
        muestra.editando = false;
      } else {
        var copia = angular.copy( muestra );
        copia.id = resp.data;
        opcionesFinales().result.then( function( res ) {
          var acciones = {
            ver: function() {
              $scope.datos.muestra.editando = false;
              $scope.datos.muestra.nuevo = false;
            },
            cero: function() {
              $scope.datos = {
                fecha: new Date().getFullYear() + "-",
                muestra: {
                  nuevo: true,
                  editando: true,
                  estado: "Registrada",
                  imagenes: [],
                  correos:[]
                },
                autorizados: []
              };
            },
            conEquipo: function() {
              $scope.datos = {
                fecha: new Date().getFullYear() + "-",
                muestra: {
                  nuevo: true,
                  editando: true,
                  estado: "Registrada",
                  imagenes: [],
                  correos:[],
                  equipo: muestra.equipo
                },
                autorizados: []
              };
            },
            conMedico: function() {
              $scope.datos = {
                fecha: new Date().getFullYear() + "-",
                muestra: {
                  nuevo: true,
                  editando: true,
                  estado: "Registrada",
                  imagenes: [],
                  correos:[]
                },
                dueno: dueno,
                medico: medico,
                clinica: clinica,
                autorizados: autorizados
              };
            },
            conTodo: function() {
              $scope.datos = {
                fecha: new Date().getFullYear() + "-",
                muestra: {
                  nuevo: true,
                  editando: true,
                  estado: "Registrada",
                  imagenes: [],
                  correos:[],
                  equipo: muestra.equipo
                },
                dueno: dueno,
                medico: medico,
                clinica: clinica,
                autorizados: autorizados
              };
            }
          };
          acciones[res.accion]();

          if ( $scope.datos.muestra.id ) {
            $location.path( "/inicio/pacientes/muestras/" + $scope.datos.muestra.id );
          }
          $scope.tabs[0].activo = true;
          Alertas.limpiar();
          $scope.datos.muestra.fechaToma = $root.hoy.startOf( "day" );
          $scope.$broadcast( "show-errors-reset" );
          form.$setPristine();
        } );
      } // else
    } //ok

    function realizarGuardado() {
      if ( !muestra.consecutivoManual && !muestra.consecutivo ) {
        return Alertas.agregar( 400, "Precaución", "Debe completar el campo de la secuencia" );
      }
      muestra.consecutivo = muestra.consecutivo ?
      muestra.consecutivo : ( new Date().getFullYear() + "-" ) + muestra.consecutivoManual;
      Muestras.guardar( muestra, procedimiento, dueno, paciente, medico, clinica, autorizados )
      .then( ok, error );
    }

    if ( muestra.editando ) {
      $scope.$broadcast( "show-errors-check-validity" );
      if ( !$scope.datos.cargando && form.$valid ) {
        $scope.datos.cargando = true;
        Muestras.guardarPaciente( paciente ).then( function( resp ) {
          paciente.id = resp.data;
          if ( dueno && !dueno.id ) {
            Muestras.guardarMedico( angular.copy( dueno ) ).then( function( resp ) {
              dueno.id = resp.data;
              realizarGuardado();
            }, error );
          } else {
            realizarGuardado();
          }
        }, error )["finally"]( function() {
          $scope.datos.cargando = false;
        } );
      }
    }

  };

  $scope.cancelar = function( form ) {
    if ( !$scope.datos.cargando ) {
      $scope.$broadcast( "show-errors-reset" );
      form.$setPristine();
      if ( $scope.datos.muestra.nuevo ) {
        $window.history.back();
      } else {
        $scope.datos = original;
        $scope.datos.fecha = new Date().getFullYear() + "-";
        $scope.datos.muestra.editando = false;
      }
    }
  };

  $scope.siguiente = function() {
    $scope.tabs = Tabs.siguiente( $scope.tabs );
  };

  $scope.anterior = function() {
    $scope.tabs = Tabs.anterior( $scope.tabs );
  };

  $scope.tabActual = function() {
    return Tabs.actual( $scope.tabs );
  };

  $scope.$watch( "datos.procedimiento", function( proc ) {
    restriccionFur( proc );
  } );

  function restriccionFur( proc ) {
    if ( proc && proc.origen ) {
      Muestras.obtenerOrigen( proc.origen ).then( function( resp ) {
        $scope.fechaFur = esCupula( resp.data.descripcion ) ?
        moment().subtract( 99, "y" ) : moment( $scope.minimo );
      } );
    }
  }

  //Correos adicionales
  function agregarCorreo( correo ) {
    var email = correo.trim();
    if ( /[^\s@]+@[^\s@]+\.[^\s@]{2,}/.test( email ) ) {
      if ( !_.any( $scope.datos.muestra.correos, function( em ) { return em === email; } ) ) {
        $scope.datos.muestra.correos.push( email );
      }
    } else {
      $scope.correosInvalidos.push( email );
    }
  }

  $scope.agregarMultiplesCorreo = function( correos ) {
    if ( correos ) {
      $scope.correosInvalidos = [];
      _.forEach( correos.split( /,\s|,/ ), function( correo ) {
        agregarCorreo( correo );
      } );
      delete $scope.datos.temporal.correo;
    }
  };

  $scope.borrarCorreo = function( correo ) {
    $scope.datos.muestra.correos = _.reject( $scope.datos.muestra.correos,
      function( c ) { return c === correo; }
    );
  };

  //Usuario
  $scope.buscarUsuarios = function( valor ) {
    return Muestras.buscarUsuarios( 0, 10, valor ).then( function( resp ) {
      var lista = resp.data.lista;
      return _.map( lista, displayUsuario );
    } );
  };

  $scope.borrarAutorizado = function( usuario ) {
    $scope.datos.autorizados = _.reject( $scope.datos.autorizados, function( aut ) {
      return aut.id.toString() === usuario.id.toString();
    } );
  };

  function displayUsuario( usuario ) {
    usuario.nombreCompleto = ( usuario.nombre + " " + usuario.apellidos ).trim();
    usuario.display = usuario.nombreCompleto + " (" + usuario.correo + ")";
    return usuario;
  }

  $scope.agregarUsuario = function( usuario ) {
    if ( usuario ) {
      var existe = _.any( $scope.datos.autorizados, function( usu ) {
        return usu.id.toString() === usuario.id.toString();
      } );
      if ( !existe ) {
        $scope.datos.autorizados.push( usuario );
      }
      delete $scope.datos.temporal.autorizados;
    }
  };

  //Medico
  $scope.buscarMedicos = function( valor ) {
    return Muestras.buscarMedicos( 0, 10, valor ).then( function( resp ) {
      var lista = resp.data.lista;
      return _.map( lista, function( med ) {
        med.nombreCompleto = med.titulo + " " + med.nombre;
        return med;
      } );
    } );
  };

  //Clínica
  $scope.buscarClinicas = function( valor ) {
    return Muestras.buscarClinicas( 0, 10, valor ).then( function( resp ) {
      var lista = resp.data.lista;
      return _.map( lista, function( cli ) {
        return cli;
      } );
    } );
  };

  //Dueno
  $scope.editadoMedico = editadoDueno;
  $scope.guardadoMedico = guardadoDueno;
  $scope.canceladoMedico = canceladoDueno;
  var temporalMedico;

  function editadoDueno( expediente ) {
    temporalMedico = angular.copy( expediente );
    $scope.datos.edicionMedica = true;
  } //editadoMedico

  function guardadoDueno( expediente ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
    } //function
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //function
    $scope.datos.cargando = true;
    Muestras.guardarPaciente( expediente ).then( ok, error ).finally( function() {
      $scope.datos.cargando = false;
    } );
  } //guardadoMedico

  function canceladoDueno() {
    $scope.datos.edicionMedica = false;
    $scope.datos.expediente = temporalMedico;
  } //canceladoMedico

  function limpiarAutorizados() {
    delete $scope.datos.clinica;
    delete $scope.datos.medico;
    $scope.datos.autorizados = [];
    $scope.datos.muestra.correos = [];
  }
} //function
