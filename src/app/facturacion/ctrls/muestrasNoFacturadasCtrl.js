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
  $scope.seleccionarTodas = function( bool, muestras ) {
    return _.map( muestras, function( muestra ) {
      muestra.seleccionada = bool;
      return muestra;
    } );
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
      usuario: Facturas.logica.agruparPorDueno,
      paciente: Facturas.logica.agruparPorPaciente
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

      var facturasNumeradas  = _.map( facturas, function( factura ) {
        var numeroMuestra = _.pluck( factura.detalle, "numero" )[0];
        var facturaSoho = _.find( resp.data.invoices, function( fs ) {
          var existeLinea = _.find( fs.line_items, function( ls ) {
            return ls.name === numeroMuestra;
          } );
          return existeLinea !== undefined;
        } );
        if ( !_.isUndefined( facturaSoho ) ) {
          factura.consecutivo = facturaSoho.invoice_number;
        }
        return factura;
      } );
      Facturas.rest.guardarTodas( facturasNumeradas ).then( ok, error ).finally( finalmente );
    }
    if ( confirm( "¿Está seguro que desea aceptar todas las facturas?" ) ) {
      facturas = _.map( facturas, function( factura ) {
        factura.cargando = true;
        factura.pagos = [];
        return factura;
      } );
      Facturas.rest.guardarTodasZoho( facturas ).then( ok, error );
    }
  };

  $scope.facturarZoho = function( facturas ) {
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
    if ( confirm( "¿Está seguro que desea enviar las facturas a zoho?" ) ) {
      facturas = _.map( facturas, function( factura ) {
        factura.cargando = true;
        factura.pagos = [];
        return factura;
      } );
      Facturas.rest.facturarZoho( facturas ).then( ok, error ).finally( finalmente );
    }
  };
  $scope.authtokenApi = function(  ) {
    function ok( resp ) {
      Alertas.agregar( resp.status );
      alert( JSON.stringify( resp ) );
    }

    function finalmente( resp ) {
      alert( "Listo" );
    }
    if ( confirm( "¿Está seguro que desea probar el obtener token del API?" ) ) {

      Facturas.rest.authtokenApi( ).then( ok, error ).finally( finalmente );
    }
  };

  $scope.aceptar = function( factura ) {
    factura.cargando = true;

    return Facturas.rest.guardar( factura )
    .then(function primerThen(resp) {
      return Facturas.rest.guardarfacturaZoho(factura)
      .then(function thenZoho(respZoho) {
        factura.consecutivo = respZoho.data.invoice.invoice_number;
        factura.id = resp.data
        return Facturas.rest.guardar( factura )
        .then(function (respFinal) {
          Alertas.agregar(respFinal.status);
          return true;
        })
      })
    })
    .catch(function(error) {
      console.error( error );
      Alertas.agregar( resp.status, "Ocurrió un error al guardar la factura: " + error );
    })
    .finally(function () {
      factura.cargando = false;
    });
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
    if ( _.isUndefined( $scope.filtros ) ) {
      $scope.filtros = [ { "cobrada": [ "No" ] }, { "estado": [ "completada", "registrada", "diagnostico", "analisis" ] } ];
    }
    Muestras.rest.buscar( $scope.datos.elementoActual, 50,
      $scope.datos.filtro, $scope.filtros )
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
  $scope.aplicarDimension = function( activas ) {
    activas[0].cobrada =  [ "No" ];
    $scope.filtros = activas;
    $scope.buscar();
  };

} //ctrl
