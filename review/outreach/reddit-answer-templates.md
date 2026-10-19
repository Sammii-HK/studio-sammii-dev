# Reddit answer templates: App Store rejection threads

For r/iOSProgramming, r/expo and r/reactnative. Drafts only, nothing posted.

How to use these:

- Answer the actual question first. The fix goes in the comment itself, not behind a link.
- Edit each one to the poster's details (their guideline, their stack, what they already tried).
- Link the decoder only when it adds something beyond the comment, and at most once per thread. Most subs dislike self-promotion: read each sub's rules before posting, and leave the link out if in doubt.
- Never post more than one of these a day, and never in threads where someone has already given the same answer.
- No em dashes, UK English.

Decoder link (only once it is live): https://studio.sammii.dev/app-review-rescue/decoder

---

## 1. 2.1(b) "We were unable to locate the in-app purchase" / paywall not showing

Best for: apps that went paid to free, or apps that unlock things for early users.

> If you have any logic that grants stuff to existing or early users, check that first. I hit exactly this on my own app (Strata). It went from paid to free, and original buyers keep their packs based on `originalApplicationVersion`.
>
> Two things that aren't obvious:
>
> 1. That value is the original **build number** (CFBundleVersion), not the marketing version.
> 2. In the sandbox and TestFlight it's "1.0" for every account.
>
> My check parsed "1.0" as build 1, so every reviewer looked like an original buyer, everything unlocked, and they never saw a purchase. Rejected under 2.1(b).
>
> Fix: only treat a purely numeric build at or below your cutoff as legacy, and if you can, also require the original purchase date to be before your free release. Then test with a fresh sandbox account on a device that's never had the app.
>
> Also worth checking: every product is Ready to Submit and attached to the version, and your review notes give the exact taps to reach the paywall.

---

## 2. 3.1.2 subscriptions: "missing Terms of Use / EULA"

Best for: first subscription apps, especially Capacitor/Expo apps with a custom paywall.

> This one is mostly a checklist. For 3.1.2 Apple wants all of these, and the rejection only ever mentions one of them:
>
> - A working **Terms of Use (EULA)** link in the App Store metadata: either put the link in your description or set a custom EULA in App Store Connect. If you use Apple's standard EULA, link to it.
> - A working **Privacy Policy** link in App Store Connect.
> - On the paywall itself: subscription title, length, price per period, that it auto-renews, plus tappable Terms and Privacy links.
> - Full price at least as clear as any trial price.
>
> Mine (Ceres) was rejected for the missing Terms link in metadata, and when I looked, the paywall only had a Restore button. I fixed both in the same resubmission so it didn't bounce again for the other half. Small tip if your paywall is web UI in a Capacitor shell: the in-app part can ship without a new build, but say in your reply exactly what changed and where.

---

## 3. 5.1.1(iv): custom permission screen with an "Allow" button

Best for: camera/photos/mic/notification onboarding screens.

> Rename the button. Apple reads a custom pre-permission screen with an "Allow" button as imitating the system prompt, which counts as pushing consent under 5.1.1(iv).
>
> What I changed on mine (PostReady): same screen, button now says "Continue", and it goes straight into the real system prompt. Also make sure:
>
> - there's a way to skip ("Not now"),
> - the app still works if they decline, with a fallback where you can,
> - each purpose string says the specific reason, not "we need access to your camera".
>
> In the Resolution Center reply just say the primer button now reads Continue, the system prompt follows it, and the app works if access is declined.

---

## 4. 4.3(b) spam / saturated category (astrology, tarot, dating, wallpaper, timers)

Best for: astrology, horoscope, tarot, wallpaper, timer, dating apps.

> Honest answer from someone who's been through five rounds of this one with an astrology app: rearranging doesn't work. I tried a journaling-first dashboard and changing category, and got the identical boilerplate back. An App Review Board appeal was denied too.
>
> 4.3(b) is a category verdict. The reviewer has decided what your app *is*, and the only thing that changes that is the reviewed binary being about something else. So:
>
> - Look at what a reviewer sees in the first 60 seconds and the first three screenshots. If that's readings, predictions or a chart, that's the verdict.
> - Lead with the part that's genuinely different (tools, journaling, real calculation, learning) and make it reachable without the saturated feature.
> - Rewrite metadata around that, not predictions.
> - Use review notes to say concretely what it does that others in the category don't.
>
> It's frustrating, but appealing the same binary rarely works for 4.3(b).

---

## 5. 4.2 minimum functionality / "your app is a repackaged website" (Expo, Capacitor, web views)

Best for: r/expo and r/reactnative posters wrapping a website.

> First, check which one you got. 4.2 is the general minimum functionality rule and 4.2.2 is specifically "marketing, web clippings, content aggregators or a collection of links". (People often quote 4.2.1, but that's the ARKit rule.)
>
> What tends to get these through:
>
> - Native navigation instead of a web view with a back button.
> - At least a couple of things that only make sense in an app: offline use, widgets, notifications, share sheet, Shortcuts, haptics.
> - The first session shows real value without leaving the app or signing in.
> - Review notes listing the app-only features and where to find them. A 30-second screen recording helps.
>
> If the app really is your website in a frame, the honest fix is either building those native pieces or shipping it as a PWA instead.

---

## Optional closing line (use sparingly, only where the sub allows it)

> I wrote these up with fix checklists here if it helps: [decoder link]. Happy to look at the exact rejection text if you paste it.
