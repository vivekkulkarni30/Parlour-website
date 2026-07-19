import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { testimonials } from '../data/content.js';

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 4600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="testimonial-shell">
      {testimonials.map((testimonial, index) => (
        <article key={testimonial.name} className={index === active ? 'testimonial testimonial--active' : 'testimonial'}>
          <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
          <div>
            <div className="stars" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={17} fill="currentColor" />
              ))}
            </div>
            <p>“{testimonial.text}”</p>
            <h3>{testimonial.name}</h3>
          </div>
        </article>
      ))}
      <div className="carousel-dots" aria-label="Testimonials">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.name}
            type="button"
            className={index === active ? 'dot dot--active' : 'dot'}
            aria-label={`Show review from ${testimonial.name}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
