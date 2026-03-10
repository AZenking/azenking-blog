import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react'
import type { Photo } from '~/types'

interface Props {
  photos: Photo[]
  title: string
  description?: string
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

const PhotoGalleryModal: React.FC<Props> = ({ photos, title, description, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollYRef = useRef(0)
  const [containerWidth, setContainerWidth] = useState(400)
  const [currentHeight, setCurrentHeight] = useState<number>(100)
  const x = useMotionValue(-initialIndex * containerWidth)
  const gap = 16
  const [canAnimate, setCanAnimate] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    if (canAnimate) {
      animate(x, -currentIndex * (containerWidth + gap), { type: 'tween', duration: 0.5, ease: 'easeOut' })
    } else {
      x.set(-currentIndex * (containerWidth + gap))
    }
  }, [currentIndex, containerWidth, x, isOpen, gap, canAnimate])

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      x.set(-initialIndex * (containerWidth + gap))
      setCanAnimate(false)
      setTimeout(() => setCanAnimate(true), 30)
    }
  }, [isOpen, initialIndex, x, containerWidth, gap])

  useEffect(() => {
    const updateHeight = () => {
      const el = imageRefs.current[currentIndex]
      if (el && el.offsetHeight > 0) {
        setCurrentHeight(el.offsetHeight)
      }
    }
    const timer = setTimeout(updateHeight, 10)
    return () => clearTimeout(timer)
  }, [currentIndex, containerWidth, isOpen])

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      window.scrollTo(0, scrollYRef.current)
    }
  }, [isOpen])

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number } }) => {
      const offset = info.offset.x
      const threshold = (containerWidth + gap) * 0.07
      let newIdx = currentIndex
      if (offset > threshold && currentIndex > 0) {
        newIdx = currentIndex - 1
      } else if (offset < -threshold && currentIndex < photos.length - 1) {
        newIdx = currentIndex + 1
      }
      setCurrentIndex(newIdx)
      animate(x, -newIdx * (containerWidth + gap), { type: 'tween', duration: 0.5, ease: 'easeOut' })
    },
    [containerWidth, gap, photos.length, x, currentIndex]
  )

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1)
  }
  const goNext = () => {
    if (currentIndex < photos.length - 1) setCurrentIndex((i) => i + 1)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, photos.length])

  if (photos.length === 0) return null

  const activePhoto = photos[currentIndex]
  const activePhotoAlt = activePhoto?.alt ?? `Photo ${currentIndex + 1}`
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < photos.length - 1

  const backgroundPhotos = Array.from({ length: Math.max(12, photos.length) }, (_, i) => {
    const photo = photos[i % photos.length]
    return typeof photo.src === 'string' ? photo.src : photo.src.src
  })

  const modalContent = (
    <AnimatePresence onExitComplete={() => setCurrentHeight(100)}>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden p-3 sm:p-6"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 grid grid-cols-3 gap-3 p-4 sm:grid-cols-4 sm:gap-4 sm:p-6"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.58, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {backgroundPhotos.map((src, index) => (
              <div key={`bg-${src}-${index}`} className="overflow-hidden rounded-xl border border-white/8 bg-black/20">
                <img src={src} alt="" aria-hidden className="h-full w-full scale-110 object-cover blur-[6px] saturate-70 brightness-50" />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0 h-[100dvh] bg-[radial-gradient(circle_at_50%_48%,rgba(0,0,0,0.28),rgba(0,0,0,0.88)_72%)] backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
          />

          <motion.div
            key="modal-content"
            className="relative w-full max-w-[34rem]"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.24 } }}
          >
            <div className="pointer-events-none absolute -top-10 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full bg-white/12 blur-2xl" />

            <div className="mb-4 flex items-center justify-center gap-2">
              {photos.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-white/90' : 'w-1.5 bg-white/35 hover:bg-white/50'}`}
                  aria-label={`跳转第 ${index + 1} 张`}
                />
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[1.25rem] bg-black/45 shadow-[0_40px_120px_rgba(0,0,0,0.68)]" ref={containerRef}>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.2)_100%)]" />

              <div className="absolute -right-12 top-1/2 z-[4] hidden -translate-y-1/2 flex-col gap-2 sm:flex">
                <button
                  onClick={goPrev}
                  disabled={!canGoPrev}
                  className={`inline-flex size-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${
                    canGoPrev ? 'border-white/25 bg-black/40 text-white hover:bg-black/58' : 'cursor-not-allowed border-white/12 bg-black/24 text-white/35'
                  }`}
                  aria-label="上一张"
                >
                  <span className="icon-[mdi--chevron-up] size-5" />
                </button>
                <button
                  onClick={goNext}
                  disabled={!canGoNext}
                  className={`inline-flex size-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all ${
                    canGoNext ? 'border-white/25 bg-black/40 text-white hover:bg-black/58' : 'cursor-not-allowed border-white/12 bg-black/24 text-white/35'
                  }`}
                  aria-label="下一张"
                >
                  <span className="icon-[mdi--chevron-down] size-5" />
                </button>
              </div>

              <div className="px-2 pb-2 pt-2 sm:px-0 sm:pb-0 sm:pt-0">
                <motion.div
                  className="relative overflow-hidden rounded-[1rem] sm:rounded-none"
                  style={{ width: containerWidth }}
                  initial={{ height: 100 }}
                  animate={{ height: currentHeight }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                >
                  <motion.div
                    className="flex items-start gap-4"
                    style={{ x, width: photos.length * (containerWidth + gap) - gap }}
                    drag="x"
                    dragConstraints={{ left: -(photos.length - 1) * (containerWidth + gap), right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    transition={{ type: 'tween', duration: 0.5, ease: 'easeOut' }}
                  >
                    {photos.map((photo, index) => {
                      const imgSrc = typeof photo.src === 'string' ? photo.src : photo.src.src
                      return (
                        <div
                          key={imgSrc}
                          ref={(el) => {
                            imageRefs.current[index] = el
                          }}
                          className="flex shrink-0 items-center justify-center"
                          style={{ width: containerWidth }}
                        >
                          <img
                            draggable={false}
                            src={imgSrc}
                            alt={photo.alt}
                            className="max-h-[78vh] w-full select-none object-contain pointer-events-none"
                            onLoad={() => {
                              if (index === currentIndex && imageRefs.current[index]) {
                                setCurrentHeight(imageRefs.current[index]!.offsetHeight)
                              }
                            }}
                          />
                        </div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-white/72">{title}</p>
              <p className="mt-1 text-sm text-white/86">{activePhotoAlt}</p>
              <p className="mt-1 text-[11px] text-white/55">
                {currentIndex + 1} / {photos.length}
                {description ? ` · ${description}` : ''}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null
}

export default PhotoGalleryModal
