import { motion } from 'framer-motion';

export default function Section({ eyebrow, title, description, children, id, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="container">
        {(eyebrow || title || description) && (
          <div className="section-heading">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
