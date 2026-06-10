import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Girls Leading Tech" },
      { name: "description", content: "Join the volunteer team at Girls Leading Tech." },
    ],
  }),
  component: VolunteerPage,
});

function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    areaOfInterest: "",
    experience: "",
    whyGlt: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const areas = [
    "Events",
    "Design",
    "Social Media",
    "Operations",
    "Partnerships",
    "Content"
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] bg-notebook-dotted flex flex-col items-center justify-center pt-28 pb-12 md:pt-32 md:pb-16 px-4 md:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,500;1,700&family=Press+Start+2P&display=swap');
        
        .bg-notebook-dotted {
          background-color: #FFFBF7;
          background-image: radial-gradient(rgba(217, 85, 164, 0.08) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        footer {
          display: none !important;
        }

        @keyframes float-line {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-line {
          animation: float-line 6s ease-in-out infinite;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes revealField {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-reveal-field {
          opacity: 0;
          animation: revealField 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Back Button Container with layout fix to clear Navbar */}
      <div className="w-full max-w-5xl mb-6 flex justify-start">
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors group bg-white px-4 py-2 rounded-xl border border-[#E6DDE3] hover:border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Connect</span>
        </Link>
      </div>

      {/* Split Layout Container - Left and Right are Separate Cards of the Same Height */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-stretch animate-fade-up">
        
        {/* Left Plum Card: Brand Story (30%) */}
        <div className="lg:w-[30%] bg-[#24101F] border-2 border-black rounded-[32px] shadow-[8px_8px_0px_rgba(0,0,0,1)] p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[420px] lg:min-h-auto">
          {/* Very low opacity GLT symbols behind it */}
          <div className="absolute inset-0 opacity-[0.03] text-white pointer-events-none select-none z-0" style={{ fontFamily: "monospace" }}>
            <div className="absolute top-[10%] left-[10%] text-xl font-bold">&lt;/&gt;</div>
            <div className="absolute top-[25%] right-[15%] text-2xl font-bold">&#123; &#125;</div>
            <div className="absolute top-[45%] left-[20%] text-lg font-bold">const GLT = () =&gt;</div>
            <div className="absolute top-[60%] right-[10%] text-3xl font-bold">*</div>
            <div className="absolute bottom-[20%] left-[15%] text-xl font-bold">import &#123; Lead &#125;</div>
            <div className="absolute bottom-[10%] right-[25%] text-lg font-bold">++</div>
          </div>

          {/* New End-to-End Diagonal Scribble Line with One Twirl */}
          <div className="absolute top-0 left-0 w-full h-[120px] pointer-events-none z-0 select-none opacity-90 animate-float-line">
            <svg className="w-full h-full text-[#D955A4]" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M 0,90 C 60,85 90,80 120,60 C 140,45 150,20 135,10 C 120,0 105,15 120,30 C 135,45 200,25 320,0" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>

          {/* Left Panel Content */}
          <div className="relative z-10 flex flex-col justify-between h-full w-full">
            <div>
              {/* Space for scribble line at the top to prevent overlapping text */}
              <div className="h-16 mb-4"></div>

              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] text-[#D955A4] font-extrabold uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  VOLUNTEER CREW
                </span>
                <h2 className="text-3xl font-bold leading-tight animate-reveal-field" style={{ fontFamily: "'Montserrat', sans-serif", animationDelay: "100ms" }}>
                  Help Build The Future With Us
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed animate-reveal-field" style={{ fontFamily: "'Satoshi', sans-serif", animationDelay: "200ms" }}>
                  Join the team behind Girls Leading Tech and help create meaningful experiences for women in technology.
                </p>
              </div>
            </div>

            <ul className="space-y-3 pt-6 text-sm font-semibold animate-reveal-field" style={{ animationDelay: "300ms" }}>
              {[
                "Leadership Experience",
                "Real Project Ownership",
                "Community Impact",
                "Team Collaboration"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-200">
                  <span className="text-[#D955A4] text-lg font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Form Card: Form (70%) */}
        <div className="lg:w-[70%] bg-white border-2 border-black rounded-[32px] shadow-[8px_8px_0px_rgba(0,0,0,1)] p-8 md:p-10 flex flex-col justify-center relative">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 animate-fade-up">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100 shadow-md mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Welcome Aboard! ✨
              </h3>
              <p className="mt-3 text-gray-650 max-w-md mx-auto text-sm leading-relaxed font-semibold">
                Thank you, <strong>{formData.name}</strong>. We've received your application to volunteer for GLT. Our team will review your LinkedIn profile and reach out via <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", linkedin: "", areaOfInterest: "", experience: "", whyGlt: "" });
                }}
                className="mt-8 px-6 py-2.5 bg-[#24101F] hover:bg-[#3d1c35] text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Submit New Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-left mb-4 animate-reveal-field" style={{ animationDelay: "0ms" }}>
                <h3 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Join the Team
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Fill out the form below to apply as a volunteer.
                </p>
              </div>

              {/* Section 1: Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Name */}
                <div className="flex flex-col items-start gap-1.5 animate-reveal-field" style={{ animationDelay: "80ms" }}>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-[52px] px-4 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold"
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col items-start gap-1.5 animate-reveal-field" style={{ animationDelay: "160ms" }}>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-[52px] px-4 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col items-start gap-1.5 animate-reveal-field" style={{ animationDelay: "240ms" }}>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full h-[52px] px-4 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold"
                    placeholder="LinkedIn URL"
                    required
                  />
                </div>
              </div>

              {/* Section 2: Area of Interest */}
              <div className="flex flex-col items-start gap-1.5 relative animate-reveal-field" style={{ animationDelay: "320ms" }}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Area of Interest</label>
                <div className="relative w-full">
                  <select
                    value={formData.areaOfInterest}
                    onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                    className="w-full h-[52px] px-4 pr-10 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled hidden>Select an area of interest...</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Section 3: Experience */}
              <div className="flex flex-col items-start gap-1.5 animate-reveal-field" style={{ animationDelay: "400ms" }}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full min-h-[80px] md:min-h-[90px] p-4 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold resize-none"
                  placeholder="Tell us about any projects, clubs, initiatives, or experiences you'd like us to know about."
                  required
                />
              </div>

              {/* Section 4: Why GLT? */}
              <div className="flex flex-col items-start gap-1.5 animate-reveal-field" style={{ animationDelay: "480ms" }}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Why GLT?</label>
                <textarea
                  value={formData.whyGlt}
                  onChange={(e) => setFormData({ ...formData, whyGlt: e.target.value })}
                  className="w-full min-h-[80px] md:min-h-[90px] p-4 rounded-[14px] bg-white border border-[#E6DDE3] focus:border-[#D955A4] focus:outline-none focus:ring-4 focus:ring-[#D955A4]/10 transition-all text-sm font-semibold resize-none"
                  placeholder="Why do you want to contribute to Girls Leading Tech?"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-1 flex justify-start animate-reveal-field" style={{ animationDelay: "560ms" }}>
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#24101F] hover:bg-[#3d1c35] text-white border-2 border-black rounded-xl font-bold tracking-wider hover:-translate-y-[2px] active:translate-y-0 active:scale-98 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] uppercase text-xs cursor-pointer"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Apply to Volunteer →
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
