import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { socials } from "@/data/socials";
import {
  Mail,
  GraduationCap,
  Compass,
  Mic,
  Handshake,
  Sparkles,
  Instagram,
  Linkedin,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Users
} from "lucide-react";
import contactUsMascot from "@/assets/characters/community-girl/contact-us.png";
import washiTapeSticker from "@/assets/stickers/washi-tape.png";
import smileySticker from "@/assets/stickers/smiley.png";
import starSticker from "@/assets/stickers/star.png";
import heartSticker from "@/assets/stickers/heart.png";
import pixelBtn from "@/assets/pixel-button.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Girls Leading Tech" },
      { name: "description", content: "Reach out to the Girls Leading Tech team." },
    ],
  }),
  component: ContactPage,
});

// Custom Intersection Observer Component for Scroll Reveals
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// SideGlow Background Layer components
function SideGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* LEFT GLOW */}
      <div
        className="
          absolute left-[-15%] top-[-5%]
          h-[120%] w-[55vw] md:w-[38vw]
          blur-3xl
          opacity-80
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.22) 0%, rgba(255,170,210,0.08) 45%, transparent 75%)",
        }}
      />

      {/* RIGHT GLOW */}
      <div
        className="
          absolute right-[-15%] top-[15%]
          h-[120%] w-[45vw] md:w-[32vw]
          blur-3xl
          opacity-80
        "
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.18) 0%, rgba(255,180,230,0.06) 45%, transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW */}
      <div
        className="
          absolute left-1/2 top-1/3
          h-[28rem]
          w-[85vw]
          -translate-x-1/2 -translate-y-1/2
          blur-3xl
          opacity-75
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,237,149,0.2) 0%, rgba(255,248,239,0.08) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(to.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const isExternalOrHash = (url: string) => url.startsWith("mailto:") || url.startsWith("#");

  const actionCards = [
    {
      title: "Join as a Student",
      icon: GraduationCap,
      desc: "Discover events, programs, opportunities, and a community built to help you grow.",
      btnText: "Join Community",
      to: "/join",
    },
    {
      title: "Become a Mentor",
      icon: Compass,
      desc: "Support aspiring women in tech through guidance and experience sharing.",
      btnText: "Mentor With Us",
      to: "#form",
    },
    {
      title: "Become a Speaker",
      icon: Mic,
      desc: "Share your expertise, stories, and insights with our members.",
      btnText: "Speak at GLT",
      to: "#form",
    },
    {
      title: "Partner With Us",
      icon: Handshake,
      desc: "Collaborate on events, initiatives, sponsorships, and community programs.",
      btnText: "Explore Partnerships",
      to: "#form",
    },
    {
      title: "Volunteer / Contributor",
      icon: Sparkles,
      desc: "Help build projects, events, resources, and experiences for the community.",
      btnText: "Get Involved",
      to: "/join",
    },
    {
      title: "Email Us",
      icon: Mail,
      desc: "Questions, ideas, press inquiries, or just a hello.",
      btnText: "Open Mail",
      to: `mailto:${socials.email}`,
    },
  ];

  const inputClass =
    "peer w-full bg-white/50 border border-gray-200 focus:border-[#d955a4] rounded-2xl px-4 py-4 text-gray-950 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#d955a4]/30 transition-all duration-200 pt-6 pb-2 text-sm";
  const labelClass =
    "absolute left-4 top-2 text-[10px] uppercase tracking-wider text-gray-400 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-[#d955a4] transition-all pointer-events-none font-bold";

  return (
    <div className="relative w-full min-h-screen bg-[#FFFBF7] overflow-x-hidden pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,500;1,700&family=Press+Start+2P&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.02); }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Decorative glows */}
      <SideGlow />

      {/* HERO SECTION */}
      <section className="relative container mx-auto max-w-6xl px-6 pt-32 md:pt-44 pb-20 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Mascot Container */}
          <div className="w-full md:w-[42%] flex justify-center items-center relative animate-fade-up">
            <img
              src={contactUsMascot}
              alt="GLT Mascot"
              className="w-60 sm:w-72 md:w-full h-auto object-contain select-none pointer-events-none animate-float"
              style={{
                filter: "drop-shadow(0 15px 35px rgba(217, 85, 164, 0.18))",
              }}
            />
          </div>

          {/* Speech / Dialog bubble */}
          <div className="w-full md:w-[58%] relative animate-fade-up [animation-delay:200ms]">
            {/* Heart sticker overlapping top-right */}
            <div className="absolute -top-6 -right-3 h-14 w-14 rounded-full bg-white shadow-[0_8px_25px_rgba(217,85,164,0.15)] flex items-center justify-center border border-pink-100 z-20 select-none pointer-events-none animate-bounce-subtle">
              <img src={heartSticker} alt="Heart Sticker" className="h-10 w-10 object-contain" />
            </div>

            {/* Washi tape sticker top-left of dialog box */}
            <img
              src={washiTapeSticker}
              alt="Washi Tape"
              className="absolute -top-9 left-[15%] w-32 object-contain rotate-[-6deg] opacity-95 pointer-events-none select-none z-20"
            />

            {/* Main Dialog Box */}
            <div className="relative bg-white/80 backdrop-blur-md border border-[#d955a4]/20 rounded-3xl p-8 md:p-12 shadow-[0_15px_50px_rgba(217,85,164,0.12)]">
              {/* Curved Speech Bubble Tail pointing left (desktop only) */}
              <div className="hidden md:block absolute top-[45%] right-full w-5 h-5 pointer-events-none -mr-[1px] rotate-90">
                <svg className="w-full h-full" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0 Z" fill="#ffffff" className="opacity-90" />
                  <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0" stroke="rgba(217, 85, 164, 0.2)" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* Curved Speech Bubble Tail pointing up (mobile only, below mascot) */}
              <div className="block md:hidden absolute bottom-full left-[25%] w-5 h-5 pointer-events-none -mb-[1px]">
                <svg className="w-full h-full" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0 Z" fill="#ffffff" className="opacity-90" />
                  <path d="M 20 0 Q 18 14 0 20 Q 10 12 8 0" stroke="rgba(217, 85, 164, 0.2)" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* Eyebrow Label */}
              <p
                className="text-xs md:text-sm uppercase tracking-[0.25em] text-[#d955a4] font-extrabold mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CONTACT
              </p>

              {/* Main Heading */}
              <h1
                className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900 mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Let's Build Something{" "}
                <span
                  className="italic font-medium text-[#5b2b4a] block sm:inline-block"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Together.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p
                className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Whether you're a student, mentor, speaker, volunteer, partner, or supporter, there's a place for you in the Girls Leading Tech community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS SECTION */}
      <section className="relative container mx-auto max-w-6xl px-6 py-16 z-10">
        <ScrollReveal className="text-center mb-12">
          <p
            className="text-xs uppercase tracking-[0.2em] text-[#d955a4] font-extrabold mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            QUICK ACTIONS
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Choose your way to get involved
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className="group relative bg-white/70 backdrop-blur-md border border-[#d955a4]/15 p-8 rounded-3xl shadow-[0_10px_30px_rgba(217,85,164,0.02)] hover:shadow-[0_20px_40px_rgba(217,85,164,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Icon frame */}
                    <div className="bg-[#d955a4]/10 rounded-2xl w-14 h-14 flex items-center justify-center text-[#d955a4] mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Card Content */}
                    <h3
                      className="text-lg font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm leading-relaxed"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      {card.desc}
                    </p>
                  </div>

                  {/* Dynamic link rendering */}
                  {isExternalOrHash(card.to) ? (
                    <a
                      href={card.to}
                      onClick={(e) => handleLinkClick(e, card.to)}
                      className="mt-6 w-full py-2.5 px-4 bg-[#FFF8EF] hover:bg-[#d955a4] text-[#d955a4] hover:text-white border border-[#d955a4]/20 rounded-xl text-xs font-bold transition-all duration-300 text-center uppercase tracking-wider block shadow-sm active:scale-98"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {card.btnText}
                    </a>
                  ) : (
                    <Link
                      to={card.to}
                      className="mt-6 w-full py-2.5 px-4 bg-[#FFF8EF] hover:bg-[#d955a4] text-[#d955a4] hover:text-white border border-[#d955a4]/20 rounded-xl text-xs font-bold transition-all duration-300 text-center uppercase tracking-wider block shadow-sm active:scale-98"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {card.btnText}
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* PARTNERSHIP FORM SECTION */}
      <section id="form" className="relative container mx-auto max-w-3xl px-6 py-16 z-10">
        <ScrollReveal>
          <GlassCard
            glow
            className="p-8 md:p-12 border border-[#d955a4]/20 rounded-[32px] bg-white/75 backdrop-blur-lg shadow-[0_20px_50px_rgba(217,85,164,0.08)]"
          >
            <div className="text-center mb-10">
              <p
                className="text-xs uppercase tracking-[0.2em] text-[#d955a4] font-extrabold mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                COLLABORATE
              </p>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Partnership Enquiries
              </h2>
              <p
                className="mt-3 text-gray-600 text-sm sm:text-base"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                Let's discuss how we can work together to empower women in technology.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100 shadow-soft mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 animate-bounce-subtle"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Enquiry Sent! ✨
                </h3>
                <p
                  className="mt-3 text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Thank you, <strong>{formData.name}</strong>. We've received your partnership request for{" "}
                  <strong>{formData.type || "collaboration"}</strong> and our team will get back to you within 24-48
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", org: "", email: "", type: "", message: "" });
                  }}
                  className="mt-8 px-6 py-2.5 bg-[#d955a4] hover:bg-[#c44091] text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider shadow-md active:scale-95 duration-100"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Full Name"
                      required
                    />
                    <label
                      htmlFor="name"
                      className={labelClass}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Organization */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="org"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className={inputClass}
                      placeholder="Organization"
                      required
                    />
                    <label
                      htmlFor="org"
                      className={labelClass}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Organization
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Address */}
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="Email Address"
                      required
                    />
                    <label
                      htmlFor="email"
                      className={labelClass}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Partnership Type */}
                  <div className="relative w-full">
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className={`${inputClass} appearance-none`}
                      required
                    >
                      <option value="" disabled hidden></option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Event Collaboration">Event Collaboration</option>
                      <option value="Community Initiative">Community Initiative</option>
                      <option value="Speaker/Mentor Hosting">Speaker/Mentor Hosting</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="type"
                      className={`absolute left-4 transition-all pointer-events-none font-bold ${
                        formData.type
                          ? "top-2 text-[10px] uppercase tracking-wider text-[#d955a4]"
                          : "top-[18px] text-sm text-gray-500"
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Partnership Type
                    </label>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative w-full">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} min-h-[140px] resize-y`}
                    placeholder="Message"
                    required
                  />
                  <label
                    htmlFor="message"
                    className={labelClass}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message
                  </label>
                </div>

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-[#d955a4] hover:bg-[#c44091] text-white font-bold rounded-2xl text-sm transition-all duration-200 uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 duration-100"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Let's Collaborate
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section id="opportunities" className="relative container mx-auto max-w-5xl px-6 py-16 z-10">
        <ScrollReveal className="text-center mb-12">
          <p
            className="text-xs uppercase tracking-[0.2em] text-[#d955a4] font-extrabold mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            OPPORTUNITIES
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Grow with Girls Leading Tech
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Community Opportunities */}
          <ScrollReveal delay={100} className="h-full">
            <div className="group relative bg-[#FFF8EF]/80 backdrop-blur-md border border-[#d955a4]/15 rounded-3xl p-8 md:p-10 shadow-[0_10px_30px_rgba(217,85,164,0.02)] hover:shadow-[0_20px_40px_rgba(217,85,164,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="bg-[#d955a4]/10 rounded-2xl w-14 h-14 flex items-center justify-center text-[#d955a4] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Community Opportunities
                </h3>
                <p
                  className="text-gray-600 text-sm md:text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Join our internal teams to build products, host events, design resources, and shape the direction of
                  our tech community.
                </p>
                <ul className="space-y-3">
                  {["Volunteers", "Contributors", "Chapter Leaders", "Event Support"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-800 text-sm sm:text-base">
                      <span className="w-2 h-2 rounded-full bg-[#d955a4]" />
                      <span style={{ fontFamily: "'Satoshi', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 text-[#d955a4] font-bold text-sm hover:underline"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Apply to community teams <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Industry Opportunities */}
          <ScrollReveal delay={200} className="h-full">
            <div className="group relative bg-[#FFF8EF]/80 backdrop-blur-md border border-[#d955a4]/15 rounded-3xl p-8 md:p-10 shadow-[0_10px_30px_rgba(217,85,164,0.02)] hover:shadow-[0_20px_40px_rgba(217,85,164,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="bg-[#0047FF]/10 rounded-2xl w-14 h-14 flex items-center justify-center text-[#0047FF] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Industry Opportunities
                </h3>
                <p
                  className="text-gray-600 text-sm md:text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Partner with us to support and empower the next generation of female technologists through professional
                  contributions.
                </p>
                <ul className="space-y-3">
                  {["Mentors", "Speakers", "Partners", "Sponsors"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-800 text-sm sm:text-base">
                      <span className="w-2 h-2 rounded-full bg-[#0047FF]" />
                      <span style={{ fontFamily: "'Satoshi', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href="#form"
                  onClick={(e) => handleLinkClick(e, "#form")}
                  className="inline-flex items-center gap-2 text-[#0047FF] font-bold text-sm hover:underline"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Submit a partnership request <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <section className="relative container mx-auto max-w-5xl px-6 py-10 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Email card */}
          <ScrollReveal delay={50}>
            <a
              href={`mailto:${socials.email}`}
              className="group flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#d955a4]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-[#d955a4]/10 rounded-xl w-12 h-12 flex items-center justify-center text-[#d955a4] group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider text-gray-400 font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Email
                </p>
                <p
                  className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  {socials.email}
                </p>
              </div>
            </a>
          </ScrollReveal>

          {/* Instagram card */}
          <ScrollReveal delay={150}>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#d955a4]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-[#ff5b2b]/10 rounded-xl w-12 h-12 flex items-center justify-center text-[#ff5b2b] group-hover:scale-110 transition-transform duration-300">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider text-gray-400 font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Instagram
                </p>
                <p
                  className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  @girlsleadingtech
                </p>
              </div>
            </a>
          </ScrollReveal>

          {/* LinkedIn card */}
          <ScrollReveal delay={250}>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#d955a4]/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-[#0047FF]/10 rounded-xl w-12 h-12 flex items-center justify-center text-[#0047FF] group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="text-[10px] uppercase tracking-wider text-gray-400 font-bold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  LinkedIn
                </p>
                <p
                  className="text-sm font-semibold text-gray-900 line-clamp-1 mt-0.5"
                  style={{ fontFamily: "'Satoshi', sans-serif" }}
                >
                  Girls Leading Tech
                </p>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA CARD */}
      <section className="container mx-auto max-w-4xl px-6 py-12 z-10">
        <ScrollReveal>
          <div className="relative bg-[#FFF8EF] border border-[#d955a4]/20 rounded-[28px] p-8 md:p-14 shadow-lg text-center overflow-hidden">
            {/* Soft decorative glows */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffed95]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#d955a4]/10 rounded-full blur-2xl pointer-events-none" />

            <p
              className="text-xs uppercase tracking-[0.25em] text-[#d955a4] font-bold mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              GET IN TOUCH
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Not Sure Where You Fit In?
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              Tell us a little about yourself and we'll point you in the right direction.
            </p>

            <a
              href={`mailto:${socials.email}?subject=Contact%20Team%20-%20Girls%20Leading%20Tech`}
              className="relative inline-block active:scale-95 transition-transform duration-100 mt-8"
            >
              <img src={pixelBtn} alt="Contact the Team Button" className="w-[220px] h-auto" />
              <span
                className="absolute inset-0 flex items-center justify-center text-black font-bold"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.02em",
                }}
              >
                Contact the Team
              </span>
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
