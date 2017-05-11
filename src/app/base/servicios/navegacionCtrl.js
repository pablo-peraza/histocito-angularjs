"use strict";

module.exports = NavegacionCtrl;

NavegacionCtrl.$inject = [ "$state", "$localStorage", "Notificaciones", "$auth",
 "$sessionStorage" ];
function NavegacionCtrl( $state, $localStorage, Notificaciones, $auth, $sessionStorage ) {
  var nav = this;
  nav.salir = salir;
  nav.hoy = moment();
  nav.titulo = titulo;
  nav.icono = icono;
  nav.usuario = $sessionStorage.usuario;
  nav.estados = filtrarEstadosNoDeseados( $state.get() );

  function salir() {
    $auth.logout()
      .then( function() {
        delete $sessionStorage.usuario;
        delete $localStorage.usuario;
        Notificaciones.agregarPersonalizado( 200, "Desconectado con exito" );
        $state.go( "login" );
      } );
  }

  function titulo() {
    if ( $state.current.data && $state.current.data.titulo ) {
      return $state.current.data.titulo;
    } else {
      return "Cargando";
    }
  }

  function icono() {
    if ( $state.current.data && $state.current.data.icono ) {
      return $state.current.data.icono;
    } else {
      return "fa-home";
    }
  }

  function filtrarEstadosNoDeseados( estados ) {
    return _.reject( estados, function( estado ) {
      return estado.abstract || estado.name === "login" ||
       estado.name === "404" || estado.name === "403" ||
       estado.name.match( /^(\w*\.\w*)\..*$/ );
    } );
  }
}
