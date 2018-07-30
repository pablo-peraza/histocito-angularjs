"use strict";

module.exports = formUsuarioCtrl;

formUsuarioCtrl.$inject = [
  "$rootScope",
  "$scope",
  "$window",
  "$location",
  "Usuarios",
  "Alertas",
  "Selecciones",
  "usuario",
  "procedimientos",
  "hotkeys"
];
function formUsuarioCtrl( $rootScope, $scope, $window, $location, Usuarios,
  Alertas, Selecciones, usuario, procedimientos, hotkeys ) {

  function configurarTeclado( $scope, hotkeys ) {
    hotkeys.bindTo( $scope )
      .add( {
        combo: "mod+return",
        description: "Salvar el usuario",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          if ( $scope.datos.usuario.editando ) {
            $scope.guardar( $scope.datos.usuario );
          }
        }
      } )
      .add( {
        combo: "mod+shift+return",
        description: "Editar el usuario",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.editar( $scope.datos.usuario );
        }
      } )
      .add( {
        combo: "mod+backspace",
        description: "Cancelar",
        allowIn: [ "input", "select", "textarea" ],
        callback: function() {
          $scope.cancelar();
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
  }

  function encontrarPrecio( precios ) {
    return function( id ) {
      return _.find( precios, function( prec ) {
        return prec.idProcedimiento === id;
      } );
    };
  } //funcion

  function preciosUsuario( procedimientos, precios ) {
    var posibles = encontrarPrecio( precios );
    return _.map( procedimientos, function( proc ) {
      var temp = posibles( proc.id );
      if ( temp ) {
        proc.precioUsuario = temp.monto.centavos;
      } else {
        proc.precioUsuario = proc.precio.centavos;
      }
      proc.articulo = _.find( usuario.articulos, {"item_id": temp.idArticulo} );
      return proc;
    } );
  } //function

  function aPrecios( procedimientos ) {
    return _.map( procedimientos, function( proc ) {
      return {
        idProcedimiento: proc.id,
        idArticulo: proc.articulo ? proc.articulo.item_id : null,
        monto: {
          centavos: proc.precioUsuario
        }
      };
    } );
  } //function

  configurarTeclado( $scope, hotkeys );
  var original, procedimientosOriginales;
  $scope.datos = {
    usuario: usuario,
    procedimientos: preciosUsuario( procedimientos, usuario.precios )
  };

  $scope.cargarMasMuestras = function() {
    $scope.datos.cargando = true;

    function ok( resp ) {
      $scope.datos.muestras.cantidad = resp.data.cantidad;
      $scope.datos.muestras.lista = $scope.datos.muestras.lista.concat( resp.data.lista );
      $scope.datos.elementoActual += 50;
    }

    function error( resp ) {
      console.error( resp );
      Alertas.agregar( resp.status,
        "Hubo un error al cargar el historial de muestras del paciente" );
    }

    function finalmente() {
      $scope.datos.cargando = false;
    }
    Usuarios.muestras( $scope.datos.usuario.id,
      $scope.datos.elementoActual, 50 ).then( ok, error ).finally( finalmente );
  };

  if ( $scope.datos.usuario !== 404 ) {
    Selecciones.usuario().then( function( resp ) {
      $scope.datos.tipos = resp.lista;
    } );
    if ( !$scope.datos.usuario.nuevo ) {
      $rootScope.titulo += usuario.nombre + " " + usuario.apellidos;
      $scope.datos.elementoActual = 0;
      if ( usuario.configuracion.tipoUsuario === "Médico" ) {
        $scope.datos.muestras = {
          cantidad: 0,
          lista: []
        };
        $scope.cargarMasMuestras();
      }
    }
    $scope.tabs = Usuarios.tabs.generar( usuario.configuracion ?
      usuario.configuracion.tipoUsuario : "" );

    $scope.editar = function( usuario ) {
      if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) ) {
        original = angular.copy( usuario );
        procedimientosOriginales = angular.copy( $scope.datos.procedimientos );
        usuario.editando = true;
      } //if
    };

    $scope.guardar = function( usuario ) {
      if ( usuario.configuracion.tipoUsuario === "Médico" ) {
        usuario.precios = aPrecios( $scope.datos.procedimientos );
      }

      function ok( resp ) {
        if ( usuario.nuevo ) {
          $location.path( "/inicio/admin/usuarios/" + resp.data );
          Alertas.agregar( resp.status );
        } else {
          usuario.editando = false;
          Alertas.agregar( resp.status );
        }
      } //ok

      function error( resp ) {
        console.error( resp );
        Alertas.agregar( resp.status );
      } //error
      function ultima() {
        $scope.datos.cargando = false;
      }
      if ( $rootScope.puedePasar( [ $rootScope.permisos.laboratorio ] ) && !$scope.datos.cargando ) {
        $scope.datos.cargando = true;
        Usuarios.guardar( usuario ).then( ok, error ).finally( ultima );
      }
    }; //guardar

    $scope.existe = function( usuario ) {
      $location.path( "/inicio/admin/usuarios/" + usuario.id );
      Alertas.agregar( 300, "El usuario ya existe" );
    };

    $scope.siguiente = function() {
      $scope.tabs = Usuarios.tabs.siguiente( $scope.tabs );
    };

    $scope.anterior = function() {
      $scope.tabs = Usuarios.tabs.anterior( $scope.tabs );
    };
    $scope.tabActual = function() {
      return Usuarios.tabs.actual( $scope.tabs );
    };

    $scope.$watch( "datos.usuario.configuracion.tipoUsuario", function( val ) {
      if ( val ) {
        $scope.tabs = Usuarios.tabs.gestionTipo( $scope.tabs, val === "Médico" );
        if ( val !== "Médico" ) {
          delete $scope.datos.usuario.precios;
        }
      }
    } );
  } //if !404

  $scope.atras = function() {
    $window.history.back();
  };

  $scope.cancelar = function() {
    if ( !$scope.datos.cargando ) {
      if ( $scope.datos.usuario.nuevo ) {
        $window.history.back();
      } else {
        $scope.datos.usuario = original;
        $scope.datos.procedimientos = procedimientosOriginales;
        $scope.datos.usuario.editando = false;
      }
    }
  };
} //Controller
