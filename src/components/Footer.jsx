import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { salon } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark">S</span>
            <span>Shreya Beauty Parlour</span>
          </Link>
          <p>Premium salon, spa, makeup, hair, nail, and skincare services delivered with warmth, hygiene, and professional care.</p>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={`tel:${salon.displayPhone}`}><Phone size={16} /> {salon.displayPhone}</a>
          <a href={`mailto:${salon.email}`}><Mail size={16} /> {salon.email}</a>
          <span><MapPin size={16} /> {salon.address}</span>
        </div>
        <div>
          <h3>Hours</h3>
          {salon.hours.map(([day, time]) => (
            <span key={day}>{day}: {time}</span>
          ))}
        </div>
        <div>
          <h3>Social</h3>
          <a href={salon.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
          <a href={salon.facebook} target="_blank" rel="noreferrer"><Facebook size={16} /> Facebook</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Shreya Beauty Parlour. All rights reserved.</span>
        <span>Designed for beauty that feels effortless.</span>
      </div>
    </footer>
  );
}
