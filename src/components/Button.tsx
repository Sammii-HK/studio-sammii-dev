import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export default function Button({ 
  children, 
  href, 
  variant = "primary", 
  className = "",
  onClick 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition-colors";
  
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    ghost: "border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
