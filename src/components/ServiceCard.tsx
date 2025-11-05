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
      className="block rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group bg-white dark:bg-neutral-900"
    >
      <h3 className="text-xl font-medium text-black dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
        {summary}
      </p>
      <span className="inline-block text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
        Learn more →
      </span>
    </Link>
  );
}
