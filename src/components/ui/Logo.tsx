import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ dotClassName = "text-brand", className }: { dotClassName?: string; className?: string }) {
  return (
    <Link href="/" className={cn("text-[22px] font-extrabold tracking-[-0.04em]", className)}>
      labl<span className={dotClassName}>.</span>
    </Link>
  );
}
