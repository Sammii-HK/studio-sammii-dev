"use client";

import { useMemo, useState } from "react";
import type { RejectionEntry } from "@/lib/rejections";

function matches(entry: RejectionEntry, query: string) {
  if (!query) return true;
  // Every word must appear somewhere; "4.3b" and "4.3(b)" both find 4.3(b)
  const haystack = [
    entry.guideline,
    entry.guideline.replace(/[()]/g, ""),
    entry.title,
    entry.area,
    entry.realCase?.app ?? "",
    ...entry.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word && !IGNORED_WORDS.has(word))
    .every((word) => haystack.includes(word));
}

// Lets people paste Apple's header line, e.g. "Guideline 3.1.2 - Business - Payments - Subscriptions"
const IGNORED_WORDS = new Set(["guideline", "guidelines", "-", "–", "—", "the", "and", "of"]);

export default function RejectionDecoder({ entries }: { entries: RejectionEntry[] }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => entries.filter((entry) => matches(entry, query.trim())), [entries, query]);

  return (
    <div>
      <label htmlFor="decoder-search" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Search by guideline number or words from your rejection
      </label>
      <input
        id="decoder-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. 3.1.2, EULA, screenshots, Sign in with Apple"
        className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
      />
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400" aria-live="polite">
        {visible.length === entries.length
          ? `${entries.length} common rejections`
          : `${visible.length} of ${entries.length} match`}
      </p>

      <nav aria-label="Guidelines" className="mt-6 flex flex-wrap gap-2">
        {visible.map((entry) => (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {entry.guideline}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-6">
        {visible.map((entry) => (
          <article
            key={entry.id}
            id={entry.id}
            className="scroll-mt-24 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-sm font-mono font-semibold px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                {entry.guideline}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{entry.area}</span>
            </div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-3">{entry.title}</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">{entry.whatItMeans}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-black dark:text-white mb-3">Usual causes</h3>
                <ul className="space-y-2">
                  {entry.usualCauses.map((cause) => (
                    <li key={cause} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                      <span className="text-neutral-400 mr-2" aria-hidden="true">•</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black dark:text-white mb-3">Fix checklist</h3>
                <ul className="space-y-2">
                  {entry.fixChecklist.map((step) => (
                    <li key={step} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start">
                      <span className="mr-2 mt-0.5 inline-block w-3.5 h-3.5 shrink-0 rounded border border-neutral-300 dark:border-neutral-600" aria-hidden="true" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {entry.reviewNote && (
              <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800">
                <h3 className="text-sm font-semibold text-black dark:text-white mb-1">What to write in the reply</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{entry.reviewNote}</p>
              </div>
            )}

            {entry.realCase && (
              <div className="mt-4 p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
                <h3 className="text-sm font-semibold text-black dark:text-white mb-1">Seen in my own app: {entry.realCase.app}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{entry.realCase.summary}</p>
              </div>
            )}
          </article>
        ))}

        {visible.length === 0 && (
          <p className="text-neutral-600 dark:text-neutral-400">
            Nothing matches that yet. Send me the rejection message and I&apos;ll tell you what it means.
          </p>
        )}
      </div>
    </div>
  );
}
