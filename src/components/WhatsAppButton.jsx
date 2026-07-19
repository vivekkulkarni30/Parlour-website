import { MessageCircle } from 'lucide-react';
import { salon } from '../data/content.js';

export default function WhatsAppButton() {
  const message = encodeURIComponent('Hi Shreya Beauty Parlour, I would like to book an appointment.');

  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/${salon.phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}
