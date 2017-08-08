"use strict";

module.exports = SubidaImagenesCtrl;

var aceptados = [ "image/png", "image/jpeg", "image/bmp", "image/tiff" ];

function filtrarAceptados( archivos ) {
  return _.reject( archivos, function( archivo ) {
    return _.isUndefined( _.find( aceptados, function( tipo ) {
      return tipo === archivo.type;
    } ) );
  } );
} //function

function componer( url, archivo, unico ) {
  var obj = {
    url: url,
    archivo: archivo,
    subido: false,
    unico: unico,
    progreso: 0,
    valido: function() {
      return !_.isUndefined( this.titulo ) && !_.isUndefined( this.descripcion );
    }
  };
  if ( unico ) {
    obj.titulo = "Sin titulo";
    obj.descripcion = "Sin descripción";
  }
  return obj;
} //function

function datosForm( imagen, titulo, descripcion ) {
  return {
    url: "/api/imagenes/",
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data; boundary=----Ciris5330963b44ae2234e6cb7105"
    },
    data: {
      imagen: imagen,
      titulo: titulo,
      descripcion: descripcion
    }
  };
} //function

function quitar( archivos, url ) {
  return _.reject( archivos, function( archivo ) {
    return archivo.url === url;
  } );
} //function

SubidaImagenesCtrl.$inject = [ "$scope", "$timeout", "$upload", "Alertas" ];
function SubidaImagenesCtrl( $scope, $timeout, $upload, Alertas ) {
  $scope.archivos = [];
  $scope.vacio = _.isEmpty;
  if ( ( _.isEmpty( $scope.modelo ) || _.isUndefined( $scope.modelo ) ) && !$scope.unico ) {
    $scope.modelo = [];
  }
  $scope.todosValidos = function() {
    return !_.every( $scope.archivos, function( el ) {
      return el.valido();
    } );
  };
  $scope.eliminar = function( archivos ) {
    $scope.archivos = _.difference( $scope.archivos, _.isArray( archivos ) ?
    archivos : [ archivos ] );
  };
  $scope.seleccionar = function( $files ) {
    var filtrados = filtrarAceptados( $files );
    if ( $scope.unico && _.first( filtrados ) ) {
      filtrados = [ _.first( filtrados ) ];
    }
    _.forEach( filtrados, function( archivo ) {
      if ( window.FileReader ) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL( archivo );
        fileReader.onload = function( e ) {
          $timeout( function() {
            $scope.archivos.push( componer( e.target.result, archivo, $scope.unico ) );
          } );
        };
      } //if
    } );
  }; //seleccionar

  $scope.iniciarTodos = function() {
    _.forEach( $scope.archivos, $scope.iniciar );
  };

  $scope.iniciar = function( archivo ) {
    archivo.bloqueado = true;
    var form = datosForm( archivo.archivo, archivo.titulo, archivo.descripcion );
    $upload.upload( form ).then( function( data ) {
      if ( $scope.unico ) {
        $scope.modelo = data.data;
      } else {
        $scope.modelo.push( data.data );
      }
      archivo.subido = true;
      Alertas.agregar( 201 );
      $timeout( function() {
        $scope.archivos = quitar( $scope.archivos, archivo.url );
      }, 1500 );
    }, function( error ) {
      console.error( error );
      Alertas.agregar( error.status );
    }, function( evt ) {
      archivo.progreso = parseInt( 100.0 * evt.loaded / evt.total, 10 );
    } ).finally( function() {
      archivo.bloqueado = false;
    } );
  };
} //ctrl
