import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import star from "@/assets/stickers/star.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import paperClip from "@/assets/stickers/paper-clip.png";
import smiley from "@/assets/stickers/smiley.png";
import book from "@/assets/stickers/book.png";
import briefcase from "@/assets/stickers/briefcase.png";
import certificate from "@/assets/stickers/certificate.png";
import chatBubble from "@/assets/stickers/chat-bubble.png";
import checklist from "@/assets/stickers/checklist.png";
import communityStar from "@/assets/stickers/community-sticker.png";
import compass from "@/assets/stickers/compass.png";
import crown from "@/assets/stickers/crown.png";
import graduationCap from "@/assets/stickers/graduation-cap.png";
import newspaper from "@/assets/stickers/newspaper.png";
import trophy from "@/assets/stickers/trophy.png";
import videoPlayBtn from "@/assets/stickers/video-play-button.png";
import designerIdle from "@/assets/characters/designer/idle.png";
import communityIdle from "@/assets/characters/community-girl/idle.png";
import pixelBtn from "@/assets/pixel-button.png";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Girls Leading Tech" },
      { name: "description", content: "Curated scholarships, hackathons, courses, articles, books and more for women in tech." },
    ],
  }),
  component: ResourcesHub,
});

const categories = [
  {
    to: "/resources/scholarships",
    label: "SCHOLARSHIPS",
    tagline: "Fund your future.",
    desc: "Curated grants and fellowships for women breaking into tech.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={graduationCap} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/hackathons",
    label: "HACKATHONS",
    tagline: "Build. Compete. Win.",
    desc: "The best hackathons to test your skills and come home with prizes.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={trophy} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/programs",
    label: "PROGRAMS",
    tagline: "Cohorts that change careers.",
    desc: "Fellowships and bootcamps to level up fast with other women in tech.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={checklist} className="absolute -top-8 right-4 w-16 rotate-[8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/courses",
    label: "COURSES",
    tagline: "Learn at your own pace.",
    desc: "Hand-picked learning paths from beginner to advanced, free and paid.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={book} className="absolute -top-8 right-4 w-16 rotate-[-12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/tools",
    label: "TOOLS",
    tagline: "The stack we swear by.",
    desc: "Every tool and app that women in our community actually use daily.",
    bar: "bg-[#FFD166]", taglineColor: "text-[#996600]", cta: "bg-[#FFD166] hover:bg-[#F0C040]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={briefcase} className="absolute -top-8 right-4 w-16 rotate-[10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/articles",
    label: "ARTICLES",
    tagline: "Reading worth your time.",
    desc: "Essays and deep-dives on tech, careers and women in the industry.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={newspaper} className="absolute -top-8 right-4 w-16 rotate-[-8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/videos",
    label: "VIDEOS",
    tagline: "Watch and learn.",
    desc: "Talks and tutorials that inspire and educate — picked by the community.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={videoPlayBtn} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/books",
    label: "BOOKS",
    tagline: "Pages that changed us.",
    desc: "Books our community keeps recommending — from memoirs to technical deep-dives.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={book} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/role-models",
    label: "ROLE MODELS",
    tagline: "Women leading the way.",
    desc: "Indian women building and leading across every corner of tech.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={crown} className="absolute -top-8 right-4 w-16 rotate-[8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/people",
    label: "PEOPLE TO FOLLOW",
    tagline: "Voices worth your feed.",
    desc: "Creators and founders worth following for daily doses of insight.",
    bar: "bg-[#FFD166]", taglineColor: "text-[#996600]", cta: "bg-[#FFD166] hover:bg-[#F0C040]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={chatBubble} className="absolute -top-8 right-4 w-16 rotate-[-12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/communities",
    label: "COMMUNITIES",
    tagline: "Find your tribe.",
    desc: "Discords, groups and spaces where women in tech gather and grow.",
    bar: "bg-[#7EB5A6]", taglineColor: "text-[#2F5D50]", cta: "bg-[#7EB5A6] hover:bg-[#6BA393]", rotate: "-rotate-1",
    stickers: [
      <img key="s1" src={communityStar} className="absolute -top-8 right-4 w-16 rotate-[10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/roadmaps",
    label: "ROADMAPS",
    tagline: "Your career, mapped out.",
    desc: "Step-by-step playbooks for every tech role — built for women starting or pivoting.",
    bar: "bg-[#FF8A5B]", taglineColor: "text-[#A64B28]", cta: "bg-[#FF8A5B] hover:bg-[#F67848]", rotate: "rotate-2",
    stickers: [
      <img key="s1" src={compass} className="absolute -top-8 right-4 w-16 rotate-[-8deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/interview-prep",
    label: "INTERVIEW PREP",
    tagline: "Ace it. Every time.",
    desc: "DSA, system design and negotiation — everything you need to land the offer.",
    bar: "bg-[#A9B7FF]", taglineColor: "text-[#4B57A8]", cta: "bg-[#A9B7FF] hover:bg-[#95A5F5]", rotate: "-rotate-2",
    stickers: [
      <img key="s1" src={checklist} className="absolute -top-8 right-4 w-16 rotate-[12deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
  {
    to: "/resources/certifications",
    label: "CERTIFICATIONS",
    tagline: "Validate your skills.",
    desc: "The certifications that actually matter — cloud, data, security and more.",
    bar: "bg-[#D8B4E8]", taglineColor: "text-[#7B4F92]", cta: "bg-[#D8B4E8] hover:bg-[#C89DDB]", rotate: "rotate-1",
    stickers: [
      <img key="s1" src={certificate} className="absolute -top-8 right-4 w-16 rotate-[-10deg] pointer-events-none z-10 drop-shadow-lg" />,
    ],
  },
];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,240,190,0.15), transparent 70%)" }}
      />
      <div className="absolute left-[-10%] top-0 h-full w-[30vw] blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(255,120,180,0.18), transparent 75%)" }} />
      <div className="absolute right-[-10%] top-0 h-full w-[30vw] blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(180,120,255,0.15), transparent 75%)" }} />
      <div
        className="absolute inset-0 opacity-[0.65]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.22) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 90, 220, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function ResourcesHub() {
  return (
    <div className="relative w-full min-h-screen bg-[#fef9f4] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
      `}</style>

      {/* ── HERO ── */}
      <section className="relative z-10 pt-24 md:pt-32 pb-10 px-6 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d955a4] font-black mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ✦ curated for you ✦
              </motion.p>

              {["Every", "resource", "you need."].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
                    className={`font-black leading-[0.92] ${
                      i === 1 ? "italic font-semibold text-[#d955a4]" : "uppercase text-gray-900"
                    }`}
                    style={{
                      fontFamily: i === 1 ? "'Playfair Display', serif" : "'Satoshi','Montserrat',sans-serif",
                      fontSize: "clamp(3rem, 9vw, 7.5rem)",
                      letterSpacing: i === 1 ? "-0.01em" : "-0.025em",
                    }}
                  >
                    {word}
                  </motion.h1>
                </div>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-5 text-sm md:text-[15px] text-gray-500 max-w-sm leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Hand-picked. No fluff. Scholarships to roadmaps — all here for you.
              </motion.p>
            </div>

            <motion.img
              src={designerIdle} alt=""
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block w-[180px] lg:w-[280px] object-contain pointer-events-none shrink-0 self-end"
            />
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="relative z-10 py-14 md:py-20 px-6 bg-[#fef9f4]">
        <div className="container mx-auto max-w-7xl">

          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-gray-400 font-bold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}>
              📌 pinned for you
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
            {categories.map(({ to, label, tagline, desc, bar, taglineColor, cta, rotate, stickers }, idx) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, type: "spring", stiffness: 70, damping: 14 }}
                className={`relative overflow-visible ${rotate} hover:rotate-0 hover:scale-[1.03] transition-all duration-300 h-full`}
                style={{ zIndex: 10 }}
              >
                <div className="relative bg-white ring-1 ring-black/5 shadow-xl flex flex-col overflow-visible h-full">
                  {stickers}
                  <div className={`h-5 w-full ${bar}`} />
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="text-lg lg:text-xl font-black uppercase leading-tight tracking-tight text-gray-900 line-clamp-2 min-h-[2.4em]"
                      style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                      {label}
                    </h3>
                    <p className={`text-[10px] font-extrabold tracking-[0.01em] ${taglineColor}`}
                      style={{ fontFamily: "'Montserrat',sans-serif" }}>
                      {tagline}
                    </p>
                    <p className="mt-2 text-black leading-[1.9] line-clamp-3"
                      style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "clamp(0.52rem,0.75vw,0.72rem)" }}>
                      {desc}
                    </p>
                    <Link to={to}
                      className={`mt-auto pt-3 inline-flex items-center gap-1.5 self-start rounded-full ${cta} px-4 py-2 text-xs font-bold text-white transition hover:scale-105`}>
                      Explore <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE */}
          <div className="flex sm:hidden flex-col gap-10">
            {categories.map(({ to, label, tagline, desc, bar, taglineColor, cta, stickers }) => (
              <div key={to} className="relative overflow-visible bg-white shadow-lg ring-1 ring-black/5 flex flex-col">
                {stickers}
                <div className={`h-5 w-full ${bar}`} />
                <div className="p-5 flex flex-col">
                  <h3 className="text-lg font-black uppercase leading-tight text-gray-900 pr-10"
                    style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                    {label}
                  </h3>
                  <p className={`mt-1 text-[10px] font-black uppercase tracking-[0.2em] ${taglineColor}`}
                    style={{ fontFamily: "'Montserrat',sans-serif" }}>
                    {tagline}
                  </p>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: "'Montserrat',sans-serif" }}>
                    {desc}
                  </p>
                  <Link to={to}
                    className={`mt-4 inline-flex items-center gap-1.5 rounded-full ${cta} px-4 py-2 text-xs font-bold text-white self-start transition hover:scale-105`}>
                    Explore <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 md:py-16 px-6 pb-24 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white ring-1 ring-black/5 shadow-xl overflow-visible"
          >
            <div className="h-5 w-full bg-[#d955a4]" />
            <div className="flex flex-col md:flex-row items-center md:items-end">
              <div className="flex-1 px-8 py-10 md:px-12 md:py-12">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4"
                  style={{ fontFamily: "'Montserrat',sans-serif" }}>
                  Missing something?
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase text-gray-900 leading-tight"
                  style={{ fontFamily: "'Satoshi','Montserrat',sans-serif" }}>
                  Know a resource{" "}
                  <span className="italic font-semibold text-[#d955a4] normal-case"
                    style={{ fontFamily: "'Playfair Display',serif" }}>
                    we should add?
                  </span>
                </h2>
                <p className="mt-3 text-sm text-gray-500 max-w-sm leading-relaxed"
                  style={{ fontFamily: "'Montserrat',sans-serif" }}>
                  Help us build the most complete stack for women in tech across India.
                </p>
                <div className="mt-8">
                  <a href="mailto:girlsleadingtech@gmail.com"
                    className="relative inline-block active:scale-95 transition-transform duration-100">
                    <img src={pixelBtn} alt="Suggest a Resource" className="w-[196px] h-auto" />
                    <span className="absolute inset-0 flex items-center justify-center text-black font-bold"
                      style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "clamp(0.75rem,1.1vw,1rem)", letterSpacing: "0.05em" }}>
                      Suggest one →
                    </span>
                  </a>
                </div>
              </div>
              <div className="hidden md:block w-[150px] lg:w-[175px] shrink-0 self-end">
                <img src={communityIdle} alt="" className="w-full h-auto object-contain" />
              </div>
            </div>
            <div className="md:hidden flex justify-center pb-6">
              <img src={communityIdle} alt="" className="w-28 h-auto object-contain" />
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
