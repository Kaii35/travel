'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from '@/components/Hero'
import Transition from '@/components/Transition'
import Options from '@/components/Options'
import Result from '@/components/Result'
import Gallery from '@/components/Gallery'
import Memories from '@/components/Memories'
import FinalMessage from '@/components/FinalMessage'
import MusicPlayer from '@/components/MusicPlayer'
import BackgroundEffects from '@/components/BackgroundEffects'

// Estados de la experiencia
type Stage = 'hero' | 'transition' | 'options' | 'result' | 'gallery' | 'memories' | 'final'

export default function Home() {
  const [stage, setStage] = useState<Stage>('hero')
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Efecto de carga inicial cinematográfico
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)

    // Verificar si hay una elección guardada previamente
    const saved = localStorage.getItem('destinoElegido')
    if (saved) {
      setSelectedDestination(saved)
    }

    return () => clearTimeout(timer)
  }, [])

  // Manejar el click inicial del hero
  const handleHeroClick = () => {
    setStage('transition')
    setTimeout(() => setStage('options'), 2500)
  }

  // Manejar la selección de destino
  const handleSelectDestination = (destination: string) => {
    setSelectedDestination(destination)
    localStorage.setItem('destinoElegido', destination)
    localStorage.setItem('fechaEleccion', new Date().toISOString())
    setTimeout(() => setStage('result'), 800)
  }

  // Ver la galería de imágenes
  const handleViewGallery = () => {
    setStage('gallery')
  }

  // Volver al resultado desde la galería
  const handleBackFromGallery = () => {
    setStage('result')
  }

  // Ver el libro de recuerdos
  const handleViewMemories = () => {
    setStage('memories')
  }

  // Volver a la galería desde recuerdos
  const handleBackFromMemories = () => {
    setStage('gallery')
  }

  // Ver mensaje final
  const handleFinish = () => {
    setStage('final')
  }

  // Reiniciar la experiencia
  const handleReset = () => {
    localStorage.removeItem('destinoElegido')
    localStorage.removeItem('fechaEleccion')
    setSelectedDestination(null)
    setStage('hero')
  }

  return (
    <main
      className={`relative min-h-screen transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Efectos de fondo cinematográficos */}
      <BackgroundEffects stage={stage} />

      {/* Reproductor de música */}
      <MusicPlayer />

      {/* Contenido principal con AnimatePresence para transiciones suaves */}
      <AnimatePresence mode="wait">
        {stage === 'hero' && (
          <Hero key="hero" onContinue={handleHeroClick} />
        )}

        {stage === 'transition' && (
          <Transition key="transition" />
        )}

        {stage === 'options' && (
          <Options
            key="options"
            onSelect={handleSelectDestination}
          />
        )}

        {stage === 'result' && selectedDestination && (
          <Result
            key="result"
            destination={selectedDestination}
            onReset={handleReset}
            onViewGallery={handleViewGallery}
          />
        )}

        {stage === 'gallery' && selectedDestination && (
          <Gallery
            key="gallery"
            destination={selectedDestination}
            onBack={handleBackFromGallery}
            onViewMemories={handleViewMemories}
          />
        )}

        {stage === 'memories' && (
          <Memories
            key="memories"
            onBack={handleBackFromMemories}
            onFinish={handleFinish}
          />
        )}

        {stage === 'final' && (
          <FinalMessage
            key="final"
            onRestart={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
