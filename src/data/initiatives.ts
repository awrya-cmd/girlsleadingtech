import type { Initiative } from "./types";

export const initiatives: Initiative[] = [
  {
    slug: "empowerher",
    name: "EmpowerHer",
    tagline: "A flagship summit empowering women to lead in tech.",
    description:
      "Our flagship initiative bringing together hundreds of women across India for a multi-day experience of talks, workshops, mentorship and unforgettable connections.",
    url: "https://empowerher.girlsleadingtech.com/",
    color: "pink",
  },
  {
    slug: "empowerher-2-0",
    name: "EmpowerHer 2.0",
    tagline: "The next chapter — bigger, bolder, more impact.",
    description:
      "EmpowerHer returns in 2026 with deeper programming, more partner companies and a national speaker line-up dedicated to women shaping the future of tech.",
    url: "https://empowerher2026.girlsleadingtech.com/",
    color: "violet",
  },
  {
    slug: "i2p-fellowship",
    name: "Hogwarts of Tech",
    tagline: "A magical start to your tech journey.",
    description:
      "An intensive 4-week cohort-based program designed to introduce beginners to the world of open source, development, and community building.",
    url: "https://hogwartz.girlsleadingtech.com/",
    color: "lavender",
  },
  {
    slug: "code-at-christmas",
    name: "Code at Christmas",
    tagline: "Build, give, celebrate — open-source, the Christmas way.",
    description:
      "An annual seasonal hackathon uniting the GLT family to build open-source projects and gift them to the community.",
    url: "https://codeatchristmas.girlsleadingtech.com/",
    color: "rose",
  },
  {
    slug: "hack-aura",
    name: "Hack Aura",
    tagline: "Where ideas spark and futures are built.",
    description:
      "A signature student hackathon hosted by GLT — 36 hours of building, learning and meeting your future co-founders.",
    url: "https://hackaura.girlsleadingtech.com/",
    color: "peach",
  },
  {
    slug: "valentines-week",
    name: "Valentine's Week",
    tagline: "Seven days of self-love, learning and celebration.",
    description:
      "A week-long curated experience with daily challenges, sessions and surprises, themed around loving yourself and your craft.",
    color: "pink",
  },
  {
    slug: "glt-spotlight",
    name: "GLT Spotlight",
    tagline: "Celebrating the unstoppable women in our community.",
    description:
      "A monthly spotlight series featuring inspiring stories from members across colleges, companies and continents.",
    color: "violet",
  },
  {
    slug: "hogwarts",
    name: "Hogwarts of Tech",
    tagline: "A magical start to your tech journey.",
    description: "An intensive 4-week cohort-based program designed to introduce beginners to the world of open source, development, and community building.",
    url: "https://hogwartz.girlsleadingtech.com/",
    color: "violet",
  },
  {
    slug: "mentorship",
    name: "GLT Mentorship Program",
    tagline: "Guided growth.",
    description: "A 1:1 mentorship initiative pairing early-career developers with senior industry professionals for resume reviews, mock interviews, and career guidance.",
    color: "pink",
  },
  {
    slug: "global-ai-buildathon",
    name: "Global AI Buildathon",
    tagline: "Building the future, together.",
    description: "A massive online hackathon focused on solving real-world problems using Artificial Intelligence and Machine Learning APIs.",
    url: "https://global-ai-buildathon.girlsleadingtech.com/",
    color: "rose",
  },
  {
    slug: "machine-learning-cohort",
    name: "Machine Learning Cohort",
    tagline: "From zero to hero in ML.",
    description: "A structured 8-week learning path covering everything from basic regression to advanced neural networks and NLP.",
    color: "peach",
  },
  {
    slug: "buildsprint",
    name: "BuildSprint",
    tagline: "Ship it fast.",
    description: "A rapid 48-hour challenge focused on taking an idea from zero to a deployed MVP.",
    color: "lavender",
  }
];

export const getInitiative = (slug: string) =>
  initiatives.find((i) => i.slug === slug);
