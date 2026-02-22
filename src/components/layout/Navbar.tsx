import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { BOOKSY_URL, LOGO_URL } from '@/src/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useGSAP(() => {
    // Entrance animation for nav items
    gsap.from('.nav-item', {
      opacity: 0,
      y: -10,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.4
    });
  }, { scope: navRef });

  const handleLogoHover = (isHovered: boolean) => {
    gsap.to('.logo-brand', {
      scale: isHovered ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Memberships', path: '/memberships' },
    { name: 'Classes', path: '/#classes' },
    { name: 'Personal Training', path: '/#training' },
    { name: 'Contact', path: '/#contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20, rotateX: -15 },
    open: { opacity: 1, y: 0, rotateX: 0 }
  };

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50">
          <Link 
            to="/" 
            className="flex items-center gap-3 group logo-brand"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
            onClick={() => setIsOpen(false)}
          >
            <div className="w-12 h-12 relative">
              <img src={LOGO_URL} alt="Cali Form Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-display font-bold text-lg tracking-tight">CALI FORM</span>
              <span className="text-brand-green text-[10px] font-bold tracking-[0.2em]">FITNESS & STRENGTH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item text-sm font-medium transition-colors hover:text-brand-green ${location.pathname === link.path ? 'text-brand-green' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary py-2.5 px-8 text-sm shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 transition-all">
              Book Membership
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <AnimatePresence>
              {!isOpen && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 text-white z-[70] relative p-2 group" 
                  onClick={() => setIsOpen(true)}
                  aria-label="Open Menu"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-brand-green transition-colors">
                    Menu
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(4,240,106,0.15)] group-hover:shadow-[0_0_25px_rgba(4,240,106,0.35)] border border-brand-green/5 group-hover:border-brand-green/20">
                    <Menu size={24} strokeWidth={1.5} />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Moved outside nav to avoid stacking context issues */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants as any}
            initial="closed"
            animate="open"
            exit="closed"
            data-lenis-prevent
            className="fixed inset-0 bg-brand-black/98 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center lg:hidden"
          >
            {/* Dedicated Close Button inside menu */}
            <div className="absolute top-8 right-8">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-green hover:text-brand-black transition-all"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-8 px-6 text-center">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants as any}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl md:text-5xl font-display font-bold text-white hover:text-brand-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-8">
                <a 
                  href={BOOKSY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary text-xl px-12 py-4 shadow-2xl shadow-brand-green/20"
                >
                  Book Membership
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
