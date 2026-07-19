import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../data/content.js';

export default function FaqAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => (
        <article className={active === index ? 'faq faq--open' : 'faq'} key={question}>
          <button type="button" onClick={() => setActive(active === index ? null : index)}>
            <span>{question}</span>
            <ChevronDown size={20} />
          </button>
          <div className="faq-body">
            <p>{answer}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
