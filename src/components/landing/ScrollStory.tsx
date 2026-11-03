"use client";
import { useRef } from "react";
import { steps, results } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { ResultPanel, RulesPanel, ScanPanel } from "./PhonePanels";

const panels = [<RulesPanel key="r" />, <ScanPanel key="s" />, <ResultPanel key="t" result={results.tell} />, <ResultPanel key="n" result={results.no} />];
const hidden = (i: number) => i > 0 && "invisible opacity-0";

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  // Scroll-locked story: the section pins and scroll position scrubs through steps + phone screens.
  useGSAP(() => {
    const s = gsap.utils.toArray<HTMLElement>("[data-step]");
    const p = gsap.utils.toArray<HTMLElement>("[data-panel]");
    const d = gsap.utils.toArray<HTMLElement>("[data-dot]");
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=3200", pin: true, scrub: 0.8, anticipatePin: 1, snap: { snapTo: "labels", duration: 0.4 } },
    });
    tl.addLabel("s0");
    s.forEach((_, k) => {
      if (!k) return;
      tl.to(s[k - 1], { autoAlpha: 0, y: -30 }, ">+.6")
        .fromTo(s[k], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, "<.2")
        .to(p[k - 1], { autoAlpha: 0, scale: 0.96 }, "<")
        .fromTo(p[k], { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1 }, "<")
        .to(d[k], { backgroundColor: "#4d86ff", duration: 0.2 }, "<")
        .addLabel(`s${k}`);
      if (k === 1) tl.fromTo("[data-laser]", { top: "8%" }, { top: "88%", duration: 1.2, repeat: 1, yoyo: true, ease: "none" }, "<.2");
    });
    tl.to({}, { duration: 0.6 });
  }, { scope: root });

  return (
    <section ref={root} id="how" className="relative grid h-screen items-center gap-6 border-t border-line bg-[radial-gradient(50vw_60vh_at_15%_50%,#2a5cff1f,transparent_70%)] px-[5vw] pb-8 pt-20 md:grid-cols-2 md:gap-[5vw]">
      <div className="relative h-52 md:h-80">
        {steps.map((s, i) => (
          <div key={s.title} data-step className={cn("absolute inset-0", hidden(i))}>
            <small className="text-xs font-bold tracking-widest text-brand">{s.eyebrow}</small>
            <h2 className="my-3.5 text-[clamp(34px,4.6vw,64px)] font-medium leading-none tracking-[-0.045em]">{s.title}</h2>
            <p className="max-w-[430px] text-base text-mu md:text-lg">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative h-[50vh] w-[250px] overflow-hidden rounded-[38px] border-8 border-[#23251f] bg-[#0b0c0a] shadow-[0_40px_100px_#000a] md:h-[min(640px,76vh)] md:w-[310px]">
          {panels.map((panel, i) => (
            <div key={i} data-panel className={cn("absolute inset-0 flex flex-col", hidden(i))}>{panel}</div>
          ))}
        </div>
      </div>

      <div className="absolute right-[5vw] top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {steps.map((s, i) => <i key={s.title} data-dot className={cn("block h-6 w-1 rounded", i === 0 ? "bg-brand" : "bg-[#2e3129]")} />)}
      </div>
    </section>
  );
}
