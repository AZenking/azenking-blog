import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface MasonryPhotoItem {
  src: string
  alt: string
  description?: string
  album?: string
  date?: string
  width?: number
  height?: number
}

interface Props {
  photos: MasonryPhotoItem[]
  initialCount?: number
  loadStep?: number
}

const MasonryPhotoFeed: React.FC<Props> = ({ photos, initialCount = 6, loadStep = 4 }) => {
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, photos.length))
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const previousBodyOverflow = useRef('')
  const previousBodyPaddingRight = useRef('')

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, photos.length))
    setActiveIndex(null)
  }, [photos, initialCount])

  const visiblePhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount])
  const hasMore = visibleCount < photos.length

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + loadStep, photos.length))
        }
      },
      { rootMargin: '720px 0px' }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loadStep, photos.length])

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = previousBodyOverflow.current
      document.body.style.paddingRight = previousBodyPaddingRight.current
      return
    }

    previousBodyOverflow.current = document.body.style.overflow
    previousBodyPaddingRight.current = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = previousBodyOverflow.current
      document.body.style.paddingRight = previousBodyPaddingRight.current
    }
  }, [activeIndex])

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev
      return prev > 0 ? prev - 1 : prev
    })
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev
      return prev < photos.length - 1 ? prev + 1 : prev
    })
  }, [photos.length])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [activeIndex, closeLightbox, showNext, showPrevious])

  const activePhoto = activeIndex === null ? null : photos[activeIndex]
  const canGoPrevious = activeIndex !== null && activeIndex > 0
  const canGoNext = activeIndex !== null && activeIndex < photos.length - 1
  const activePosition = activeIndex === null ? 0 : activeIndex + 1

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
        {visiblePhotos.map((photo, index) => {
          const globalIndex = index
          const caption = photo.description ?? photo.alt

          return (
            <figure key={`${photo.src}-${globalIndex}`} className="mb-4 break-inside-avoid sm:mb-5">
              <button
                type="button"
                onClick={() => setActiveIndex(globalIndex)}
                className="group block w-full overflow-hidden rounded-2xl border border-border/55 bg-muted/20 transition-colors duration-200 hover:border-border/85"
                aria-label={`查看图片 ${globalIndex + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  width={photo.width}
                  height={photo.height}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </button>
              <figcaption className="mt-2 px-1 text-sm leading-6 text-muted-foreground">{caption}</figcaption>
            </figure>
          )
        })}
      </div>

      <div ref={sentinelRef} className="mt-6 flex min-h-10 items-center justify-center">
        {hasMore ? (
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">继续下滑，加载更多照片</p>
        ) : (
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">已加载全部 {photos.length} 张照片</p>
        )}
      </div>

      {activePhoto &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-[2px] sm:px-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <div className="relative overflow-hidden rounded-2xl bg-black/55">
                <img src={activePhoto.src} alt={activePhoto.alt} className="mx-auto max-h-[78vh] w-auto max-w-full object-contain" />

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 transition-colors hover:bg-black/55"
                  aria-label="关闭"
                >
                  <span className="icon-[mdi--close] h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={showPrevious}
                  disabled={!canGoPrevious}
                  className={`absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors ${
                    canGoPrevious
                      ? 'border-white/20 bg-black/45 text-white/90 hover:bg-black/60'
                      : 'cursor-not-allowed border-white/10 bg-black/25 text-white/35'
                  }`}
                  aria-label="上一张"
                >
                  <span className="icon-[mdi--chevron-left] h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  disabled={!canGoNext}
                  className={`absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors ${
                    canGoNext
                      ? 'border-white/20 bg-black/45 text-white/90 hover:bg-black/60'
                      : 'cursor-not-allowed border-white/10 bg-black/25 text-white/35'
                  }`}
                  aria-label="下一张"
                >
                  <span className="icon-[mdi--chevron-right] h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 text-center text-white/90">
                <p className="text-base leading-7">{activePhoto.description ?? activePhoto.alt}</p>
                <p className="mt-1 text-xs tracking-[0.12em] text-white/62">
                  {[activePhoto.album, activePhoto.date].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-1 text-xs text-white/52">
                  {activePosition} / {photos.length}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default MasonryPhotoFeed
