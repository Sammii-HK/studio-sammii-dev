# LinkedIn posts (8)

Drafts only. **Nothing scheduled, nothing added to Studio or the bank.**

The Sammii Dev LinkedIn lane already has seven posts scheduled from 20 to 26 October (Gamut dark mode, Flip, Lunary semantic search, slider screenshots, agents and handoffs, automation). These would follow from 27 October. The account set's cadence says three a week (Mon, Wed, Fri at 18:00 or 19:30), so eight posts cover about two and a half weeks. Post 1 goes first, because the others point back at the site.

Links: LinkedIn allows them, but posts with a link in the body tend to reach fewer people. Each post has the link as the last line, so you can move it into the first comment if you'd rather.

---

## 1. Contract availability

I'm taking on contract work again, and I've rebuilt my contracting site to say so properly.

Short version: I'm a senior design and product engineer in London. I work in the space between design and code, turning product thinking into interfaces, components and systems that hold up in production.

Over the last year I've built and shipped my own products end to end:

• four iOS apps on the App Store, in SwiftUI and React Native
• Prism, a component library with zero runtime dependencies
• Lunary, a Next.js PWA
• the automation that markets them, running on a Mac mini

That's what I'd bring to your team: picking up a codebase quickly, building the UI properly, and leaving components and notes the team can keep using.

I'm looking for senior or staff-level design engineering or product engineering contracts. Hybrid in London or remote, inside or outside IR35. Open to permanent roles too.

If you know a team that needs this, an intro would mean a lot.

Case studies, process and day rate: studio.sammii.dev

---

## 2. What App Store rejections taught me

My iOS apps have been rejected by App Review under six different guidelines this year. Each one taught me something the guidelines don't spell out.

2.1(b): in the sandbox, originalApplicationVersion is "1.0" for every account. My paid-to-free logic read that as an original buyer, so the reviewer never saw a purchase.

3.1.2: the rejection named one missing link. The guideline wants several things: Terms of Use and Privacy links on the paywall and in the listing, plus clear renewal terms. Fix all of it at once.

5.1.1(iv): a custom permission screen with an "Allow" button looks like the system prompt. "Continue" is fine.

4.3(b): five rounds on an astrology app. Rearranging screens and changing category got the same boilerplate back. A category verdict only changes when the reviewed app is about something else.

I've put these, and a dozen more common ones, into a free Rejection Decoder with fix checklists. If you're an indie developer stuck in review right now, I also take on rescues.

studio.sammii.dev/app-review-rescue/decoder

---

## 3. The first week of a contract

The first week of a contract tells you most of what you need to know.

My rule: ship something small and real in week one. Not a big feature. A bug fix, a component, a copy change that goes all the way through review and into production.

It proves the boring things early:
• I have the access I need
• I understand how the codebase is put together
• I know how review, CI and releases work here
• the team has seen how I work before anything large depends on me

The other habit is a short written update every Friday: what shipped, what's blocked, what's next. It takes five minutes, and it means nobody has to chase me for status.

Neither is clever. Both make the next three months easier for everyone.

studio.sammii.dev

---

## 4. Your paywall is a design problem

Two of my App Store rejections came down to the same screen: the paywall.

One had a product list that was never wired in, so the reviewer saw "Subscriptions are not configured yet". The other passed that, then put a blurred teaser screen with no prices in front of the real store.

Neither was an engineering mistake you'd catch in a code review. Both were design decisions about what someone sees when they tap "Upgrade".

What I do now:
• one tap from Upgrade to a screen with real prices
• price per period next to the button
• renewal terms in plain words
• Terms and Privacy links where people can find them
• Restore where people look for it

It passes review, and it's fair to the people paying. Those turn out to be the same list.

studio.sammii.dev

---

## 5. Writing for a stranger

The most useful writing skill I've built this year came from App Store review notes.

A reviewer opens your app with no context and very little time. If they can't work out what it is and where to tap, it gets rejected, however good the app is.

So I write review notes like a bug report for a stranger:
• one sentence on what the app is, and what it isn't
• numbered steps from first launch to the thing they need to check
• what they should see at each step
• anything they can't trigger themselves, explained

It turns out that's also how I'd want to write a pull request description, a handover doc or an incident update. Same reader, really: someone smart, busy and missing your context.

---

## 6. Bugs that only exist in someone else's environment

Some bugs only exist in an environment you don't control.

Two from this year:

A plain simulator can't load StoreKit products. So a paywall with a missing product list looks exactly like a working paywall in the simulator. The only place it broke was on Apple's reviewer's iPad.

Apple's sandbox reports the original app version as "1.0" for every account. My legacy-buyer check was correct for real customers and wrong for every reviewer.

The fix wasn't more testing, exactly. It was logging the environment next to every decision that depends on it, and testing on a fresh sandbox account on a real device before every submission.

If a decision depends on where the code runs, write down where it ran.

---

## 7. Design systems that survive contact with code

Most design systems I've seen die in the gap between Figma and the codebase.

When I built Prism, my component library, I set myself one constraint: zero runtime dependencies. No animation library, no styling runtime. Spring physics written by hand on requestAnimationFrame.

That constraint made every component easy to drop into an existing product, which is the actual test of a design system. If adopting it means a new dependency and a migration, teams don't adopt it.

What I take from that into team work:
• tokens and components live in the codebase first, and Figma mirrors them
• every component has a live example you can try in place
• the migration plan for existing screens is part of the system, not an afterthought

prism.sammii.dev

---

## 8. Five rejections for the same app

Lunary's iOS app was rejected five times under the same App Store guideline, 4.3(b). An appeal to the App Review Board was denied too.

4.3(b) covers saturated categories: Apple names fortune telling alongside dating, wallpapers and flashlights. An astrology app gets read that way by default.

What I tried that didn't work:
• reordering the dashboard to lead with journaling
• changing the App Store category
• appealing with a careful explanation

Each time, the same boilerplate came back.

The lesson I took: you can't rearrange your way out of a category verdict. The reviewer has decided what your app is. Only changing what the reviewed app is actually about can change the answer.

It's frustrating. It's also a clear product question, not an App Review one: what is this app, really, to someone who's never seen it?
