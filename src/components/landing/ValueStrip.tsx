import { Media } from "@/components/ui/Media";
import { valueStrip } from "@/lib/data";

export function ValueStrip() {
  return (
    <div className="grid grid-cols-2 border-y border-line md:grid-cols-5">
      {valueStrip.map(({ label, slot }) => (
        <div key={label} className="relative flex h-28 items-end overflow-hidden border-r border-line">
          <Media slot={slot} absolute />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <span className="relative px-4 pb-3 text-sm font-semibold tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  );
}
