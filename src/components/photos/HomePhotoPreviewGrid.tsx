import React from 'react'
import type { Photo } from '~/types'
import PhotoGalleryModal from './PhotoGalleryModal'
import SpotlightCard from '~/components/reactbits/SpotlightCard'

interface Props {
  photos: Photo[]
  title?: string
  description?: string
}

const HomePhotoPreviewGrid: React.FC<Props> = ({ photos, title = 'Photo Preview', description = 'Latest 10 shots from life notes.' }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleOpen = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
  }

  if (photos.length === 0) return null

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((photo, index) => {
          const imgSrc = typeof photo.src === 'string' ? photo.src : photo.src.src
          return (
            <SpotlightCard key={`${imgSrc}-${index}`} className="rounded-none">
              <button type="button" onClick={() => handleOpen(index)} className="group relative block w-full overflow-hidden text-left" aria-label={`Preview photo ${index + 1}`}>
                <img
                  src={imgSrc}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </SpotlightCard>
          )
        })}
        </div>

      <PhotoGalleryModal photos={photos} title={title} description={description} isOpen={isOpen} onClose={() => setIsOpen(false)} initialIndex={selectedIndex} />
    </>
  )
}

export default HomePhotoPreviewGrid
