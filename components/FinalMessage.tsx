'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface FinalMessageProps {
  onRestart: () => void
}

export default function FinalMessage({ onRestart }: FinalMessageProps) {
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowHearts(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
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
      {/* Fondo con gradiente especial */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal via-[#1a1520] to-black" />

      {/* Corazones flotantes */}
      {showHearts && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-400/60"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 20}px`,
                bottom: '-50px',
              }}
              initial={{
                opacity: 0,
                rotate: Math.random() * 40 - 20,
              }}
              animate={{
                y: [0, '-110vh'],
                opacity: [0, 0.8, 0.8, 0],
                rotate: Math.random() * 40 - 20,
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}

      {/* Orbes de luz */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Corazón grande animado */}
        <motion.div
          className="mb-10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block text-7xl text-rose-400 sm:text-8xl"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className="bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 bg-clip-text font-serif text-2xl font-light leading-relaxed tracking-wide text-transparent sm:text-3xl md:text-4xl lg:text-5xl"
          variants={itemVariants}
        >
          Gracias por cada momento
        </motion.h1>

        {/* Mensaje principal */}
        <motion.div
          className="mt-10 space-y-6"
          variants={itemVariants}
        >
          <p className="font-serif text-lg leading-relaxed text-white/70 sm:text-xl">
            Cada foto es un recuerdo,
            <br />
            cada viaje una historia.
          </p>

          <motion.div className="mx-auto flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400/50" />
            <motion.span
              className="text-rose-400/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400/50" />
          </motion.div>

          <p className="font-serif text-lg leading-relaxed text-white/70 sm:text-xl">
            Y lo mejor es que
            <br />
            aún quedan muchos por vivir.
          </p>
        </motion.div>

        {/* Mensaje final destacado */}
        <motion.div
          className="mt-12 rounded-2xl border border-rose-400/20 bg-rose-500/5 p-6 backdrop-blur-sm sm:p-8"
          variants={itemVariants}
        >
          <motion.p
            className="bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 bg-clip-text font-serif text-lg font-light italic text-transparent sm:text-xl md:text-2xl"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "Esto apenas comienza,
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            prepárate para lo que viene."
          </motion.p>
        </motion.div>

        {/* Firma */}
        <motion.div
          className="mt-10"
          variants={itemVariants}
        >
          <p className="font-serif text-base text-white/40">
            Nos vemos pronto,
          </p>
          <motion.p
            className="mt-2 font-serif text-2xl text-gold/80"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦
          </motion.p>
        </motion.div>

        {/* Botón discreto para reiniciar */}
        <motion.button
          onClick={onRestart}
          className="mt-16 font-sans text-xs text-white/20 transition-colors hover:text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          Volver al inicio
        </motion.button>
      </div>
    </motion.section>
  )
}
