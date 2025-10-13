import Link from "next/link";

type ServiceCardProps = {
  title: string;
  summary: string;
  href: string;
};

export default function ServiceCard({ title, summary, href }: ServiceCardProps) {
  return (
    <Link 
      href={href} 
      className="block rounded-2xl border border-neutral-200 p-6 hover:bg-neutral-50 hover:border-neutral-300 transition-colors group"
    >
      <h3 className="text-xl font-medium text-black mb-3">
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed mb-4">
        {summary}
      </p>
      <span className="inline-block text-sm text-neutral-500 group-hover:text-black transition-colors">
        Learn more →
      </span>
    </Link>
  );
}
