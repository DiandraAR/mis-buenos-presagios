import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req, res) {
  try {
    const result = await pool.query(
      "SELECT texto, categoria FROM frases ORDER BY id ASC"
    )
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: "Error al cargar frases" })
  }
}
