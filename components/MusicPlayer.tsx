'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Ocultar tooltip después de unos segundos
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay bloqueado por el navegador
          console.log('Autoplay bloqueado')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Música personalizada
  const musicUrl = '/music/Novo Amor - Haven (from Life Is Strange) [official audio].mp3'

  return (
    <>
      {/* Elemento de audio */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Botón flotante del reproductor */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && !isPlaying && (
                <motion.div
                  className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg border border-white/10 bg-charcoal/90 px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <span className="mr-2">🎵</span>
                  Activa la música para una mejor experiencia
                  {/* Flecha del tooltip */}
                  <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-b border-r border-white/10 bg-charcoal/90" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón principal */}
            <motion.button
              onClick={togglePlay}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-charcoal/80 backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(201,169,98,0.2)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {/* Anillo animado cuando está reproduciendo */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gold/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Icono */}
              <motion.div
                className="relative z-10"
                animate={{
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isPlaying ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {isPlaying ? (
                  // Icono de pausa con barras animadas (ecualizador)
                  <div className="flex items-end gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-gold"
                        animate={{
                          height: ['8px', '16px', '8px'],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  // Icono de música
                  <svg
                    className="h-5 w-5 text-white/70 transition-colors group-hover:text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            {/* Botón de cerrar (opcional) */}
            <motion.button
              onClick={() => setIsVisible(false)}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal text-[10px] text-white/40 transition-colors hover:text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              aria-label="Ocultar reproductor"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
