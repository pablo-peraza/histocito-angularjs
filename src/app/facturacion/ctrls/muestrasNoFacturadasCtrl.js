"use strict";

module.exports = MuestasNoFacturadasCtrl;

MuestasNoFacturadasCtrl.$inject = [
  "$scope",
  "muestras",
  "elementoActual",
  "hotkeys",
  "$location",
  "Muestras",
  "Alertas",
  "Facturas"
];
function MuestasNoFacturadasCtrl( $scope, muestras, elementoActual, hotkeys, $location, Muestras,
  Alertas, Facturas ) {

  var dimensiones = [ {
    cobrada: [ "No" ]
  }, {
    estado: [ "completada" ]
  } ];

  $scope.datos = {
    muestras: muestras,
    elementoActual: elementoActual
  };

  $scope.tabs = Facturas.tabs.generar();
  $scope.vacio = _.isEmpty;
  $scope.hoy = function() {
    return moment();
  };

  $scope.marcarTodas = function( sel ) {
    $scope.datos.muestras.lista = _.map( $scope.datos.muestras.lista, function( muestra ) {
      if ( muestra.estado === "Completada" && muestra.cobrada === "No" ) {
        muestra.seleccionada = sel;
      }
      return muestra;
    } );
  };

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status );
  }

  $scope.seleccionadas = function( muestras ) {
    return Facturas.logica.seleccionadas( muestras, true );
  };
  $scope.noProcesadas = Facturas.logica.noProcesadas;

  $scope.seleccionar = function( muestras ) {
    $scope.datos.muestrasSeleccionadas = muestras;
    delete $scope.datos.agrupacion;
    $scope.datos.cargando = false;
    $scope.tabs[1].activo = true;
  };

  $scope.agrupar = function( muestras, agruparPor ) {
    var funciones = {
      medico: Facturas.logica.agruparPorMedico,
      clinica: Facturas.logica.agruparPorClinica,
      usuario: Facturas.logica.agruparPorDueno
    };
    $scope.datos.agrupadas = funciones[agruparPor]( muestras );
  };

  $scope.facturar = function( grupos ) {
    function finalmente() {
      $scope.datos.cargando = false;
      $scope.datos.facturasGeneradas = Facturas.logica.facturar( grupos,
        $scope.datos.preciosMedicos, $scope.datos.preciosProcs, $scope.datos.agrupacion );
      $scope.tabs[2].activo = true;
    }

    function ok( resp ) {
      $scope.datos.preciosMedicos = resp.data.lista;
      var ids = _.map( $scope.datos.muestrasSeleccionadas, function( muestra ) {
        return muestra.procedimiento.id;
      } );
      Facturas.rest.preciosProcedimientos( ids ).then( function( resp ) {
        $scope.datos.preciosProcs = resp.data.lista;
      }, error ).finally( finalmente );
    } //ok

    if ( !$scope.datos.cargando ) {
      $scope.datos.cargando = true;
      var llaves = _.union( _.map( $scope.datos.muestrasSeleccionadas, function( dato ) {
        return ( !!dato.dueno ) ? dato.dueno.id : undefined;
      } ) );

      // elimina los valores nulos: false, null, 0, "", undefined y NaN
      var ids = _.compact( llaves );
      Facturas.rest.preciosMedicos( ids ).then( ok, error );
    }
  };
  $scope.total = Facturas.logica.total;

  $scope.aceptarTodas = function( facturas ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
      $scope.datos.facturasGeneradas = Facturas.logica
      .actualizarEnMasa( facturas, resp.data.facturas );
    }

    function finalmente() {
      _.forEach( facturas, function( factura ) {
        factura.cargando = false;
      } );
    }
    if ( confirm( "¿Está seguro que desea aceptar todas las facturas?" ) ) {
      facturas = _.map( facturas, function( factura ) {
        factura.cargando = true;
        factura.pagos = [];
        return factura;
      } );
      Facturas.rest.guardarTodas( facturas ).then( ok, error ).finally( finalmente );
    }
  };
  $scope.aceptar = function( factura ) {
    factura.cargando = true;
    factura.pagos = [];

    function ok( resp ) {
      factura.id = resp.data;
      Alertas.agregar( resp.status );
    }

    function finalmente() {
      factura.cargando = false;
    }
    Facturas.rest.guardar( factura ).then( ok, error ).finally( finalmente );
  };
  $scope.rechazar = function( factura ) {
    $scope.datos.facturasGeneradas = Facturas.logica
    .quitar( factura, $scope.datos.facturasGeneradas );
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
    Muestras.rest.buscar( $scope.datos.elementoActual, 50, $scope.datos.filtro, dimensiones )
    .then( ok, error ).finally( finalmente );
  };

  $scope.buscar = function() {
    $scope.datos.elementoActual = 0;
    $scope.filtrar( function( res ) {
      return res;
    } );
  };

  $scope.cargarMas = function() {
    $scope.filtrar( function( res ) {
      res.lista = $scope.datos.muestras.lista.concat( res.lista );
      return res;
    } );
  };
} //ctrl
