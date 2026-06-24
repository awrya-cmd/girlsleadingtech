import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User } from "lucide-react";
import { BackToResources } from "@/components/site/PageHeader";
import { ResourceSearchBar, filterBySearch } from "@/components/site/ResourceSearchBar";
import { GlassCard } from "@/components/site/GlassCard";
import { books } from "@/data/resources";
import booksMascot from "@/assets/characters/books.png";
import washiTape from "@/assets/stickers/washi-tape.png";
import star from "@/assets/stickers/star.png";

export const Route = createFileRoute("/resources/books")({
  head: () => ({
    meta: [
      { title: "Books — Girls Leading Tech" },
      { name: "description", content: "Books recommended by our community of women in tech." },
    ],
  }),
  component: BooksPage,
});

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{ background: "radial-gradient(circle, rgba(255,120,180,0.28), transparent 75%)" }}
      />
      <div
        className="absolute right-[-12%] top-[-10%] h-[120%] w-[35vw] blur-3xl opacity-80"
        style={{ background: "radial-gradient(circle, rgba(240,120,255,0.24), transparent 75%)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,240,190,0.28), transparent 72%)" }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 85, 164, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 85, 164, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const categories = [
    "All",
    ...Array.from(
      new Set(
        books.flatMap(
          (book) => book.category?.split("/").map((c) => c.trim()) || []
        )
      )
    ).sort(),
  ];

  const byCategory =
    selectedCategory === "All"
      ? books
      : books.filter((book) =>
          book.category
            ?.split("/")
            .map((c) => c.trim())
            .includes(selectedCategory)
        );

  const filteredBooks = filterBySearch(byCategory, searchQ, [
    "title",
    "description",
    "author",
    "category",
    "keywords",
  ]);

  return (
    <div className="relative min-h-screen bg-[#fef9f4] overflow-hidden">
      <GridBackground />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');`}</style>

      {/* HERO BANNER SECTION */}
      <section className="relative pt-32 pb-12 px-6 z-10">
        <div className="container mx-auto max-w-6xl relative">
          <BackToResources />

          <div className="relative bg-[#FFF8EF] border-2 border-black rounded-[24px] pt-16 pb-8 px-6 md:pt-20 md:pb-12 md:px-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-visible">

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#D8B4E8] border-b-2 border-black flex items-center justify-between px-4 rounded-t-[22px] select-none z-10">
              <div className="flex gap-1.5">
                {["#FF8FAB", "#d955a4", "#f0b158"].map((c, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full border border-black" style={{ background: c }} />
                ))}
              </div>
              <span className="font-['Press_Start_2P',monospace] text-[9px] text-black tracking-wider uppercase opacity-80">
                ★ RESOURCE CENTER ★
              </span>
              <div className="w-12" />
            </div>

            {/* Stickers */}
            <img
              src={washiTape}
              alt="Washi Tape Sticker"
              className="absolute -top-7 left-[30%] w-28 rotate-[-3deg] pointer-events-none z-20 select-none transition-transform hover:scale-105"
            />
            <img
              src={star}
              alt="Star Sticker"
              className="absolute -top-7 -right-4 w-12 rotate-[15deg] pointer-events-none z-20 select-none transition-transform hover:scale-110"
            />

            <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#ffed95]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between gap-8 md:gap-12 relative z-10">
              <div className="flex-1 text-center md:text-left flex flex-col justify-center animate-fade-up">
                <p
                  className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#d955a4] font-bold mb-4 opacity-80"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  RESOURCES / BOOKS
                </p>
                <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Books <span className="italic font-medium text-[#5b2b4a] font-serif">worth keeping.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  A collection of books recommended by women in tech — from programming and design to leadership, careers, and personal growth.
                </p>

                <div className="mt-8 flex gap-3 justify-center md:justify-start">
                  <div className="bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xl font-bold text-gray-900">{filteredBooks.length}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Books</div>
                  </div>
                  <div className="bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xl font-bold text-gray-900">100%</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Community</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-[180px] lg:w-[240px] shrink-0" />
            </div>

            {/* Mascot Desktop */}
            <div className="hidden md:block absolute right-6 lg:right-12 bottom-[-24px] w-[210px] lg:w-[270px] z-20 animate-float">
              <img
                src={booksMascot}
                alt="Books Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(217,85,164,0.25)]"
              />
            </div>

            {/* Mascot Mobile */}
            <div className="md:hidden flex justify-center mt-6 w-44 mx-auto z-20 animate-float">
              <img
                src={booksMascot}
                alt="Books Mascot"
                className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(217,85,164,0.2)]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-10 px-6 pb-6">
        <div className="container mx-auto max-w-6xl">
          <ResourceSearchBar value={searchQ} onChange={setSearchQ} placeholder="Search books..." />
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="relative z-10 px-6 pb-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer
                  ${selectedCategory === category
                    ? "bg-[#4B57A8] text-white"
                    : "bg-white text-gray-700 hover:bg-[#ffc8e3]/40"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK GRID */}
      <section className="relative z-10 px-6 pb-24">
        <div className="container mx-auto max-w-6xl">

          <div className="mb-12 text-center md:text-left">
            <h2
              className="text-3xl font-bold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Community Shelf
            </h2>
            <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Explore recommendations from women in tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <GlassCard
                strong
                key={book.id}
                className="group relative overflow-hidden rounded-[20px] bg-[#fffdf9]/95 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:-translate-x-0.5 hover:shadow-[8px_8px_0px_0px_#d955a4] hover:bg-[#fffdf9] flex flex-col"
              >
                {/* Full-bleed cover image */}
                {book.image && (
                  <div
                    className="relative w-full h-64 overflow-hidden rounded-t-[18px] border-b-2 border-black flex-shrink-0 bg-gray-50"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="lazy"
                      onError={(e) => {
                        const wrapper = (e.currentTarget as HTMLImageElement).parentElement;
                        if (wrapper) wrapper.style.display = "none";
                      }}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 justify-between p-6">
                  <div>
                    {book.category && (
                      <span className="inline-block rounded-full bg-pink-100 text-pink-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {book.category}
                      </span>
                    )}

                    <h3 className="mt-4 font-display text-xl font-bold leading-tight text-gray-900 group-hover:text-[#d955a4] transition-colors">
                      {book.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs font-semibold text-secondary">
                        {book.author || "Community Recommendation"}
                      </span>
                    </div>

                    {book.description && (
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {book.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100/50">
                    <span className="inline-flex items-center rounded-lg bg-[#A9B7FF]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4B57A8]">
                      ✦ Recommended by the community
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-[24px] border-2 border-black bg-[#FFF8EF] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-visible">

            <div className="absolute top-0 left-0 right-0 h-8 bg-[#ffed95] border-b-2 border-black flex items-center px-4 rounded-t-[22px] select-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full border border-black bg-[#FF8FAB]" />
                <span className="w-2 h-2 rounded-full border border-black bg-[#d955a4]" />
                <span className="w-2 h-2 rounded-full border border-black bg-[#f0b158]" />
              </div>
            </div>

            <div className="max-w-2xl mt-4">
              <p
                className="text-xs uppercase tracking-[0.3em] font-black text-[#d955a4]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CONTRIBUTE
              </p>

              <h2
                className="mt-4 text-2xl md:text-4xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Found a book everyone should read?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Help grow the Girls Leading Tech library by sharing books that inspired your career, improved your skills, or changed your perspective.
              </p>

              <button className="mt-6 rounded-full bg-[#4B57A8] border-2 border-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#3f4b9c] active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                Recommend a Book
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
