import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { gallery } from '../data/content.js';

export default function GalleryLightbox() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive((index) => (index + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActive((index) => (index - 1 + gallery.length) % gallery.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <>
      <div className="masonry">
        {gallery.map((image, index) => (
          <button className="gallery-item" type="button" key={image} onClick={() => setActive(index)}>
            <img src={image} alt={`Salon gallery ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Salon image preview" onClick={() => setActive(null)}>
          <button className="icon-button lightbox-close" type="button" aria-label="Close image preview" onClick={() => setActive(null)}>
            <X size={22} />
          </button>
          <img src={gallery[active]} alt={`Salon gallery ${active + 1}`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  );
}
