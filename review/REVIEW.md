# studio.sammii.dev refresh: review list

Local only. Nothing has been deployed, merged, pushed, posted, sent, scheduled or charged. No Stripe products or links created.

- **Repo:** `~/development/studio-sammii-dev` (GitHub Sammii-HK/studio-sammii-dev). Vercel project `studio-sammii-dev`, serves both studio.sammii.dev and hire.sammii.dev. Not git-connected: production is deployed by CLI.
- **Branch:** `studio/contracting-refresh-20261019`, in worktree `~/development/.worktrees/studio-contracting-refresh-20261019`. Your main checkout is untouched.
- **Commit 1 (baseline):** your uncommitted 23 March work, copied unchanged. Live production (`dpl_9jCFEgaYRwicY7mQoqE72ctsbTFK`) was deployed from that dirty tree, so this makes the live state reproducible.
- **Commit 2 (refresh):** everything below.
- **Screenshots:** `review/screenshots/` (not committed): desktop light and dark, mobile 390px light and dark.

---

## 1. Decisions for you (approve, edit or drop)

1. **Day rate shown publicly:** "£550 to £700 a day, depending on scope and IR35 status." Home availability card, services page, contact page.
2. **Availability line:** "Available for contract roles now. Hybrid in London, remote or on-site. Open to permanent."
3. **Response promise:** "within one working day" (was "within 24 hours"). App Review Rescue also promises "a diagnosis and fixed quote within one working day".
4. **Service prices:**
   - Contract design and product engineering: £550 to £700 a day (replaces "Front-end £50 to £70 per hour").
   - Design systems: "Scoped in blocks of days at the day rate" (was "£800 to £2,000 per project").
   - UX and accessibility audits: unchanged, £300 to £600 fixed.
5. **App Review Rescue prices:** Rejection Decoder free (live). Indie Ship Kit "£49 to £79", labelled **Not on sale yet**, button is a mailto for early access. Done-for-you "£300 to £1,500": single rescue from £300, launch pass up to £1,500.
6. **Your real rejections, published:** Strata 2.1(b), Strata first-IAP attach, Crystal Index 2.1(a), Ceres 3.1.2, PostReady 5.1.1(iv) and 4.2.1/2.5.1, Lunary 4.3(b) (five rounds, appeal denied). Lunary and PostReady are the most candid; drop either by deleting its `realCase` in `src/lib/rejections.ts`.
7. **£500 deposit:** same Stripe price ID, same checkout code. Change: the button now hides when the enquiry topic is "Contract or permanent role" or "App Review Rescue". Shown for "Fixed-scope project" or no topic.
8. **X link in footer:** set to x.com/sammiihk (matches prism.sammii.dev/hire). Your larger account is @technicalyblond. Which one?
9. **SAAS removed from nav and home.** The /saas page still exists, just unlinked. Instagram link removed from the footer.

---

## 2. Exact changes

**Fixes to things broken on the live site**
- `/contact?deposit=success` and `?deposit=cancelled` banners never render on live (Next 16 passes `searchParams` as a Promise). Fixed; verified locally.
- Footer social links were all `#`. Now LinkedIn, X, GitHub, sammii.dev.
- © 2025 is now the current year. "Building from Bali", "Bali, Indonesia" and "WITA (UTC+8)" are now London (Europe/London).
- Dark mode: services, about, contact and the form had black-on-dark text and white inputs. Fixed.
- `metadataBase` set, so social preview images resolve to studio.sammii.dev; locale en_GB; contact page title no longer says "hire.sammii.dev".

**Pages**
- **Home:** new hero (senior design and product engineer, contract, London), intro, availability card with rate and email, six case studies, four services, "How a contract starts" (intro call, terms in writing, ship in week one, weekly written updates), CTA to the contact form and hello@sammii.dev. The GitHub-repo SAAS grid is gone.
- **Work:** eight case studies, each with its own page at `/work/[slug]`: Prism, Lunary, iPrep, Strata, PostReady, content and ops fleet, Crystal Index, Ceres Rising. App icons from the app repos. Facts checked against repos and release notes; no traffic or revenue figures. PostReady says "Submitted to the App Store", not live. The fleet case study links to sammii.dev/ops.
- **Services:** four services with anchors, pricing as above.
- **App Review Rescue (new, `/app-review-rescue`):** three tiers, six real cases, four-step process, disclaimer ("Apple makes the final decision... Not affiliated with Apple").
- **Rejection Decoder (new, `/app-review-rescue/decoder`):** 18 entries, static data, no LLM, no network calls. Search works with a guideline number, words, or Apple's pasted header line (e.g. "Guideline 3.1.2 - Business - Payments - Subscriptions"). Each entry: what it means, usual causes, fix checklist, reply tip, and your case where there is one.
- **About:** London, rewritten story, tools now include SwiftUI.
- **Contact:** new "What is this about?" field (prefilled via `?topic=`), topic-specific message prompts, budget hidden for contract roles, topic included in the Pushover title.

**Decoder accuracy notes**
- Guideline numbers checked against Apple's live App Review Guidelines today.
- The brief's "4.2.1 minimum functionality": 4.2.1 is the ARKit rule. Minimum functionality is filed under 4.2 (with 4.2.2), and 4.2.1 has its own entry using PostReady's real ARKit rejection.
- Strata's 2.1(b) is described as the *most likely* cause, matching your 1 October post-mortem; the resubmitted build went through.
- First-IAP attach uses your September finding: the first product goes to review via each product page's Add for Review in the web UI, not the API.

---

## 3. Checks run

- `tsc --noEmit`: pass. ESLint: 0 errors (1 existing warning in `TemplateCard.tsx`).
- `next build`: pass, 26 routes, all 8 case studies prerendered.
- Every page returns 200 on the local production server (`next start`, port 3123).
- No horizontal overflow at 390px, light and dark, on home, rescue, decoder, contact and a case study.
- Decoder search: 5 queries return the expected entries; nonsense returns none.
- Contact: topic prefill works; deposit button shows for none or project, hides for contract and app-review.
- **Not tested:** a real form submission (Pushover) and Stripe checkout. No real keys in the worktree, and those code paths are unchanged.

---

## 4. Deploy step (needs your explicit OK)

All seven env vars in Vercel are production-only, so a normal preview deploy can't build. Do a production build without moving the domains, check it, then promote:

```bash
cd ~/development/.worktrees/studio-contracting-refresh-20261019
cp -R ~/development/studio-sammii-dev/.vercel .
vercel deploy --prod --skip-domain > /tmp/studio-deploy.log 2>&1; tail -5 /tmp/studio-deploy.log
```

Open the deployment URL from the log (signed in to Vercel), check /, /app-review-rescue/decoder and /contact, then:

```bash
vercel promote <deployment-url-from-log> --scope sammiis-projects
```

**Rollback:** `vercel promote studio-sammii-hni0l4sw9-sammiis-projects.vercel.app --scope sammiis-projects` (today's live deployment).

After it's live: merge the branch into main and push. That is a separate approval.

---

## 5. Link changes on other surfaces (listed, not made)

| Surface | Now | Proposed |
|---|---|---|
| **sammii.dev** contact block, `sammii-hk.github.io/app/src/components/home/Contact.tsx:29` | "Looking for a senior or staff {role} role, London or remote. The fastest way to reach me is email." | "Looking for a senior or staff {role} role, London or remote, and taking contract work: [studio.sammii.dev](https://studio.sammii.dev). The fastest way to reach me is email." |
| **sammii.dev** nav | No link to the studio | Add "Hire me" → https://studio.sammii.dev |
| **sammii.dev** meta, `app/layout.tsx:13` and `app/lib/llms.ts:15` | Already says "Open to senior, staff, founding, or contract roles" | No change |
| **prism.sammii.dev/hire**, `prism/app/hire/hire-view.tsx:311, 508-509` | mailto kellow.sammii@gmail.com | hello@sammii.dev |
| **prism.sammii.dev/hire**, `hire-view.tsx:293/305` | "Available for permanent or contract." | Keep, add a link "Contract rates and case studies: studio.sammii.dev" |
| **X bio** (whichever account) | Links sammii.dev, no work line | "Design engineer in London. Product UI, design systems, iOS. Taking contract work: studio.sammii.dev". Website field: studio.sammii.dev |
| **LinkedIn** | No stored copy found; Cast profile says "Design Engineer / Front-End Specialist" | Headline: "Senior design and product engineer · React, Next.js, SwiftUI · Contract and permanent · London". Featured: studio.sammii.dev. Contact info website: studio.sammii.dev |
| **hire.sammii.dev** | Same Vercel project, so it gets the refresh automatically | Optional: redirect hire.sammii.dev to studio.sammii.dev so there is one canonical URL |

Note: the sammii-hk.github.io and prism checkouts both have uncommitted work from other sessions. Make these edits in their own branches.

---

## 6. Outreach pack (files, nothing posted or scheduled)

- `review/outreach/x-posts.md`: 3 single posts. The X queue runs through 24 October, so these start 25 October at the earliest, one a day. Posts 2 and 3 need the site live.
- `review/outreach/linkedin-posts.md`: 2 posts (contract availability; four rejection lessons). LinkedIn queue runs through 23 October.
- `review/outreach/reddit-answer-templates.md`: 5 answer templates (2.1(b) sandbox trap, 3.1.2, 5.1.1(iv), 4.3(b), 4.2 web wrappers), with posting rules.
- `review/outreach/email-warm-contacts.md`: about 110 words, plus a recruiter variant with the rate.
- `review/outreach/stripe-payment-link-copy.md`: copy for Ship Kit, single rescue, launch pass. No overlap with sammii.dev/ops (Starter £29, Quick Fix £49/£349).

---

## 7. Noticed along the way (not changed)

- PostReady: `~/development/quickcut` main checkout still has "Allow" at `OnboardingView.swift:320`. The fix lives on `fix/postready-permission-button-copy` (build 355). Fine if 355 is what's in review; worth merging back.
- sammii.dev lists Framer Motion in Prism's stack, but Prism's README says it doesn't use it.
- sammii.dev says iPrep does "on-device Apple Speech transcription", but `SpeechService.swift:201` sets `requiresOnDeviceRecognition = false`.
- Added a `studio-contracting-preview` entry to `~/development/.claude/launch.json` for the local preview.
