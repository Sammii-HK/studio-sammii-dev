import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";

export default function Home() {
  const { intro, services, projects, trust, cta } = siteContent;

  return (
    <>
      <Hero />
      
      {/* Intro Section */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {intro.text}
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Focused on outcomes that matter. From design systems to production-ready code.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                summary={service.summary}
                href={service.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Work Section */}
      <Section>
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Selected work</h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              A few projects that show how I blend design and engineering to create products with clarity and soul.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                goal={project.goal}
                impact={project.impact}
                image={project.image}
                role={project.role}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {trust.map((item, index) => (
              <div key={index} className="text-neutral-600">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">
              {cta.heading}
            </h2>
            <Button href="/contact" variant="primary">
              {cta.button}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
