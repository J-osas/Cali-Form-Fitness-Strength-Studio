import { motion } from 'motion/react';
import { Check, ArrowRight, Info, CreditCard, Users, ShieldCheck, Clock } from 'lucide-react';
import { useState, useRef } from 'react';
import { BOOKSY_URL } from '@/src/constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Memberships() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal sections
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        }
      });
    });

    // Staggered reveal for membership cards
    gsap.from('.membership-card', {
      opacity: 0,
      scale: 0.95,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.membership-card',
        start: 'top 85%',
      }
    });

    // Floating animation for "Best Value" badge
    gsap.to('.value-badge', {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  const monthlyPlans = [
    { title: "Single Member", price: "49", desc: "Standard month-to-month access for individuals." },
    { title: "Senior (60+)", price: "45", desc: "Discounted rate for our experienced community members." },
    { title: "Student", price: "39", desc: "Affordable access with valid school identification." },
    { title: "Family / Referral", price: "35", desc: "Special rate when linked to an existing member." }
  ];

  const shortTermPasses = [
    { title: "1 Day Pass", price: "20" },
    { title: "1 Week Pass", price: "30" },
    { title: "2 Week Pass", price: "40" },
    { title: "1 Month Pass", price: "55", sub: "Non-renewing" }
  ];

  const prepaidPlans = [
    { months: "3 Months", discount: "5% OFF", desc: "Great for seasonal training." },
    { months: "6 Months", discount: "10% OFF", desc: "Our most popular value option." },
    { months: "12 Months", discount: "15% OFF", desc: "Maximum savings for dedicated athletes." }
  ];

  const faqs = [
    { q: "Is there a setup fee?", a: "Yes, there is a one-time $40 setup fee for all new memberships." },
    { q: "How do I get my key fob?", a: "Key fobs are issued during your initial membership appointment. There is a $10 fee at sign-up. Replacements are $25." },
    { q: "Can minors join?", a: "Yes, but a parent or legal guardian must be present for the sign-up appointment and sign all waivers." },
    { q: "Are classes included?", a: "Absolutely! All 24/7 memberships include access to our group fitness classes like Zumba and Senior Strength." }
  ];

  return (
      <div ref={container} className="pt-20 overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 px-6 bg-brand-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-brand-green)_0%,_transparent_70%)] opacity-5" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Flexible Memberships for <span className="text-brand-green">Every Lifestyle</span>
          </motion.h1>
          <p className="text-xl text-gray-400 mb-10">
            24/7 access, no long-term contracts, and a community that supports your strength journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book Membership
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Monthly Plans */}
      <section className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Monthly Memberships</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {monthlyPlans.map((plan, i) => (
              <div key={i} className="membership-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <p className="text-gray-600 text-sm mb-8 flex-grow">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-brand-green" /> 24/7 Gym Access</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-brand-green" /> Group Classes Incl.</li>
                  <li className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-brand-green" /> No Long-term Contract</li>
                </ul>
                <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center py-2 text-sm">
                  Book Membership
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short Term */}
      <section className="py-24 px-6 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Short-Term Passes</h2>
            <p className="text-gray-400">Perfect for visitors or those wanting to try us out without a commitment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {shortTermPasses.map((pass, i) => (
              <div key={i} className="glass p-6 rounded-2xl text-center">
                <h3 className="font-bold mb-2">{pass.title}</h3>
                <p className="text-3xl font-display font-bold text-brand-green mb-1">${pass.price}</p>
                {pass.sub && <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">{pass.sub}</p>}
                <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-brand-green transition-colors flex items-center justify-center gap-2 mt-4">
                  Book with Booksy <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prepaid */}
      <section className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-black text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full" />
            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="value-badge bg-brand-green text-brand-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Best Value</span>
                <h2 className="text-4xl font-display font-bold mb-4">Pre-Paid Memberships</h2>
                <p className="text-gray-400">Commit to your strength and save up to 15% on your membership.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {prepaidPlans.map((plan, i) => (
                  <div key={i} className="border border-white/10 p-8 rounded-3xl hover:border-brand-green/50 transition-colors group">
                    <h3 className="text-2xl font-display font-bold mb-2">{plan.months}</h3>
                    <p className="text-4xl font-display font-bold text-brand-green mb-4">{plan.discount}</p>
                    <p className="text-gray-400 text-sm mb-8">{plan.desc}</p>
                    <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center block">
                      Book Membership
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 text-gray-500 text-sm">Discounts are automatically applied during your Booksy checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-16 text-center">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Clock className="text-brand-green" />, title: "24/7 Access", desc: "Train whenever inspiration strikes. Day or night, we're open." },
              { icon: <Users className="text-brand-green" />, title: "Group Classes", desc: "Zumba and Senior Strength Training included in your membership." },
              { icon: <ShieldCheck className="text-brand-green" />, title: "Secure Facility", desc: "Advanced surveillance and secure key fob access for your safety." },
              { icon: <CreditCard className="text-brand-green" />, title: "No Contracts", desc: "We believe in our gym. No long-term commitments required." }
            ].map((b, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {b.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Info */}
      <section className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Important Information</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center font-bold"
                >
                  {faq.q}
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <ArrowRight size={20} className="text-brand-green" />
                  </motion.div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-brand-green/10 rounded-2xl border border-brand-green/20 flex gap-4">
            <Info className="text-brand-green shrink-0" />
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Policies:</strong> A one-time $40 setup fee and $10 key fob fee apply to all new memberships. Replacement fobs are $25. Minors require parent/guardian presence at sign-up.
            </p>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-24 px-6 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-16">Ready to Join?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {[
              { step: "1", title: "Choose Your Plan", desc: "Pick the membership that fits you best." },
              { step: "2", title: "Book Appointment", desc: "Schedule your sign-up via Booksy." },
              { step: "3", title: "Get Your Key", desc: "Visit us, sign waivers, and get training." }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="w-12 h-12 bg-brand-green text-brand-black rounded-full flex items-center justify-center font-bold mx-auto mb-6 relative z-10">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[2px] bg-white/10" />}
              </div>
            ))}
          </div>
          <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book Membership
          </a>
        </div>
      </section>
    </div>
  );
}
