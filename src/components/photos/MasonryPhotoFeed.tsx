import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  const visiblePhotos = photos.slice(0, visibleCount)
  const hasMore = visibleCount < photos.length

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + loadStep, photos.length))
        }
      },
      { rootMargin: '720px 0px' },
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
      <div className="columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
        {visiblePhotos.map((photo, index) => {
          const globalIndex = index
          const caption = photo.description ?? photo.alt
          const sequence = String(globalIndex + 1).padStart(2, '0')
          const meta = [photo.album, photo.date].filter(Boolean).join(' · ')

          return (
            <figure key={`${photo.src}-${globalIndex}`} className="mb-5 break-inside-avoid sm:mb-6">
              <button
                type="button"
                onClick={() => setActiveIndex(globalIndex)}
                className="group block w-full cursor-pointer text-left"
                aria-label={`查看图片 ${globalIndex + 1}`}
              >
                <div className="overflow-hidden rounded-[1.25rem] border border-white/35 bg-[var(--theme-bg)] text-white transition-colors duration-200 ease-out group-hover:border-[var(--theme-accent)]">
                  <div className="relative overflow-hidden border-b border-white/35 bg-[var(--theme-surface-soft)]">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      width={photo.width}
                      height={photo.height}
                      className="h-auto w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-[var(--theme-accent)] bg-[var(--theme-accent)] px-2 py-1 font-mono text-[0.68rem] font-semibold leading-none tracking-[0.12em] text-black">
                      {sequence}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 px-4 py-4">
                    <div className="min-w-0">
                      <p className="text-sm leading-7 text-white/72">{caption}</p>
                      {meta ? (
                        <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/48">{meta}</p>
                      ) : null}
                    </div>

                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 text-base transition-colors duration-200 group-hover:border-[var(--theme-accent)] group-hover:text-[var(--theme-accent)]">
                      ↗
                    </span>
                  </div>
                </div>
              </button>
            </figure>
          )
        })}
      </div>

      <div ref={sentinelRef} className="mt-8 flex min-h-10 items-center justify-center">
        {hasMore ? (
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/48">继续下滑，加载更多照片</p>
        ) : (
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/48">已加载全部 {photos.length} 张照片</p>
        )}
      </div>

      {activePhoto &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-[3px] sm:px-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="照片预览"
          >
            <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <div className="overflow-hidden rounded-[1.25rem] border border-white/35 bg-[var(--theme-bg)] text-white">
                <div className="flex items-center justify-between gap-4 border-b border-white/35 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white/48">
                      {[activePhoto.album, activePhoto.date].filter(Boolean).join(' · ') || '照片详情'}
                    </p>
                    <p className="mt-1 truncate text-base leading-7">{activePhoto.description ?? activePhoto.alt}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/35 px-2 py-1 font-mono text-[0.7rem] tracking-[0.12em]">
                      {activePosition} / {photos.length}
                    </span>
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[var(--theme-surface-soft)] text-white transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]"
                      aria-label="关闭"
                    >
                      <span className="icon-[mdi--close] h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="relative bg-[var(--theme-surface-soft)] px-4 py-4 sm:px-6 sm:py-6">
                  <img src={activePhoto.src} alt={activePhoto.alt} className="mx-auto max-h-[74vh] w-auto max-w-full object-contain" />

                  <button
                    type="button"
                    onClick={showPrevious}
                    disabled={!canGoPrevious}
                    className={`absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border transition-all sm:left-4 ${
                      canGoPrevious
                        ? 'border-white/35 bg-[var(--theme-bg)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]'
                        : 'cursor-not-allowed border-white/12 bg-black/40 text-white/30'
                    }`}
                    aria-label="上一张"
                  >
                    <span className="icon-[mdi--chevron-left] h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    disabled={!canGoNext}
                    className={`absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border transition-all sm:right-4 ${
                      canGoNext
                        ? 'border-white/35 bg-[var(--theme-bg)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)]'
                        : 'cursor-not-allowed border-white/12 bg-black/40 text-white/30'
                    }`}
                    aria-label="下一张"
                  >
                    <span className="icon-[mdi--chevron-right] h-5 w-5" />
                  </button>
                </div>

                <div className="border-t border-white/35 px-4 py-4">
                  <p className="text-sm leading-7 text-white/72">{activePhoto.alt}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default MasonryPhotoFeed
