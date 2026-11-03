import { Chip } from "@/components/ui/Chip";
import { Flag } from "@/components/ui/Flag";
import { Media } from "@/components/ui/Media";
import { rules, type ResultData } from "@/lib/data";

const row = "flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2.5 text-[13px]";
const BARS = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1];

function Barcode() {
  let x = 0;
  const rects = BARS.map((w, i) => {
    const r = i % 2 === 0 ? <rect key={i} x={x} width={w} height={60} fill="#111" /> : null;
    x += w;
    return r;
  });
  return <svg viewBox={`0 0 ${x} 60`} preserveAspectRatio="none" className="h-[70%] w-[88%]">{rects}</svg>;
}

export function RulesPanel() {
  return (
    <>
      <Media slot="phoneRules" className="h-28 shrink-0" />
      <div className="flex flex-col gap-2.5 p-4">
        <p className="text-xl font-bold tracking-tight">Your rules</p>
        {rules.map((r) => (
          <div key={r.label} className={row}>{r.label}<Chip verdict={r.verdict ?? "ok"} label={r.tag} /></div>
        ))}
        <div className={`${row} border-dashed text-mu`}>+ Add a rule in plain words</div>
      </div>
    </>
  );
}

const corners = ["left-6 top-8 border-r-0 border-b-0", "right-6 top-8 border-l-0 border-b-0", "left-6 bottom-8 border-r-0 border-t-0", "right-6 bottom-8 border-l-0 border-t-0"];

export function ScanPanel() {
  return (
    <div className="relative flex flex-1 flex-col justify-center gap-3.5 bg-gradient-to-b from-[#171914] to-[#0c0d0b] p-4">
      {corners.map((c) => <span key={c} className={`absolute size-7 border-[3px] border-ok ${c}`} />)}
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-white">
        <Barcode />
        <div data-laser className="absolute inset-x-0 top-[8%] h-0.5 bg-no shadow-[0_0_18px_4px_#f87171aa]" />
      </div>
      <p className="text-center text-[12.5px] text-mu">5 000168 000014 · matching…</p>
    </div>
  );
}

export function ResultPanel({ result: r }: { result: ResultData }) {
  return (
    <>
      <Media slot={r.slot} className="h-28 shrink-0" />
      <div className="flex flex-col items-start gap-2.5 p-4">
        <Chip verdict={r.verdict} />
        <p className="text-xl font-bold tracking-tight">{r.name}</p>
        <p className="text-[13px] leading-7 text-[#c8c9bd]">
          {r.parts.map((p, i) => (typeof p === "string" ? p : <Flag key={i} verdict={r.verdict}>{p.flag}</Flag>))}
        </p>
        {r.callout && (
          <div className="rounded-xl border border-dashed border-tell/40 bg-tell/10 p-3 text-[12.5px] text-[#f3dca0]">
            <b>{r.callout.label}</b> {r.callout.text}
          </div>
        )}
        {r.rows?.map((t) => <div key={t} className={`${row} w-full`}>{t}</div>)}
        <p className="text-xs text-mu">{r.meta}</p>
      </div>
    </>
  );
}
