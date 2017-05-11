"use strict";

module.exports = cisUpload;

cisUpload.$inject = [ "urlApi", "$auth", "Upload", "Notificaciones" ];
function cisUpload( urlApi, $auth, Upload, Notificaciones ) {
  return {
    restrict: "EA",
    replace: true,
    templateUrl: "base/vistas/cisUpload.html",
    require: "ngModel",
    scope: true,
    link: link
  };

  function link( $scope, $elem, $attr, ngModelCtrl ) {
    $scope.id = uuid();
    $scope.estados = {
      seleccion: "seleccion",
      previa: "previa",
      subiendo: "subiendo",
      exito: "exito"
    };

    $scope.acepta = $attr.acepta || "";
    $scope.small = $attr.small || false;
    $scope.subirArchivo = subirArchivo;
    $scope.cancelarSubida = cancelarSubida;
    $scope.estado = $scope.estados.seleccion;
    $scope.borrarSeleccion = borrarSeleccion;
    $scope.archivoSeleccionado = archivoSeleccionado;

    function archivoSeleccionado( file ) {
      $scope.estado = $scope.estados.previa;
      $scope.cisArchivo = file;
    }

    $scope.$watch( function() {
      return $scope.$eval( $attr.ngDisabled );
    }, function( val ) {
      if ( val ) {
        $elem.addClass( "deshabilitado" );
      } else {
        $elem.removeClass( "deshabilitado" );
      }
    } );

    function borrarSeleccion() {
      delete $scope.cisArchivo;
      $scope.estado = $scope.estados.seleccion;
    }

    function subirArchivo() {
      $scope.estado = $scope.estados.subiendo;
      $scope.uploaded = 0;
      $scope.upload = Upload.upload(
        {
          url: urlApi + "/api/archivo",
          data: { archivo: $scope.cisArchivo },
          headers: { "Authorization": "Bearer " + $auth.getToken() },
          ignoreLoadingBar: true
        }
      );
      $scope.upload.then( OKupload, ERRupload, EVTupload );

      //Upload.mediaDuration($scope.cisArchivo).then( function(sec) {
      //  duracion = sec;
      //});
    }

    function cancelarSubida() {
      $scope.upload.abort();
      borrarSeleccion();
    }

    function OKupload( result ) {
      $scope.estado = $scope.estados.exito;
      var retorno = {
        resultado: result.data
      };

      if ( $scope.cisArchivo.type.match( "(video|audio)/\*" ) ) {
        Upload.mediaDuration( $scope.cisArchivo ).then( function( sec ) {
          retorno.duracion = sec;
          ngModelCtrl.$setViewValue( retorno );
        } );
      } else {
        ngModelCtrl.$setViewValue( retorno );
      }
    }

    function ERRupload( err ) {
      Notificaciones.agregar( err.status );
    }

    function EVTupload( evt ) {
      $scope.uploaded = evt.loaded;
    }

  }
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {
    var r = Math.random() * 16 | 0,
      v = ( c === "x" ? r : ( r & 0x3 | 0x8 ) );
    return v.toString( 16 );
  } );
}
