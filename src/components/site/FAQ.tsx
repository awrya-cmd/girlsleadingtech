import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    question: "What is Girls Leading Tech?",
    answer:
      "Girls Leading Tech is a community built for people who are curious, ambitious, and excited about technology. Think learning, mentorship, collaboration, opportunities, and a space where ideas turn into impact.",
  },
  {
    question: "Who can join Girls Leading Tech?",
    answer:
      "Whether you're just starting your tech journey, exploring new interests, building projects, or already deep into coding — you're welcome here. Everyone starts somewhere.",
  },
  {
    question: "Is joining the community free?",
    answer:
      "Yes! Joining the community is completely free. Learning, growing, and connecting with amazing people shouldn't come with a paywall.",
  },
  {
    question: "What kind of activities happen here?",
    answer:
      "Expect workshops, hackathons, mentoring sessions, networking events, tech talks, collaborative projects, and lots of opportunities to learn something new.",
  },
  {
    question: "How can I contribute to the community?",
    answer:
      "You can volunteer, mentor, participate in events, contribute to projects, share ideas, or simply show up and engage. Small contributions can create big impact.",
  },
  {
    question: "Do I need to be a coding expert to join?",
    answer:
      "Not at all. No 'pro-level developer' badge required. Curiosity, willingness to learn, and enthusiasm are more than enough to get started.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about Girls Leading Tech."
          className="mb-14"
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden shadow-soft transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center font-medium text-foreground hover:text-primary transition-colors focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-sans font-semibold tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={`text-primary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"
                      }`}
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen
                    ? "max-h-[300px] opacity-100 pb-6 px-6"
                    : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                >
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
