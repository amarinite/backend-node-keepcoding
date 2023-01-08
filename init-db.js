const readline = require("readline");
const Anuncio = require("./models/Anuncio");

async function main() {
  const reiniciarBBDD = await preguntaSiNo(
    "Seguro que quieres eliminar la base de datos? [s/n] "
  );
  if (!reiniciarBBDD) {
    process.exit();
  }

  const connection = require("./lib/connectMongoose");
  await initAnuncios();
  connection.close();
}

main().catch((err) => console.log("Ha habido un error", err));

async function initAnuncios() {
  const result = await Anuncio.deleteMany();
  console.log(`Borrados ${result.deletedCount} anuncios.`);

  const inserted = await Anuncio.insertMany([
    {
      nombre: "Bicicleta",
      venta: true,
      precio: 230.15,
      foto: "bici.jpg",
      tags: ["estilo de vida", "deporte"],
    },
    {
      nombre: "iPhone 3GS",
      venta: false,
      precio: 50.0,
      foto: "iphone.jpg",
      tags: ["estilo de vida", "movil", "tech"],
    },
    {
      nombre: "Nintendo Switch",
      venta: true,
      precio: 275.0,
      foto: "switch.jpg",
      tags: ["videojuegos", "juego", "tech"],
    },
    {
      nombre: "Pelota",
      venta: false,
      precio: 3.5,
      foto: "pelota.jpg",
      tags: ["deporte", "juego"],
    },
    {
      nombre: "Tostadora",
      venta: true,
      precio: 17.5,
      foto: "tostadora.jpg",
      tags: ["cocina", "estilo de vida"],
    },
  ]);
  console.log(`Creados ${inserted.length} nuevos anuncios.`);
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    interface.question(texto, (respuesta) => {
      interface.close();
      if (respuesta.toLowerCase() === "s") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
