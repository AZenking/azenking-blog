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
                <div className="overflow-hidden border border-[var(--article-rule)] bg-[var(--article-paper)] transition-opacity duration-200 ease-out group-hover:opacity-90">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    width={photo.width}
                    height={photo.height}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <figcaption className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-[0.68rem] leading-none text-[var(--article-soft)] opacity-70">
                    {sequence}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.8rem] leading-5 text-[var(--article-soft)]">
                      {caption}
                    </span>
                    {meta && (
                      <span className="mt-0.5 block font-mono text-[0.68rem] leading-none text-[var(--article-soft)] opacity-70">
                        {meta}
                      </span>
                    )}
                  </span>
                </figcaption>
              </button>
            </figure>
          )
        })}
      </div>

      <div ref={sentinelRef} className="mt-8 flex min-h-10 items-center justify-center">
        {hasMore ? (
          <p className="font-mono text-xs text-[var(--article-soft)] opacity-70">继续下滑，加载更多照片</p>
        ) : (
          <p className="font-mono text-xs text-[var(--article-soft)] opacity-70">
            已加载全部 {photos.length} 张照片
          </p>
        )}
      </div>

      {activePhoto &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-[3px] sm:px-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="照片预览"
          >
            <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[0.72rem] text-[var(--article-soft)] opacity-70">
                    {[activePhoto.album, activePhoto.date].filter(Boolean).join(' · ') || '照片详情'}
                  </p>
                  <p className="mt-1 truncate font-[var(--font-editorial)] text-base leading-7 text-[var(--article-ink)]">
                    {activePhoto.description ?? activePhoto.alt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] text-[var(--article-soft)] opacity-70">
                    {String(activePosition).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="inline-flex h-9 w-9 items-center justify-center text-[var(--article-soft)] transition-colors hover:text-[var(--article-ink)] focus-visible:text-[var(--article-ink)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--article-accent)] focus-visible:outline-offset-2"
                    aria-label="关闭"
                  >
                    <span className="icon-[mdi--close] h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="mx-auto max-h-[74vh] w-auto max-w-full object-contain border border-[var(--article-rule)]"
                />

                <button
                  type="button"
                  onClick={showPrevious}
                  disabled={!canGoPrevious}
                  className={`absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm transition-opacity sm:left-4 ${
                    canGoPrevious
                      ? 'text-[var(--article-soft)] opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--article-accent)] focus-visible:outline-offset-2'
                      : 'cursor-not-allowed text-[var(--article-soft)] opacity-30'
                  }`}
                  aria-label="上一张"
                >
                  <span className="icon-[mdi--chevron-left] h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  disabled={!canGoNext}
                  className={`absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm transition-opacity sm:right-4 ${
                    canGoNext
                      ? 'text-[var(--article-soft)] opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--article-accent)] focus-visible:outline-offset-2'
                      : 'cursor-not-allowed text-[var(--article-soft)] opacity-30'
                  }`}
                  aria-label="下一张"
                >
                  <span className="icon-[mdi--chevron-right] h-6 w-6" />
                </button>
              </div>

              <p className="mt-3 text-[0.8rem] leading-6 text-[var(--article-soft)]">
                {activePhoto.alt}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default MasonryPhotoFeed
