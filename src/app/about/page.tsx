import Container from "@/components/Container";
import Section from "@/components/Section";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "About — Studio Sammii",
  description: "I am rebuilding from the ground up and creating space for more intentional design.",
};

export default function AboutPage() {
  const { about } = siteContent;

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-8">
              {about.title}
            </h1>
            <div className="prose prose-lg text-neutral-600">
              {about.story.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-8">Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.principles.map((principle, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-neutral-200">
                  <h3 className="font-medium text-black">
                    {principle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Bio */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-6">Currently</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-medium text-black mb-2">Location</h3>
                <p className="text-neutral-600">Bali, Indonesia</p>
              </div>
              <div>
                <h3 className="font-medium text-black mb-2">Tools</h3>
                <p className="text-neutral-600">Figma, React, Next.js, Tailwind</p>
              </div>
              <div>
                <h3 className="font-medium text-black mb-2">Availability</h3>
                <p className="text-neutral-600">Select projects</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
