"use strict";

module.exports = diagnosticoCitologiaCtrl;

function plantilla( nombre ) {
  return "pacientes/diagnosticos/directivas/citologias/htmls/" + nombre + ".html";
} //function

function tabs() {
  return [ {
    titulo: "Interpretación Citológica",
    contenido: plantilla( "interpretacion" ),
    icono: "fa-eye"
  }, {
    titulo: "Recomendaciones",
    contenido: plantilla( "recomendaciones" ),
    icono: "fa-list"
  }, {
    titulo: "Frotis",
    contenido: plantilla( "frotis" ),
    icono: "fa-tint"
  }, {
    titulo: "Otros Hallazgos",
    contenido: plantilla( "hallazgos" ),
    icono: "fa-thumb-tack"
  }, {
    titulo: "Valor Estrogénico",
    contenido: plantilla( "hormonal" ),
    icono: "fa-dashboard"
  }, {
    titulo: "Comentarios",
    contenido: plantilla( "comentarios" ),
    icono: "fa-pencil"
  }, {
    titulo: "Revisión",
    contenido: plantilla( "revision" ),
    icono: "fa-search"
  } ];
}

var configurarTeclado = require( "../../modelos/configurarTeclado.js" );

function encontrarSeleccion( selecciones, aencontrar ) {
  return selecciones[_.indexOf( selecciones, aencontrar )];
} //encontrarSeleccion

function cargarSelecciones( $scope, Selecciones, mayorCincoCinco ) {
  Selecciones.lesiones()
    .then( function( resp ) {
      $scope.lesiones = resp.lista;
    } );
  Selecciones.control()
    .then( function( resp ) {
      $scope.cuantos = resp.lista;
    } );
  Selecciones.patologia()
    .then( function( resp ) {
      $scope.patologias = resp.lista;
    } );
  Selecciones.patron()
    .then( function( resp ) {
      $scope.patrones = resp.lista;
      $scope.modelo.valorEstrogenico = $scope.modelo.valorEstrogenico ?
      $scope.modelo.valorEstrogenico : encontrarSeleccion( $scope.patrones,
        "Adecuado para la edad del paciente" );
    } );
  Selecciones.flora()
    .then( function( resp ) {
      $scope.floras = resp.lista;
      if ( _.isUndefined( $scope.modelo.hallazgos ) ) {
        $scope.modelo.hallazgos = {
          reaccionInflamatoria: {
            activado: true,
            opcion: 2
          },
          floraBacteriana: {
            activado: true,
            opcion: mayorCincoCinco ? $scope.floras[0] : $scope.floras[1],
            valor: 2
          },
          citolisis: {
            activado: false
          }
        };
        $scope.bloquearCitolisis = $scope.modelo.hallazgos.floraBacteriana.opcion === "Cocoide";
      }
    } );
} //cargarSelecciones

diagnosticoCitologiaCtrl.$inject = [ "$scope", "$modal", "hotkeys", "Tabs", "Selecciones" ];
function diagnosticoCitologiaCtrl( $scope, $modal, hotkeys, Tabs, Selecciones ) {
  configurarTeclado( $scope, hotkeys );
  $scope.tabs = tabs();

  $scope.esMayordeCinquentayCinco = function() {
    if ( $scope.expediente.ficha.fechaNacimiento ) {
      return moment( $scope.expediente.ficha.fechaNacimiento )
        .add( 55, "y" )
        .isBefore( moment() );
    }
    return false;
  };

  function esCupula() {
    return /c[úu]pula/i.test( $scope.origen.nombre );
  }
  if ( $scope.modelo.nuevo ) {
    $scope.modelo.recomendaciones = {
      controlRutina: true,
      repetirEstudio: false,
      estudioColposcopico: false,
      tomarBiopsia: false,
      controlCitologico: {
        activado: false
      },
      estudioMolecular: {
        activado: false
      },
      repetirDespuesTratamiento: {
        activado: false
      }
    };
    $scope.modelo.frotis = {
      celulasEndocervicales: !( esCupula() || $scope.esMayordeCinquentayCinco() ),
      metaplasia: !( esCupula() || $scope.esMayordeCinquentayCinco() )
    };
  } //if
  cargarSelecciones( $scope, Selecciones, $scope.esMayordeCinquentayCinco() );

  $scope.activarLesion = function( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.estudioColposcopico = true;
      $scope.modelo.recomendaciones.controlRutina = false;
    } else {
      delete $scope.modelo.lesiones.tipo;
      $scope.modelo.recomendaciones.estudioColposcopico = false;
      $scope.modelo.recomendaciones.controlRutina = true;
    }
  };
  $scope.activarReaccionInflamatoria = function( val ) {
    if ( val ) {
      $scope.modelo.hallazgos.reaccionInflamatoria.opcion = 0;
    }
  };
  /**  RECOMENDACIONES **/
  $scope.invalidarControlRutina = invalidarControlRutina;
  $scope.invalidarRepetirSimple = invalidarRepetirSimple;
  $scope.invalidarControlCitologico = invalidarControlCitologico;
  $scope.invalidarRepetirTratamiento = invalidarRepetirTratamiento;

  function invalidarControlRutina( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.controlRutina = false;
    }
  } //invalidarControlRutina

  function invalidarRepetirSimple( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.repetirEstudio = false;
    }
  } //invalidarRepetirEstudio

  function invalidarControlCitologico( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.controlCitologico.activado = false;
      delete $scope.modelo.recomendaciones.controlCitologico.opcion;
    }
  } //invalidarControlCitologico

  function invalidarRepetirTratamiento( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.repetirDespuesTratamiento.activado = false;
      delete $scope.modelo.recomendaciones.repetirDespuesTratamiento.antiInflamatorio;
      delete $scope.modelo.recomendaciones.repetirDespuesTratamiento.hormonal;
      delete $scope.modelo.recomendaciones.repetirDespuesTratamiento.estrogenizar;
    }
  } //invalidarRepetirDespuesTratamiento

  //----------------------
  var antesInadecuado;

  function preModalFrotis( modelo, titulo, respaldo ) {
    if ( modelo.valor ) {
      respaldo();
      modalFrotis( modelo, titulo );
    } else {
      if ( antesInadecuado ) {
        $scope.modelo = antesInadecuado;
      }
      $scope.bloqueoTotal = false;
      delete modelo.enZonas;
      delete modelo.limitado;
      delete modelo.inadecuado;
    }
  } //function
  $scope.modalMalPreservado = function( modelo, titulo ) {
    function respaldo() {
      antesInadecuado = angular.copy( $scope.modelo );
      antesInadecuado.frotis.materialMalPreservado.valor = false;
    }
    preModalFrotis( modelo, titulo, respaldo );
  };
  $scope.modalHemorragico = function( modelo, titulo ) {
    function respaldo() {
      antesInadecuado = angular.copy( $scope.modelo );
      antesInadecuado.frotis.materialHemorragico.valor = false;
    }
    preModalFrotis( modelo, titulo, respaldo );
  };

  function modalFrotis( modelo, titulo ) {
    $modal.open( {
      templateUrl: "pacientes/diagnosticos/directivas/citologias/htmls/modalfrotis.html",
      controller: "modalFrotisCtrl",
      backdrop: "static",
      size: "lg",
      keyboard: false,
      resolve: {
        modelo: function() {
          return modelo;
        },
        titulo: function() {
          return titulo;
        }
      }
    } ).result.then( function( res ) {
      modelo = res;
      if ( res.inadecuado ) {
        $scope.repetir( res.inadecuado, "inadecuado" );
      }
    } );
  } //function

  $scope.reaccionInflamatoria = function( val ) {
    if ( val === 4 ) {
      $scope.modelo.recomendaciones.repetirDespuesTratamiento.activado = true;
      $scope.modelo.recomendaciones.repetirDespuesTratamiento.antiInflamatorio = true;
      invalidarControlRutina( val );
    }
  };
  $scope.initEnUno = function( modelo ) {
    if ( modelo.activado ) {
      modelo.opcion = 1;
    }
  };
  $scope.eritrocitos = function( val ) {
    if ( val >= 3 ) {
      $modal.open( {
        templateUrl: "modalEtitrocitos.html",
        controller: "modalEtitrocitosCtrl",
        backdrop: "static",
        keyboard: false,
        resolve: {
          modelo: function() {
            return $scope.modelo.frotis.materialHemorragico;
          }
        }
      } )
        .result.then( function( modelo ) {
          $scope.modelo.frotis.materialHemorragico = modelo;
        } );
    }
  };
  var acelularTemp;
  $scope.repetir = function( val, activante ) {
    function inhabilitar( campo ) {
      var llaves = _.keys( $scope.modelo[campo] );
      _.forEach( llaves, function( llave ) {
        if ( llave !== activante ) {
          var temp = $scope.modelo[campo][llave];
          if ( _.isObject( temp ) ) {
            $scope.modelo[campo][llave].activado = false;
          }
          if ( _.isBoolean( temp ) ) {
            $scope.modelo[campo][llave] = false;
          }
        }
      } );
    } //inhabilitar
    if ( val ) {
      acelularTemp = angular.copy( $scope.modelo );
      acelularTemp.frotis.acelular = false;
      $scope.modelo.lesiones.activado = false;
      inhabilitar( "recomendaciones" );
      inhabilitar( "frotis" );
      inhabilitar( "hallazgos" );
      delete $scope.modelo.valorEstrogenico;
      $scope.modelo.recomendaciones.repetirEstudio = true;
      $scope.modelo.comentarios = "<h4><strong><span>La calidad de la muestra fue insatisfactoria. Leer descripción.</span></strong></h4>";
    } else {
      if ( acelularTemp ) {
        $scope.modelo = acelularTemp;
      }
    }
    $scope.bloqueoTotal = val;
  };

  $scope.repetirEstudio = function( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.repetirEstudio = true;
      $scope.modelo.recomendaciones.controlRutina = false;
      $scope.modelo.comentarios = "<h4><strong><span>Se observa celularidad en límites mínimos para diagnóstico</span></strong></h4>";
    }
  };

  $scope.cocobacilos = function( val ) {
    if ( val ) {
      $scope.modelo.hallazgos.floraBacteriana = {
        activado: true,
        opcion: $scope.floras[0],
        valor: 3
      };
      $scope.repetirDespuesTratamiento( val );
    }
  };

  $scope.repetirDespuesTratamiento = function( val ) {
    if ( val ) {
      $scope.modelo.recomendaciones.repetirDespuesTratamiento.activado = true;
      $scope.modelo.recomendaciones.controlRutina = false;
      $scope.modelo.recomendaciones.controlCitologico.activado = false;
      delete $scope.modelo.recomendaciones.controlCitologico.opcion;
    }
  };

  $scope.cambiarFlora = function( val ) {
    if ( !val ) {
      delete $scope.modelo.hallazgos.floraBacteriana.opcion;
      delete $scope.modelo.hallazgos.floraBacteriana.valor;
      $scope.bloquearCitolisis = false;
    }
  };
  var citolisisTemp;
  $scope.cocoide = function( opcion, valor ) {

    if ( opcion === "Cocoide" ) {
      $scope.bloquearCitolisis = true;
      if ( valor >= 3 ) {
        $scope.modelo.hallazgos.cocobacilosVaginosis = true;
        $scope.repetirDespuesTratamiento( true );
      }
    } else {
      $scope.bloquearCitolisis = false;
      if ( opcion === "Bacilar" && valor === 4 ) {
        citolisisTemp = angular.copy( $scope.modelo.hallazgos.citolisis );
        $scope.modelo.hallazgos.citolisis.activado = true;
        $scope.modelo.hallazgos.citolisis.opcion = 2;
      } else {
        if ( citolisisTemp ) {
          $scope.modelo.hallazgos.citolisis = citolisisTemp;
        }
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
} //ctrl
