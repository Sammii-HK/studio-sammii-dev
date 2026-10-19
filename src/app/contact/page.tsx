import Container from "@/components/Container";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/lib/content";

export const metadata = {
  title: "Contact | Studio Sammii",
  description: "Hiring a senior design or product engineer on contract, or stuck in App Store review? Send a short note. I reply within one working day.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ deposit?: string; topic?: string }>;
}) {
  const { contact, availability } = siteContent;
  const { deposit, topic } = await searchParams;

  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-6 dark:text-white">
              {contact.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              {contact.description}
            </p>
          </div>
        </Container>
      </Section>

      {deposit === "success" && (
        <Section>
          <Container>
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 max-w-2xl">
              <p className="font-medium mb-1">Deposit received. You&apos;re booked in.</p>
              <p className="text-sm text-green-700">I&apos;ll be in touch shortly to confirm your start date and next steps.</p>
            </div>
          </Container>
        </Section>
      )}

      {deposit === "cancelled" && (
        <Section>
          <Container>
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700 max-w-2xl">
              <p className="font-medium mb-1">Payment cancelled.</p>
              <p className="text-sm text-neutral-600">No charge was made. Fill in the form below if you&apos;d like to get in touch.</p>
            </div>
          </Container>
        </Section>
      )}

      <Section className="pt-0 md:pt-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <ContactForm initialTopic={topic} />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6 dark:text-white">Other ways to reach me</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-black dark:text-white mb-2">Email</h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
                  >
                    {contact.email}
                  </a>
                </div>

                <div>
                  <h3 className="font-medium text-black dark:text-white mb-2">Availability</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{availability.line}</p>
                </div>

                <div>
                  <h3 className="font-medium text-black dark:text-white mb-2">Response time</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">Within one working day</p>
                </div>

                <div>
                  <h3 className="font-medium text-black dark:text-white mb-2">Time zone</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">London (GMT/BST, Europe/London)</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                <h3 className="font-medium text-black dark:text-white mb-2">Useful to include</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  For contract roles: start date, length, day rate or band, IR35 status and how many office days.
                  For App Review Rescue: the guideline number and the full rejection message from App Store Connect.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
