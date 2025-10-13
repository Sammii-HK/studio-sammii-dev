import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "Work — Studio Sammii",
  description: "A few projects that show how I blend design and engineering to create products with clarity and soul.",
};

export default function WorkPage() {
  const { projects } = siteContent;

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6">
              Selected work
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              A few projects that show how I blend design and engineering to create products with clarity and soul.
            </p>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Note about case studies */}
      <Section className="bg-neutral-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600">
              Detailed case studies available upon request. Each project includes process insights, 
              challenges overcome, and measurable outcomes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
