"use strict";

module.exports = ObjetoBase;

function ObjetoBase() {
}

ObjetoBase.prototype.cargar = cargar;

function cargar( json ) {
  var that = this;
  if ( json ) {
    if ( _.isArray( json ) ) {
      return _.map( json, function( elem ) {
        return that.prototype.instanciar( elem );
      } );
    } else {
      return that.prototype.instanciar( json );
    }
  }
}
