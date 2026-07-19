import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Packages', '#packages'],
  ['Gallery', '#gallery'],
  ['Contact', '#contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={scrolled ? 'site-header site-header--scrolled' : 'site-header'}>
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>
          <span>Shreya Beauty Parlour</span>
        </Link>

        <div className={open ? 'nav-links nav-links--open' : 'nav-links'}>
          {links.map(([label, href]) => (
            <a key={href} href={`/${href}`}>
              {label}
            </a>
          ))}
          <Link to="/admin">Admin</Link>
          <a className="nav-cta" href="/#booking">
            Book
          </a>
        </div>

        <button className="icon-button nav-toggle" type="button" aria-label="Toggle menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
