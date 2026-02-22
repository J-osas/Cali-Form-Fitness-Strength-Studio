import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Dumbbell, Users, Clock, Zap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKSY_URL } from '@/src/constants';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal sections on scroll
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Staggered reveal for cards
    gsap.from('.reveal-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.reveal-card',
        start: 'top 85%',
      }
    });

    // Membership cards reveal
    gsap.fromTo('.membership-card', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.membership-card',
          start: 'top 85%',
        }
      }
    );

    // Parallax effect for hero video
    gsap.to('.hero-video', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: 'section:first-child',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60 hero-video blur-[2px] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs tracking-widest uppercase mb-6 border border-brand-green/20">
              Gustine's Premier Strength Studio
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-8">
              Build Your <span className="text-brand-green">Strongest</span> Self.
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              24/7 access to professional strength equipment, expert-led group classes, and a community that supports your journey. No ego, just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Membership <ArrowRight size={20} className="ml-2" />
              </a>
              <Link to="/memberships" className="btn-secondary">
                View Membership Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why Cali Form Fitness & Strength Studio?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We've designed our studio to remove every barrier between you and your fitness goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="text-brand-green" />, title: "24/7 Access", desc: "Train on your schedule, day or night. Your key fob is your all-access pass." },
              { icon: <Dumbbell className="text-brand-green" />, title: "Strength Focused", desc: "Professional racks, plates, and machines designed for real progress." },
              { icon: <Users className="text-brand-green" />, title: "Inclusive Community", desc: "From beginners to pros, everyone is welcome in our non-intimidating space." },
              { icon: <Zap className="text-brand-green" />, title: "Group Classes", desc: "Zumba, Senior Strength, and more included with your membership." }
            ].map((prop, i) => (
              <div 
                key={i}
                className="reveal-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mb-6">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{prop.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="classes" className="py-24 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-4">Programs & Services</h2>
              <p className="text-gray-400 max-w-xl">Everything you need to reach your peak performance, all under one roof.</p>
            </div>
            <Link to="/memberships" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
              See All Options <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "24/7 Gym Membership", 
                desc: "Full access to our strength floor, cardio equipment, and amenities any time of day.",
                img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1000",
                cta: "Explore Memberships",
                link: "/memberships"
              },
              { 
                title: "Group Fitness Classes", 
                desc: "Join our high-energy Zumba or specialized Senior Strength sessions led by experts.",
                img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000",
                cta: "View Classes",
                link: "/#classes"
              },
              { 
                title: "Personal Training", 
                desc: "One-on-one coaching tailored to your specific goals, injuries, and lifestyle.",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000",
                cta: "Book Membership",
                link: BOOKSY_URL
              }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                  <a href={item.link} className="inline-flex items-center gap-2 text-brand-green font-bold text-sm">
                    {item.cta} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships Preview */}
      <section id="memberships" className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Membership Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your goals. All memberships include 24/7 access and group classes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Single Member", price: "49", desc: "Standard month-to-month membership for individuals." },
              { title: "Senior Member", price: "45", desc: "Month-to-month membership for members 60 years +." },
              { title: "Student Member", price: "39", desc: "Month-to-month. Must show proof of high school ID or college ID/enrollment." },
              { title: "Family / Referral", price: "35", desc: "Month-to-month. Mention current family or friend member at sign-up." }
            ].map((plan, i) => (
              <div key={i} className="membership-card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-display font-bold">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <p className="text-gray-600 text-sm mb-8 flex-grow">{plan.desc}</p>
                <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center py-2 text-sm">
                  Book Membership
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/memberships" className="text-brand-green font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all">
              View All Membership Options <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-black rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-12 text-center">How To Get Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { step: "01", title: "Choose Your Plan", desc: "Select the membership that fits your lifestyle and goals." },
                  { step: "02", title: "Book Appointment", desc: "Schedule your onboarding via Booksy to get your key fob." },
                  { step: "03", title: "Start Training", desc: "Access the gym 24/7 and join our community of strength." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-6xl font-display font-bold text-brand-green/20 mb-6">{item.step}</div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <p className="text-gray-400 mb-8 italic">Note: All scheduling is handled securely via Booksy.</p>
                <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book Membership
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-white mb-16 text-center">Member Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", role: "Member since 2023", text: "The 24/7 access is a game changer for my busy schedule. The atmosphere is so welcoming!" },
              { name: "Mike D.", role: "Strength Athlete", text: "Best equipment in Gustine. If you're serious about lifting, this is the place to be." },
              { name: "Elena R.", role: "Senior Member", text: "The Senior Strength classes have helped me stay active and mobile. The coaches are wonderful." }
            ].map((t, i) => (
              <div key={i} className="glass p-8 rounded-2xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Zap key={i} size={16} className="fill-brand-green text-brand-green" />)}
                </div>
                <p className="text-gray-300 mb-8 italic">"{t.text}"</p>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-brand-green text-xs uppercase tracking-wider font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="contact" className="py-24 px-6 bg-brand-offwhite text-brand-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-8">Find Us in Gustine</h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-brand-green" size={20} />
                </div>
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-gray-600">510 5th Street, Gustine, CA 95322</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-black rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="text-brand-green" size={20} />
                </div>
                <div>
                  <p className="font-bold">Access Hours</p>
                  <p className="text-gray-600">Members: 24/7 Access</p>
                  <p className="text-gray-600">New Members: By Appointment</p>
                </div>
              </div>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-block">
              Get Directions
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden h-[400px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1000" 
              alt="Gym Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-green text-brand-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-10 font-medium">Join the Cali Form Fitness & Strength Studio community today and experience the difference of a dedicated strength studio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-black text-white font-bold py-4 px-10 rounded-xl hover:scale-105 transition-transform whitespace-nowrap">
              Book Membership
            </a>
            <a href="tel:2091234567" className="border-2 border-brand-black font-bold py-4 px-10 rounded-xl hover:bg-brand-black hover:text-white transition-all whitespace-nowrap">
              Call Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
