"use strict";

module.exports = ListaMuestraCtrl;

ListaMuestraCtrl.$inject = [
  "$rootScope",
  "$scope",
  "muestras",
  "dimensiones",
  "elementoActual",
  "hotkeys",
  "$location",
  "Muestras",
  "Alertas",
  "$timeout",
  "Credenciales"
];
function ListaMuestraCtrl( $rootScope, $scope, muestras, dimensiones, elementoActual,
    hotkeys, $location, Muestras, Alertas, $timeout, Credenciales ) {
  $scope.datos = {
    muestras: muestras,
    dimensiones: dimensiones,
    elementoActual: elementoActual,
    fecha: new Date().getFullYear() + "-"
  };
  $scope.vacio = _.isEmpty;
  hotkeys.bindTo( $scope )
    .add( {
      combo: "mod+return",
      description: "Nueva muestra",
      allowIn: [ "input", "select", "textarea" ],
      callback: function() {
        if ( $rootScope
          .puedePasar( [ $rootScope.permisos.laboratorio, $rootScope.permisos.digitador ] ) ) {
          $location.path( "/inicio/pacientes/muestras/nuevo" );
        }
      }
    } );

  $scope.resetFiltro = function( muestras ) {
    $scope.seleccion = false;
    $scope.datos.muestras.lista = _.map( muestras, function( muestra ) {
      muestra.seleccionada = false;
      return muestra;
    } );
  };

  $scope.seleccionadas = function( muestras ) {
    return _.filter( muestras, function( muestra ) {
      return muestra.seleccionada;
    } );
  };

  $scope.seleccionarTodas = function( bool, muestras, filtro ) {
    return _.map( muestras, function( muestra ) {
      if ( muestra.diagnosticada === ( filtro === "true" ) ) {
        muestra.seleccionada = bool;
      }
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

  $scope.dimensionesEliminadas = function() {
    if ( Credenciales.estaLogueado() ) {
      var tipo = Credenciales.credenciales().tipoUsuario;
      if ( tipo === "Patólogo" ) {
        return [ "estado", "pagada", "cobrada" ];
      }
      if ( tipo === "Histotecnólogo" ) {
        return [ "pagada", "cobrada" ];
      }
    }
    return [];
  };

  $scope.eliminar = function( muestra ) {
    var texto = "¿Está seguro que desea eliminar la muestra?";

    function ok( resp ) {
      Alertas.agregar( resp.status );
      $timeout( function() {
        $scope.buscar();
      }, 500 );
    } //ok
    function error( resp ) {
      console.debug( resp );
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    } //ultima
    var temp = confirm( texto );
    if ( !muestra.nuevo && muestra.estado === "Registrada" && $rootScope.puedePasar( [
      $rootScope.permisos.laboratorio,
      $rootScope.permisos.digitador
    ] ) && !$scope.datos.cargando && temp ) {
      $scope.datos.cargando = true;
      Muestras.rest.eliminar( muestra.id ).then( ok, error )["finally"]( ultima );
    } //if
  };
  var watchers;

  $scope.filtrar = function( procesarResultado ) {
    $scope.datos.cargando = true;
    $scope.datos.seleccionadas = false;
    watchers = $scope.$$watchers;
    $scope.$$watchers = [];

    function ok( resp ) {
      $scope.datos.muestras = procesarResultado( resp.data );
      $scope.datos.elementoActual += 100;
    }

    function error( resp ) {
      console.error( error );
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      $scope.datos.cargando = false;
      $scope.$$watchers = watchers;
    }
    var tipo = Credenciales.credenciales().tipoUsuario;
    if ( tipo === "Citotecnólogo" ) {
      if ( $scope.filtros && $scope.filtros.length ) {
        $scope.filtros.push( {categoria: [ "citología" ]} );
      } else {
        $scope.filtros = [ {
          categoria: [ "citología" ]
        }, {
          estado: [ "diagnostico", "espera" ]
        } ];
      }
    }
    if ( tipo === "Patólogo" ) {
      $scope.filtros.push( {
        estado: [ "diagnostico" ]
      } );
    }
    Muestras.rest.buscar( $scope.datos.elementoActual, 100, $scope.datos.filtro, $scope.filtros )
    .then( ok, error ).finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    delete $scope.datos.muestras;
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

  function error( resp ) {
    console.debug( resp );
    Alertas.agregar( resp.status );
  } //error

  function pasar( resp ) {
    Alertas.agregar( resp.status );
    $scope.datos.muestras.lista = Muestras
    .actualizarEnMasa( $scope.datos.muestras.lista, resp.data.lista );
  }

  function descargar() {
    $scope.datos.cargando = false;
  }

  $scope.aRegistrada = function( muestras ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( _.pluck( muestras, "id" ) ).aRegistrada().then( pasar, error )
      .finally( descargar );
    }
  };

  $scope.analizar = function( muestras ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( _.pluck( muestras, "id" ) ).aAnalisis().then( pasar, error )
      .finally( descargar );
    }
  };

  $scope.adiagnostico = function( muestras ) {
    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      Muestras.rest.estados( _.pluck( muestras, "id" ) ).aDiagnostico().then( pasar, error )
      .finally( descargar );
    }
  };

  $scope.completar = function( muestra ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
      muestra.estado = "Completada";
    } //ok
    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //error
    function ultima() {
      $scope.datos.cargando = false;
    }
    if ( muestra.estado !== "Completada" && !$scope.datos.cargando && $rootScope.puedePasar( [
      $rootScope.permisos.laboratorio, $rootScope.permisos.patologo ] ) ) {
      if ( confirm( "¿Está seguro que desea aceptar el diagnóstico?" ) ) {
        $scope.datos.cargando = true;
        Muestras.rest.estados( muestra.id ).aCompletada().then( ok, error ).finally( ultima );
      }
    } //if
  };

  $scope.listasParaAceptar = function( muestras ) {
    if ( _.isEmpty( muestras ) || _.isUndefined( muestras ) ) {
      return false;
    }
    return _.every( muestras, function( muestra ) {
      return muestra.estado === "En diagnostico" && muestra.diagnosticada;
    } );
  };

  $scope.completarVarias = function( muestras ) {
    var temp =
    "¿Está seguro que desea aceptar el diagnóstico para cada una de las muestras seleccionadas?";

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status );
    } //error
    if ( confirm( temp ) ) {
      $scope.datos.cargando = true;
      _.forEach( muestras, function( muestra ) {
        Muestras.rest.estados( muestra.id ).aCompletada().then( function() {
          muestra.estado = "Completada";
        }, error );
      } );
      $scope.datos.cargando = false;
    }
  };
  $scope.observadores = function() {
    return observadores( $scope );
  };

  function observadores( scope ) {
    var watchers = ( scope.$$watchers ) ? scope.$$watchers.length : 0;
    var child = scope.$$childHead;
    while ( child ) {
      watchers += ( child.$$watchers ) ? child.$$watchers.length : 0;
      child = child.$$nextSibling;
    }
    return watchers;
  }
} //ctrl
