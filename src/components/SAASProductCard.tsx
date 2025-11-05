import Link from "next/link";

type SAASProductCardProps = {
  name: string;
  description: string;
  githubUrl: string;
  homepage?: string | null;
  language: string;
  updated: string;
  isPublic?: boolean;
};

export default function SAASProductCard({ 
  name, 
  description, 
  githubUrl,
  homepage,
  language, 
  updated,
  isPublic = true 
}: SAASProductCardProps) {
  const projectLink = homepage || githubUrl;
  const linkLabel = homepage ? "Visit project" : "View on GitHub";
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group bg-white dark:bg-neutral-900">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-medium">
              {language}
            </span>
            {isPublic && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded font-medium">
                Public
              </span>
            )}
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              Updated {updated}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
          <Link
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1 group/link"
          >
            {linkLabel}
            <svg 
              className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          {homepage && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              title="View source on GitHub"
            >
              GitHub
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

