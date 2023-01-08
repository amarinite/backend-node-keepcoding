"use strict";

const mongoose = require("mongoose");

// definir el esquema del anuncio
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, index: true },
  foto: String,
  tags: [String],
});

// definir un método estático para filtrar queries
anuncioSchema.statics.lista = function (filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};
// método estático para poder obtener todos los tags
anuncioSchema.statics.tagsExistentes = function () {
  const query = Anuncio.distinct("tags");
  return query.exec();
};

// crear el modelo
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// exportar el modelo
module.exports = Anuncio;
