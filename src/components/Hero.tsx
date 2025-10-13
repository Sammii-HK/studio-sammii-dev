import Container from "./Container";
import Button from "./Button";
import { siteContent } from "@/lib/content";

export default function Hero() {
  const { hero } = siteContent;
  
  return (
    <section className="border-b border-neutral-100">
      <Container>
        <div className="py-20 md:py-28">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl leading-tight">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed">
            {hero.subhead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button href={hero.primaryCTA.href} variant="primary">
              {hero.primaryCTA.text}
            </Button>
            <Button href={hero.secondaryCTA.href} variant="ghost">
              {hero.secondaryCTA.text}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
