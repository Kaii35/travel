'use client'

import { motion } from 'framer-motion'
import TravelCard from './TravelCard'

interface OptionsProps {
  onSelect: (destination: string) => void
}

// Datos de los destinos reales
const destinations = [
  {
    id: 'santa-rosa',
    title: 'Donde el agua caliente abraza el alma',
    subtitle: 'Termales de Santa Rosa',
    description:
      'Aguas termales escondidas entre montañas. Vapor que se funde con la neblina del bosque. Un santuario natural donde el tiempo se detiene y el cuerpo encuentra paz.',
    image: '/santa-rosa/DSC02679-1-scaled.jpg',
    color: 'from-amber-500/20 to-orange-500/20',
    accent: '#f59e0b',
  },
  {
    id: 'salto-buey',
    title: 'Donde la adrenalina encuentra su hogar',
    subtitle: 'Salto del Buey',
    description:
      'Cascadas imponentes que desafían la gravedad. Aventura que acelera el corazón. Un lugar donde cada salto es un recuerdo que permanece para siempre.',
    image: '/buey/DSC06664.webp',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10b981',
  },
]

export default function Options({ onSelect }: OptionsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
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
      className="relative min-h-screen px-6 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header con instrucciones */}
      <motion.div
        className="mx-auto mb-16 max-w-2xl text-center"
        variants={headerVariants}
      >
        {/* Decoración superior */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="font-serif text-2xl text-gold/60">Colombia</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        <motion.h2
          className="font-serif text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl lg:text-5xl"
          variants={headerVariants}
        >
          Dos destinos, una decisión
        </motion.h2>

        <motion.p
          className="mt-6 font-sans text-base text-white/60 sm:text-lg"
          variants={headerVariants}
        >
          Elige el escenario de nuestra próxima aventura.
          <br />
          <span className="text-gold/80">No hay elección incorrecta.</span>
        </motion.p>
      </motion.div>

      {/* Grid de tarjetas */}
      <motion.div
        className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2"
        variants={containerVariants}
      >
        {destinations.map((destination, index) => (
          <TravelCard
            key={destination.id}
            destination={destination}
            index={index}
            onSelect={() => onSelect(destination.id)}
          />
        ))}
      </motion.div>

      {/* Texto inferior */}
      <motion.p
        className="mt-16 text-center font-serif text-sm italic text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        "Lo importante no es el destino, sino con quién lo compartes"
      </motion.p>
    </motion.section>
  )
}
