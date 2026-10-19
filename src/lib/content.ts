export const siteContent = {
  meta: {
    title: "Studio Sammii | Senior design and product engineer, available for contract",
    description: "Sammii Kellow is a London-based senior design and product engineer. Product UI, design systems, React, Next.js and SwiftUI. Available for contract roles and open to permanent.",
    url: "https://studio.sammii.dev",
    image: "/images/hero.jpg",
  },

  hero: {
    eyebrow: "Contract design and product engineering · London",
    title: "Senior design and product engineer for teams that need to ship",
    subhead: "I design and build product UI, design systems and front-ends in React, Next.js and SwiftUI. I've taken my own iOS apps from idea to App Store, and I run the systems that market them.",
    primaryCTA: {
      text: "Start a conversation",
      href: "/contact?topic=contract"
    },
    secondaryCTA: {
      text: "See case studies",
      href: "/work"
    }
  },

  availability: {
    line: "Available for contract roles now. Hybrid in London, remote or on-site. Open to permanent.",
    rate: "£550 to £700 a day, depending on scope and IR35 status.",
  },

  intro: {
    text: "I'm Sammii, a design engineer based in London. I work in the space between design and code: turning product thinking into interfaces, components and systems that hold up in production. Recently that has meant shipping four iOS apps through App Store review, building Prism, a zero-dependency component library, and running Lunary, a Next.js PWA, with an automated content and operations stack on a Mac mini behind it."
  },

  services: [
    {
      title: "Contract design and product engineering",
      summary: "A senior or staff-level design engineer embedded in your team, from Figma to production.",
      description: "I join your team on contract to own product UI and front-end work end to end: shaping the interaction, building it in your codebase, and leaving behind components and notes the team can keep using.",
      features: [
        "React, Next.js, TypeScript and Tailwind",
        "SwiftUI and native iOS",
        "Product UI, interaction and motion",
        "Accessibility and performance",
        "AI product features that ship, not demos",
        "Inside or outside IR35, direct or through an agency"
      ],
      pricing: "£550 to £700 a day, depending on scope and IR35 status",
      href: "/services#contract"
    },
    {
      title: "Design systems and component libraries",
      summary: "Tokens, components and documentation that help teams move faster with fewer mistakes.",
      description: "Design systems that work in code as well as in Figma. I set up tokens, build accessible components, write usage guidance, and wire it into how your team already ships. Prism is the public example.",
      features: [
        "Design tokens and foundations",
        "Accessible component library",
        "Usage guidelines and live docs",
        "Migration plan for existing screens"
      ],
      pricing: "Scoped in blocks of days at the day rate",
      href: "/services#design-systems"
    },
    {
      title: "UX and accessibility audits",
      summary: "Practical recommendations that improve flow, hierarchy and usability.",
      description: "A practical review of your product's flow, hierarchy and accessibility, with specific recommendations and quick wins you can ship this sprint.",
      features: [
        "Findings report with priorities",
        "Annotated screens",
        "Quick-win fixes and next steps"
      ],
      pricing: "£300 to £600 fixed rate",
      href: "/services#audits"
    },
    {
      title: "App Review Rescue",
      summary: "Stuck in App Store review? A free Rejection Decoder, a ship kit, or a done-for-you fix.",
      description: "For indie developers and small studios whose app keeps bouncing off App Review. I've been through these rejections with my own apps and know which fixes Apple actually accepts.",
      features: [
        "Free Rejection Decoder for common guidelines",
        "Indie Ship Kit: checklists and templates",
        "Done-for-you rescue or launch pass"
      ],
      pricing: "Free decoder. Rescue from £300.",
      href: "/app-review-rescue"
    }
  ],

  process: [
    {
      title: "Intro call",
      text: "Twenty minutes on the team, the problem and what a good first month looks like. If I'm not the right fit, I'll say so."
    },
    {
      title: "Terms in writing",
      text: "Day rate, length, IR35 status, office days and notice agreed up front. Direct contract or through your agency."
    },
    {
      title: "Ship in week one",
      text: "Something small and real goes out in the first week, so access, codebase and review flow are proven early."
    },
    {
      title: "Weekly written updates",
      text: "Each Friday: what shipped, what's blocked, what's next. Handover notes from day one, so nothing lives only in my head."
    }
  ],

  appReviewRescue: {
    title: "App Review Rescue",
    intro: "Your build is done, then App Review sends it back. My own apps have been rejected under 2.1(a), 2.1(b), 3.1.2, 4.2.1, 4.3(b) and 5.1.1(iv), and I worked out what Apple actually wanted each time. Start with the free decoder, or hand it to me.",
    tiers: [
      {
        name: "Rejection Decoder",
        price: "Free",
        status: "Live",
        summary: "A plain-English lookup of the most common rejections: what the guideline means, the usual causes and a fix checklist.",
        includes: [
          "18 common rejections, by guideline number",
          "Usual causes and a fix checklist for each",
          "What to write in your Resolution Center reply",
          "Real cases from my own apps"
        ],
        cta: { text: "Open the decoder", href: "/app-review-rescue/decoder" }
      },
      {
        name: "Indie Ship Kit",
        price: "£49 to £79",
        status: "Not on sale yet",
        summary: "The checklists and templates I use before every submission, so the first review is the last one.",
        includes: [
          "Pre-submission checklist mapped to guideline numbers",
          "Subscription paywall checklist: price, period, renewal terms, Terms of Use (EULA) and Privacy links, restore",
          "Review notes templates: demo account, where to find the in-app purchase, feature walkthrough",
          "Resolution Center reply templates for the common rejections",
          "App Privacy label worksheet: map each SDK to the data it collects",
          "Permission pre-prompt copy and purpose strings that pass 5.1.1",
          "StoreKit sandbox testing runbook, including the originalAppVersion trap",
          "First in-app purchase submission walkthrough for App Store Connect",
          "Screenshot spec sheet: sizes and what not to show"
        ],
        cta: { text: "Ask for early access", href: "mailto:hello@sammii.dev?subject=Indie%20Ship%20Kit%20early%20access" }
      },
      {
        name: "Done-for-you rescue or launch",
        price: "£300 to £1,500",
        status: "Taking enquiries",
        summary: "I diagnose the rejection, fix what needs fixing, and handle the resubmission and reply. Fixed quote before any work starts.",
        includes: [
          "Single rejection rescue, from £300",
          "Full launch pass before first submission, up to £1,500",
          "Code, metadata, paywall, privacy labels and review notes",
          "Resolution Center reply written for you",
          "I stay with it until the review result comes back"
        ],
        cta: { text: "Send me your rejection", href: "/contact?topic=app-review" }
      }
    ],
    steps: [
      { title: "Send the rejection", text: "Paste the full message from App Store Connect, the guideline number and a TestFlight or App Store link." },
      { title: "Diagnosis and quote", text: "Within one working day you get what Apple is actually asking for, the fix plan and a fixed price." },
      { title: "Fix and resubmit", text: "I make the changes in code, metadata or review notes, then write the reply to the reviewer." },
      { title: "Through to a result", text: "I stay on it through the next review and any follow-up questions from Apple." }
    ],
    disclaimer: "Apple makes the final decision, so nobody can promise an approval. What I can promise is a clear diagnosis, a fix plan, and a resubmission that answers what the reviewer asked. Not affiliated with Apple."
  },

  about: {
    title: "About",
    story: "I'm Sammii Kellow, a senior design engineer based in London.\n\nI've spent my career between product, design and front-end engineering. I like the part of the work where a good idea either survives contact with real code and real users, or doesn't, and I like making sure it does.\n\nOver the last year I've built and shipped my own products end to end: iOS apps in SwiftUI, a Next.js PWA, a component library, and an automated content and operations stack that runs on a Mac mini. That work means I can pick up a codebase quickly, talk to designers and engineers in their own language, and care about the details that make a product feel finished.\n\nI'm taking contract roles now and I'm open to permanent ones.",
    principles: [
      "Clarity first",
      "Accessibility always",
      "Ship in small, real steps",
      "Write it down"
    ]
  },

  contact: {
    title: "Work with me",
    description: "Hiring a senior design or product engineer, or stuck in App Store review? Send a short note to hello@sammii.dev or use the form. I reply within one working day.",
    email: "hello@sammii.dev"
  },

  trust: [
    "Available for contract now",
    "London based. Hybrid, remote or on-site.",
    "Clear terms. Weekly written updates."
  ],

  cta: {
    heading: "Hiring for a design or product engineering role?",
    text: "Tell me about the team and the work. I reply within one working day.",
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
