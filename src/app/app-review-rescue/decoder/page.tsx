import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import RejectionDecoder from "@/components/RejectionDecoder";
import { rejections, rejectionsUpdated } from "@/lib/rejections";

export const metadata = {
  title: "App Store Rejection Decoder | Studio Sammii",
  description: "Free plain-English guide to common App Store rejections: 2.1(b), 3.1.2, 5.1.1(iv), 4.2, 4.3, 2.3.3, App Privacy labels and more. Usual causes and a fix checklist for each.",
};

export default function DecoderPage() {
  return (
    <>
      <Section className="pb-8 md:pb-10">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <Link href="/app-review-rescue" className="hover:text-black dark:hover:text-white transition-colors">App Review Rescue</Link>
              <span aria-hidden="true"> / </span>
              Rejection Decoder
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 dark:text-white">
              Rejection Decoder
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Paste the guideline number from your App Store Connect message, or a few words from it. Each entry explains
              what Apple is asking for, the usual causes, and a checklist to work through before you resubmit. Free, no sign-up.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="max-w-4xl">
            <RejectionDecoder entries={rejections} />

            <div className="mt-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Still stuck?</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-5">
                Send me the full rejection message. I&apos;ll tell you what the reviewer actually wants and give you a fixed
                quote to sort it, usually within one working day.
              </p>
              <Button href="/contact?topic=app-review" variant="primary">Send my rejection</Button>
            </div>

            <p className="mt-8 text-xs text-neutral-500 dark:text-neutral-400">
              Guideline numbers checked against Apple&apos;s App Review Guidelines in {rejectionsUpdated}. Apple changes
              them, so read the current version on developer.apple.com before resubmitting. Not affiliated with Apple.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
