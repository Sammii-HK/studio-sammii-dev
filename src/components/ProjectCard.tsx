import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  goal: string;
  impact: string;
  image: string;
  role?: string;
  githubUrl?: string;
  homepage?: string | null;
};

export default function ProjectCard({ title, goal, impact, image, role, githubUrl, homepage }: ProjectCardProps) {
  const projectLink = homepage || githubUrl;
  const linkLabel = homepage ? "Visit project" : "View on GitHub";
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group bg-white dark:bg-neutral-900">
      <div className="relative h-56 bg-neutral-100 dark:bg-neutral-800">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-black dark:text-white">{title}</h3>
          {role && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
              {role}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
          <span className="font-medium">Goal:</span> {goal}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
          <span className="font-medium">Impact:</span> {impact}
        </p>
        {projectLink && (
          <div className="flex items-center gap-3">
            <Link
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1"
            >
              {linkLabel}
              <svg 
                className="w-3 h-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            {homepage && githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                title="View source on GitHub"
              >
                GitHub
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
