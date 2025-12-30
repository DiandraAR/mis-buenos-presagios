import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDailyContent } from '../utils/dailyContent'
import '../styles/pageLayout.css'

export default function Lucky() {
  const navigate = useNavigate()

  const [texto, setTexto] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [justLocked, setJustLocked] = useState(false)
  const [loading, setLoading] = useState(true)

  const config = {
    key: 'lucky',
    limit: 2,
    emptyMessage: 'Las señales se aquietaron.',
  }

  const cargar = async () => {
    setLoading(true)

    const result = await getDailyContent(config, async () => {
      const res = await fetch('/api/lucky')
      const data = await res.json()

      return {
        message: data[0]?.texto ?? 'Las hojas guardan silencio…',
      }
    })

    if (result.locked) {
      setTexto(result.message || null)
      setLocked(true)
      setJustLocked(true)
    } else {
      setTexto(result.data?.message || null)
      setLocked(false)
      setJustLocked(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    setTexto('Un duende leyó las hojas…')
    const timer = setTimeout(cargar, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Augurios</h1>

      {texto && (
        <p className={`page-text fade-text ${loading ? 'subtle' : locked ? 'muted' : ''}`}>
          {texto}
        </p>
      )}

      {justLocked && (
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
      )}

      {!locked && !loading && (
        <button className="page-button" onClick={cargar}>
          Otra señal
        </button>
      )}
    </div>
  )
}




