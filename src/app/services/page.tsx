import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "Services — Studio Sammii",
  description: "Outcomes over deliverables. I help you move from idea to interface with clarity and pace.",
};

export default function ServicesPage() {
  const { services } = siteContent;

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6">
              Services
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Outcomes over deliverables. I help you move from idea to interface with clarity and pace.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services */}
      {services.map((service, index) => (
        <Section key={index} className={index % 2 === 1 ? "bg-neutral-50" : ""}>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  {service.title}
                </h2>
                <p className="text-lg text-neutral-600 mb-6">
                  {service.summary}
                </p>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-sm font-medium text-neutral-500">
                  {service.pricing}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                <h3 className="font-medium mb-4">What you get:</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-neutral-600 flex items-start">
                      <span className="text-neutral-400 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">
              Not sure where to start?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Tell me your goal. I will suggest a simple scope that fits your stage and timeline.
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
