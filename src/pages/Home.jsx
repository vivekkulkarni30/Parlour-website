import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  WandSparkles
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider.jsx';
import BookingForm from '../components/BookingForm.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import GalleryLightbox from '../components/GalleryLightbox.jsx';
import Section from '../components/Section.jsx';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import { heroImage, packages, salon, services, team } from '../data/content.js';

const highlights = [
  ['12k+', 'Happy clients'],
  ['15+', 'Signature services'],
  ['4.9', 'Average rating']
];

const reasons = [
  [ShieldCheck, 'Hygiene first', 'Sanitized tools, fresh linens, clean stations, and careful product handling for every service.'],
  [BadgeCheck, 'Trained artists', 'Experienced beauticians for hair, makeup, nails, skin, and bridal transformations.'],
  [HeartHandshake, 'Personal care', 'Consultation-led services designed around your skin, hair, comfort, occasion, and budget.'],
  [WandSparkles, 'Premium finish', 'Modern techniques, elegant styling, and detail-oriented finishing that photographs beautifully.']
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img className="hero-image" src={heroImage} alt="Professional beautician serving a customer in a luxury salon" fetchPriority="high" />
        <div className="hero-overlay" />
        <motion.div
          className="hero-content container"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="eyebrow">Luxury salon care in a fresh sky-blue calm</p>
          <h1>Enhancing Your Natural Beauty with Professional Care</h1>
          <p>
            Hair, makeup, skin, nail, waxing, threading, and bridal services delivered by experienced beauticians in a hygienic,
            modern salon.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#booking">
              <CalendarDays size={18} />
              Book Appointment
            </a>
            <a className="button button--ghost" href="#services">
              Explore Services
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-stats">
            {highlights.map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <Section
        id="about"
        eyebrow="About us"
        title="A modern parlour for calm, confident transformations"
        description="Shreya Beauty Parlour combines expert hands, premium products, thoughtful hygiene, and personalized care to make everyday grooming and milestone beauty feel effortless."
      >
        <div className="about-grid">
          <div className="about-card">
            <Sparkles size={28} />
            <h3>Beauty that listens first</h3>
            <p>
              Every appointment begins with understanding your skin, hair, lifestyle, and occasion so the result feels polished,
              wearable, and unmistakably you.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
            alt="Salon artist preparing professional makeup brushes"
            loading="lazy"
          />
          <div className="about-card about-card--blue">
            <h3>Premium, hygienic, affordable</h3>
            <p>
              From quick cleanups to bridal packages, the team pairs salon-grade products with transparent pricing and a warm,
              unhurried experience.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="services"
        className="section--blue"
        eyebrow="Our services"
        title="Everything you need for hair, skin, makeup, and nails"
        description="Service cards include starting prices and typical durations. Final recommendations are tailored during consultation."
      >
        <div className="service-grid">
          {services.map((service, index) => (
            <motion.article
              className="service-card"
              key={service.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.05 }}
            >
              <img src={service.image} alt={service.name} loading="lazy" />
              <div>
                <span className="service-meta">
                  <Clock size={15} />
                  {service.duration}
                </span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-footer">
                  <strong>{service.price}</strong>
                  <a href="#booking">Book Now</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="why" eyebrow="Why choose us" title="High-touch care without the heavy feeling">
        <div className="reason-grid">
          {reasons.map(([Icon, title, description]) => (
            <article className="reason" key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="packages"
        className="section--blue"
        eyebrow="Beauty packages"
        title="Curated rituals for everyday glow and special occasions"
      >
        <div className="package-grid">
          {packages.map((item) => (
            <article className="package-card" key={item.name}>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <BadgeCheck size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className="button button--soft" href="#booking">Choose package</a>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="transformations"
        eyebrow="Before & after"
        title="Interactive transformation preview"
        description="Slide to compare a natural starting point with a polished party-ready finish."
      >
        <BeforeAfterSlider />
      </Section>

      <Section id="experts" className="section--blue" eyebrow="Meet our experts" title="Artists who make beauty feel personal">
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <img src={member.image} alt={member.name} loading="lazy" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Testimonials" title="Kind words from clients">
        <TestimonialCarousel />
      </Section>

      <Section id="gallery" className="section--blue" eyebrow="Gallery" title="A glimpse inside the salon experience">
        <GalleryLightbox />
      </Section>

      <Section
        id="booking"
        eyebrow="Book appointment"
        title="Reserve your preferred service and time"
        description="Send your request in under a minute. The team can confirm details by phone or WhatsApp."
      >
        <div className="booking-layout">
          <div className="booking-panel">
            <h3>Appointment details</h3>
            <BookingForm />
          </div>
          <aside className="booking-aside">
            <h3>What happens next?</h3>
            <p>
              Your request is saved securely, checked against the schedule, and prepared for admin confirmation in the dashboard.
            </p>
            <span>Same-day bookings depend on artist availability.</span>
          </aside>
        </div>
      </Section>

      <Section id="faq" className="section--blue" eyebrow="FAQ" title="Questions clients ask often">
        <FaqAccordion />
      </Section>

      <Section id="contact" eyebrow="Contact us" title="Visit, call, or message the salon">
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Business information</h3>
            <p>{salon.address}</p>
            <a href={`tel:${salon.displayPhone}`}>{salon.displayPhone}</a>
            <a href={`mailto:${salon.email}`}>{salon.email}</a>
            {salon.hours.map(([day, time]) => (
              <span key={day}>{day}: {time}</span>
            ))}
          </div>
          <iframe
            title="Shreya Beauty Parlour location"
            src={salon.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>
    </main>
  );
}
