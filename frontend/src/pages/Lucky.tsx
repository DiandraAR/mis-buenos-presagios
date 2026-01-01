import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomByCategory } from '../api/frasesApi'
import { getDailyContent } from '../utils/dailyContent'
import '../styles/pageLayout.css'

export default function Lucky() {
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [texto, setTexto] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [loading, setLoading] = useState(true)

  const config = {
    key: 'lucky',
    limit: 2,
    emptyMessage: 'Las señales se aquietaron.',
  }

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sonidos/lucky.mp3')
    }
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  const stopSound = () => {
    audioRef.current?.pause()
    audioRef.current && (audioRef.current.currentTime = 0)
  }

  const cargar = async () => {
    stopSound()
    setLoading(true)
    setTexto('Un duende leyó las hojas…')
    playSound()

    const result = await getDailyContent(config, () =>
      getRandomByCategory('lucky')
    )

    if (result.locked) {
      setTexto(result.message || null)
      setLocked(true)
    } else {
      setTexto(result.data?.message || null)
      setLocked(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(cargar, 2500)
    return () => {
      clearTimeout(timer)
      stopSound()
    }
  }, [])

  return (
    <div className="page-container">
      <h1 className="page-title">Augurios</h1>

      {texto && (
        <p className={`page-text fade-text ${loading ? 'subtle' : locked ? 'muted' : ''}`}>
          {texto}
        </p>
      )}

      {!locked && !loading && (
        <button className="page-button" onClick={cargar}>
          Otra señal
        </button>
      )}

      <button className="back-btn" onClick={() => navigate('/')}>
        ← Regresar
      </button>
    </div>
  )
}







