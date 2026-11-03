import { cn } from "@/lib/cn";

export function Heading({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-[clamp(34px,5vw,72px)] font-medium leading-none tracking-[-0.045em]", className)}>{children}</h2>;
}
