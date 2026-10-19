import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/case-studies";

export const metadata = {
  title: "Work | Studio Sammii",
  description: "Case studies: shipped iOS apps, the Prism component library, a Next.js PWA and an automated operations stack, designed and built by Sammii Kellow.",
};

export default function WorkPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              Selected work
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Everything here I designed, built and shipped myself. Each case study covers the problem, what I did and
              what it shows about how I&apos;d work on your team.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Happy to walk through any of these, and the code behind them, on a call.
            </p>
            <Button href="/contact?topic=contract" variant="primary">Start a conversation</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
