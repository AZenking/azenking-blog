import { useEffect, useRef } from 'react'

interface NoiseProps {
  patternSize?: number
  patternRefreshInterval?: number
  patternAlpha?: number
  className?: string
}

const Noise = ({ patternSize = 768, patternRefreshInterval = 5, patternAlpha = 14, className = '' }: NoiseProps) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId = 0

    const resize = () => {
      canvas.width = patternSize
      canvas.height = patternSize
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    const drawGrain = () => {
      const imageData = ctx.createImageData(patternSize, patternSize)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain()
      }
      frame += 1
      animationId = window.requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize()
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationId)
    }
  }, [patternAlpha, patternRefreshInterval, patternSize])

  return (
    <canvas
      ref={grainRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}

export default Noise
