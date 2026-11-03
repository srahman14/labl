import { cn } from "@/lib/cn";
import type { Verdict } from "./Chip";

const cls = {
  ok: "bg-ok/15 text-ok outline-ok/40",
  tell: "bg-tell/15 text-[#ffe08a] outline-tell/40",
  no: "bg-no/20 text-[#ffb4b4] outline-no/40",
};

/** Highlights the ingredient that triggered a verdict. */
export function Flag({ verdict, children }: { verdict: Verdict; children: React.ReactNode }) {
  return <mark className={cn("rounded px-1 outline outline-1", cls[verdict])}>{children}</mark>;
}
