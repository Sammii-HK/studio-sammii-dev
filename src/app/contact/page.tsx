import Container from "@/components/Container";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "Contact — Studio Sammii",
  description: "Looking to improve your product or launch something new. Send me a short note. I reply within 24 hours.",
};

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <>
      {/* Hero */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6">
              {contact.title}
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {contact.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ContactForm />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-6">Other ways to reach me</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-black mb-2">Email</h3>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-black mb-2">Response time</h3>
                  <p className="text-neutral-600">Usually within 24 hours</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-black mb-2">Time zone</h3>
                  <p className="text-neutral-600">WITA (UTC+8)</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-neutral-50 rounded-xl">
                <h3 className="font-medium text-black mb-2">Before you reach out</h3>
                <p className="text-sm text-neutral-600">
                  I work best with founders and teams who value craft, clarity, and honest collaboration. 
                  If that sounds like you, I'd love to hear about your project.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
