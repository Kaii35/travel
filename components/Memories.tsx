'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface MemoriesProps {
  onBack: () => void
  onFinish: () => void
}

// Fotos del último viaje
const photos = [
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.58 PM.jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.58 PM (1).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.58 PM (2).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.59 PM.jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.59 PM (1).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.59 PM (2).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.59 PM (3).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.51.59 PM (4).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.00 PM.jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.00 PM (1).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.00 PM (2).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.00 PM (3).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.00 PM (4).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.01 PM.jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.01 PM (1).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.01 PM (2).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.01 PM (3).jpeg',
  '/last-travel/WhatsApp Image 2026-04-18 at 10.52.02 PM.jpeg',
]

// Mensajes que aparecen cada 2 fotos
const messages = [
  "Qué bien la pasamos ese día...",
  "De mis viajes favoritos",
  "Siempre es una aventura contigo",
  "Buenos momentos",
  "Esto hay que repetirlo",
  "Qué recuerdos tan buenos",
  "La pasamos increíble",
  "Momentos que no se olvidan",
]

// Mensaje especial para la última foto
const lastMessage = "Gracias por existir"

export default function Memories({ onBack, onFinish }: MemoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Autoplay del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= photos.length - 1) {
          setIsAutoPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 5500)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Determinar si mostrar mensaje (cada 2 fotos o en la última)
  const messageIndex = Math.floor(currentIndex / 2)
  const isLastPhoto = currentIndex === photos.length - 1
  const showMessage = (currentIndex > 0 && currentIndex % 2 === 1) || isLastPhoto

  // Obtener el mensaje actual
  const currentMessage = isLastPhoto
    ? lastMessage
    : messages[messageIndex % messages.length]

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Fondo con degradado */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-black" />

      {/* Efecto de luz */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          whileHover={{ x: -5 }}
        >
          <span>←</span>
          <span>Volver</span>
        </motion.button>

        <h1 className="bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 bg-clip-text font-serif text-2xl font-light tracking-wide text-transparent sm:text-3xl md:text-4xl lg:text-5xl">
          Nuestros Recuerdos
        </h1>
        <p className="mt-3 text-sm text-white/50">Un viaje por los momentos que atesoro</p>
      </motion.div>

      {/* Carrusel principal */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Contenedor de la imagen */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={photos[currentIndex]}
                alt={`Recuerdo ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />

              {/* Viñeta sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white disabled:opacity-30"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={isLastPhoto}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-3 text-white/70 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white disabled:opacity-30"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Contador */}
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Mensaje */}
        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.div
              key={`message-${isLastPhoto ? 'last' : messageIndex}`}
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className={`font-serif italic ${
                  isLastPhoto
                    ? 'text-xl text-rose-300/90 sm:text-2xl md:text-3xl'
                    : 'text-lg text-white/70 sm:text-xl md:text-2xl'
                }`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "{currentMessage}"
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra de progreso */}
        <div className="mt-6 flex justify-center gap-1">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setIsAutoPlaying(false)
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-rose-400'
                  : i < currentIndex
                  ? 'w-2 bg-rose-400/50'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Botón de finalizar (solo en la última foto) */}
        <AnimatePresence>
          {isLastPhoto && (
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={onFinish}
                className="group relative overflow-hidden rounded-full border border-rose-400/50 bg-rose-500/10 px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.2em] text-rose-300 transition-all duration-500 hover:border-rose-400 hover:bg-rose-500/20 hover:shadow-[0_0_40px_rgba(244,114,182,0.3)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-500/0 via-rose-500/20 to-rose-500/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="flex items-center gap-3">
                  <span>Finalizar</span>
                  <span>♥</span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instrucción de pausa */}
      {isAutoPlaying && (
        <motion.p
          className="relative z-10 mt-6 text-xs text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Toca cualquier indicador para pausar
        </motion.p>
      )}
    </motion.section>
  )
}
