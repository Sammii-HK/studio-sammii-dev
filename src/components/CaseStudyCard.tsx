import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        {study.icon ? (
          <Image
            src={study.icon}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl border border-neutral-100 dark:border-neutral-800"
          />
        ) : (
          <span
            aria-hidden="true"
            className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-semibold"
          >
            {study.title.slice(0, 1)}
          </span>
        )}
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">{study.title}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{study.kind}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-1">{study.oneLiner}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {study.stack.slice(0, 4).map((item) => (
          <span
            key={item}
            className="text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded"
          >
            {item}
          </span>
        ))}
      </div>
      <span className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
        Read case study →
      </span>
    </Link>
  );
}
