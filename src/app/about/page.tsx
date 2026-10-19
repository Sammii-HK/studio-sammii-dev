import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "About | Studio Sammii",
  description: "Sammii Kellow is a London-based senior design engineer working across product, design and front-end engineering.",
};

export default function AboutPage() {
  const { about, availability, contact } = siteContent;

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-8 dark:text-white">
              {about.title}
            </h1>
            <div className="text-lg text-neutral-600 dark:text-neutral-400">
              {about.story.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-8 dark:text-white">Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.principles.map((principle) => (
                <div key={principle} className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-medium text-black dark:text-white">
                    {principle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Currently</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-10">
              <div>
                <h3 className="font-medium text-black dark:text-white mb-2">Location</h3>
                <p className="text-neutral-600 dark:text-neutral-400">London, UK</p>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white mb-2">Tools</h3>
                <p className="text-neutral-600 dark:text-neutral-400">Figma, React, Next.js, TypeScript, Tailwind, SwiftUI</p>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white mb-2">Availability</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{availability.line}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/contact?topic=contract" variant="primary">Start a conversation</Button>
              <Button href={`mailto:${contact.email}`} variant="ghost">Email {contact.email}</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
