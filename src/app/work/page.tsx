import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { siteContent } from "@/lib/content";
import { fetchGitHubRepos, fetchProjectImages } from "@/lib/github";

export const metadata = {
  title: "Work — Studio Sammii",
  description: "A few projects that show how I blend design and engineering to create products with clarity and soul.",
};

export default async function WorkPage() {
  const { projects } = siteContent;
  const allRepos = await fetchGitHubRepos();
  
  // Create a map of repo names to their homepage URLs
  const repoHomepages = new Map<string, string | null>();
  allRepos.forEach((repo) => {
    repoHomepages.set(repo.name.toLowerCase(), repo.homepage);
  });
  
  // Get repo names from projects
  const repoNames = projects
    .map((project) => project.githubUrl?.split('/').pop() || '')
    .filter((name) => name.length > 0);
  
  // Fetch README images for all projects
  const projectImages = await fetchProjectImages(repoNames);
  
  // Enhance projects with homepage links and images from GitHub
  const projectsWithHomepages = projects.map((project) => {
    const repoName = project.githubUrl?.split('/').pop()?.toLowerCase() || '';
    const homepage = repoHomepages.get(repoName) || null;
    const imageUrl = projectImages.get(repoName) || project.image;
    return {
      ...project,
      homepage,
      image: imageUrl,
    };
  });

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              Selected work
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A few projects that show how I blend design and engineering to create products with clarity and soul.
            </p>
          </div>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsWithHomepages.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                goal={project.goal}
                impact={project.impact}
                image={project.image}
                role={project.role}
                githubUrl={project.githubUrl}
                homepage={project.homepage}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Note about case studies */}
      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600 dark:text-neutral-400">
              Detailed case studies available upon request. Each project includes process insights, 
              challenges overcome, and measurable outcomes.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
