# X posts for @technicalyblond (16)

Drafts only. **Nothing scheduled or added to the bank.**

Rules for this account (from its Spellcast account set): one text-only design-engineering post a day from the gated bank, **no links, no hashtags**. So none of these has a link; where one points at the site, it says "link in bio" and relies on the bio change in the hire-links work.

The daily slot is taken up to 25 October (Gamut, focus-visible, roving tabindex, skeletons). These would join the bank for 26 October onwards, one a day, mixed in with the existing design-engineering posts rather than run back to back. Approve the ones you want and I'll add them to the bank.

Character counts are under 280 for all of them (checked).

---

## App Store review lessons (12)

1. In the App Store sandbox, originalApplicationVersion is "1.0" for every account.

   My paid-to-free migration parsed that as build 1, so every App Review tester looked like an original buyer, got everything unlocked, never saw a purchase, and rejected the update under 2.1(b).

2. A plain simulator can't load StoreKit products, so a broken paywall and a working one look identical there.

   That's how Crystal Index sent App Review an empty paywall. Test purchases on a device with a sandbox account, or with a StoreKit configuration file.

3. The first in-app purchase for an app can't go to review through the App Store Connect API.

   My version went into review without its eight products. Add each one for review in the web UI, then submit. Later ones can use the API.

4. Apple's rejection named one missing link. The guideline wanted all of it: a Terms of Use link in the listing, Terms and Privacy links on the paywall, and the renewal terms in plain words.

   Fix the whole guideline, not just the sentence they quoted.

5. A custom permission screen with an "Allow" button reads as a fake system prompt, and that's a 5.1.1(iv) rejection.

   Call it "Continue", keep it the only button, and make sure the app still works when someone declines the real prompt.

6. 4.3(b) is a category verdict. I reordered an astrology app's screens and changed its category, and got the same boilerplate back five times.

   Rearranging doesn't answer it. Only changing what the reviewed app is about can.

7. If your iPhone app can run on iPad, App Review will test it on iPad.

   A common "4.0 Design" rejection: supportsTablet left on in an Expo app that nobody ever opened on a big screen.

8. Write App Review notes like a bug report for a stranger: what the app is, where to tap, what they should see.

   The reviewer has minutes and none of your context.

9. My PostReady review notes now open with one sentence: it's a teleprompter and recording app, not an AR app.

   ARKit face tracking was an optional extra on TrueDepth devices, and the reviewer's iPad didn't have one.

10. The App Privacy questionnaire has to match every SDK you ship, not just your own code.

    It's also web only. I held a Crystal Index build for it because the app now uploads a camera photo for identification.

11. A paywall is a design problem first. Price per period next to the button, renewal terms in plain words, restore where people look for it.

    It passes review, and it's fair to the people paying.

12. I turned every App Store rejection I've had into a free decoder: 18 common guidelines, what Apple actually wants, and a fix checklist for each.

    It's on my site, link in bio.

## Contract work (4)

13. I'm taking contract work: product UI, design systems and front-end in React, Next.js and SwiftUI.

    London hybrid or remote, inside or outside IR35. Link in bio.

14. On a new contract I try to ship something small in the first week.

    It proves access, the codebase and the review flow before anything big depends on them.

15. The most underrated contractor habit is a written update every Friday: what shipped, what's blocked, what's next.

    Five minutes of writing saves a status meeting.

16. Design engineering is mostly translation. Designers say "it should feel lighter", engineers ask "which token".

    The job is answering both in the same pull request.
