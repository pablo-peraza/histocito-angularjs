  $stateProvider.state( "inicio.MODULO.ARCHIVO-lista", {
    templateUrl: "MODULO/vistas/listaNOMBRE.html",
    url: "/ARCHIVO?pagina&cantidad",
    controller: "ListadoNOMBRECtrl",
    controllerAs: "vm",
    resolve: {
      listado: listarNOMBRE
    },
    data: {
      titulo: "Listado de NOMBRE",
      icono: "fa-list",
      menu: "Listar NOMBRE"
    }
  } );

$stateProvider.state( "inicio.MODULO.ARCHIVO-uno", {
    templateUrl: "MODULO/vistas/formNOMBRE.html",
    url: "/ARCHIVO/:id?editar",
    controller: "FormNOMBRECtrl",
    controllerAs: "vm",
    resolve: {
      ARCHIVO: obtenerNOMBRE
    },
    data: {
      titulo: "Form de NOMBRE",
      icono: "fa-file-o",
      menu: "Form NOMBRE"
    }
  } );

listarNOMBRE.$inject = [ "NOMBREAPI", "$stateParams", "$auth", "$q" ];
function listarNOMBRE( NOMBREAPI, $stateParams, $auth, $q ) {
    if ( $auth.getPayload().permisos.ARCHIVO.listar ) {
      return NOMBREAPI.listar( $stateParams.pagina, $stateParams.cantidad );
    }
    return $q.reject( {autenticado: false} );
  }

obtenerNOMBRE.$inject = [ "NOMBREAPI", "$stateParams", "Validaciones", "$q" ];
function obtenerNOMBRE( NOMBREAPI, $stateParams, Validaciones, $q ) {
    if ( Validaciones.dejarPasar( $stateParams, "ARCHIVO" ) ) {
      return NOMBREAPI.obtener( $stateParams.id, $stateParams.editar );
    }
    return $q.reject( {autenticado: false} );
  }
