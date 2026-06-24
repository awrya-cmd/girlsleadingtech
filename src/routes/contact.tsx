import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { socials } from "@/data/socials";
import {
  Mail,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle2,
  Users,
  Hand,
  Mic,
  Handshake,
  Clock,
} from "lucide-react";
import contactUsMascot from "@/assets/characters/community-girl/contact-us.png";
import washiTapeSticker from "@/assets/stickers/washi-tape.png";
import smiley from "@/assets/stickers/smiley.png";
import heartSticker from "@/assets/stickers/heart.png"
import paperClipSticker from "@/assets/stickers/paper-clip.png";
import pixelBtn from "@/assets/pixel-button.png";
import DotBackground from "@/components/shared/DotBackground"
import GridBackground from "@/components/shared/GridBackground"
import SketchLines from "@/assets/stickers/sketch-lines.png"


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
      className={`transition-all duration-800 ease-out ${className}`}
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
    <>
      {/* LEFT */}
      <div
        className="
          pointer-events-none
          absolute left-[-12%] top-[-10%]
          h-[120%] w-[50vw] md:w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.28) 0%, rgba(255,170,210,0.12) 45%, transparent 75%)",
        }}
      />

      {/* RIGHT */}
      <div
        className="
          pointer-events-none
          absolute right-[-12%] top-[-10%]
          h-[120%] w-[35vw]
          blur-3xl
          opacity-90
        "
        style={{
          background:
            "radial-gradient(circle, rgba(240,120,255,0.24) 0%, rgba(255,180,230,0.10) 45%, transparent 75%)",
        }}
      />

      {/* CENTER CREAM GLOW */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[18rem]
          w-[90vw]
          md:h-[28rem]
          md:w-[50rem]
          -translate-x-1/2 -translate-y-1/2
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)",
        }}
      />
    </>
  );
}

// Animated pill-slider tab bar — active tab gets a sliding gradient pill behind it
function TabSlider({
  tabs,
  activeIndex,
  onChange,
}: {
  tabs: { label: string; icon: React.ElementType }[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-1 bg-white/80 backdrop-blur-sm rounded-full border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-1.5 mx-auto"
      role="tablist"
    >
      {tabs.map((tab, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(idx)}
            className="relative px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff5b5b] to-[#ff8a3d]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className={`relative z-10 whitespace-nowrap ${isActive ? "text-white" : "text-gray-600 hover:text-gray-900"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    userType: [] as string[],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const userTypes = [
    "Student",
    "Professional",
    "Mentor / Speaker",
    "Partner / Sponsor",
    "Other",
  ];

  const handleUserTypeChange = (type: string) => {
    setFormData((prev) => {
      const current = prev.userType;
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return { ...prev, userType: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };  const pathCards = [
    {
      title: "Join our Community",
      tabLabel: "Join Community",
      subtitle: "Become part of a thriving network.",
      benefitsTitle: "Why join us:",
      benefits: [
        "Attend events and workshops",
        "Meet ambitious women in tech",
        "Access opportunities and resources",
        "Become part of a supportive network",
      ],
      colorBg: "#FFFCEB", // Yellow
      colorUnderline: "#eab308",
      colorText: "#854d0e",
      btnText: "JOIN COMMUNITY",
      isPrimary: true, // will use pixel button
      icon: Users,
      to: "/join",
    },
    {
      title: "Volunteer / Contribute",
      tabLabel: "Volunteer",
      subtitle: "Gain leadership experience and build projects.",
      benefitsTitle: "What you'll build:",
      benefits: [
        "Gain leadership experience",
        "Build your portfolio through real projects",
        "Work with a passionate team",
        "Create meaningful impact in the community",
      ],
      colorBg: "#EEF2FF", // Lighter shade of blue
      colorUnderline: "#4f46e5",
      colorText: "#1e3a8a",
      btnText: "Explore Opportunities",
      isPrimary: false,
      icon: Hand,
      to: "/volunteer",
    },
    {
      title: "Speaker / Mentor",
      tabLabel: "Mentor",
      subtitle: "Share your knowledge and lead workshops.",
      benefitsTitle: "Your impact:",
      benefits: [
        "Share your knowledge with students",
        "Lead workshops and sessions",
        "Grow your professional network",
        "Help shape the next generation of women in tech",
      ],
      colorBg: "#EBFDF5", // Mint
      colorUnderline: "#10b981",
      colorText: "#065f46",
      btnText: "Become a Mentor →",
      isPrimary: false,
      icon: Mic,
      to: "/mentor",
    },
    {
      title: "Partner / Sponsor",
      tabLabel: "Partner",
      subtitle: "Collaborate on initiatives and support diversity.",
      benefitsTitle: "Partnership benefits:",
      benefits: [
        "Reach emerging tech talent",
        "Support diversity in technology",
        "Collaborate on community initiatives",
        "Increase brand visibility and impact",
      ],
      colorBg: "#F0EBFF", // Light Lavender-ish (Non-pink)
      colorUnderline: "#7B4F92",
      colorText: "#7B4F92",
      btnText: "Partner With Us →",
      isPrimary: false,
      icon: Handshake,
      to: "/partner",
    },
  ];

  const tabs = pathCards.map((p) => ({ label: p.tabLabel, icon: p.icon }));

  const socialLinks = [
    {
      name: "Email",
      handle: socials.email,
      href: `mailto:${socials.email}`,
      icon: Mail,
      bgClass: "bg-pink-50 text-[#d955a4]",
    },
    {
      name: "Instagram",
      handle: "@girlsleadingtech",
      href: socials.instagram,
      icon: Instagram,
      bgClass: "bg-[#ff5b2b]/10 text-[#ff5b2b]",
      external: true,
    },
    {
      name: "LinkedIn",
      handle: "Girls Leading Tech",
      href: socials.linkedin,
      icon: Linkedin,
      bgClass: "bg-[#0047FF]/10 text-[#0047FF]",
      external: true,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FFFBF7] overflow-x-hidden pb-16">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,500;1,700&family=Press+Start+2P&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap');
      `}</style>

      {/* HERO SECTION WITH GRID BG */}
      <div className="w-full bg-[#FFFBF7] bg-grid-pattern border-b border-black/5 relative overflow-hidden">
        <section className="relative overflow-x-hidden">
          <GridBackground />
          <div className="container mx-auto max-w-6xl px-6 pt-32 md:pt-44 pb-20 z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Mascot Container */}
            <div className="w-full md:w-[42%] flex justify-center items-center relative animate-fade-up">
              <img
                src={contactUsMascot}
                alt="GLT Mascot"
                className="w-60 sm:w-72 md:w-full h-auto object-contain select-none pointer-events-none animate-float-hero"
                style={{
                  filter: "drop-shadow(0 15px 35px rgba(217, 85, 164, 0.18))",
                }}
              />
            </div>

            {/* Speech / Dialog bubble */}
            <div className="w-full md:w-[58%] relative animate-fade-up [animation-delay:200ms]">

               {/* sketch lines sticker overlapping top-left */}
              <div className="absolute -top-4 -left-6 h-14 w-14 flex items-center justify-center z-20 select-none pointer-events-none animate-bounce-subtle">
                <img src={SketchLines} alt="SkecthLines" className="h-10 w-10 object-contain" />
              </div>

              {/* smiley sticker overlapping top-right */}
              <div className="absolute -top-6 -right-3 h-14 w-14 flex items-center justify-center z-20 select-none pointer-events-none animate-bounce-subtle">
                <img src={smiley} alt="Smile Sticker" className="h-10 w-10 object-contain" />
              </div>

              {/* Main Dialog Box */}
              <div className="relative bg-white/80 backdrop-blur-md border border-[#d955a4]/20 rounded-3xl p-8 md:p-12 shadow-[0_15px_50px_rgba(217,85,164,0.12)]">

                {/* Eyebrow Label */}
                <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#d955a4] font-extrabold mb-3 font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  CONNECT WITH US 
                </p>

                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-900 font-sans mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Reach out, collaborate & {" "}
                  <span className="italic text-[#930500] block sm:inline-block font-sans" style={{ fontFamily: "'times new roman', serif" }}>
                    grow with us.
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-l text-gray-700 leading-relax font-sans">
                  Wheather you are a student, a mentor, or a sponsor, there is a place for you at GLT.
                </p>


              </div>
            </div>
          </div>
          </div>
        </section>
      </div>

      {/* OPPORTUNITIES WRAPPER WITH DARKER DOTTED BG */}
      <div className="w-full bg-[#FFFBF7] relative z-0 overflow-hidden">
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <DotBackground />
        </div>
        
        {/* Header */}
        <section className="relative container mx-auto max-w-5xl px-6 pt-20 pb-4 z-10">

           {/* Decorative glows */}
              <SideGlow />


          <ScrollReveal className="text-center">
            <h2
              className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              How would you like to connect with us?
            </h2>
            <p
              className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest mt-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ✦ Choose the path that best describes you ✦
            </p>

            {/* Tab Slider */}
            <div className="mt-8 flex justify-center">
              <TabSlider tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} />
            </div>
  
          </ScrollReveal>
        </section>

        {/* SELECTED PATH PANEL — switches on tab click */}
        <section className="relative container mx-auto max-w-5xl px-6 py-20 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {activeTab === 0 && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Direct Text (No Card) */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left gap-5">
                      <div className="w-14 h-14 rounded-full bg-white border border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                        <Users className="w-7 h-7 stroke-[2] text-[#eab308]" />
                      </div>
                      <h3
                        className="text-3xl sm:text-4xl font-extrabold text-[#5b2b4a] tracking-tight leading-tight"
                        style={{ fontFamily: "'Satoshi', sans-serif" }}
                      >
                        Join Our Community
                      </h3>
                      <p
                        className="text-base sm:text-lg text-gray-700 font-semibold leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Become part of a thriving network of ambitious women in tech, where you can grow, learn, and lead.
                      </p>
                    </div>

                    {/* Right Column: Yellow Card */}
                    <div className="lg:col-span-7">
                      <div className="bg-[#FFFCEB] border-2 border-black rounded-[24px] p-8 md:p-10 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:scale-[1.01] active:scale-99 transition-all duration-300 relative z-10 overflow-hidden">
                        <span className="text-xs uppercase font-extrabold tracking-widest text-[#eab308] block mb-4 text-left" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Community Perks & Benefits
                        </span>
                        <ul className="space-y-4 text-left">
                          {[
                            "Attend events and workshops",
                            "Meet ambitious women in tech",
                            "Access opportunities and resources",
                            "Become part of a supportive network"
                          ].map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-gray-800 text-base sm:text-lg font-bold leading-relaxed"
                              style={{ fontFamily: "'Satoshi', sans-serif" }}
                            >
                              <span className="text-[#eab308] text-xl font-bold flex-shrink-0 leading-none mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Centered Primary CTA Below entire section */}
                  <div className="flex justify-center mt-12">
                    <Link
                      to="/join"
                      className="relative inline-block active:scale-95 hover:scale-[1.03] transition-all duration-200 cursor-pointer border-none bg-transparent"
                    >
                      <img
                        src={pixelBtn}
                        alt="Join Community Button"
                        className="w-[140px]
                  sm:w-[180px]
                  md:w-[210px]
                  h-auto h-auto"
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-black font-bold"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "clamp(0.50rem, 0.8vw, 0.9rem)",
                          letterSpacing: "0.08em",
                          lineHeight: "1.0",
                        }}
                      >
                        Join Community →
                      </span>
                    </Link>
                  </div>
                </>
              )}

              {activeTab === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                  {/* Left Column: Title, Copy & CTA */}
                  <div className="lg:col-span-6 flex flex-col justify-start items-start text-left gap-6">
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-white border border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                        <Hand className="w-7 h-7 stroke-[2] text-[#4f46e5]" />
                      </div>
                      <h3
                        className="text-3xl sm:text-4xl font-extrabold text-[#5b2b4a] tracking-tight leading-tight"
                        style={{ fontFamily: "'Satoshi', sans-serif" }}
                      >
                        Volunteer & Contribute
                      </h3>
                      <p
                        className="text-base sm:text-lg text-gray-700 font-semibold leading-relaxed"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Help shape Girls Leading Tech through events, operations, design, content, partnerships, and community initiatives.
                      </p>
                    </div>

                    {/* Left Aligned Premium Rectangular CTA - Matches Card Colors */}
                    <div>
                      <Link
                        to="/volunteer"
                        className="inline-block px-8 py-4 bg-[#EEF2FF] text-[#1e3a8a] border-2 border-black rounded-[14px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-[0.97] active:translate-y-0 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] text-center cursor-pointer uppercase font-bold"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Explore Opportunities
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Light Blue Card */}
                  <div className="lg:col-span-6 flex">
                    <div className="w-full bg-[#EEF2FF] border-2 border-black rounded-[24px] p-8 md:p-10 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:scale-[1.01] active:scale-99 transition-all duration-300 relative z-10 flex flex-col justify-between overflow-hidden">
                      <div className="space-y-6 mt-4">
                        <div>
                          <span
                            className="text-xs uppercase font-extrabold tracking-widest text-[#4f46e5] block mb-3 text-left"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            What You'll Work On
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "Event Operations",
                              "Social Media",
                              "Design",
                              "Content Creation",
                              "Partnerships",
                              "Community Building",
                            ].map((pill, pIdx) => (
                              <span
                                key={pIdx}
                                className="bg-white border border-black px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1e3a8a] shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all duration-200"
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                              >
                                {pill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span
                            className="text-xs uppercase font-extrabold tracking-widest text-[#4f46e5] block mb-2 text-left"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            Past Initiatives
                          </span>
                          <ul className="space-y-2 text-left">
                            {[
                              "Community networking events",
                              "Technical workshops",
                              "Speaker sessions",
                              "Student-led initiatives",
                            ].map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-gray-800 text-sm sm:text-base font-semibold leading-relaxed"
                                style={{ fontFamily: "'Satoshi', sans-serif" }}
                              >
                                <span className="text-[#4f46e5] font-bold text-sm flex-shrink-0 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <>
                  {/* Top Title Block */}
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="w-14 h-14 rounded-full bg-white border border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] mx-auto mb-5">
                      <Mic className="w-7 h-7 stroke-[2] text-[#10b981]" />
                    </div>
                    <h3
                      className="text-3xl sm:text-4xl font-extrabold text-[#5b2b4a] tracking-tight leading-tight"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      Lead The Way For The Next Generation
                    </h3>
                    <p
                      className="text-base sm:text-lg text-gray-700 font-semibold leading-relaxed mt-4"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Share your experience, guide students, host workshops, and inspire women entering technology.
                    </p>
                  </div>

                  {/* Horizontal Showcase Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Mentorship",
                        benefits: ["1:1 guidance", "Career advice"],
                      },
                      {
                        title: "Workshop Sessions",
                        benefits: ["Technical topics", "Industry insights"],
                      },
                      {
                        title: "Speaker Events",
                        benefits: ["Community talks", "Fireside chats"],
                      },
                    ].map((showcase, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-[#EBFDF5] border-2 border-black rounded-[20px] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:scale-[1.01] active:scale-99 transition-all duration-300 relative z-10 flex flex-col justify-between"
                      >
                        <div className="text-left space-y-3">
                          <h4
                            className="font-bold text-lg text-[#065f46]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {showcase.title}
                          </h4>
                          <ul className="space-y-2">
                            {showcase.benefits.map((b, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-800 text-sm sm:text-base font-semibold leading-relaxed"
                                style={{ fontFamily: "'Satoshi', sans-serif" }}
                              >
                                <span className="text-[#10b981] font-bold text-sm mt-0.5">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Section: Who We're Looking For & CTA */}
                  <div className="mt-12 text-center space-y-8">
                    <div className="space-y-4">
                      <span
                        className="text-xs uppercase font-extrabold tracking-widest text-[#10b981] block"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Who We're Looking For
                      </span>
                      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
                        {["Engineers", "Designers", "Researchers", "Founders", "Product Managers"].map((role, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-black px-4 py-1.5 rounded-full text-xs font-bold text-[#065f46] shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/mentor"
                        className="inline-block px-8 py-4 bg-[#A7F3D0] text-[#065f46] border-2 border-black rounded-[14px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-[0.97] active:translate-y-0 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] text-center cursor-pointer uppercase font-bold"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Become a Mentor
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 3 && (
                <div className="bg-[#F0EBFF] border-2 border-black rounded-[32px] p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:scale-[1.005] transition-all duration-300 relative z-10 overflow-hidden text-center">
                  <div className="w-14 h-14 rounded-full bg-white border border-black flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] mx-auto mb-6">
                    <Handshake className="w-7 h-7 stroke-[2] text-[#7B4F92]" />
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl font-black text-[#7B4F92] tracking-tight leading-tight mb-4"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Collaborate With Girls Leading Tech
                  </h3>

                  <span
                    className="text-xs uppercase font-extrabold tracking-widest text-[#7B4F92] block mb-8"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Why partner with us?
                  </span>

                  {/* Grid of 6 benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      "Reach emerging tech talent",
                      "Support diversity in technology",
                      "Collaborate on community initiatives",
                      "Increase brand visibility",
                      "Support educational programs",
                      "Build long-term impact",
                    ].map((benefit, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-black rounded-xl p-5 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:scale-[1.01] transition-all duration-200"
                      >
                        <span className="text-[#7B4F92] font-bold text-lg flex-shrink-0">•</span>
                        <span
                          className="text-[#7B4F92] font-bold text-sm leading-relaxed text-left"
                          style={{ fontFamily: "'Satoshi', sans-serif" }}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Grayscale partner logos */}
                  <div className="mt-12 border-t border-purple-200/50 pt-8">
                    <span
                      className="text-xs uppercase font-extrabold tracking-widest text-gray-500 block mb-6"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Trusted By & Community Ecosystem
                    </span>
                    
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
                      {[
                        { name: "Notion", color: "hover:text-[#000000]" },
                        { name: "Lovable", color: "hover:text-[#ff4e50]" },
                        { name: "Postman", color: "hover:text-[#ff6c37]" },
                        { name: "Wolfram", color: "hover:text-[#dd1100]" },
                        { name: "SheBuilds", color: "hover:text-[#d955a4]" },
                      ].map((logo, idx) => (
                        <span
                          key={idx}
                          className={`text-gray-500 font-black tracking-widest text-base md:text-lg transition-colors duration-300 cursor-default select-none filter grayscale hover:grayscale-0 ${logo.color}`}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {logo.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Center partner CTA below logos */}
                  <div className="pt-10">
                    <Link
                      to="/partner"
                      className="inline-block px-8 py-4 bg-[#7B4F92] text-[#FFFBF7] border-2 border-black rounded-[14px] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-[0.97] active:translate-y-0 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] text-center cursor-pointer uppercase font-bold"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Partner With GLT
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

      </div>

      {/* GENERAL CONTACT FORM SECTION (LIGHT CREAM BACKGROUND WITH NORMAL DOTS) */}
      <div className="w-full bg-[#FFFBF7] bg-notebook-dotted">
        <section id="form" className="relative container mx-auto max-w-5xl px-6 py-20 z-10">
          <ScrollReveal className="text-center mb-10">
            <p
              className="text-base md:text-lg font-bold text-[#5b2b4a] mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Still not sure where to start?
            </p>
            <h2
              className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-gray-900 max-w-2xl mx-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Send us a message and we'll point you in the right direction
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white border-2 border-black rounded-[32px] p-8 md:p-12 lg:p-16 shadow-[6px_6px_0px_rgba(0,0,0,1)] max-w-3xl mx-auto">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-up">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-6 animate-bounce-subtle">
                    <CheckCircle2 className="w-10 h-10 animate-bounce-subtle" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-gray-900"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Message Sent! ✨
                  </h3>
                  <p
                    className="mt-3 text-gray-650 max-w-md mx-auto text-sm sm:text-base leading-relaxed font-semibold"
                    style={{ fontFamily: "'Satoshi', sans-serif" }}
                  >
                    Thank you, <strong>{formData.name}</strong>. We've received your message regarding{" "}
                    <strong>{formData.subject}</strong> and our team will get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", userType: [], message: "" });
                    }}
                    className="mt-8 px-8 py-3.5 bg-[#5b2b4a] hover:bg-[#4a1c38] text-white border-2 border-black rounded-xl font-bold tracking-wider hover:-translate-y-[2px] active:translate-y-0 active:scale-98 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] uppercase text-xs cursor-pointer"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FFFBF7] rounded-2xl border-2 border-black focus:border-[#d955a4] focus:outline-none px-5 py-4 text-gray-900 placeholder-gray-400 text-sm transition-all shadow-inner font-semibold"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FFFBF7] rounded-2xl border-2 border-black focus:border-[#d955a4] focus:outline-none px-5 py-4 text-gray-900 placeholder-gray-400 text-sm transition-all shadow-inner font-semibold"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject field (textbox) */}
                  <div>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FFFBF7] rounded-2xl border-2 border-black focus:border-[#d955a4] focus:outline-none px-5 py-4 text-gray-900 placeholder-gray-400 text-sm transition-all shadow-inner font-semibold"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  {/* Checklist field */}
                  <div className="space-y-3 text-left">
                    <label className="block text-xs font-extrabold text-gray-500 uppercase tracking-widest">
                      What best describes you?
                    </label>
                    <div className="flex flex-wrap gap-2 justify-start">
                      {userTypes.map((type) => {
                        const isChecked = formData.userType.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleUserTypeChange(type)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                              isChecked
                                ? "bg-[#5b2b4a] border-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                : "bg-[#FFFBF7] border-2 border-black text-gray-600 hover:bg-[#ffeef2] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            }`}
                          >
                            <span>{type}</span>
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FFFBF7] rounded-2xl border-2 border-black focus:border-[#d955a4] focus:outline-none px-5 py-4 text-gray-900 placeholder-gray-400 text-sm transition-all min-h-[150px] shadow-inner font-semibold"
                      placeholder="Your Message"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-[#5b2b4a] hover:bg-[#4a1c38] text-white border-2 border-black rounded-xl font-bold tracking-wider hover:-translate-y-[2px] active:translate-y-0 active:scale-98 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] uppercase text-sm cursor-pointer"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Send Message →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* WHATSAPP & SOCIALS SECTION (COMBINED SIDE-BY-SIDE ON CREAM) */}
      <section className="relative w-full py-20 px-6 z-0 border-t border-black/5 bg-[#FFFBF7] overflow-hidden">
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <DotBackground />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Centered Heading with no trailing dots */}
          <ScrollReveal className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#5b2b4a]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Or Directly Contact Us
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: WhatsApp Card (Dark Plum) */}
            <div className="lg:col-span-6 flex">
              <ScrollReveal className="w-full flex" delay={100}>
                <div className="group relative z-10 w-full bg-[#5b2b4a] border-2 border-black rounded-[32px] p-8 md:p-10 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col justify-between overflow-hidden text-[#FFFBF7]">
                  <div className="text-left mt-6">
                    <span
                      className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#ff8ac8] block mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Stay Updated With GLT
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-black mb-3"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      Join our WhatsApp Community
                    </h3>
                    <p
                      className="text-gray-200 text-sm md:text-base leading-relaxed font-semibold mb-6"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Get updates about events, opportunities, workshops, community announcements, and new initiatives directly through our community channels.
                    </p>
                  </div>

                  <div className="flex justify-start">
                    {/* WhatsApp Join Button with pulse shadow */}
                    <a
                      href="https://whatsapp.com/channel/0029VayYXL4K5cD7Zrzq052G"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block active:scale-97 hover:scale-[1.03] transition-transform duration-100 cursor-pointer border-none bg-transparent animate-pulse-shadow rounded-lg"
                    >
                      <img
                        src={pixelBtn}
                        alt="Join WhatsApp Community"
                        className="w-[180px] sm:w-[210px] h-auto"
                      />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-black font-bold text-center"
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "clamp(0.58rem, 1.2vw, 0.78rem)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Join Group →
                      </span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Three Social Cards Stacked */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 100} className="flex-1 flex">
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between bg-white border-2 border-black rounded-[24px] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 w-full cursor-pointer relative z-10"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full w-12 h-12 flex items-center justify-center border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${social.bgClass} group-hover:scale-105 transition-transform duration-300`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span
                            className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold block"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {social.name}
                          </span>
                          <p
                            className="text-sm font-semibold text-gray-900 mt-0.5 group-hover:text-[#d955a4] transition-colors"
                            style={{ fontFamily: "'Satoshi', sans-serif" }}
                          >
                            {social.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#d955a4] group-hover:translate-x-1 transition-all" />
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
