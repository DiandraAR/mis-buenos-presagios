import "dotenv/config";
import { db } from "../db";
import { frases } from "../db/schema";

async function seed() {
  await db
    .insert(frases)
    .values([
      // MAGIC
      { categoria: "magic", texto: "Los duendes han dejado una señal para ti." },
      { categoria: "magic", texto: "Un hilo invisible guía tus pasos hoy." },
      { categoria: "magic", texto: "Algo pequeño traerá un gran cambio." },
      { categoria: "magic", texto: "La espera tenía sentido, ahora lo sabes." },
      { categoria: "magic", texto: "El mensaje llegó, aunque no lo esperabas." },
      { categoria: "magic", texto: "Hoy el misterio juega a tu favor." },
      { categoria: "magic", texto: "Un gesto simple alterará el rumbo." },
      { categoria: "magic", texto: "Los duendes aprueban tu intuición." },
      { categoria: "magic", texto: "Nada fue en vano, aunque lo pareciera." },
      { categoria: "magic", texto: "El momento correcto se acerca." },

      // LUCKY
      { categoria: "lucky", texto: "La suerte se acomoda en silencio." },
      { categoria: "lucky", texto: "Un pequeño acierto abrirá otro mayor." },
      { categoria: "lucky", texto: "El azar sonríe, aunque no lo notes aún." },
      { categoria: "lucky", texto: "Algo se alineó a tu favor hoy." },
      { categoria: "lucky", texto: "Una oportunidad se desliza suavemente." },
      { categoria: "lucky", texto: "El presagio es leve, pero positivo." },
      { categoria: "lucky", texto: "La fortuna se mueve despacio, pero llega." },
      { categoria: "lucky", texto: "No ignores lo sencillo: ahí está la suerte." },
      { categoria: "lucky", texto: "Un detalle trae buena fortuna." },
      { categoria: "lucky", texto: "Hoy no es un día cualquiera." },

      // NAUGHTY (chascarillos)
      { categoria: "naughty", texto: "Ups… eso no era parte del plan." },
      { categoria: "naughty", texto: "Alguien se adelantó… y se rió." },
      { categoria: "naughty", texto: "No mires así, fue divertido." },
      { categoria: "naughty", texto: "Un pequeño caos mejora el día." },
      { categoria: "naughty", texto: "Eso salió mal… pero gracioso." },
      { categoria: "naughty", texto: "Nadie dijo que fuera serio." },
      { categoria: "naughty", texto: "A veces el error es intencional." },
      { categoria: "naughty", texto: "Demasiado tarde para fingir inocencia." },
      { categoria: "naughty", texto: "Alguien empujó la suerte un poco." },
      { categoria: "naughty", texto: "Shhh… no era secreto." },
    ])
    .onConflictDoNothing();

  console.log("Frases insertadas correctamente");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error al hacer seed:", err);
    process.exit(1);
  });


