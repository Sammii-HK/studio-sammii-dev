import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight mb-6">
            Page not found
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. 
            It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="primary">
              Go home
            </Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
