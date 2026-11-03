"use client";
import { useRef } from "react";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";
import { principles, stats } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { Stat } from "./Stat";

export function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from("[data-h]", { y: 60, opacity: 0, duration: 1, scrollTrigger: { trigger: root.current, start: "top 75%" } });
    gsap.from("[data-card]", { y: 70, opacity: 0, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: "[data-grid]", start: "top 80%" } });
  }, { scope: root });

  return (
    <section ref={root} id="trust" className="bg-[radial-gradient(70vw_50vh_at_90%_100%,#2a5cff22,transparent_70%)] px-[5vw] py-32">
      <Heading className="max-w-[900px]"><span data-h className="block">The LLM reads.<br />Rules decide.</span></Heading>
      <div data-grid className="mt-14 grid gap-4 md:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} data-card className="relative flex min-h-[280px] items-end overflow-hidden rounded-md border border-line">
            <Media slot={p.slot} absolute />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% to-black/80" />
            <div className="relative p-5">
              <h3 className="text-[22px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 text-sm text-[#c3c4b6]">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-[60px]">{stats.map((s) => <Stat key={s.label} {...s} />)}</div>
    </section>
  );
}
