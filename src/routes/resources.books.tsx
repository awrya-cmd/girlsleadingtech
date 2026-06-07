import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { BookOpen, User } from "lucide-react";

import { books } from "@/data/resources";

export const Route = createFileRoute("/resources/books")({
  head: () => ({
    meta: [
      { title: "Books — Girls Leading Tech" },
      {
        name: "description",
        content:
          "Books recommended by our community of women in tech.",
      },
    ],
  }),
  component: BooksPage,
});

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,240,190,0.15), transparent 70%)",
        }}
      />

      <div
        className="absolute left-[-10%] top-0 h-full w-[30vw] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,120,180,0.18), transparent 75%)",
        }}
      />

      <div
        className="absolute right-[-10%] top-0 h-full w-[30vw] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(180,120,255,0.15), transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,85,164,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160,90,220,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function BooksPage() {
const [selectedCategory, setSelectedCategory] = useState("All");

const categories = [
  "All",
  ...Array.from(
    new Set(
      books.flatMap(
        (book) =>
          book.category
            ?.split("/")
            .map((c) => c.trim()) || []
      )
    )
  ).sort(),
];

const filteredBooks =
  selectedCategory === "All"
    ? books
    : books.filter((book) =>
        book.category
          ?.split("/")
          .map((c) => c.trim())
          .includes(selectedCategory)
      );
  return (
    <div className="relative min-h-screen bg-[#fef9f4] overflow-hidden">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,700&display=swap');
      `}</style>

      {/* HERO */}
      <section className="relative pt-20 md:pt-24 pb-10 px-6 overflow-hidden">
  <GridBackground />

  <div className="container mx-auto max-w-6xl relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#4B57A8] font-black">
        ✦ COMMUNITY LIBRARY ✦
      </p>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h1
            className="leading-none"
            style={{
              fontFamily: "'Satoshi','Montserrat',sans-serif",
              fontSize: "clamp(2.8rem,7vw,5rem)",
              fontWeight: 900,
            }}
          >
            Books
            <span
              className="block italic text-[#d955a4]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              worth keeping.
            </span>
          </h1>

          <p
            className="mt-4 text-gray-500 max-w-xl"
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            A collection of books recommended by women in tech —
            from programming and design to leadership, careers,
            and personal growth.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
            <div className="text-2xl font-black">
              {filteredBooks.length}
            </div>
            <div className="text-xs text-gray-500 uppercase">
              Books
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
            <div className="text-2xl font-black">
              100%
            </div>
            <div className="text-xs text-gray-500 uppercase">
              Community
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
 {/* CATEGORY FILTERS */}
<section className="px-6 pb-10">
  <div className="container mx-auto max-w-7xl">
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition
            ${
              selectedCategory === category
                ? "bg-[#4B57A8] text-white border border-[#4B57A8]"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#A9B7FF] hover:text-[#4B57A8]"
            }`}
        >
          {category}
        </button>
      ))}
     </div>
   </div>
  </section>
      {/* BOOK GRID */}
      <section className="relative px-6 pb-24">
        <div className="container mx-auto max-w-7xl">

          <div className="mb-12">
            <h2
              className="text-3xl font-black text-gray-900"
              style={{
                fontFamily:
                  "'Satoshi','Montserrat',sans-serif",
              }}
            >
              Community Shelf
            </h2>

            <p
              className="mt-2 text-gray-500"
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Explore recommendations from women in tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book, index) => {
              const topBars = [
                "bg-[#A9B7FF]",
                "bg-[#D8B4E8]",
                "bg-[#7EB5A6]",
                "bg-[#FFD166]",
              ];

              return (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`h-2 ${
                      topBars[index % topBars.length]
                    }`}
                  />

                  <div className="p-6">
                    {book.category && (
                      <span
                        className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {book.category}
                      </span>
                    )}

                    <h3
                      className="mt-3 text-xl font-black text-gray-900 leading-tight"
                      style={{
                        fontFamily:
                          "'Satoshi','Montserrat',sans-serif",
                      }}
                    >
                      {book.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-gray-500">
                      <User className="h-4 w-4" />

                      <span
                        className="text-sm"
                        style={{
                          fontFamily:
                            "'Montserrat', sans-serif",
                        }}
                      >
                        {book.author ||
                          "Community Recommendation"}
                      </span>
                    </div>

                    <div className="mt-6">
                      <span className="inline-flex items-center rounded-full bg-[#A9B7FF]/15 px-3 py-1 text-xs font-semibold text-[#4B57A8]">
                        Recommended by the community
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24">
  <div className="container mx-auto max-w-5xl">

    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#A9B7FF] via-[#C8B8FF] to-[#FFD7EF] p-[1px]">

      <div className="rounded-[31px] bg-[#fffdfb] p-10 md:p-14">

        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] font-black text-[#4B57A8]">
            CONTRIBUTE
          </p>

          <h2
            className="mt-4 text-3xl md:text-5xl font-black text-gray-900"
            style={{
              fontFamily:
                "'Satoshi','Montserrat',sans-serif",
            }}
          >
            Found a book everyone should read?
          </h2>

          <p className="mt-5 text-gray-600 leading-relaxed">
            Help grow the Girls Leading Tech library by
            sharing books that inspired your career,
            improved your skills, or changed your
            perspective.
          </p>

          <button className="mt-8 rounded-full bg-[#4B57A8] px-8 py-4 font-bold text-white transition hover:scale-105">
            Recommend a Book
          </button>
        </div>

      </div>

    </div>

  </div>
</section>
    </div>
  );
}