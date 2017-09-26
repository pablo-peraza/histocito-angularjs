"use strict";

module.exports = cisArchivoAdjunto;
cisArchivoAdjunto.$inject = [ "urlApi", "$upload", "Imagenes" ];
function cisArchivoAdjunto( urlApi, $upload, Imagenes ) {
  return {
    restrict: "EA",
    templateUrl: "base/htmls/archivoAdjunto.html",
    scope: {
      modelo: "=ngModel",
      procesando: "="
    },
    link: link
  };

  function link( $scope ) {
    $scope.seleccionar = seleccionar;
    $scope.subir = subir;
    $scope.quitar = quitar;
    $scope.files = [];

    function seleccionar( $files ) {
      var nuevos = filtrarNuevos( $scope.modelo, $files );
      if ( nuevos.length ) {
        var promesas = _.map( nuevos, subir );
        $scope.procesando = true;
        Promise.all( promesas ).then( function( result ) {
          _.forEach( result, function( res ) {
            $scope.modelo.push( res );
          } );
          $scope.procesando = false;
        } );
      }
    }

    function filtrarNuevos( existentes, agregados ) {
      return _.filter( agregados, function( file ) {
        return !_.find( existentes, function( f ) {
          return f.titulo === file.name;
        } );
      } );
    }

    function subir( archivo ) {
      var form = datosForm( archivo, archivo.name, urlApi );
      return $upload.upload( form ).then( function( result ) {
        return Imagenes.obtener( result.data ).then( function( resp ) {
          return {
            titulo: resp.data.titulo,
            url: resp.data.url
          };
        } );
      } );
    }

    function quitar( url ) {
      $scope.modelo = _.reject( $scope.modelo, function( file ) {
        return file.url === url;
      } );
    }

    function datosForm( archivo, nombre, urlApi ) {
      return {
        url: urlApi + "/api/imagenes/",
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data; boundary=----Ciris5330963b44ae2234e6cb7105"
        },
        data: {
          imagen: archivo,
          titulo: nombre,
          esArchivo: true,
          descripcion: ""
        }
      };
    }
  }
}
