import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Memberships from './pages/Memberships';
import SmoothScroll from './components/layout/SmoothScroll';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BOOKSY_URL } from '@/src/constants';
import { AnimatePresence, motion } from 'motion/react';

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
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 100% of viewport height
      setShowSticky(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <AnimatePresence>
            {showSticky && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="md:hidden fixed bottom-6 left-6 right-6 z-40"
              >
                <a 
                  href={BOOKSY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full shadow-2xl"
                >
                  Book Membership
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SmoothScroll>
    </Router>
  );
}
