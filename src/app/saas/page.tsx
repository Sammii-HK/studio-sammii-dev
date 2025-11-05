import Container from "@/components/Container";
import Section from "@/components/Section";
import SAASProductCard from "@/components/SAASProductCard";
import { siteContent } from "@/lib/content";
import { fetchGitHubRepos, formatUpdatedDate } from "@/lib/github";

export const metadata = {
  title: "SAAS Products — Studio Sammii",
  description: "A collection of software-as-a-service products I've built and launched.",
};

export default async function SAASPage() {
  const { saasProductNames } = siteContent;
  const allRepos = await fetchGitHubRepos();
  
  // Filter to only SAAS products
  const saasRepos = allRepos.filter((repo) => 
    saasProductNames.includes(repo.name)
  );
  
  // Debug: Check which SAAS products are missing
  const repoNames = allRepos.map(r => r.name);
  const missingRepos = saasProductNames.filter(name => !repoNames.includes(name));

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              SAAS Products
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A collection of software-as-a-service products I&apos;ve built and launched. 
              Each product is designed to solve real problems with clean interfaces and thoughtful engineering.
            </p>
          </div>
        </Container>
      </Section>

      {/* Products Grid */}
      <Section>
        <Container>
          {missingRepos.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-300">
              <p className="font-medium mb-1">Note: Some repositories not found:</p>
              <p className="text-yellow-700 dark:text-yellow-400">{missingRepos.join(", ")}</p>
              <p className="text-yellow-600 dark:text-yellow-500 mt-2">They may be private, renamed, or not yet created.</p>
            </div>
          )}
          {saasRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saasRepos.map((repo, index) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400">
                Loading repositories from GitHub...
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Note Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              All products are open source and available on GitHub. 
              Each project includes full source code, documentation, and deployment instructions.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Interested in collaborating or have questions about any of these products? 
              <a href="/contact" className="text-black dark:text-white hover:underline ml-1">
                Get in touch
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
