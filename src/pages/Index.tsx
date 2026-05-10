import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/e797fcf5-498d-4d52-9109-00d58de8e559/files/24ecf2bc-8964-45ea-84ba-bdaac573b849.jpg";
const GALLERY_IMG = "https://cdn.ezst.app/projects/e797fcf5-498d-4d52-9109-00d58de8e559/files/9842611a-eddf-4d4a-ac58-aa230f28974d.jpg";
const TEAM_IMG = "https://cdn.ezst.app/projects/e797fcf5-498d-4d52-9109-00d58de8e559/files/198f5631-d781-4061-975e-56554d113398.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    hours: 1,
    price: "$30",
    title: "Small Yard Mowing",
    desc: "Full mowing for small yards — clean, quick, and thorough.",
    icon: "Leaf",
    highlight: false,
  },
  {
    hours: 2,
    price: "$40",
    title: "Decent Sized Lawn",
    desc: "Full mowing for decent sized lawns, leaving your yard looking great.",
    icon: "Trees",
    highlight: true,
  },
  {
    hours: 3,
    price: "$60",
    title: "Complete Package – Small",
    desc: "Full cleanup: edge trimming, full mowing, grass cleanup & more for small lawns.",
    icon: "Sprout",
    highlight: false,
  },
  {
    hours: 4,
    price: "$85–$100",
    title: "Complete Package – Large",
    desc: "Full cleanup package for big lawns: edge trimming, full mowing, grass cleanup & more.",
    icon: "TreePine",
    highlight: false,
  },
];

const whyUs = [
  { icon: "BadgeCheck", title: "Professional Care", desc: "Detailed, precise work on every property we touch." },
  { icon: "TreePine", title: "Clean Yard Service", desc: "Specialized clearing of undergrowth, deadwood, and debris." },
  { icon: "Clock", title: "Reliable Service", desc: "We show up on time, every time — guaranteed." },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-body bg-white text-lawn-900 overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-display text-2xl font-black text-lawn-600 tracking-tight" style={{ color: scrolled ? undefined : "white" }}>LAWN PRO</span>
          <nav className="hidden md:flex gap-8 text-sm font-medium" style={{ color: scrolled ? "#1e5e1e" : "white" }}>
            {[["Home","hero"],["About","about"],["Services","services"],["Gallery","gallery"],["Contact","contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:opacity-70 transition-opacity">
                {label}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: scrolled ? "#1e5e1e" : "white" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-lawn-100 px-6 py-4 flex flex-col gap-4 text-lawn-700 font-medium shadow-lg">
            {[["Home","hero"],["About","about"],["Services","services"],["Gallery","gallery"],["Contact","contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left py-1">{label}</button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="LAWN PRO hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-lawn-900/70 via-lawn-900/50 to-lawn-900/80" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 border border-white/30 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6" style={{ animation: "fade-in 0.6s ease forwards" }}>
            Active Season 2026
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-tight mb-4" style={{ animation: "fade-in 0.7s ease 0.1s both" }}>
            LAWN PRO
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-light mb-4" style={{ animation: "fade-in 0.7s ease 0.25s both" }}>
            Clean Yard & Reliable Lawn Care
          </p>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-10" style={{ animation: "fade-in 0.7s ease 0.35s both" }}>
            Bringing order to nature, one yard at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fade-in 0.7s ease 0.5s both" }}>
            <button
              onClick={() => scrollTo("services")}
              className="bg-lawn-500 hover:bg-lawn-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
            >
              View Pricing
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-lawn-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-lawn-200 rounded-2xl" />
              <img src={TEAM_IMG} alt="LAWN PRO team" className="relative rounded-2xl w-full h-80 object-cover shadow-xl" />
              <div className="absolute -bottom-6 -right-6 bg-lawn-600 text-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="font-display text-3xl font-black">100%</div>
                <div className="text-lawn-200 text-sm">On-Time Arrival</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <span className="text-lawn-500 text-sm font-semibold tracking-widest uppercase">Who We Are</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-lawn-900 mt-2 mb-6 leading-tight">
                Our Mission
              </h2>
              <p className="text-lawn-700 text-lg leading-relaxed mb-8">
                Welcome to LAWN PRO. We specialize in keeping your property pristine, providing high-quality care that turns messy landscapes into clean, beautiful spaces.
              </p>
              <div className="grid gap-5">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-lawn-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} fallback="CircleAlert" size={20} className="text-lawn-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-lawn-900 mb-1">{item.title}</div>
                      <div className="text-lawn-600 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES & PRICING */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-lawn-500 text-sm font-semibold tracking-widest uppercase">Active Season 2026</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-lawn-900 mt-2">Services & Pricing</h2>
            <p className="text-lawn-600 mt-4 max-w-lg mx-auto">All services include full debris removal. Simple, transparent pricing.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <FadeIn key={s.hours} delay={i * 0.12}>
                <div
                  className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    s.highlight
                      ? "bg-lawn-600 text-white shadow-xl"
                      : "bg-lawn-50 text-lawn-900 border border-lawn-100"
                  }`}
                >
                  {s.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lawn-400 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${s.highlight ? "bg-white/20" : "bg-lawn-100"}`}>
                    <Icon name={s.icon} fallback="CircleAlert" size={24} className={s.highlight ? "text-white" : "text-lawn-600"} />
                  </div>
                  <div className={`text-sm font-semibold tracking-widest uppercase mb-2 ${s.highlight ? "text-lawn-200" : "text-lawn-500"}`}>
                    {s.hours} {s.hours === 1 ? "Hour" : "Hours"}
                  </div>
                  <div className={`font-display text-5xl font-black mb-1 ${s.highlight ? "text-white" : "text-lawn-900"}`}>
                    {s.price}
                  </div>
                  <div className={`text-sm mb-4 ${s.highlight ? "text-lawn-200" : "text-lawn-500"}`}>per session</div>
                  <div className={`font-semibold text-lg mb-2 ${s.highlight ? "text-white" : "text-lawn-800"}`}>{s.title}</div>
                  <p className={`text-sm leading-relaxed flex-1 ${s.highlight ? "text-lawn-200" : "text-lawn-600"}`}>{s.desc}</p>
                  <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${s.highlight ? "text-lawn-200" : "text-lawn-500"}`}>
                    <Icon name="Check" size={16} />
                    Debris removal included
                  </div>
                  <button
                    onClick={() => scrollTo("contact")}
                    className={`mt-6 w-full py-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 ${
                      s.highlight
                        ? "bg-white text-lawn-700 hover:bg-lawn-50"
                        : "bg-lawn-600 text-white hover:bg-lawn-500"
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-lawn-900">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-lawn-400 text-sm font-semibold tracking-widest uppercase">Our Work</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-2">Before & After</h2>
            <p className="text-lawn-400 mt-4">Clean Forest Experience — see the transformation</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                <img src={GALLERY_IMG} alt="Before and After" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-lawn-900/80 to-transparent flex items-end p-6">
                  <div>
                    <div className="text-lawn-300 text-xs font-semibold uppercase tracking-widest mb-1">Transformation</div>
                    <div className="text-white font-display text-2xl font-bold">Before & After: Forest Clear</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                <img src={HERO_IMG} alt="Clean lawn" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-lawn-900/80 to-transparent flex items-end p-6">
                  <div>
                    <div className="text-lawn-300 text-xs font-semibold uppercase tracking-widest mb-1">Result</div>
                    <div className="text-white font-display text-2xl font-bold">Manicured Lawn & Clean Site</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {[["100+", "Properties Served"], ["3", "Service Tiers"], ["100%", "Debris Removed"]].map(([val, label]) => (
              <FadeIn key={label} className="text-center">
                <div className="font-display text-4xl font-black text-lawn-400">{val}</div>
                <div className="text-lawn-500 text-sm mt-1">{label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-lawn-500 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-lawn-900 mt-2">Contact Us</h2>
            <p className="text-lawn-600 mt-4">Ready to transform your property? We're here to help.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div className="bg-lawn-50 rounded-2xl p-8 border border-lawn-100">
                <h3 className="font-display text-2xl font-black text-lawn-900 mb-6">LAWN PRO</h3>
                <div className="space-y-5">
                  {[
                    { icon: "MapPin", label: "Location", val: "Stratford, Ontario, Canada" },
                    { icon: "Phone", label: "Phone", val: "226-989-6683 / 226-386-0687" },
                    { icon: "Mail", label: "Email", val: "mrlawnpro@hotmail.com" },
                    { icon: "Clock", label: "Mon – Fri", val: "4:00 PM – 7:00 PM" },
                    { icon: "Phone", label: "Sat – Sun", val: "Contact us to schedule" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-lawn-100 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} fallback="CircleAlert" size={18} className="text-lawn-600" />
                      </div>
                      <div>
                        <div className="text-lawn-500 text-xs font-semibold uppercase tracking-wider">{item.label}</div>
                        <div className="text-lawn-900 font-medium">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lawn-700 text-sm font-medium mb-1">Your Name</label>
                    <input type="text" placeholder="John Smith" className="w-full border border-lawn-200 rounded-xl px-4 py-3 text-lawn-900 placeholder-lawn-400 focus:outline-none focus:ring-2 focus:ring-lawn-400 focus:border-transparent transition bg-white" />
                  </div>
                  <div>
                    <label className="block text-lawn-700 text-sm font-medium mb-1">Phone / Email</label>
                    <input type="text" placeholder="Your contact" className="w-full border border-lawn-200 rounded-xl px-4 py-3 text-lawn-900 placeholder-lawn-400 focus:outline-none focus:ring-2 focus:ring-lawn-400 focus:border-transparent transition bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-lawn-700 text-sm font-medium mb-1">Service Needed</label>
                  <select className="w-full border border-lawn-200 rounded-xl px-4 py-3 text-lawn-900 focus:outline-none focus:ring-2 focus:ring-lawn-400 focus:border-transparent transition bg-white">
                    <option>Small Yard Mowing ($30)</option>
                    <option>Decent Sized Lawn Mowing ($40)</option>
                    <option>Complete Package – Small Lawn ($60)</option>
                    <option>Complete Package – Large Lawn ($85–$100)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lawn-700 text-sm font-medium mb-1">Message</label>
                  <textarea rows={4} placeholder="Tell us about your property..." className="w-full border border-lawn-200 rounded-xl px-4 py-3 text-lawn-900 placeholder-lawn-400 focus:outline-none focus:ring-2 focus:ring-lawn-400 focus:border-transparent transition bg-white resize-none" />
                </div>
                <button type="submit" className="w-full bg-lawn-600 hover:bg-lawn-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg">
                  Send Message
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-lawn-900 py-10 text-center">
        <div className="font-display text-2xl font-black text-lawn-400 mb-2">LAWN PRO</div>
        <p className="text-lawn-500 text-sm">Bringing order to nature, one yard at a time.</p>
        <p className="text-lawn-700 text-xs mt-4">© 2026 LAWN PRO. All rights reserved.</p>
      </footer>
    </div>
  );
}