import { ArrowUpRight, Sparkles, Laptop, BookOpen, Heart, Trophy, MapPin, Mail, Compass } from "lucide-react";

export function WhyJoinUs() {
  return (
    <div className="w-full py-8 md:py-12 bg-[#fdf9f5]">
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-6deg); }
          75% { transform: rotate(6deg); }
        }
        .group:hover .animate-wiggle-hover {
          animation: wiggle 0.4s ease-in-out infinite;
        }

        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .group:hover .animate-pulse-heart {
          animation: pulse-heart 0.5s ease-in-out infinite;
        }

        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .group:hover .animate-float-y {
          animation: float-y 1.5s ease-in-out infinite;
        }

        @keyframes badge-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .group:hover .animate-badge-bounce {
          animation: badge-bounce 0.6s ease-in-out;
        }
      `}</style>

      {/* Dotted Pixel Grid Background */}
      <div className="relative w-full container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-5 xl:gap-6 items-stretch py-8">
          
          {/* CARD 1 — DISCOVER */}
          <div 
            className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[290px] md:min-h-[320px] bg-[#d2f4d2] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            <div>
              {/* Top Row: Lil Logos & Arrow Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                    <Compass className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                    <Mail className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                Discover Opportunities
              </h3>

              {/* Subheading */}
              <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                Scholarships, internships, hackathons, fellowships and programs curated for girls in tech.
              </p>
            </div>

            {/* Badges Footer */}
            <div className="flex flex-wrap gap-2">
              {["Internships", "Scholarships", "Hackathons", "Fellowships"].map((badge, idx) => (
                <span 
                  key={badge}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 2 — LEARN */}
          <div 
            className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[290px] md:min-h-[320px] bg-[#ffe4cc] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            <div>
              {/* Top Row: Lil Logos & Arrow Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                    <BookOpen className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                    <Laptop className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                Learn Together
              </h3>

              {/* Subheading */}
              <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                Hands-on cohorts, mentorship circles and guided learning paths designed to help you grow.
              </p>
            </div>

            {/* Badges Footer */}
            <div className="flex flex-wrap gap-2">
              {["ML Cohort", "Mentorship", "Workshops"].map((badge, idx) => (
                <span 
                  key={badge}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 3 — CONNECT */}
          <div 
            className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[290px] md:min-h-[320px] bg-[#e3e0ff] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            <div>
              {/* Top Row: Lil Logos & Arrow Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-pulse-heart">
                    <Heart className="w-5 h-5 text-[#d955a4] fill-[#d955a4] stroke-[2]" />
                  </div>
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-float-y">
                    <MapPin className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                Find Your People
              </h3>

              {/* Subheading */}
              <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                Meet girls from across India and beyond who are building, learning and growing together.
              </p>
            </div>

            {/* Badges Footer */}
            <div className="flex flex-wrap gap-2">
              {["Community", "Support", "Networking", "Friendships"].map((badge, idx) => (
                <span 
                  key={badge}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 4 — BUILD */}
          <div 
            className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[290px] md:min-h-[320px] bg-[#e0e7ff] border-2 border-black rounded-[24px] shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            <div>
              {/* Top Row: Lil Logos & Arrow Button */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-wiggle-hover">
                    <Trophy className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                  <div className="p-2 bg-white border border-black rounded-lg shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] animate-pulse-heart">
                    <Sparkles className="w-5 h-5 text-gray-900 stroke-[2.5]" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center bg-white text-black transition-colors group-hover:bg-black group-hover:text-white shrink-0 cursor-pointer">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                Build With Confidence
              </h3>

              {/* Subheading */}
              <p className="font-sans text-xs sm:text-sm text-gray-800 font-medium leading-relaxed mb-6">
                From your first hackathon to leading initiatives, we're here for every step of the journey.
              </p>
            </div>

            {/* Badges Footer */}
            <div className="flex flex-wrap gap-2">
              {["Projects", "Leadership", "Hackathons", "Impact"].map((badge, idx) => (
                <span 
                  key={badge}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  className="animate-badge-bounce px-2.5 py-1 text-[11px] font-bold bg-white text-gray-900 border border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
