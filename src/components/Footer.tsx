import Link from "next/link";
import Container from "./Container";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const social = [
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "GitHub", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <Container>
        <div className="py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-lg font-semibold text-black">
                Studio Sammii
              </Link>
            </div>
            
            <nav className="flex flex-wrap gap-6 md:gap-8 mb-6 md:mb-0">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex gap-6">
              {social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-neutral-500">
            <p>&copy; 2025 Studio Sammii. All rights reserved.</p>
            <Link href="/privacy" className="mt-2 md:mt-0 hover:text-neutral-700 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
