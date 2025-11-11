import Link from "next/link";
import Image from "next/image";

type TemplateCardProps = {
  id: string;
  title: string;
  description: string;
  style: string;
  category: string;
  tags: string[];
  price: number;
  thumbnailUrl: string;
  previewUrl: string;
  purchaseUrl?: string;
  stats?: {
    views: number;
    downloads: number;
    sales: number;
  };
  featured?: boolean;
};

export default function TemplateCard({
  id,
  title,
  description,
  style,
  category,
  tags,
  price,
  thumbnailUrl,
  previewUrl,
  purchaseUrl,
  stats,
  featured = false,
}: TemplateCardProps) {
  const purchaseLink = purchaseUrl || previewUrl;
  
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group bg-white dark:bg-neutral-900">
      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold text-white bg-black/70 dark:bg-white/90 dark:text-black px-2 py-1 rounded">
                Featured
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-black dark:text-white">
            ${price.toFixed(2)}
          </span>
        </div>
        
        {/* Tags and Meta */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-medium">
              {style}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-medium">
              {category}
            </span>
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs text-neutral-400 dark:text-neutral-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        {stats && (
          <div className="mb-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span>{stats.views} views</span>
              <span>{stats.downloads} downloads</span>
              {stats.sales > 0 && <span>{stats.sales} sales</span>}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1 group/link"
          >
            Preview
            <svg 
              className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          {purchaseLink && (
            <Link
              href={purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-black dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Purchase
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

