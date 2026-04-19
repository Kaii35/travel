'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BackgroundEffectsProps {
  stage: string
}

export default function BackgroundEffects({ stage }: BackgroundEffectsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Seguimiento del mouse para efecto de luz sutil
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Gradiente de fondo base */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-black" />

      {/* Efecto de luz siguiendo el cursor */}
      <motion.div
        className="absolute h-[800px] w-[800px] rounded-full opacity-20"
        animate={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 30,
        }}
        style={{
          background:
            'radial-gradient(circle, rgba(201, 169, 98, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Orbes flotantes decorativos */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gold/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Estrellas sutiles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-px rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Líneas sutiles de movimiento (efecto cinematográfico) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Viñeta sutil en los bordes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Efecto de partículas flotantes */}
      {stage === 'hero' && (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute h-1 w-1 rounded-full bg-gold/20"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '-5%',
              }}
              animate={{
                y: [0, -1200],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            />
          ))}
        </>
      )}

      {/* Overlay de ruido muy sutil para textura */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
