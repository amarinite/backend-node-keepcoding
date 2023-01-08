"use strict";

const express = require("express");
const Anuncio = require("../../models/Anuncio");

const router = express.Router();

// GET /api/anuncios -> Develve la lista completa de anuncios
router.get("/", async (req, res, next) => {
  try {
    // filtros
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // selección de campos
    const fields = req.query.fields;

    // ordenación
    const sort = req.query.sort;

    const filtro = {};

    if (nombre) {
      filtro.nombre = nombre;
    }
    if (venta) {
      filtro.venta = venta;
    }
    if (precio) {
      if (precio.includes("-")) {
        const precios = precio.split("-");
        if (precios[0] === "") {
          filtro.precio = { $lte: precios[1] };
        } else if (precios[1] === "") {
          filtro.precio = { $gte: precios[0] };
        } else {
          filtro.precio = { $gte: precios[0], $lte: precios[1] };
        }
      } else {
        filtro.precio = precio;
      }
    }

    if (tags) {
      filtro.tags = { $in: tags };
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, fields, sort);
    res.json({ results: anuncios });
  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios/tags -> Lista de tags disponibles
router.get("/tags", async (req, res, next) => {
  try {
    const listaTags = await Anuncio.tagsExistentes();
    res.json({ results: listaTags });
  } catch (err) {
    next(err);
  }
});

// GET /api/anuncios/(id) -> Devuelve un anuncio concreto
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    // buscar el anuncio en la BD
    const anuncio = await Anuncio.findById(id);
    res.json({ result: anuncio });
  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios -> Crear un anuncio
router.post("/", async (req, res, next) => {
  try {
    const anuncioData = req.body;
    const anuncio = new Anuncio(anuncioData);
    const guardarAnuncio = await anuncio.save();
    res.json({ result: guardarAnuncio });
  } catch (err) {
    next(err);
  }
});

// PUT /api/anuncios/(id) -> Actualizar un anuncio
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncioData = req.body;

    const anuncioActualizado = await Anuncio.findOneAndUpdate(
      { _id: id },
      anuncioData,
      {
        new: true,
      }
    );

    res.json({ result: anuncioActualizado });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/anuncios/(id) -> Borrar un anuncio
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const anuncio = await Anuncio.findById(id);
    if (!anuncio) {
      return next(createError(404));
    }
    await Anuncio.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
