import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} case study | Studio Sammii`,
    description: study.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <Link href="/work" className="hover:text-black dark:hover:text-white transition-colors">Work</Link>
              <span aria-hidden="true"> / </span>
              {study.title}
            </p>
            <div className="flex items-center gap-4 mb-6">
              {study.icon && (
                <Image
                  src={study.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-2xl border border-neutral-100 dark:border-neutral-800"
                />
              )}
              <h1 className="text-4xl font-semibold tracking-tight dark:text-white">{study.title}</h1>
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">{study.oneLiner}</p>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm border-y border-neutral-100 dark:border-neutral-800 py-6">
              <div>
                <dt className="font-medium text-black dark:text-white mb-1">Role</dt>
                <dd className="text-neutral-600 dark:text-neutral-400">{study.role}</dd>
              </div>
              <div>
                <dt className="font-medium text-black dark:text-white mb-1">Status</dt>
                <dd className="text-neutral-600 dark:text-neutral-400">{study.status}</dd>
              </div>
              <div>
                <dt className="font-medium text-black dark:text-white mb-1">Stack</dt>
                <dd className="text-neutral-600 dark:text-neutral-400">{study.stack.join(", ")}</dd>
              </div>
            </dl>

            {study.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {study.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-black dark:text-white underline underline-offset-4 hover:no-underline"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="max-w-3xl space-y-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">The problem</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{study.problem}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">What I did</h2>
              <ul className="space-y-3">
                {study.whatIDid.map((item) => (
                  <li key={item} className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start">
                    <span className="text-neutral-400 mr-3" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">What it shows</h2>
              <ul className="space-y-3">
                {study.shows.map((item) => (
                  <li key={item} className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start">
                    <span className="text-neutral-400 mr-3" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Need this on your team?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              I take contract roles as a senior design or product engineer, and I&apos;m open to permanent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact?topic=contract" variant="primary">Start a conversation</Button>
              <Button href="/work" variant="ghost">More case studies</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
