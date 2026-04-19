'use client'

import { motion } from 'framer-motion'

export default function Transition() {
  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fondo con efecto de partículas sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{
              scale: 0,
            }}
            animate={{
              y: [0, -100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Contenido central de la transición */}
      <div className="relative z-10 text-center">
        {/* Círculo expandible tipo Apple */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 50, opacity: 0 }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5,
          }}
        >
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-gold/20 to-gold/5" />
        </motion.div>

        {/* Texto de transición */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Icono animado */}
          <motion.div
            className="mb-8 text-5xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ✨
          </motion.div>

          {/* Mensaje de transición */}
          <motion.p
            className="font-serif text-2xl font-light tracking-wide text-white/80 sm:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Cierra los ojos un momento...
          </motion.p>

          <motion.p
            className="mt-4 font-sans text-base text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            e imagina las posibilidades
          </motion.p>
        </motion.div>

        {/* Línea de carga elegante */}
        <motion.div
          className="mx-auto mt-12 h-px w-48 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: 1,
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
