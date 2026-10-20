// Static lookup for the free Rejection Decoder. No LLM, no network calls.
// Guideline numbers follow Apple's App Review Guidelines as checked in October 2026.
// Paraphrased, not quoted; always check the current guidelines before resubmitting.

export type RejectionArea = "Performance" | "Business" | "Design" | "Legal" | "Metadata";

export type RejectionEntry = {
  id: string;
  guideline: string;
  title: string;
  area: RejectionArea;
  keywords: string[];
  whatItMeans: string;
  usualCauses: string[];
  fixChecklist: string[];
  reviewNote?: string;
  realCase?: {
    app: string;
    summary: string;
  };
};

export const rejectionsUpdated = "October 2026";

export const rejections: RejectionEntry[] = [
  {
    id: "2-1-b-original-app-version",
    guideline: "2.1(b)",
    title: "In-app purchase not visible to the reviewer: the sandbox originalAppVersion trap",
    area: "Performance",
    keywords: ["in-app purchase", "iap", "paywall", "not visible", "could not locate", "sandbox", "originalappversion", "originalapplicationversion", "apptransaction", "grandfather", "paid to free", "storekit", "app completeness"],
    whatItMeans:
      "Apple needs every in-app purchase you submitted to be visible and working for the reviewer. If they can't find the paywall, can't confirm the purchase, or can't reach what they bought, the build comes back under 2.1(b). A hidden cause is code that decides who has already paid by reading the original app version, which behaves differently in the sandbox.",
    usualCauses: [
      "Grandfathering logic reads AppTransaction.originalAppVersion (or the receipt's original_application_version) and treats the reviewer as an existing paid user, so the paywall never appears",
      "That value is the original build number (CFBundleVersion), not the marketing version, and in the sandbox and TestFlight it reads \"1.0\" for every account",
      "A loose parse turns \"1.0\" into build 1, which passes an \"early buyer\" check that is correct in production",
      "Products still in Missing Metadata or Developer Action Needed in App Store Connect",
      "Paywall only reachable after a long onboarding or behind a feature flag the reviewer never hits"
    ],
    fixChecklist: [
      "Log the environment (sandbox, TestFlight or production) next to every entitlement decision",
      "Never grant a lifetime or grandfathered entitlement from originalAppVersion when the environment is sandbox",
      "Test the paywall with a fresh sandbox account on a device that has never installed the app",
      "Confirm every product is Ready to Submit and attached to this version",
      "Add review notes with the exact steps to reach the paywall, plus a screenshot"
    ],
    reviewNote:
      "Say what you changed, then give numbered steps from first launch to the purchase screen. Mention that sandbox purchases now show the paywall for new accounts.",
    realCase: {
      app: "Strata",
      summary: "Strata went from paid to free with optional map packs, and original buyers keep every pack. Version 1.1.0 came back under 2.1(b): the reviewer was \"unable to get the confirmation of the purchase or to access the acquired item\". The most likely cause: the legacy-buyer check read originalApplicationVersion as a number, and the sandbox reports \"1.0\" for everyone, so the reviewer looked like an original buyer. The fix only counts a purely numeric build of 3 or below, and never a first purchase after the free release. The resubmitted build went through."
    }
  },
  {
    id: "2-1-b-first-iap",
    guideline: "2.1(b)",
    title: "First in-app purchase or subscription not submitted with the build",
    area: "Performance",
    keywords: ["first in-app purchase", "first subscription", "iap not submitted", "in-app purchases and subscriptions section", "app store connect", "api", "fastlane", "ready to submit", "attach"],
    whatItMeans:
      "The first in-app purchase or subscription for an app has to go to review together with a new app version, and that first attach is done in the App Store Connect web interface. Submit the version through the API or a CI lane without it and the version goes into review alone, so the reviewer has nothing to buy.",
    usualCauses: [
      "Products created and marked Ready to Submit, but never added to the version's review submission",
      "Assuming a script or CI lane attached them: later purchases can go through the API, the first one can't",
      "Subscription group not added for review, or missing a localisation or review screenshot"
    ],
    fixChecklist: [
      "Make sure each product has a display name, description, price, availability and review screenshot",
      "In App Store Connect, open each product and choose Add for Review, adding it to the version's draft submission",
      "For subscriptions, add the subscription group for review as well",
      "Submit for Review from the submission drawer, and check it lists the version and every product",
      "If a version already went in without them, cancel it (Developer Rejected is normal) and resubmit with the products"
    ],
    reviewNote:
      "Confirm the products are now attached to the version and list where each one appears in the app.",
    realCase: {
      app: "Strata",
      summary: "Strata 1.1.0 added eight in-app purchases. Submitting the version through the App Store Connect API sent it into review without them, so I cancelled it, added the products to the draft submission in the web interface, and submitted again with nine items. Later purchases can use the API; the first one is a web step."
    }
  },
  {
    id: "2-1-a-information-needed",
    guideline: "2.1(a)",
    title: "Information needed: demo account, backend or review notes",
    area: "Performance",
    keywords: ["information needed", "demo account", "login", "credentials", "review notes", "backend", "crash", "bug", "placeholder", "app completeness", "incomplete"],
    whatItMeans:
      "The reviewer couldn't fully use the app. Either they hit a crash or placeholder content, or they needed something you didn't give them: a login, a server that was switched on, or an explanation of a feature.",
    usualCauses: [
      "Sign-in required with no demo account in App Review Information",
      "Demo account expired, rate limited or tied to two-factor authentication",
      "Staging server asleep or behind an IP allowlist",
      "Hardware, location or invite-only features with no explanation"
    ],
    fixChecklist: [
      "Add a demo account that never expires and skips two-factor",
      "Pre-load the demo account with realistic data",
      "Keep the backend awake for the whole review window",
      "Write review notes that explain any feature the reviewer can't trigger themselves",
      "Run the build on a real device with no developer settings before submitting"
    ],
    reviewNote: "Answer each question Apple asked, in order, in plain sentences. Short and specific beats long."
  },
  {
    id: "2-1-a-empty-paywall",
    guideline: "2.1(a)",
    title: "In-app purchase \"didn't show properly\": empty paywall or a teaser in the way",
    area: "Performance",
    keywords: ["in-app purchase", "iap", "paywall", "empty paywall", "didn't show properly", "not configured", "revenuecat", "storekit", "product ids", "teaser", "upgrade button", "app completeness"],
    whatItMeans:
      "The reviewer tapped upgrade and didn't get a working purchase screen with prices. Apple may cite 2.1(a) or 2.1(b) for this. It often works on your machine because a plain simulator can't load StoreKit products either, so a broken paywall and a normal simulator look the same.",
    usualCauses: [
      "Product identifiers never passed into the paywall, so it falls back to an empty or \"not configured\" state",
      "A marketing or teaser screen before the real store, with no prices or purchase controls",
      "Products only fetched after a delay, with no loading or retry state",
      "Paywall depends on a remote config that isn't live in the review environment"
    ],
    fixChecklist: [
      "Make the upgrade entry open the real purchase screen in one tap, with prices, trial, subscribe and restore",
      "Log the product identifiers the paywall receives and fail loudly if the list is empty",
      "Test on a real device with a sandbox account, or with a StoreKit configuration file in the simulator",
      "Add loading, error and retry states for product fetches",
      "In review notes, give the exact taps from launch to the purchase screen"
    ],
    reviewNote: "Name both fixes if there were two (empty products, teaser screen) so the reviewer knows the whole path changed.",
    realCase: {
      app: "Crystal Index",
      summary: "Rejected twice for the same purchase path. First the paywall's product list was never wired in, so it showed \"Subscriptions are not configured yet\" on the reviewer's iPad. Then Upgrade still opened a blurred teaser with no prices before the real store. The fix sent Upgrade straight to the native subscription screen, and Crystal Index went live."
    }
  },
  {
    id: "2-3-3-screenshots",
    guideline: "2.3.3",
    title: "Screenshots don't show the app in use",
    area: "Metadata",
    keywords: ["screenshots", "screenshot", "splash", "login screen", "title art", "marketing", "device frame", "ipad screenshots", "metadata", "accurate metadata"],
    whatItMeans:
      "Screenshots have to show the app actually being used. Marketing art, a splash screen or a login page on its own doesn't count, and neither do screenshots from a different device or an older version of the UI.",
    usualCauses: [
      "First screenshots are title cards or illustrations with no real UI",
      "iPhone screenshots stretched into the iPad slots",
      "UI in screenshots no longer matches the build",
      "Captions promise features the build doesn't have"
    ],
    fixChecklist: [
      "Lead with real screens from the current build",
      "Use the right sizes for each device class you support",
      "Keep captions short and true to what the build does",
      "If the build supports iPad, App Store Connect needs a 13-inch iPad set before you can submit; capture real iPad screens",
      "Remove anything showing other platforms or pricing claims"
    ],
    reviewNote: "Screenshots are metadata, so you can usually fix them without a new build. Update them, then reply that the metadata has changed."
  },
  {
    id: "2-3-10-other-platforms",
    guideline: "2.3.10",
    title: "Metadata mentions other platforms",
    area: "Metadata",
    keywords: ["android", "google play", "other platforms", "cross-platform", "react native", "expo", "flutter", "metadata", "description", "screenshots"],
    whatItMeans:
      "Your App Store listing or screenshots mention or show another mobile platform. Common for cross-platform apps built with React Native, Expo or Flutter.",
    usualCauses: [
      "Description says \"also on Android\" or links to Google Play",
      "Screenshots captured on an Android device or emulator",
      "Android status bar or navigation bar visible in the UI",
      "Support or marketing text copied from the Play Store listing"
    ],
    fixChecklist: [
      "Search description, promotional text, what's new and keywords for Android or Google",
      "Re-capture screenshots on iOS devices or simulators",
      "Check in-app copy for platform-specific instructions",
      "Keep platform detection so iOS users never see Android-only UI"
    ]
  },
  {
    id: "3-1-1-iap-required",
    guideline: "3.1.1",
    title: "Digital content unlocked without in-app purchase",
    area: "Business",
    keywords: ["in-app purchase", "stripe", "external payment", "license key", "unlock", "web checkout", "payments", "digital goods", "business"],
    whatItMeans:
      "Features or digital content used inside the app have to be sold through Apple's in-app purchase, unless you qualify for a specific exception or an external purchase link entitlement in that storefront.",
    usualCauses: [
      "Web checkout or Stripe link for a digital subscription",
      "Licence keys or promo codes that unlock features outside StoreKit",
      "Buttons that point to a website to upgrade",
      "Reader or multiplatform app that doesn't meet the exception rules"
    ],
    fixChecklist: [
      "Move digital unlocks to StoreKit products",
      "Hide external purchase buttons on iOS unless you hold the right entitlement for that storefront",
      "Keep cross-platform entitlements in sync, so web buyers still unlock on iOS",
      "Check the current rules for your storefront before adding any external link"
    ]
  },
  {
    id: "3-1-2-subscription-terms",
    guideline: "3.1.2",
    title: "Subscription terms missing: EULA link and renewal details",
    area: "Business",
    keywords: ["subscriptions", "subscription", "eula", "terms of use", "privacy policy", "auto-renew", "renewal", "paywall", "schedule 2", "payments", "business"],
    whatItMeans:
      "Before someone subscribes, the app and the listing have to say clearly what they get, how long it lasts, what it costs and that it renews. Apple also expects working links to your Terms of Use (EULA) and Privacy Policy, both in the app and in App Store Connect.",
    usualCauses: [
      "Paywall has no Terms of Use or Privacy Policy link, or the links are broken",
      "No Terms of Use link in the App Store description or the custom EULA field",
      "Price per period, trial length or auto-renew wording missing near the subscribe button",
      "Trial price shown more prominently than the price after the trial"
    ],
    fixChecklist: [
      "Add tappable Terms of Use (EULA) and Privacy Policy links on the paywall",
      "Add the Terms of Use link to the App Store description, or set a custom EULA in App Store Connect",
      "Show title, length and price per period next to the button",
      "Say it auto-renews unless cancelled, and how to cancel",
      "Make the full price at least as clear as any trial or discount"
    ],
    reviewNote:
      "List each item you added and where it is: paywall links, description link, renewal text. If you used Apple's standard EULA, say so.",
    realCase: {
      app: "Ceres",
      summary: "The rejection cited a missing Terms of Use link in the store metadata, and the paywall itself only had a Restore button. The fix added the renewal terms plus Terms of Use and Privacy Policy links on the paywall, and the link in the listing. The paywall is web UI inside a Capacitor shell, so the in-app part shipped without a new build."
    }
  },
  {
    id: "4-0-ipad-layout",
    guideline: "4.0",
    title: "Design: layout broken on iPad",
    area: "Design",
    keywords: ["ipad", "layout", "design", "crowded", "supports tablet", "expo", "react native", "orientation", "4.0"],
    whatItMeans:
      "Apple reviews iPhone apps on iPad too. If parts of the UI are cut off, crowded or hard to use there, it comes back citing the Design section, usually as \"Guideline 4.0 - Design\".",
    usualCauses: [
      "Fixed widths or heights that only work on iPhone",
      "Expo or React Native app with supportsTablet turned on but never tested on iPad",
      "Modals and sheets that cover controls on large screens",
      "Landscape orientation allowed but not designed for"
    ],
    fixChecklist: [
      "Run the build on an iPad simulator in both orientations",
      "Constrain content width on large screens instead of stretching",
      "Decide on purpose whether you support iPad; if not, make it iPhone-only",
      "Check keyboard, sheets and safe areas on iPad"
    ]
  },
  {
    id: "4-2-minimum-functionality",
    guideline: "4.2",
    title: "Minimum functionality: too thin, or a repackaged website",
    area: "Design",
    keywords: ["minimum functionality", "web view", "webview", "wrapper", "website", "pwa", "capacitor", "link collection", "4.2.2", "not useful", "design"],
    whatItMeans:
      "Apple wants apps to be useful in their own right and feel like apps. A wrapped website, a list of links or a single static screen often fails. 4.2.2 covers marketing, web clippings and content aggregators specifically. (4.2.1 is the ARKit rule, covered separately.)",
    usualCauses: [
      "Capacitor or web view app that mirrors the mobile website",
      "Very few screens, or content that never changes",
      "No native features: offline, notifications, widgets, sharing, haptics",
      "Main value lives on a website the app links out to"
    ],
    fixChecklist: [
      "Add features that only make sense in an app: offline use, widgets, notifications, share sheet, Shortcuts",
      "Replace web navigation with native navigation patterns",
      "Make the first session show real value without leaving the app",
      "Explain in review notes what the app does that the website doesn't"
    ],
    reviewNote: "Describe the app-only features and where to find them. A short screen recording helps."
  },
  {
    id: "4-2-1-arkit",
    guideline: "4.2.1",
    title: "Seen as a thin AR app (ARKit), or an AR feature the reviewer couldn't reach",
    area: "Design",
    keywords: ["arkit", "augmented reality", "ar", "truedepth", "face tracking", "face mesh", "camera", "2.5.1", "minimum functionality", "design"],
    whatItMeans:
      "4.2.1 is the ARKit rule: apps that use ARKit should offer a rich, integrated AR experience. If ARKit is in the binary but the reviewer only sees a light use of it, or can't trigger it on their device, Apple may read the app as a thin AR app. A related 2.5.1 note can follow when a hardware feature such as TrueDepth isn't available on the review device.",
    usualCauses: [
      "ARKit face or world tracking used as a small optional extra, not the core of the app",
      "Feature only runs on TrueDepth devices, and the reviewer used an iPad without it",
      "Listing and review notes that don't say plainly what the app is",
      "Rejection boilerplate that mentions engines you don't use, which makes the real issue harder to spot"
    ],
    fixChecklist: [
      "Open the listing with one plain sentence saying what the app is",
      "In review notes, say whether it is an AR app and what ARKit is used for",
      "Say which devices the ARKit path runs on and what happens on the others",
      "Make sure the core features work, and are visible, on devices without TrueDepth",
      "If ARKit is optional, consider gating it behind isSupported and describing the fallback"
    ],
    reviewNote: "State that the app is not an AR app, what the camera features are, and that face tracking uses ARKit only on TrueDepth devices.",
    realCase: {
      app: "PostReady",
      summary: "PostReady is a teleprompter and recording app. Its beauty retouch runs on MediaPipe everywhere and uses ARKit face tracking only on TrueDepth devices. The reviewer's iPad had no TrueDepth camera, and the rejection cited 4.2.1 and 2.5.1 alongside 5.1.1(iv). The listing now opens with what the app is, and the review notes say it isn't an AR app and when ARKit runs."
    }
  },
  {
    id: "4-3-a-spam",
    guideline: "4.3(a)",
    title: "Spam: duplicate apps or the same app under several bundle IDs",
    area: "Design",
    keywords: ["spam", "duplicate", "bundle id", "template", "white label", "similar apps", "same app", "design"],
    whatItMeans:
      "You, or someone else, already have an app that looks like the same thing. Apple wants one app with variations inside it, not many near-copies.",
    usualCauses: [
      "One app per city, brand or language instead of one app with options",
      "Bought template or white-label code also used by other developers",
      "Re-submitting a previously rejected app under a new bundle ID",
      "Sister apps from the same account that share most of their screens"
    ],
    fixChecklist: [
      "Merge variations into one app with in-app choices or in-app purchases",
      "Change design and core flows enough that the app clearly stands on its own",
      "Remove leftover template branding and sample content",
      "In review notes, explain how this app differs from your others"
    ]
  },
  {
    id: "4-3-b-saturated",
    guideline: "4.3(b)",
    title: "Saturated category: dating, flashlight, wallpaper, timers, fortune telling",
    area: "Design",
    keywords: ["spam", "saturated", "fortune telling", "astrology", "horoscope", "tarot", "dating", "flashlight", "wallpaper", "timer", "sound effects", "design"],
    whatItMeans:
      "Apple names categories it already has plenty of, including dating, flashlight, sound effects, wallpaper, simple timers and fortune telling. Apps there need a clearly better or different experience. Astrology and tarot apps often get read as fortune telling.",
    usualCauses: [
      "Core loop looks like every other app in the category",
      "Daily readings or predictions as the main feature",
      "Generic content that could be swapped for any other app",
      "Metadata that leans on predictions or luck"
    ],
    fixChecklist: [
      "Lead with what is genuinely different: real calculation, journaling, learning or tools",
      "Show that difference in the first screenshots and the first minute of use",
      "Rewrite metadata around the useful part, not predictions",
      "Explain in review notes what the app does that others in the category don't",
      "Don't expect reordering screens or changing category to move it; the reviewed app itself has to be different"
    ],
    reviewNote: "Be concrete about the difference: the data you compute, the tools, how the experience changes with use. An App Review Board appeal is worth one try, but it rarely overturns 4.3(b).",
    realCase: {
      app: "Lunary",
      summary: "The native iOS build of Lunary came back under 4.3(b) five times with the same boilerplate about astrology, horoscopes and fortune telling, and an App Review Board appeal was denied. A journaling-first dashboard and a category change didn't move it. The lesson: rearranging the app doesn't answer a category verdict; only changing what the reviewed binary is about can."
    }
  },
  {
    id: "4-8-login-services",
    guideline: "4.8",
    title: "Login services: Google login without an equivalent option",
    area: "Design",
    keywords: ["sign in with apple", "google sign in", "facebook login", "social login", "login services", "account", "design"],
    whatItMeans:
      "If people sign in to their main account with a third-party or social login, you also need an option that limits data to name and email, lets them hide their email, and doesn't track them for ads without consent. Sign in with Apple meets this.",
    usualCauses: [
      "Only Google or Facebook sign-in on the welcome screen",
      "Sign in with Apple present on one screen but missing on another",
      "Sign in with Apple buttons that don't follow Apple's styling"
    ],
    fixChecklist: [
      "Add Sign in with Apple, or another equivalent option, next to every social login",
      "Handle hidden relay email addresses properly",
      "Use Apple's button styles",
      "Check whether your app falls under one of the listed exceptions before arguing it does"
    ]
  },
  {
    id: "5-1-1-iv-allow-button",
    guideline: "5.1.1(iv)",
    title: "Pre-permission screen with a button labelled \"Allow\"",
    area: "Legal",
    keywords: ["permission", "pre-permission", "allow button", "custom prompt", "priming", "camera", "photos", "microphone", "notifications", "location", "access", "privacy", "legal"],
    whatItMeans:
      "Apps must respect permission choices and not nudge people into granting access. A custom screen shown before the system prompt is fine, but if its button says \"Allow\" it looks like the real permission dialog, and Apple treats that as pushing consent. Apple's Human Interface Guidelines say that screen should have a single button titled something like \"Continue\" or \"Next\", with no option to close or cancel before the system alert.",
    usualCauses: [
      "Primer screen button labelled \"Allow\", \"Enable\" or \"Grant access\"",
      "A second button such as \"Not now\", or a close icon, that dismisses the screen before the system alert appears",
      "Feature blocked entirely when the user declines, with no alternative"
    ],
    fixChecklist: [
      "Relabel the primer button to something neutral such as \"Continue\" or \"Next\"",
      "Keep it to that one button: no \"Not now\", close or cancel before the system alert (the alert itself lets people decline)",
      "Let the app keep working when access is declined, with a fallback where possible",
      "Make each purpose string say exactly why you need the access"
    ],
    reviewNote: "Say the primer button now reads Continue, the system prompt follows it, and the app works if access is declined.",
    realCase: {
      app: "PostReady",
      summary: "PostReady 1.0.0 was rejected for a custom message before the permission request with an \"Allow\" button. Those onboarding rows call the system camera, microphone and photos prompts directly, so the fix was relabelling each one \"Continue\"."
    }
  },
  {
    id: "5-1-1-v-account-deletion",
    guideline: "5.1.1(v)",
    title: "No way to delete the account in the app",
    area: "Legal",
    keywords: ["account deletion", "delete account", "account", "sign in", "login required", "privacy", "legal"],
    whatItMeans:
      "If people can create an account in your app, they must be able to start deleting it from inside the app too. Apple also doesn't want a login wall in front of features that don't need an account.",
    usualCauses: [
      "Delete account only possible by emailing support or on the website",
      "Deactivate offered instead of delete",
      "Login required before any part of the app is usable"
    ],
    fixChecklist: [
      "Add Delete account in settings, easy to find",
      "Actually delete the data, or explain the timeline if the law requires keeping some",
      "Revoke Sign in with Apple tokens when the account goes",
      "Let people try features that don't need an account before signing up"
    ]
  },
  {
    id: "5-1-2-privacy-labels",
    guideline: "5.1.2",
    title: "App Privacy label doesn't match what the app does",
    area: "Legal",
    keywords: ["app privacy", "privacy label", "nutrition label", "tracking", "app tracking transparency", "att", "idfa", "analytics", "sdk", "data use", "privacy", "legal"],
    whatItMeans:
      "The App Privacy answers in App Store Connect have to match what the app and every SDK in it actually collect and share. A common version: the label says you track users, but the app never shows the App Tracking Transparency prompt, or the other way round.",
    usualCauses: [
      "Analytics, crash or attribution SDKs collecting data the label doesn't mention",
      "Label says data is used for tracking but no ATT prompt is shown",
      "ATT prompt shown but the label says no tracking",
      "Privacy manifests from SDKs not reflected in the answers"
    ],
    fixChecklist: [
      "List every SDK and what it collects; check each SDK's privacy manifest",
      "Update the App Privacy answers to match, data type by data type",
      "If you track, show the ATT prompt before any tracking starts",
      "If you don't track, turn off tracking features in the SDKs",
      "Make the privacy policy say the same thing as the label"
    ],
    reviewNote: "State which answers you changed in App Privacy, or that the ATT prompt now appears and where.",
    realCase: {
      app: "Crystal Index",
      summary: "Caught before submission rather than after. Crystal Index 1.1.1 uploads a camera photo for identification, then deletes it, so the label has to declare Photos or Videos, used for App Functionality, not linked to the user, no tracking. The App Privacy questionnaire is web only, so the build waited for it."
    }
  },
  {
    id: "5-1-1-i-privacy-policy",
    guideline: "5.1.1(i)",
    title: "Privacy policy missing or incomplete",
    area: "Legal",
    keywords: ["privacy policy", "privacy", "data collection", "retention", "deletion", "consent", "legal"],
    whatItMeans:
      "You need a privacy policy linked both in App Store Connect and inside the app. It has to say what you collect, how, what you use it for, who you share it with, how long you keep it and how people can ask for deletion.",
    usualCauses: [
      "No privacy policy link inside the app",
      "Link points at a 404 or a generic template",
      "Policy doesn't mention third-party SDKs or AI providers you send data to",
      "No retention or deletion section"
    ],
    fixChecklist: [
      "Add a privacy policy link in settings and on sign-up and paywall screens",
      "Name the third parties and what they receive",
      "Add retention, deletion and how to withdraw consent",
      "Check the link works in App Store Connect and in the app"
    ]
  }
];
