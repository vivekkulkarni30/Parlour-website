import { useState } from 'react';
import { beforeAfter } from '../data/content.js';

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(52);

  return (
    <div className="comparison" aria-label="Before and after beauty transformation">
      <img src={beforeAfter.after} alt="After transformation" loading="lazy" />
      <div className="comparison-before" style={{ width: `${position}%` }}>
        <img src={beforeAfter.before} alt="Before transformation" loading="lazy" />
      </div>
      <div className="comparison-divider" style={{ left: `${position}%` }} />
      <input
        type="range"
        min="10"
        max="90"
        value={position}
        aria-label="Reveal before and after"
        onChange={(event) => setPosition(event.target.value)}
      />
      <span className="comparison-label comparison-label--before">Before</span>
      <span className="comparison-label comparison-label--after">After</span>
    </div>
  );
}
