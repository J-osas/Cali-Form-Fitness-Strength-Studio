import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { BOOKSY_URL, LOGO_URL } from '@/src/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 relative">
              <img src={LOGO_URL} alt="Cali Form Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-display font-bold text-lg tracking-tight">CALI FORM</span>
              <span className="text-brand-green text-[10px] font-bold tracking-[0.2em]">FITNESS & STRENGTH</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Gustine's premier 24/7 strength and fitness studio. Dedicated to helping our community build strength and confidence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-brand-black transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-brand-black transition-all">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="/" className="hover:text-brand-green transition-colors">Home</a></li>
            <li><a href="/memberships" className="hover:text-brand-green transition-colors">Memberships</a></li>
            <li><a href="#classes" className="hover:text-brand-green transition-colors">Group Classes</a></li>
            <li><a href="#training" className="hover:text-brand-green transition-colors">Personal Training</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-green shrink-0" />
              <span>510 5th Street, Gustine, CA 95322</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-green shrink-0" />
              <span>(209) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-green shrink-0" />
              <span>info@califormfit.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6">Gym Hours</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-brand-green shrink-0" />
              <div>
                <p className="text-white font-medium">Members</p>
                <p>24/7 Access</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-brand-green shrink-0" />
              <div>
                <p className="text-white font-medium">New Members</p>
                <p>By Appointment Only</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 Cali Form Fitness & Strength Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
