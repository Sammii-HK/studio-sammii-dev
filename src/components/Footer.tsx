import Link from "next/link";
import Container from "./Container";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "App Review Rescue", href: "/app-review-rescue" },
  { name: "Rejection Decoder", href: "/app-review-rescue/decoder" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const social = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sammii" },
  { name: "X", href: "https://x.com/technicalyblond" },
  { name: "GitHub", href: "https://github.com/Sammii-HK" },
  { name: "sammii.dev", href: "https://sammii.dev" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
      <Container>
        <div className="py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Link href="/" className="text-lg font-semibold text-black dark:text-white">
                Studio Sammii
              </Link>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex gap-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Studio Sammii. Sammii Kellow, London.</p>
            <Link href="/privacy" className="mt-2 md:mt-0 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
