import Image from "next/image";

type ProjectCardProps = {
  title: string;
  goal: string;
  impact: string;
  image: string;
  role?: string;
};

export default function ProjectCard({ title, goal, impact, image, role }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-colors group">
      <div className="relative h-56 bg-neutral-100">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-black">{title}</h3>
          {role && (
            <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
              {role}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-600 mb-1">
          <span className="font-medium">Goal:</span> {goal}
        </p>
        <p className="text-sm text-neutral-600">
          <span className="font-medium">Impact:</span> {impact}
        </p>
      </div>
    </article>
  );
}
