'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Destination {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  color: string
  accent: string
}

interface TravelCardProps {
  destination: Destination
  index: number
  onSelect: () => void
}

export default function TravelCard({
  destination,
  index,
  onSelect,
}: TravelCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const handleSelect = () => {
    setIsSelected(true)
    setTimeout(onSelect, 400)
  }

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Contenedor principal de la tarjeta */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
          isSelected ? 'scale-105' : ''
        }`}
        animate={{
          borderColor: isHovered ? 'rgba(201, 169, 98, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${destination.accent}20`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Imagen con overlay */}
        <div className="relative h-64 overflow-hidden sm:h-72">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={destination.image}
              alt={destination.subtitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </motion.div>

          {/* Overlay gradiente */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${destination.color} to-transparent opacity-60`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

          {/* Efecto de brillo en hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{
              x: isHovered ? '100%' : '-100%',
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Badge del subtítulo */}
          <motion.div
            className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 backdrop-blur-md"
            animate={{
              y: isHovered ? 0 : -5,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans text-xs font-medium uppercase tracking-wider text-white/90">
              {destination.subtitle}
            </span>
          </motion.div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="relative p-6 sm:p-8">
          {/* Línea decorativa animada */}
          <motion.div
            className="mb-6 h-px bg-gradient-to-r from-gold/50 via-gold to-gold/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />

          {/* Título */}
          <motion.h3
            className="font-serif text-xl font-light tracking-wide text-white sm:text-2xl"
            animate={{
              color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {destination.title}
          </motion.h3>

          {/* Descripción */}
          <motion.p
            className="mt-4 font-sans text-sm leading-relaxed text-white/60 sm:text-base"
            animate={{
              color: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {destination.description}
          </motion.p>

          {/* Botón de selección */}
          <motion.button
            onClick={handleSelect}
            disabled={isSelected}
            className="mt-6 w-full overflow-hidden rounded-full border border-gold/30 bg-transparent py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition-all duration-500 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(201,169,98,0.2)] disabled:cursor-not-allowed disabled:opacity-50 sm:py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={{
                opacity: isSelected ? 0 : 1,
              }}
            >
              <span>Elegir este destino</span>
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.span>

            {/* Indicador de selección */}
            {isSelected && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-xl text-gold">✓</span>
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Efecto de partículas en selección */}
        {isSelected && (
          <motion.div className="pointer-events-none absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-gold"
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.03,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
