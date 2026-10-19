export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  oneLiner: string;
  role: string;
  status: string;
  stack: string[];
  icon?: string;
  featured: boolean;
  links: { label: string; href: string }[];
  problem: string;
  whatIDid: string[];
  shows: string[];
};

// Facts checked against source repos and release notes on 19 October 2026.
// Keep claims to what the code and App Store listings show; no traffic or revenue figures.
export const caseStudies: CaseStudy[] = [
  {
    slug: "prism",
    title: "Prism",
    kind: "React component library",
    oneLiner: "A cursor-reactive React component library with hand-written spring physics and zero runtime dependencies.",
    role: "Design and engineering",
    status: "Live, open source (MIT)",
    stack: ["React", "TypeScript", "requestAnimationFrame", "Zero dependencies"],
    featured: true,
    links: [
      { label: "prism.sammii.dev", href: "https://prism.sammii.dev" },
      { label: "Source on GitHub", href: "https://github.com/Sammii-HK/prism" }
    ],
    problem:
      "Most motion-heavy component libraries pull in an animation framework and a styling runtime. I wanted interaction and motion that feel physical, components a team can drop in without adding dependencies, and documentation that shows each piece working.",
    whatIDid: [
      "Designed and built 22 components and 5 experimental playgrounds, all reacting to the cursor",
      "Wrote the spring physics by hand on requestAnimationFrame instead of using a motion library",
      "Kept the runtime dependency count at zero and published it under MIT",
      "Built a live documentation site where every component can be tried in place",
      "Set up an automated daily build-and-publish pipeline for new components"
    ],
    shows: [
      "Design systems work that holds up in code, not just in Figma",
      "Interaction and motion design with attention to performance",
      "Writing components other engineers can adopt without friction"
    ]
  },
  {
    slug: "lunary",
    title: "Lunary",
    kind: "Next.js PWA",
    oneLiner: "An astrology and journaling web app with real astronomical calculation, subscriptions and a large content library.",
    role: "Founder, design and full-stack engineering",
    status: "Live with paying subscribers",
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "Stripe", "astronomy-engine"],
    icon: "/images/apps/lunary.png",
    featured: true,
    links: [{ label: "lunary.app", href: "https://lunary.app" }],
    problem:
      "Astrology apps tend to be generic daily horoscopes. Lunary calculates real planetary positions for the user's own chart and builds a journaling habit around them, so it becomes more personal the longer someone uses it.",
    whatIDid: [
      "Designed and built the product end to end as an installable Next.js PWA",
      "Implemented chart and transit calculation with astronomy-engine",
      "Built authentication, Stripe subscriptions with a free trial, and the account lifecycle",
      "Designed a journal-first experience with reflection prompts and pattern cards",
      "Built a large grimoire of reference content and an MCP server for internal tooling",
      "Took the native iOS build through repeated App Review rounds under guideline 4.3(b)"
    ],
    shows: [
      "Owning a production product: auth, payments, data, content and analytics",
      "Turning complex data into calm, readable UI",
      "Making product decisions from real usage and conversion data"
    ]
  },
  {
    slug: "iprep",
    title: "iPrep",
    kind: "iOS app",
    oneLiner: "A voice interview coach for iPhone: answer out loud, get a scored breakdown, and practise what you're weakest at.",
    role: "Design and iOS engineering",
    status: "Live on the App Store",
    stack: ["SwiftUI", "SwiftData", "Apple Speech", "Foundation Models", "StoreKit", "RevenueCat"],
    icon: "/images/apps/iprep.png",
    featured: true,
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/iprep-ai-interview-coach/id6761015568" }],
    problem:
      "Interview practice is either reading questions silently or paying for a coach. I wanted something that listens to a spoken answer and gives specific feedback straight away, and that remembers what you need to work on.",
    whatIDid: [
      "Designed and built the app in SwiftUI with SwiftData storage and a widget",
      "Transcribed spoken answers with Apple's Speech framework",
      "Built scoring with three engines: Apple's on-device Foundation Models where available, a server engine, and a heuristic fallback",
      "Added question banks generated from a pasted job description, mock interviews, scorecards and spaced repetition",
      "Shipped a free first scored answer and a subscription with Sign in with Apple and RevenueCat"
    ],
    shows: [
      "Native iOS product engineering from first screen to App Store release",
      "Using on-device AI where it helps, with graceful fallbacks",
      "Onboarding and paywall design that lets people feel the value first"
    ]
  },
  {
    slug: "strata",
    title: "Strata",
    kind: "iOS app",
    oneLiner: "An interactive map of the cosmos and recorded history, built to make huge differences in scale something you can see.",
    role: "Design and engineering",
    status: "Live on the App Store",
    stack: ["Expo", "React Native", "Skia", "RevenueCat", "WidgetKit"],
    icon: "/images/apps/strata.png",
    featured: true,
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/strata-scale-of-everything/id6786454233" },
      { label: "Web version", href: "https://strata.sammii.dev" }
    ],
    problem:
      "Scale is hard to feel. Strata lets people pinch and drag through maps of the cosmos and of history, and compare the gap between any two points, so very large and very small numbers become something you can see.",
    whatIDid: [
      "Designed and built a zoomable map engine rendered with Skia in React Native",
      "Wrote and structured around 900 history events across several map packs",
      "Moved the app from paid to free with eight optional in-app purchases, while keeping every pack for original buyers",
      "Fixed a 2.1(b) rejection caused by Apple's sandbox reporting the original app version as \"1.0\" for every account",
      "Added a home screen widget and a web version from the same codebase"
    ],
    shows: [
      "Performance-sensitive rendering and gesture work in React Native",
      "Careful monetisation changes that don't break existing customers",
      "Debugging App Store review issues that only appear in Apple's environment"
    ]
  },
  {
    slug: "postready",
    title: "PostReady",
    kind: "iOS app",
    oneLiner: "A teleprompter and recording app that turns one take into a captioned, cut and retouched short video on the phone.",
    role: "Design and iOS engineering",
    status: "Submitted to the App Store",
    stack: ["SwiftUI", "Metal", "Vision", "MediaPipe", "WhisperKit", "RevenueCat"],
    icon: "/images/apps/postready.png",
    featured: true,
    links: [],
    problem:
      "Making short-form video means recording, then editing captions, cuts and lighting in another app. PostReady is built around recording once with a teleprompter and having the rest done on the device.",
    whatIDid: [
      "Built a teleprompter recording flow with a preview that matches the exported file",
      "Wrote real-time beauty retouching on Metal, with MediaPipe face tracking on every device and ARKit on TrueDepth devices",
      "Added on-device captions with WhisperKit and automatic cuts",
      "Use it daily for my own content, through an internal build wired into my publishing pipeline",
      "Worked through 5.1.1(iv), 2.5.1 and 4.2.1 review feedback on the first submission"
    ],
    shows: [
      "GPU and camera work on iOS, not just standard UI",
      "Building tools I use myself, then tightening them from daily use",
      "Clear communication with App Review about what an app is and isn't"
    ]
  },
  {
    slug: "content-ops-fleet",
    title: "Content and ops fleet",
    kind: "Automation on a Mac mini",
    oneLiner: "An automated content and operations system that drafts, schedules, replies and reports for 11 brands, with approval gates.",
    role: "Architecture and engineering",
    status: "Running daily",
    stack: ["Node.js", "Python", "launchd", "MCP", "Codex", "Local models"],
    featured: true,
    links: [{ label: "The setup, packaged: sammii.dev/ops", href: "https://sammii.dev/ops" }],
    problem:
      "Running several small products alone leaves no time for marketing and operations. I wanted the routine work done by scheduled agents, with a person approving anything public or irreversible.",
    whatIDid: [
      "Built Spellcast, a self-hosted multi-brand scheduler with an MCP server, publishing across eight platforms",
      "Wrote scheduled jobs on a Mac mini that draft content, check quality, schedule posts and draft replies",
      "Added deterministic quality gates and approval boundaries so nothing public ships without an OK",
      "Moved the stack to Codex first, with local models as a fallback, to control cost",
      "Built self-healing checks and daily receipts so failures are visible rather than silent"
    ],
    shows: [
      "Practical AI engineering: orchestration, evaluation and guardrails",
      "Systems thinking across many small services",
      "Designing automation that people can trust and audit"
    ]
  },
  {
    slug: "crystal-index",
    title: "Crystal Index",
    kind: "iOS app and website",
    oneLiner: "A crystal reference guide and collection app with photo identification, on iPhone and the web.",
    role: "Design and full-stack engineering",
    status: "Live on the App Store",
    stack: ["SwiftUI", "SwiftData", "CloudKit", "RevenueCat", "Vision model API"],
    icon: "/images/apps/crystal-index.png",
    featured: false,
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/crystal-index/id6760981052" },
      { label: "crystalindex.co.uk", href: "https://crystalindex.co.uk" }
    ],
    problem:
      "Crystal reference sites are cluttered and hard to search. Crystal Index puts a clean reference guide, a personal collection and photo identification in one place.",
    whatIDid: [
      "Designed and built the iOS app with SwiftData and CloudKit sync",
      "Built a photo identification API that runs a vision model and deletes uploaded photos after analysis",
      "Added a free taster of five identifications and a premium subscription",
      "Fixed two App Review rejections in the purchase path, an empty paywall and a teaser screen hiding the store",
      "Built the matching website at crystalindex.co.uk"
    ],
    shows: [
      "Shipping a native app and its backend together",
      "Privacy-conscious handling of user photos",
      "Paywall design that passes review and still converts"
    ]
  },
  {
    slug: "ceres",
    title: "Ceres Rising",
    kind: "iOS app",
    oneLiner: "A guided manifestation and meditation companion timed to the real lunar cycle.",
    role: "Design and engineering",
    status: "Live on the App Store",
    stack: ["Next.js", "Capacitor", "RevenueCat", "astronomy-engine"],
    icon: "/images/apps/ceres.png",
    featured: false,
    links: [{ label: "App Store", href: "https://apps.apple.com/us/app/ceres-rising/id6813087089" }],
    problem:
      "Meditation apps rarely connect to anything outside the app. Ceres times guided practice to the actual moon, and works straight away with no account.",
    whatIDid: [
      "Built the app in Next.js inside a Capacitor shell, so the paywall and content can update without a new binary",
      "Produced a free library of 22 pre-rendered guided pieces with generated voice",
      "Added Pro practice plans for each lunar cycle, audio and offline saving",
      "Fixed a 3.1.2 rejection by adding renewal terms and Terms and Privacy links to the paywall and listing"
    ],
    shows: [
      "Choosing the right architecture for a small team: web tech in a native shell",
      "Subscription compliance done properly",
      "Calm, considered UI for a wellbeing product"
    ]
  }
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
