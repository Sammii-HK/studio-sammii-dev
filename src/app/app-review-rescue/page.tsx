import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";
import { rejections } from "@/lib/rejections";

export const metadata = {
  title: "App Review Rescue | Studio Sammii",
  description: "Stuck in App Store review? A free Rejection Decoder for common guidelines, an Indie Ship Kit, or a done-for-you rescue from an indie iOS developer who has been through it.",
};

export default function AppReviewRescuePage() {
  const { appReviewRescue } = siteContent;
  const featuredIds = ["2-1-b-original-app-version", "2-1-a-empty-paywall", "3-1-2-subscription-terms", "5-1-1-iv-allow-button", "4-2-1-arkit", "4-3-b-saturated"];
  const featured = featuredIds
    .map((id) => rejections.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof rejections)[number] => Boolean(entry?.realCase));

  return (
    <>
      <Section className="border-b border-neutral-100 dark:border-neutral-800">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4">For indie developers and small studios</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 dark:text-white">
              {appReviewRescue.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              {appReviewRescue.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/app-review-rescue/decoder" variant="primary">Decode my rejection</Button>
              <Button href="/contact?topic=app-review" variant="ghost">Get it fixed for me</Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {appReviewRescue.tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-xl font-semibold text-black dark:text-white">{tier.name}</h2>
                  <span className="shrink-0 text-xs font-medium px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {tier.status}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-black dark:text-white mb-3">{tier.price}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">{tier.summary}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                      <span className="text-neutral-400 mr-2" aria-hidden="true">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href={tier.cta.href} variant={tier.price === "Free" ? "primary" : "ghost"}>
                  {tier.cta.text}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {featured.length > 0 && (
        <Section className="bg-neutral-50 dark:bg-neutral-950">
          <Container>
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-semibold mb-4 dark:text-white">Rejections from my own apps</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Not theory. These came back from App Review on apps I build and ship myself, and each one changed how I prepare a submission.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/app-review-rescue/decoder#${entry.id}`}
                  className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-mono font-semibold px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                      {entry.guideline}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">{entry.realCase?.app}</span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">{entry.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">{entry.realCase?.summary}</p>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    See the fix checklist →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <h2 className="text-3xl font-semibold mb-10 dark:text-white">How a rescue works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appReviewRescue.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <span className="text-sm font-mono text-neutral-400">0{index + 1}</span>
                <h3 className="font-semibold text-black dark:text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400 max-w-3xl">{appReviewRescue.disclaimer}</p>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Rejected right now?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Send the full rejection message. You&apos;ll get a diagnosis and a fixed quote within one working day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact?topic=app-review" variant="primary">Send my rejection</Button>
              <Button href="mailto:hello@sammii.dev?subject=App%20Review%20Rescue" variant="ghost">Email hello@sammii.dev</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
