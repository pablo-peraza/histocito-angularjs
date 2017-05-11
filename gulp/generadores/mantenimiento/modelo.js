"use strict";

module.exports = NOMBRE;

function NOMBRE( nombre, _id ) {
  this.nombre = nombre;
  this._id = _id;
}

NOMBRE.cargar = cargar;

function cargar( json ) {
  if ( json ) {
    if ( _.isArray( json ) ) {
      return _.map( json, function( elem ) {
        return instanciar( elem );
      } );
    } else {
      return instanciar( json );
    }
  }
}

function instanciar( json ) {
  return new NOMBRE( json.nombre, json._id );
}
