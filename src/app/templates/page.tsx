import Container from "@/components/Container";
import Section from "@/components/Section";
import TemplateCard from "@/components/TemplateCard";
import { fetchTemplates } from "@/lib/templates";

export const metadata = {
  title: "Framer Templates — Studio Sammii",
  description: "Browse our collection of premium Framer templates. Beautiful, modern designs ready to use in your projects.",
};

const ENABLE_TEMPLATES_STORE = process.env.NEXT_PUBLIC_ENABLE_TEMPLATES_STORE === 'true';

export default async function TemplatesPage() {
  // Show "Coming Soon" if templates store is not enabled
  if (!ENABLE_TEMPLATES_STORE) {
    return (
      <>
        <Section>
          <Container>
            <div className="max-w-3xl mx-auto text-center py-24">
              <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
                Templates Store
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                Our collection of premium Framer templates is coming soon. 
                Check back later for beautiful, production-ready templates.
              </p>
              <a 
                href="/contact" 
                className="inline-block text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Get notified when available →
              </a>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  const { templates, pagination } = await fetchTemplates({ limit: 20 });

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              Framer Templates
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Browse our collection of premium Framer templates. Each template is carefully designed 
              with modern aesthetics, thoughtful interactions, and production-ready code. Perfect for 
              landing pages, portfolios, and digital products.
            </p>
          </div>
        </Container>
      </Section>

      {/* Templates Grid */}
      <Section>
        <Container>
          {templates.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    id={template.id}
                    title={template.title}
                    description={template.description}
                    style={template.style}
                    category={template.category}
                    tags={template.tags}
                    price={template.price}
                    thumbnailUrl={template.thumbnailUrl}
                    previewUrl={template.previewUrl}
                    purchaseUrl={template.purchaseUrl}
                    stats={template.stats}
                    featured={template.featured}
                  />
                ))}
              </div>
              
              {/* Pagination Info */}
              {pagination.hasMore && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Showing {templates.length} of {pagination.total} templates
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                No templates available at the moment.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Check back soon for new templates!
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Info Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              All templates include full source code, documentation, and commercial license. 
              Each template is optimized for performance and built with modern best practices.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Have questions about a template or need custom work? 
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

