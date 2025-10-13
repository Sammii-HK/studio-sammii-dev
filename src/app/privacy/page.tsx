import Container from "@/components/Container";
import Section from "@/components/Section";

export const metadata = {
  title: "Privacy Policy — Studio Sammii",
  description: "Privacy policy for Studio Sammii website.",
};

export default function PrivacyPage() {
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight mb-8">
              Privacy Policy
            </h1>
            
            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-600 mb-8">
                Last updated: January 2025
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Information I collect</h2>
              <p className="text-neutral-600 mb-6">
                When you contact me through this website, I collect the information you provide in the contact form, 
                including your name, email address, company details, and message content.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">How I use your information</h2>
              <p className="text-neutral-600 mb-6">
                I use the information you provide to respond to your inquiries and discuss potential projects. 
                Your information is never shared with third parties or used for marketing purposes without your consent.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Data storage</h2>
              <p className="text-neutral-600 mb-6">
                Contact form submissions are processed securely and stored only as long as necessary to respond 
                to your inquiry and maintain records of our communication.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Analytics</h2>
              <p className="text-neutral-600 mb-6">
                This website may use privacy-focused analytics to understand how visitors use the site. 
                No personal information is collected through analytics.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Your rights</h2>
              <p className="text-neutral-600 mb-6">
                You have the right to request access to, correction of, or deletion of your personal information. 
                Contact me at hello@sammii.dev for any privacy-related requests.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
              <p className="text-neutral-600">
                If you have any questions about this privacy policy, please contact me at hello@sammii.dev.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
