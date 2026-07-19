import { Outlet } from 'react-router-dom';
import BackToTop from './BackToTop.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import ScrollProgress from './ScrollProgress.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Layout() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
