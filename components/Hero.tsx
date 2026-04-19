'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  onContinue: () => void
}

export default function Hero({ onContinue }: HeroProps) {
  // Variantes de animación estilo Apple
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.03,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Texto del mensaje principal (sin partir palabras)
  const mainMessage = "Hay momentos que merecen ser vividos, no contados."
  const subMessage = "Este es uno de esos momentos."

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Contenedor principal del mensaje */}
      <div className="relative z-10 max-w-2xl text-center">
        {/* Línea decorativa superior */}
        <motion.div
          className="mx-auto mb-12 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
          variants={itemVariants}
        />

        {/* Mensaje principal con animación letra por letra */}
        <motion.h1
          className="font-serif text-2xl font-light leading-relaxed tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-5xl"
          variants={itemVariants}
        >
          {mainMessage.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Submensaje */}
        <motion.p
          className="mt-8 font-sans text-lg font-light tracking-wide text-white/60 sm:text-xl"
          variants={itemVariants}
        >
          {subMessage}
        </motion.p>

        {/* Separador elegante */}
        <motion.div
          className="mx-auto my-12 flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Texto adicional emocional */}
        <motion.p
          className="mb-12 font-serif text-base italic text-white/40 sm:text-lg"
          variants={itemVariants}
        >
          Y quiero que lo vivas conmigo.
        </motion.p>

        {/* Botón principal */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onContinue}
            className="group relative overflow-hidden rounded-full border border-gold/30 bg-transparent px-8 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-700 hover:border-gold hover:shadow-[0_0_40px_rgba(201,169,98,0.25)] sm:px-10 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Fondo animado del botón */}
            <motion.span
              className="absolute inset-0 -z-10 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Texto del botón */}
            <span className="relative z-10 flex items-center gap-3">
              <span>Tengo algo para ti</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Indicador de scroll sutil */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="h-12 w-6 rounded-full border border-white/20 p-1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-2 w-full rounded-full bg-gold/50"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
