"use strict";

module.exports = reporteCtrl;

reporteCtrl.$inject = [
  "$rootScope",
  "$scope",
  "$window",
  "$location",
  "$http",
  "Alertas",
  "urlApi",
  "node"
];
function reporteCtrl( $rootScope, $scope, $window, $location, $http, Alertas, urlApi, node ) {
  $scope.datos = {
    "desde": "2017-",
    "hasta": "2017-"
  };

  function ok( resp ) {
    $scope.datos.muestras = {};
    $scope.datos.muestras.lista = _.map( resp.data, function( muestra ) {
      muestra.consecutivo = muestra.numero;
      return muestra;
    } );
    $scope.datos.muestras.porUsuario = _.groupBy( $scope.datos.muestras.lista, function( muestra ) {
      return muestra.medico ? muestra.medico._id : "sin_asignar";
    } );
    _.forEach( $scope.datos.muestras.porUsuario, function( medicoId ) {

      medicoId.nombre = medicoId[0].medico.nombre;
      medicoId.id = medicoId[0].medico._id;
      medicoId.isOpen = true;
    } );
    $scope.opcion = "medico";
    $scope.datos.muestras.cantidad = resp.data.length;
  }

  function error( resp ) {
    console.error( resp );
    Alertas.agregar( resp.status, "Hubo un error al cargar el historial de muestras del paciente" );
  }

  $scope.buscar = function( searchForm ) {
    if ( !searchForm.$invalid ) {
      $http.post( node + "/api/reportes",
      {"desde": $scope.datos.desde, "hasta": $scope.datos.hasta, "categoria": $scope.categoria} )
      .then( ok, error );
    }
  };
  $scope.agruparPor = function( opcion ) {
    if ( opcion !== "medico" ) {
      $scope.datos.muestras.porUsuario = _.groupBy( $scope.datos.muestras.lista,
        function( muestra ) {
        if ( !muestra._id.equipo ) {
          return "sin_asignar";
        }
        var usuario = muestra._id.equipo[opcion];
        return usuario ? usuario._id : "sin_asignar";
      } );
    } else {
      $scope.datos.muestras.porUsuario = _.groupBy( $scope.datos.muestras.lista,
        function( muestra ) {
        return muestra.medico ? muestra.medico.id : "sin_asignar";
      } );
    }
    _.forEach( $scope.datos.muestras.porUsuario, function( medicoId ) {
      var usuario = false;
      if ( opcion !== "medico" ) {
        if ( !medicoId[0]._id.equipo ) {
          usuario = false;
        } else {
          usuario = medicoId[0]._id.equipo[opcion];
        }
      } else {
        usuario = medicoId[0].medico;
      }
      if ( !_.isUndefined( usuario ) && usuario ) {
        if ( usuario._id ) {
          medicoId.id = usuario._id;
          medicoId.nombre = usuario.nombre + ( usuario.apellidos ?
            ( " " + usuario.apellidos ) : "" ) ;
        } else {
          medicoId.nombre = medicoId[0].medico.nombre;
          medicoId.id = medicoId[0].medico._id;
        }
      } else {
        medicoId.nombre = "Sin Asignar";
      }
      medicoId.isOpen = true;
    } );
  };
  $scope.exportarExcel = function() {
    var table = document.createElement( "TABLE" );
    var row = _.clone( document.getElementsByTagName( "tr" ) );
    _.forEach( row, function( r ) {
      if ( !_.isUndefined( r ) ) {
        var newTR  = r.cloneNode( true );
        table.appendChild( newTR );
      }
    } );
    var result = require( "../../../../recursos/js/Export2Excel.js" )( table, "biff2", "test.xls" );
    return result;
  };
} //Controller
