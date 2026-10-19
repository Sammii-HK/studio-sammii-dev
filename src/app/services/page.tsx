import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "Services | Studio Sammii",
  description: "Contract design and product engineering in London or remote, design systems, UX and accessibility audits, and App Review Rescue for iOS apps.",
};

const anchors = ["contract", "design-systems", "audits", "app-review-rescue"];

export default function ServicesPage() {
  const { services, availability } = siteContent;

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              Services
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              Most of my work is contract roles inside product teams. Alongside that I run a few fixed-scope offers
              for design systems, audits and App Store review.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">{availability.line}</p>
          </div>
        </Container>
      </Section>

      {services.map((service, index) => (
        <Section
          key={service.title}
          className={`scroll-mt-16 ${index % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-950" : ""}`}
        >
          <div id={anchors[index]} className="scroll-mt-24" />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  {service.summary}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-sm font-medium text-black dark:text-white">
                  {service.pricing}
                </div>
                {service.href === "/app-review-rescue" && (
                  <div className="mt-6">
                    <Button href="/app-review-rescue" variant="ghost">See App Review Rescue</Button>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-medium mb-4 dark:text-white">What you get</h3>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                      <span className="text-neutral-400 mr-2" aria-hidden="true">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">
              Not sure which fits?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Tell me the goal and the timeline. I&apos;ll suggest the simplest way to work together.
            </p>
            <Button href="/contact" variant="primary">
              Talk to me
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
