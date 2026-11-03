"use client";
import { useRef } from "react";
import { Chip } from "@/components/ui/Chip";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { domains } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Second scroll lock: vertical scroll drives a horizontal track.
  useGSAP(() => {
    const el = track.current!;
    gsap.to(el, {
      x: () => -(el.scrollWidth - window.innerWidth * 0.95),
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${el.scrollWidth}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
  }, { scope: root });

  return (
    <section ref={root} id="domains" className="flex h-screen flex-col justify-center overflow-hidden border-t border-line bg-gradient-to-b from-bg via-[#101628] to-bg">
      <Heading className="px-[5vw] pb-6 text-[clamp(30px,4vw,56px)]">One engine.<br />Every shelf you shop.</Heading>
      <div ref={track} className="flex w-max gap-4 px-[5vw]">
        {domains.map((d) => (
          <div key={d.title} className="relative h-[min(52vh,460px)] w-[min(440px,78vw)] overflow-hidden rounded-md border border-line">
            <Media slot={d.slot} absolute />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-black/70" />
            <div className="absolute inset-x-3.5 bottom-3.5 flex items-end justify-between gap-2.5">
              <b className="max-w-[200px] text-xl font-semibold leading-tight tracking-tight">{d.title}</b>
              <Chip verdict={d.verdict} label={d.label} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
