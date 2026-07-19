export const salon = {
  name: 'Shreya Beauty Parlour',
  phone: import.meta.env.VITE_SALON_PHONE || '919876543210',
  displayPhone: '+91 98765 43210',
  email: 'hello@shreyabeautyparlour.com',
  address: 'Shreya Beauty Parlour, Main Market Road, Near City Center',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  mapsEmbed:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
    'https://www.google.com/maps?q=Shreya%20Beauty%20Parlour&output=embed',
  hours: [
    ['Monday - Saturday', '10:00 AM - 8:00 PM'],
    ['Sunday', '10:00 AM - 5:00 PM']
  ]
};

export const services = [
  {
    name: 'Hair Cut',
    price: '₹399',
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80',
    description: 'Face-framing cuts with consultation, wash, and finishing touches.'
  },
  {
    name: 'Hair Styling',
    price: '₹799',
    duration: '50 min',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
    description: 'Blowouts, curls, sleek looks, and occasion-ready styling.'
  },
  {
    name: 'Hair Spa',
    price: '₹1,199',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    description: 'Deep nourishment for shine, scalp comfort, and smoother texture.'
  },
  {
    name: 'Hair Coloring',
    price: '₹1,999',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=80',
    description: 'Global color, highlights, root touch-up, and gloss treatments.'
  },
  {
    name: 'Facial',
    price: '₹999',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    description: 'Skin-specific facial therapies using premium, hygienic products.'
  },
  {
    name: 'Cleanup',
    price: '₹599',
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description: 'Quick glow care with cleansing, exfoliation, steam, and mask.'
  },
  {
    name: 'Bridal Makeup',
    price: '₹8,999',
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    description: 'Long-wear luxury bridal artistry with hair, draping, and trials.'
  },
  {
    name: 'Party Makeup',
    price: '₹2,499',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
    description: 'Camera-ready glam tailored to your outfit, skin, and event.'
  },
  {
    name: 'Waxing',
    price: '₹499',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    description: 'Comfort-focused waxing with high hygiene and soothing aftercare.'
  },
  {
    name: 'Threading',
    price: '₹99',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
    description: 'Precise brow shaping and facial threading for a clean finish.'
  },
  {
    name: 'Manicure',
    price: '₹699',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
    description: 'Cuticle care, massage, polish, and refined hand grooming.'
  },
  {
    name: 'Pedicure',
    price: '₹899',
    duration: '55 min',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80',
    description: 'Relaxing foot care with scrub, massage, polish, and hydration.'
  },
  {
    name: 'Nail Art',
    price: '₹999',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=900&q=80',
    description: 'Minimal, bridal, chrome, glitter, and custom nail designs.'
  },
  {
    name: 'Skin Treatment',
    price: '₹1,499',
    duration: '75 min',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80',
    description: 'Targeted glow, tan, hydration, and acne-care treatments.'
  }
];

export const packages = [
  {
    name: 'Fresh Glow Ritual',
    price: '₹1,799',
    features: ['Cleanup', 'Threading', 'Hair wash', 'Basic manicure']
  },
  {
    name: 'Weekend Luxe',
    price: '₹3,999',
    features: ['Facial', 'Hair spa', 'Pedicure', 'Party-ready styling']
  },
  {
    name: 'Bridal Signature',
    price: '₹14,999',
    features: ['Bridal makeup', 'Hair styling', 'Draping', 'Pre-bridal consultation']
  }
];

export const team = [
  {
    name: 'Shreya Kapoor',
    role: 'Founder & Senior Beautician',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Aanya Mehta',
    role: 'Skin & Facial Specialist',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ritika Sharma',
    role: 'Hair Artist & Colorist',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=600&q=80'
  }
];

export const testimonials = [
  {
    name: 'Priya N.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=300&q=80',
    text: 'The bridal team was calm, detailed, and made me look like myself on my best day.'
  },
  {
    name: 'Meera S.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    text: 'Clean salon, warm staff, and the facial glow lasted through the whole week.'
  },
  {
    name: 'Kavya R.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80',
    text: 'My hair color consultation was honest and the final shade was exactly what I wanted.'
  }
];

export const gallery = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
];

export const faqs = [
  ['Do I need an appointment?', 'Appointments are recommended, especially for bridal, hair color, facials, and weekend slots. Walk-ins are accepted when artists are available.'],
  ['Which products do you use?', 'We use premium salon-grade products selected according to service type, hair condition, and skin sensitivity.'],
  ['Can I book bridal trials?', 'Yes. Bridal trials and consultation slots can be requested through the booking form or WhatsApp.'],
  ['How do you maintain hygiene?', 'Tools are sanitized between services, disposable supplies are used where appropriate, and treatment stations are cleaned after every client.'],
  ['Can I reschedule?', 'Yes. Please contact the salon as early as possible so the team can help you move your booking.']
];

export const heroImage =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85';

export const beforeAfter = {
  before: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1000&q=80',
  after: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80'
};
