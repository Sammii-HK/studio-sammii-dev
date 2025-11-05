import Hero from "@/components/Hero";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import SAASProductCard from "@/components/SAASProductCard";
import Button from "@/components/Button";
import { siteContent } from "@/lib/content";
import { fetchGitHubRepos, formatUpdatedDate } from "@/lib/github";

export const metadata = {
  title: "Studio Sammii — Design engineer for products with clarity and soul",
  description: "I help founders, studios, and creatives bring products to life. Design systems, product UI, and front-end in React and Next.js.",
};

export default async function Home() {
  const { intro, services, projects, trust, cta, saasProductNames } = siteContent;
  const allRepos = await fetchGitHubRepos();
  const saasRepos = allRepos.filter((repo) => saasProductNames.includes(repo.name));

  return (
    <>
      <Hero />
      
      {/* Intro Section */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {intro.text}
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Services</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
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
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Selected work</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
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

      {/* SAAS Products Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">SAAS Products</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Software-as-a-service products I&apos;ve built and launched. Each product solves real problems with clean interfaces and thoughtful engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {saasRepos.slice(0, 6).map((repo, index) => (
              <SAASProductCard
                key={index}
                name={repo.name}
                description={repo.description}
                githubUrl={repo.githubUrl}
                homepage={repo.homepage}
                language={repo.language}
                updated={formatUpdatedDate(repo.updatedAt)}
                isPublic={repo.isPublic}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button href="/saas" variant="ghost">
              View all SAAS products
            </Button>
          </div>
        </Container>
      </Section>

      {/* Trust Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {trust.map((item, index) => (
              <div key={index} className="text-neutral-600 dark:text-neutral-400">
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
