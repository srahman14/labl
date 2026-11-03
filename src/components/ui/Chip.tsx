import { cn } from "@/lib/cn";

const map = {
  ok: { label: "Safe", cls: "text-ok border-ok/30 bg-ok/10", dot: "bg-ok" },
  tell: { label: "Can’t tell", cls: "text-tell border-tell/30 bg-tell/10", dot: "bg-tell" },
  no: { label: "Avoid", cls: "text-no border-no/30 bg-no/10", dot: "bg-no" },
} as const;

export type Verdict = keyof typeof map;

export function Chip({ verdict, label, className }: { verdict: Verdict; label?: string; className?: string }) {
  const v = map[verdict];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold", v.cls, className)}>
      <span className={cn("size-2 rounded-full", v.dot)} />
      {label ?? v.label}
    </span>
  );
}
