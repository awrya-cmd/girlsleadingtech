<div align="center">

<br/>

```
 ██████╗ ██╗     ████████╗
██╔════╝ ██║        ██╔══╝
██║  ███╗██║        ██║   
██║   ██║██║        ██║   
╚██████╔╝███████╗   ██║   
 ╚═════╝ ╚══════╝   ╚═╝   
```

# Girls Leading Tech

**The open-source community platform for women in STEM across India.**

[![Live](https://img.shields.io/badge/🌐%20Live%20Site-girlsleadingtech.vercel.app-d955a4?style=for-the-badge&labelColor=0a0a0a)](https://girlsleadingtech.vercel.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-5b2b4a?style=for-the-badge&labelColor=0a0a0a)](https://github.com/girlsintech-community/girlsleadingtech/pulls)
[![License MIT](https://img.shields.io/badge/License-MIT-d955a4?style=for-the-badge&labelColor=0a0a0a)](LICENSE)
[![Built with React](https://img.shields.io/badge/React-18-5b2b4a?style=for-the-badge&logo=react&logoColor=white&labelColor=0a0a0a)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-d955a4?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0a0a0a)](https://www.typescriptlang.org/)

<br/>

*Built by the community. For the community. Always open.*

---

</div>

## ✦ What is this?

GLT is more than a website — it's the digital home of **Girls Leading Tech**, a community built for women navigating STEM in India. This repo powers everything: our initiatives, our team, events, and the stories of every member who's shipped something worth celebrating.

We open-sourced this because we believe in building in public — and because the best contributors are already in our community.

<br/>

## ✦ Stack

| Layer | Tech |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Router** | TanStack Router |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Deployment** | Vercel |
| **Font** | Anton · Montserrat · Playfair Display · Press Start 2P |

<br/>

## ✦ Design System

The GLT aesthetic is intentional and non-negotiable. When contributing UI, respect these tokens:

```css
/* Core palette */
--pink:        #d955a4;   /* primary accent */
--plum:        #5b2b4a;   /* deep accent */
--black:       #0a0a0a;   /* background */
--white:       #f5f5f5;   /* text */

/* Signature element */
border: 2px solid #0a0a0a;
box-shadow: 4px 4px 0px #0a0a0a;  /* hard black shadow — always */
```

> Pixel buttons use `Press Start 2P`. Headings use `Anton`. Body uses `Montserrat`. Subheadings use `Playfair Display`. Don't swap these.

<br/>

## ✦ Get Started

```bash
# 1. Fork the repo & clone your fork
git clone https://github.com/<your-username>/girlsleadingtech.git
cd girlsleadingtech

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

That's it. No `.env` required for local dev. The site runs at `http://localhost:3000`.

<br/>

## ✦ Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── TeamShowcase/  # Current & alumni cards with hover reveal
│   ├── Initiatives/   # Impact-matched initiative cards
│   └── ...
├── pages/             # TanStack Router page files
├── styles/            # Global CSS & Tailwind config
└── assets/            # Images, icons, static files
```

<br/>

## ✦ How to Contribute

We welcome contributions of all kinds — code, design, content, and bug reports.

**Step 1 — Pick an issue**
Browse [open issues](https://github.com/girlsintech-community/girlsleadingtech/issues). Issues tagged `good first issue` are beginner-friendly. No issue? Open one before starting work.

**Step 2 — Branch**
```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/what-you-fixed
```

**Step 3 — Build**
Follow the design system above. Keep components accessible, responsive, and motion-safe (`prefers-reduced-motion`).

**Step 4 — PR**
Open a pull request against `main`. Include screenshots or a Loom if you changed any UI.

<br/>

## ✦ Contribution Guidelines

- **Design-first** — match the existing aesthetic before adding new patterns
- **TypeScript strictly** — no `any`, no implicit types
- **Component scope** — one job per component
- **Accessibility** — semantic HTML, keyboard nav, ARIA where needed
- **No lorem ipsum** — use real or realistic content in PRs

<br/>

## ✦ Good First Issues

Looking for a place to start? Here are the types of contributions we always need:

| Type | Examples |
|---|---|
| 🐛 **Bug fixes** | Layout breaks on mobile, animation jank |
| ✨ **New components** | Event cards, resource listings |
| 📝 **Content** | Adding team members, updating initiatives |
| ♿ **A11y** | Focus states, ARIA labels, contrast fixes |
| 🧹 **Refactor** | Clean up repeated code, improve types |

<br/>

## ✦ Community

GLT is a community first. If you're contributing code, you're welcome in our spaces.

[![Newsletter](https://img.shields.io/badge/Newsletter-Substack-d955a4?style=flat-square&labelColor=0a0a0a)](https://girlsintech.substack.com)
[![Discord](https://img.shields.io/badge/Community-Discord-5b2b4a?style=flat-square&logo=discord&logoColor=white&labelColor=0a0a0a)](#)

> **HackAura** — our flagship 24hr virtual hackathon — saw 1,700+ hackers, 400+ teams, and 150+ projects shipped. The next one is coming.

<br/>

## ✦ Contributors

Thank you to everyone who's opened a PR, filed an issue, or left a review. You're part of what GLT is.

<a href="https://github.com/girlsintech-community/girlsleadingtech/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=girlsintech-community/girlsleadingtech" alt="Contributors" />
</a>

<br/><br/>

## ✦ License

MIT © Girls Leading Tech Community

---

<div align="center">

*Built with 💗 by women in tech, for women in tech.*

**[girlsleadingtech.vercel.app](https://girlsleadingtech.vercel.app)**

</div>
