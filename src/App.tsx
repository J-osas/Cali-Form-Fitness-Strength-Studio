import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Memberships from './pages/Memberships';
import SmoothScroll from './components/layout/SmoothScroll';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BOOKSY_URL } from '@/src/constants';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/memberships" element={<Memberships />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Sticky Mobile CTA */}
          <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
            <a 
              href={BOOKSY_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full shadow-2xl"
            >
              Book Membership
            </a>
          </div>
        </div>
      </SmoothScroll>
    </Router>
  );
}
