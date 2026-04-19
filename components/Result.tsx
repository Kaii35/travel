'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ResultProps {
  destination: string
  onReset: () => void
  onViewGallery: () => void
}

// Mensajes personalizados según el destino
const messages = {
  'santa-rosa': {
    icon: '♨',
    title: 'Sabía que elegirías la calma...',
    subtitle: 'Hay algo en ti que siempre busca la paz interior.',
    description:
      'Pronto sentiremos el calor de las aguas termales, el vapor envolviendo nuestros cuerpos, y la magia del bosque nublado como testigo de nuestros momentos juntos.',
    cta: 'Descubre lo que nos espera',
    accent: 'from-amber-400 to-orange-400',
    location: 'Santa Rosa de Cabal, Colombia',
  },
  'salto-buey': {
    icon: '◊',
    title: 'Sabía que elegirías la aventura...',
    subtitle: 'Siempre supiste que la vida se vive al máximo.',
    description:
      'Pronto sentiremos la adrenalina corriendo por nuestras venas, el rugido de las cascadas, y la emoción de conquistar cada desafío juntos.',
    cta: 'Descubre lo que nos espera',
    accent: 'from-emerald-400 to-teal-400',
    location: 'Salto del Buey, Colombia',
  },
}

export default function Result({ destination, onReset, onViewGallery }: ResultProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const message = messages[destination as keyof typeof messages] || messages['santa-rosa']

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Confetti animado */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-3 w-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#C9A962', '#f59e0b', '#10b981', '#f472b6', '#fbbf24'][
                  Math.floor(Math.random() * 5)
                ],
              }}
              initial={{
                y: -20,
                x: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: '100vh',
                x: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Círculos decorativos de fondo */}
      <motion.div
        className={`absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${message.accent} opacity-5 blur-3xl`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Icono animado */}
        <motion.div
          className={`mb-8 bg-gradient-to-r ${message.accent} bg-clip-text font-serif text-7xl text-transparent sm:text-8xl`}
          variants={itemVariants}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {message.icon}
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className={`bg-gradient-to-r ${message.accent} bg-clip-text font-serif text-2xl font-light tracking-wide text-transparent sm:text-3xl md:text-4xl lg:text-5xl`}
          variants={itemVariants}
        >
          {message.title}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="mt-4 font-sans text-lg text-white/70 sm:text-xl"
          variants={itemVariants}
        >
          {message.subtitle}
        </motion.p>

        {/* Ubicación */}
        <motion.div
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50"
          variants={itemVariants}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{message.location}</span>
        </motion.div>

        {/* Separador */}
        <motion.div
          className="mx-auto my-10 flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <motion.span
            className="text-gold/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            ✦
          </motion.span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Descripción */}
        <motion.p
          className="font-serif text-base leading-relaxed text-white/60 sm:text-lg"
          variants={itemVariants}
        >
          {message.description}
        </motion.p>

        {/* Botón CTA - Lleva a la galería */}
        <motion.div className="mt-12" variants={itemVariants}>
          <motion.button
            onClick={onViewGallery}
            className="group relative overflow-hidden rounded-full border border-gold bg-gold/10 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-gold shadow-[0_0_30px_rgba(201,169,98,0.3)] transition-all duration-500 hover:bg-gold/20 hover:shadow-[0_0_50px_rgba(201,169,98,0.4)] sm:px-10 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Efecto de brillo */}
            <motion.span
              className="absolute inset-0 -z-10 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <span className="flex items-center gap-3">
              <span>{message.cta}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Mensaje final emotivo */}
        <motion.p
          className="mt-16 font-serif text-sm italic text-white/30"
          variants={itemVariants}
        >
          "Los mejores recuerdos se construyen con las personas correctas"
        </motion.p>

        {/* Botón para reiniciar */}
        <motion.button
          onClick={onReset}
          className="mt-8 font-sans text-xs text-white/20 transition-colors hover:text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          ← Volver a elegir
        </motion.button>
      </div>
    </motion.section>
  )
}
