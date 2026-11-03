import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  solid: "bg-cream text-[#151510]",
  ghost: "border border-[#3a3d33] text-[#f1f0e8]",
};

type Props = { href: string; variant?: keyof typeof variants; className?: string; children: React.ReactNode };

export function Button({ href, variant = "solid", className, children }: Props) {
  return (
    <Link href={href} className={cn("inline-block rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90", variants[variant], className)}>
      {children}
    </Link>
  );
}
