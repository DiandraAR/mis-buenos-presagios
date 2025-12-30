import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const frases = pgTable("frases", {
  id: serial("id").primaryKey(),
  texto: text("texto").notNull(),
  categoria: text("categoria").notNull(),
});


  