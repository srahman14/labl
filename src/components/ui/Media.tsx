import Image from "next/image";
import { cn } from "@/lib/cn";
import { images, type ImageSlot } from "@/lib/images";

type Props = { slot: ImageSlot; className?: string; priority?: boolean; absolute?: boolean };

/** Renders the real image for a slot (lib/images.ts) or a gradient placeholder until one is provided. */
export function Media({ slot, className, priority, absolute = false }: Props) {
  const { src, alt, hue } = images[slot];
  return (
    <div className={cn(absolute ? "absolute inset-0" : "relative", "overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center text-xs text-white/50"
          style={{ background: `linear-gradient(160deg, hsl(${hue} 70% 55%), hsl(${hue + 50} 50% 14%))` }}
        >
          {slot}
        </div>
      )}
    </div>
  );
}
