'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface GalleryProps {
  destination: string
  onBack: () => void
  onViewMemories: () => void
}

// Imágenes por destino
const galleryData = {
  'santa-rosa': {
    title: 'Termales de Santa Rosa',
    subtitle: 'Un paraíso de aguas termales en el corazón del Eje Cafetero',
    description: 'Prepárate para sumergirte en aguas que sanan el cuerpo y el alma, rodeados de naturaleza exuberante y la magia del bosque nublado.',
    images: [
      { src: '/santa-rosa/DSC02679-1-scaled.jpg', alt: 'Vista de los termales' },
      { src: '/santa-rosa/DSC02587-scaled.jpg', alt: 'Paisaje natural' },
      { src: '/santa-rosa/DSC02036-scaled.jpg', alt: 'Senderos del bosque' },
      { src: '/santa-rosa/DSC02043-scaled.jpg', alt: 'Naturaleza' },
      { src: '/santa-rosa/Copia-de-DSC02600-1-scaled.jpg', alt: 'Cascadas' },
      { src: '/santa-rosa/Copia-de-DSC02910-1-scaled.jpg', alt: 'Aguas termales' },
      { src: '/santa-rosa/DSC04920-scaled.jpg', alt: 'Vista panorámica' },
      { src: '/santa-rosa/DSC04922-scaled.jpg', alt: 'Entorno natural' },
      { src: '/santa-rosa/DSC07880-2-scaled.jpg', alt: 'Momento mágico' },
      { src: '/santa-rosa/sendero-2.jpg', alt: 'Sendero' },
    ],
    accent: 'from-amber-400 to-orange-400',
    accentBg: 'from-amber-500/20 to-orange-500/20',
  },
  'salto-buey': {
    title: 'Salto del Buey',
    subtitle: 'Aventura extrema entre cascadas y naturaleza salvaje',
    description: 'Prepárate para sentir la adrenalina en cada salto, el poder de las cascadas y la emoción de una aventura que recordaremos siempre.',
    images: [
      { src: '/buey/DSC06664.webp', alt: 'Vista principal' },
      { src: '/buey/Cable-vuelo-1.webp', alt: 'Cable vuelo' },
      { src: '/buey/1_-242.webp', alt: 'Cascada' },
      { src: '/buey/13.webp', alt: 'Aventura' },
      { src: '/buey/7d6bc88f-f0bb-465e-9ea2-23d98c0975b4-1.webp', alt: 'Paisaje' },
      { src: '/buey/IMG_1919.webp', alt: 'Experiencia' },
    ],
    accent: 'from-emerald-400 to-teal-400',
    accentBg: 'from-emerald-500/20 to-teal-500/20',
  },
}

export default function Gallery({ destination, onBack, onViewMemories }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const data = galleryData[destination as keyof typeof galleryData] || galleryData['santa-rosa']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.section
      className="relative min-h-screen px-6 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Fondo decorativo */}
      <motion.div
        className={`pointer-events-none fixed left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${data.accentBg} opacity-30 blur-3xl`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Header */}
      <motion.div className="relative z-10 mx-auto mb-16 max-w-4xl text-center" variants={itemVariants}>
        {/* Botón volver */}
        <motion.button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
          whileHover={{ x: -5 }}
        >
          <span>←</span>
          <span>Volver</span>
        </motion.button>

        {/* Título con gradiente */}
        <motion.h1
          className={`bg-gradient-to-r ${data.accent} bg-clip-text font-serif text-2xl font-light tracking-wide text-transparent sm:text-3xl md:text-4xl lg:text-5xl`}
        >
          {data.title}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p className="mt-4 font-sans text-base text-white/70 sm:text-lg md:text-xl">
          {data.subtitle}
        </motion.p>

        {/* Separador */}
        <motion.div className="mx-auto my-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/40">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Descripción */}
        <motion.p className="font-serif text-base leading-relaxed text-white/50 sm:text-lg">
          {data.description}
        </motion.p>
      </motion.div>

      {/* Galería de imágenes - Grid masonry-like */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl"
        variants={containerVariants}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.images.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={imageVariants}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`relative ${index === 0 ? 'h-[400px] sm:h-[500px]' : 'h-[250px]'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                />

                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icono de expandir */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="rounded-full border border-white/30 bg-white/10 p-4 backdrop-blur-sm">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* Borde brillante */}
                <div className={`absolute inset-0 rounded-2xl border border-white/0 transition-all duration-500 group-hover:border-white/20`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mensaje final y botón de recuerdos */}
      <motion.div
        className="relative z-10 mt-16 text-center"
        variants={itemVariants}
      >
        <motion.p className="font-serif text-lg italic text-white/30">
          "Esto es solo una pequeña muestra de lo que viviremos juntos"
        </motion.p>

        {/* Separador */}
        <motion.div className="mx-auto my-10 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/30" />
          <motion.span
            className="text-rose-400/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ♥
          </motion.span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/30" />
        </motion.div>

        <motion.p className="mb-6 font-serif text-base text-white/50">
          Pero antes de soñar con lo que viene...
        </motion.p>

        {/* Botón para ver recuerdos */}
        <motion.button
          onClick={onViewMemories}
          className="group relative overflow-hidden rounded-full border border-rose-400/30 bg-rose-500/5 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.15em] text-rose-300/80 transition-all duration-500 hover:border-rose-400/60 hover:bg-rose-500/10 hover:text-rose-200 hover:shadow-[0_0_40px_rgba(244,114,182,0.2)] sm:px-10 sm:py-4 sm:text-sm sm:tracking-[0.2em]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-center leading-tight">Nuestro último viaje</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </motion.div>

      {/* Modal de imagen expandida */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Botón cerrar */}
            <motion.button
              className="absolute right-6 top-6 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Navegación */}
            <motion.button
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : data.images.length - 1))
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => (prev! < data.images.length - 1 ? prev! + 1 : 0))
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Imagen */}
            <motion.div
              className="relative h-[80vh] w-full max-w-5xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={data.images[selectedImage].src}
                alt={data.images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Indicador de posición */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {data.images.map((_, i) => (
                <button
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === selectedImage ? 'w-6 bg-gold' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(i)
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
