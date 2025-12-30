import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req, res) {
  try {
    const result = await pool.query(
      "SELECT texto FROM frases WHERE categoria = 'lucky' ORDER BY RANDOM() LIMIT 1"
    )
    res.status(200).json({ message: result.rows[0]?.texto })
  } catch (error) {
    res.status(500).json({ error: "Error lucky" })
  }
}
