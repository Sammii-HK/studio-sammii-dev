import Link from "next/link";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";

export const metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
};

export default function Home() {
  const { intro, services, process, availability, trust, cta, contact } = siteContent;
  const featured = caseStudies.filter((study) => study.featured);

  return (
    <>
      <Hero />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {intro.text}
              </p>
            </div>
            <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900 h-fit">
              <h2 className="text-sm font-semibold text-black dark:text-white mb-3">Availability</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{availability.line}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{availability.rate}</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm font-medium text-black dark:text-white underline underline-offset-4 hover:no-underline"
              >
                {contact.email}
              </a>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold mb-4 dark:text-white">Selected work</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Products I&apos;ve designed, built and shipped myself, from App Store apps to the systems that run them.
              </p>
            </div>
            <Link href="/work" className="text-sm font-medium text-black dark:text-white underline underline-offset-4 hover:no-underline">
              All case studies
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Services</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Mostly contract roles inside product teams, plus a few fixed-scope offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                summary={service.summary}
                href={service.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <h2 className="text-3xl font-semibold mb-10 dark:text-white">How a contract starts</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
                <span className="text-sm font-mono text-neutral-400">0{index + 1}</span>
                <h3 className="font-semibold text-black dark:text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {trust.map((item) => (
              <div key={item} className="text-neutral-600 dark:text-neutral-400">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-100 dark:border-neutral-800">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">
              {cta.heading}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">{cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact?topic=contract" variant="primary">
                {cta.button}
              </Button>
              <Button href={`mailto:${contact.email}`} variant="ghost">
                Email {contact.email}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
