# Invitación de Viaje - Experiencia Interactiva

Una landing page cinematográfica y emocional para invitar a alguien especial a un viaje.

## Características

- Experiencia tipo storytelling con animaciones fluidas estilo Apple
- Diseño minimalista y elegante con Tailwind CSS
- Transiciones cinematográficas con Framer Motion
- Reproductor de música ambiente opcional
- Responsive perfecto en móvil y desktop
- Guarda la elección en localStorage

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Instalación Local

### Requisitos previos
- Node.js 18.17 o superior
- npm, yarn, o pnpm

### Pasos

1. **Navega al directorio del proyecto:**
```bash
cd viaje
```

2. **Instala las dependencias:**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abre en tu navegador:**
```
http://localhost:3000
```

## Personalización

### Cambiar los destinos

Edita el archivo `components/Options.tsx` y modifica el array `destinations`:

```typescript
const destinations = [
  {
    id: 'playa',
    title: 'Tu título personalizado',
    subtitle: 'Subtítulo',
    description: 'Descripción emotiva...',
    image: 'URL de la imagen',
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: '#38bdf8',
  },
  // ... más destinos
]
```

### Cambiar los mensajes de resultado

Edita el archivo `components/Result.tsx` y modifica el objeto `messages`.

### Cambiar la música

En `components/MusicPlayer.tsx`, cambia la variable `musicUrl`:

```typescript
const musicUrl = 'tu-url-de-musica.mp3'
```

### Cambiar los textos del Hero

Edita `components/Hero.tsx` y modifica las variables:
- `mainMessage`: Mensaje principal
- `subMessage`: Mensaje secundario

## Despliegue en Vercel

### Opción 1: Desde GitHub

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Haz clic en "New Project"
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente que es un proyecto Next.js
6. Haz clic en "Deploy"

### Opción 2: Usando Vercel CLI

1. **Instala Vercel CLI:**
```bash
npm install -g vercel
```

2. **Despliega:**
```bash
vercel
```

3. **Para producción:**
```bash
vercel --prod
```

## Estructura del Proyecto

```
viaje/
├── app/
│   ├── globals.css      # Estilos globales y utilidades
│   ├── layout.tsx       # Layout principal con fuentes
│   └── page.tsx         # Página principal (orquestador)
├── components/
│   ├── Hero.tsx         # Pantalla inicial con mensaje
│   ├── Transition.tsx   # Animación de transición
│   ├── Options.tsx      # Contenedor de opciones
│   ├── TravelCard.tsx   # Tarjeta de destino individual
│   ├── Result.tsx       # Pantalla de resultado
│   ├── MusicPlayer.tsx  # Reproductor de música
│   └── BackgroundEffects.tsx # Efectos visuales de fondo
├── public/              # Archivos estáticos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Notas

- Las imágenes usan Unsplash (gratuitas para uso comercial)
- La música es un placeholder de Mixkit (royalty free)
- El diseño está optimizado para la mejor experiencia emocional
- La elección se guarda en localStorage para persistencia

---

Hecho con mucho cariño para momentos especiales.
