export const siteContent = {
  meta: {
    title: "Studio Sammii — Design engineer for products with clarity and soul",
    description: "I help founders, studios, and creatives bring products to life. Design systems, product UI, and front-end in React and Next.js.",
    url: "https://studio.sammii.dev",
    image: "/images/hero.jpg",
  },
  
  hero: {
    title: "Designing and building digital experiences with clarity and soul",
    subhead: "I help founders, studios, and creatives bring products to life. I blend design, code, and emotional intelligence to craft interfaces that feel alive.",
    primaryCTA: {
      text: "Work with me",
      href: "/contact"
    },
    secondaryCTA: {
      text: "View services", 
      href: "/services"
    }
  },

  intro: {
    text: "I'm Sam, a design engineer and founder. I work at the intersection of design, development, and storytelling to help teams launch products that connect. From design systems to high-impact landing pages, I take ideas from concept to production with care, pace, and precision. Currently building from Bali and working with clients worldwide."
  },

  services: [
    {
      title: "Product UI and design systems",
      summary: "Cohesive, scalable, beautiful. I create systems and interfaces that give your brand consistency and soul.",
      description: "I create design systems and product interfaces that give your brand consistency and soul. Tokens, components, patterns, and documentation that help teams move faster with fewer mistakes.",
      features: [
        "Design tokens and foundations",
        "Component library and usage guidelines", 
        "Flows for key journeys",
        "Handover and documentation"
      ],
      pricing: "From £800 to £2,000 per project",
      href: "/services"
    },
    {
      title: "Front-end design and development",
      summary: "From Figma to production. Clean, accessible React and Next.js builds that ship fast and last.",
      description: "Accessible, performant UI in React and Next.js. I build clean, maintainable components and ship them to production with care.",
      features: [
        "Component builds and refactors",
        "Marketing pages with analytics",
        "Accessibility passes", 
        "CI friendly workflows"
      ],
      pricing: "£50 to £70 per hour or monthly retainer",
      href: "/services"
    },
    {
      title: "UX and accessibility audits",
      summary: "Clarity creates trust. Practical recommendations that improve flow, hierarchy, and usability.",
      description: "A practical review of your product's flow, hierarchy, and accessibility, with specific recommendations and quick wins.",
      features: [
        "Findings report with priorities",
        "Annotated screens",
        "Quick-win fixes and next steps"
      ],
      pricing: "£300 to £600 fixed rate",
      href: "/services"
    }
  ],

  projects: [
    {
      title: "Lunary",
      goal: "Transform complex lunar and celestial data into an intuitive, beautiful diary interface.",
      impact: "Your Lunar Diary - Makes celestial tracking accessible and personal. Clean design with thoughtful interactions.",
      image: "/images/proj-3.jpg",
      role: "Product Design, Frontend",
      githubUrl: "https://github.com/Sammii-HK/lunary"
    },
    {
      title: "Glint",
      goal: "Create a polished, performant web experience with attention to detail and smooth interactions.",
      impact: "Beautiful interface design. Fast, responsive user experience. Thoughtful micro-interactions.",
      image: "/images/proj-1.jpg",
      role: "Design, Front-end",
      githubUrl: "https://github.com/Sammii-HK/glint"
    },
    {
      title: "Scape²",
      goal: "Build a modern e-commerce platform with a focus on design, performance, and user experience.",
      impact: "Beautiful storefront. Smooth shopping experience. Fast load times and optimized performance.",
      image: "/images/proj-2.jpg",
      role: "Design, Development",
      githubUrl: "https://github.com/Sammii-HK/scape-squared"
    },
    {
      title: "Crystal Index",
      goal: "Create a full-stack application to index and explore crystals with beautiful UI and thoughtful information architecture.",
      impact: "Comprehensive crystal database. Beautiful visual design. Smooth user experience with GPT-4 integration.",
      image: "/images/proj-2.jpg",
      role: "Full-stack, Design",
      githubUrl: "https://github.com/Sammii-HK/crystal-index"
    }
  ],

  about: {
    title: "About",
    story: "I am rebuilding from the ground up and creating space for more intentional design.\n\nAfter working across product and creative technology, I saw how often good ideas get diluted. My work now focuses on what lasts. Clarity, honesty, and human connection through design.\n\nI believe digital products should feel personal, not generic. My process is equal parts empathy, code, and craft.\n\nCurrently available for select freelance projects and collaborations.",
    principles: [
      "Clarity first",
      "Accessibility always", 
      "Craft with care",
      "Ship and learn"
    ]
  },

  contact: {
    title: "Work with me",
    description: "Looking to improve your product or launch something new. Send me a short note. I reply within 24 hours.",
    email: "hello@sammii.dev"
  },

  trust: [
    "Available for select projects",
    "Remote. UK and worldwide.",
    "Fast starts. Clear scopes. Honest pricing."
  ],

  cta: {
    heading: "Have a project in mind",
    button: "Start a conversation"
  },

  // SAAS product names - these will be filtered from GitHub repos
  // Only include actual Software-as-a-Service products (web-based services)
  saasProductNames: [
    "reo-ai",
    "ai-voiceover",
    "iconify",
    "iprep",
    "notify-me",
    "content-creator"
  ]
};
