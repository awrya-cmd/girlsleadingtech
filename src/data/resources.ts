import type { Resource } from "./types";

export const articles: Resource[] = [
  { id: "a1", title: "The Pragmatic Engineer Newsletter", category: "Newsletter", link: "https://newsletter.pragmaticengineer.com/", author: "Gergely Orosz", description: "Inside scoops on big tech engineering culture and career growth." },
  { id: "a2", title: "How to Become a Senior Engineer", category: "Career", link: "https://staffeng.com/", author: "Will Larson", description: "Real stories and frameworks for moving from senior to staff." },
  { id: "a3", title: "Julia Evans' Zines & Blog", category: "Engineering", link: "https://jvns.ca/", author: "Julia Evans", description: "Approachable, illustrated deep-dives into systems and debugging." },
  { id: "a4", title: "Smashing Magazine", category: "Frontend", link: "https://www.smashingmagazine.com/", description: "Frontend, design and UX articles you'll actually finish reading." },
  { id: "a5", title: "First Round Review", category: "Leadership", link: "https://review.firstround.com/", description: "Tactical advice from operators and founders." },
  { id: "a6", title: "Lenny's Newsletter", category: "Product", link: "https://www.lennysnewsletter.com/", author: "Lenny Rachitsky", description: "Product, growth and career insights from leading PMs." },
  { id: "a7", title: "Joel on Software", category: "Engineering", link: "https://www.joelonsoftware.com/", author: "Joel Spolsky", description: "Classic essays on software, teams and decision-making." },
  { id: "a8", title: "CSS-Tricks", category: "Frontend", link: "https://css-tricks.com/", description: "The web's friendliest place to level up your CSS." },
];

export const videos: Resource[] = [
  { id: "v1", title: "Fireship", category: "YouTube", link: "https://www.youtube.com/@Fireship", description: "100-second deep dives on every framework, language and trend." },
  { id: "v2", title: "Web Dev Simplified", category: "Tutorials", link: "https://www.youtube.com/@WebDevSimplified", description: "Clean, practical tutorials for modern web development." },
  { id: "v3", title: "ThePrimeagen", category: "Engineering", link: "https://www.youtube.com/@ThePrimeagen", description: "High-energy, opinionated takes on tools, languages and code." },
  { id: "v4", title: "Stanford CS229: Machine Learning", category: "Courses", link: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU", description: "Andrew Ng's classic ML course, free." },
  { id: "v5", title: "MIT OpenCourseWare", category: "Courses", link: "https://www.youtube.com/@mitocw", description: "Lectures from one of the best CS programs in the world." },
  { id: "v6", title: "Harkirat Singh — 100xDevs", category: "Bootcamp", link: "https://www.youtube.com/@harkirat1", description: "Full-stack dev bootcamp content, India-friendly." },
  { id: "v7", title: "Neetcode", category: "DSA", link: "https://www.youtube.com/@NeetCode", description: "Crystal-clear explanations of DSA & interview problems." },
  { id: "v8", title: "Apna College", category: "DSA", link: "https://www.youtube.com/@ApnaCollegeOfficial", description: "Beginner-friendly CS roadmaps in Hindi & English." },
];

export const courses: Resource[] = [
  { id: "c1", title: "CS50: Introduction to Computer Science", category: "Foundations", link: "https://cs50.harvard.edu/x/", author: "Harvard", description: "The most beloved intro to CS course on the internet. Free." },
  { id: "c2", title: "freeCodeCamp", category: "Web Dev", link: "https://www.freecodecamp.org/", description: "2000+ hours of free coding curricula with certifications." },
  { id: "c3", title: "DeepLearning.AI Specialization", category: "AI / ML", link: "https://www.deeplearning.ai/courses/", author: "Andrew Ng", description: "Foundational ML, deep learning and LLMs." },
  { id: "c4", title: "The Odin Project", category: "Full-Stack", link: "https://www.theodinproject.com/", description: "Open-source full-stack curriculum, project-first." },
  { id: "c5", title: "Frontend Masters", category: "Frontend", link: "https://frontendmasters.com/", description: "Premium courses by industry experts. Worth every rupee." },
  { id: "c6", title: "Coursera — Google Career Certificates", category: "Career", link: "https://www.coursera.org/google-career-certificates", description: "Job-ready Google certificates in UX, Data, IT and more." },
  { id: "c7", title: "Scrimba", category: "Frontend", link: "https://scrimba.com/", description: "Interactive video lessons where you can edit the code." },
  { id: "c8", title: "Khan Academy — Computer Programming", category: "Foundations", link: "https://www.khanacademy.org/computing/computer-programming", description: "Free, from-the-basics intro to programming." },
];

export const books: Resource[] = [
  { id: "b1", title: "Atomic Habits", category: "Self-growth", author: "James Clear", link: "https://jamesclear.com/atomic-habits", description: "Tiny changes, remarkable results. A must for builders." },
  { id: "b2", title: "Designing Data-Intensive Applications", category: "Engineering", author: "Martin Kleppmann", link: "https://dataintensive.net/", description: "The ultimate book on building reliable, scalable systems." },
  { id: "b3", title: "The Pragmatic Programmer", category: "Engineering", author: "Hunt & Thomas", description: "Timeless wisdom for software craftspeople." },
  { id: "b4", title: "Cracking the Coding Interview", category: "Interview Prep", author: "Gayle Laakmann McDowell", description: "The bible of tech interviews — 189 problems, fully explained." },
  { id: "b5", title: "Lean In", category: "Career", author: "Sheryl Sandberg", description: "On women, work and the will to lead." },
  { id: "b6", title: "Deep Work", category: "Productivity", author: "Cal Newport", description: "Rules for focused success in a distracted world." },
  { id: "b7", title: "The Mom Test", category: "Startups", author: "Rob Fitzpatrick", description: "How to talk to customers and learn if your idea is good." },
  { id: "b8", title: "Range", category: "Career", author: "David Epstein", description: "Why generalists triumph in a specialised world." },
];

export const communities: Resource[] = [
  { id: "co1", title: "Women Who Code", category: "Global", link: "https://womenwhocode.com/", description: "A global community of women in tech across 147 countries." },
  { id: "co2", title: "AnitaB.org", category: "Global", link: "https://anitab.org/", description: "Home of the Grace Hopper Celebration." },
  { id: "co3", title: "Outreachy", category: "Internships", link: "https://www.outreachy.org/", description: "Paid open-source internships for underrepresented groups." },
  { id: "co4", title: "Rewriting the Code", category: "Students", link: "https://rewritingthecode.org/", description: "Community for college women in tech with mentorship and jobs." },
  { id: "co5", title: "Built By Girls", category: "Students", link: "https://builtbygirls.com/", description: "Career platform connecting young women with tech mentors." },
  { id: "co6", title: "TechLadies", category: "Asia", link: "https://www.techladies.co/", description: "Asia's largest community of women in tech." },
  { id: "co7", title: "Lesbians Who Tech", category: "Global", link: "https://lesbianswhotech.org/", description: "LGBTQ+ women, non-binary and allies in tech." },
  { id: "co8", title: "She Loves Data", category: "Data", link: "https://shelovesdata.com/", description: "Empowering women in data and AI." },
];

export const roadmaps: Resource[] = [
  { id: "r1", title: "roadmap.sh", category: "All-in-one", link: "https://roadmap.sh/", description: "Visual, opinionated roadmaps for every developer role." },
  { id: "r2", title: "Frontend Developer Roadmap", category: "Frontend", link: "https://roadmap.sh/frontend", description: "Step-by-step path from HTML/CSS to senior frontend." },
  { id: "r3", title: "Backend Developer Roadmap", category: "Backend", link: "https://roadmap.sh/backend", description: "Languages, databases, APIs, scalability — covered." },
  { id: "r4", title: "DevOps Roadmap", category: "DevOps", link: "https://roadmap.sh/devops", description: "From Linux fundamentals to Kubernetes and observability." },
  { id: "r5", title: "AI / Data Scientist Roadmap", category: "AI / ML", link: "https://roadmap.sh/ai-data-scientist", description: "Stats, ML, deep learning and the modern AI stack." },
  { id: "r6", title: "Product Manager Roadmap", category: "Product", link: "https://roadmap.sh/product-manager", description: "From APM to senior PM — skills, frameworks, books." },
  { id: "r7", title: "UX Designer Roadmap", category: "Design", link: "https://roadmap.sh/ux-design", description: "Research, design systems, prototyping and beyond." },
  { id: "r8", title: "Cybersecurity Roadmap", category: "Security", link: "https://roadmap.sh/cyber-security", description: "Defensive and offensive security paths from beginner up." },
];

export const interviewPrep: Resource[] = [
  { id: "ip1", title: "LeetCode", category: "DSA", link: "https://leetcode.com/", description: "The classic — 3000+ coding problems sorted by company." },
  { id: "ip2", title: "Neetcode 150", category: "DSA", link: "https://neetcode.io/practice", description: "The most efficient list of problems to grind for interviews." },
  { id: "ip3", title: "System Design Primer", category: "System Design", link: "https://github.com/donnemartin/system-design-primer", description: "Free, comprehensive prep for system design rounds." },
  { id: "ip4", title: "Tech Interview Handbook", category: "All-in-one", link: "https://www.techinterviewhandbook.org/", description: "Negotiation, behavioural, coding and more — open-source." },
  { id: "ip5", title: "Pramp", category: "Mock Interviews", link: "https://www.pramp.com/", description: "Free peer-to-peer mock technical interviews." },
  { id: "ip6", title: "Interviewing.io", category: "Mock Interviews", link: "https://interviewing.io/", description: "Anonymous mock interviews with engineers from FAANG." },
  { id: "ip7", title: "Behavioural Interview Cheat Sheet", category: "Behavioural", link: "https://github.com/yangshun/tech-interview-handbook/blob/main/contents/behavioral-interview-cheatsheet.md", description: "STAR-method answers for the questions you'll actually be asked." },
  { id: "ip8", title: "Excalidraw — System Design Practice", category: "System Design", link: "https://excalidraw.com/", description: "Diagram your system designs the way interviewers will." },
];

export const certifications: Resource[] = [
  { id: "ct1", title: "AWS Certified Cloud Practitioner", category: "Cloud", link: "https://aws.amazon.com/certification/certified-cloud-practitioner/", description: "The gateway certification to the world's biggest cloud." },
  { id: "ct2", title: "Google Cloud Associate Engineer", category: "Cloud", link: "https://cloud.google.com/learn/certification/cloud-engineer", description: "Validate your hands-on GCP skills." },
  { id: "ct3", title: "Microsoft Azure Fundamentals (AZ-900)", category: "Cloud", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", description: "Beginner-friendly Azure entry certification." },
  { id: "ct4", title: "Google UX Design Certificate", category: "Design", link: "https://www.coursera.org/professional-certificates/google-ux-design", description: "6-month, beginner-friendly UX certification." },
  { id: "ct5", title: "Meta Front-End Developer", category: "Frontend", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", description: "Job-ready frontend certificate from Meta." },
  { id: "ct6", title: "CompTIA Security+", category: "Security", link: "https://www.comptia.org/certifications/security", description: "The most widely recognised cybersecurity entry cert." },
  { id: "ct7", title: "Certified Kubernetes Administrator (CKA)", category: "DevOps", link: "https://www.cncf.io/certification/cka/", description: "Hands-on Kubernetes certification respected industry-wide." },
  { id: "ct8", title: "DeepLearning.AI TensorFlow Developer", category: "AI / ML", link: "https://www.tensorflow.org/certificate", description: "Validate your ML & deep learning skills with TensorFlow." },
];
