"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Flag } from "@/components/ui/Flag";
import { Media } from "@/components/ui/Media";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from("[data-in]", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 })
      .from("[data-vis]", { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" }, 0)
      .from("[data-chip]", { x: -40, opacity: 0, duration: 0.7 }, "-=.3");
    gsap.to("[data-par]", { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    gsap.to("[data-chip]", { y: -30, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });
  }, { scope: root });

  return (
    <section ref={root} className="grid min-h-screen items-center gap-[4vw] px-[5vw] pb-10 pt-28 md:grid-cols-[1.1fr_.9fr]">
      <div>
        <div data-in className="mb-6"><Chip verdict="ok" label="Food live · Skin & Beauty next" /></div>
        <h1 data-in className="text-[clamp(44px,7vw,98px)] font-medium leading-[.98] tracking-[-0.05em]">
          Scan it.<br />Know in <em className="not-italic text-brand">one second.</em>
        </h1>
        <p data-in className="my-7 max-w-[460px] text-lg text-mu">
          Tell labl what you can’t have. Scan a barcode. Get Safe, Avoid or Can’t tell, with the exact ingredient that decided it.
        </p>
        <div data-in className="flex flex-wrap gap-3">
          <Button href="/dashboard">Scan a product</Button>
          <Button href="#how" variant="ghost">See how it works</Button>
        </div>
      </div>

      <div data-vis className="relative h-[44vh] rounded-md border border-line shadow-[0_0_140px_#2a5cff40] md:h-[min(78vh,640px)]">
        <div className="absolute inset-0 overflow-hidden">
          <div data-par className="absolute -inset-y-[6%] inset-x-0">
            <Media slot="hero" priority className="size-full" />
          </div>
        </div>
        <div data-chip className="absolute -left-2 bottom-10 z-10 w-[230px] rounded-2xl border border-line bg-surface p-4 md:-left-8 md:w-[250px]">
          <div className="flex items-center justify-between gap-2">
            <b className="text-sm">Choc Hazelnut Wafer</b>
            <Chip verdict="tell" />
          </div>
          <p className="mt-2 text-[12.5px] text-mu"><Flag verdict="tell">E471</Flag> may be animal-derived. Check the pack for “vegetable”.</p>
        </div>
      </div>
    </section>
  );
}
