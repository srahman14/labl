"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Stat({ value, label }: { value: number; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLElement>(null);

  useGSAP(() => {
    const o = { v: 0 };
    gsap.to(o, {
      v: value, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(o.v)); },
    });
  }, { scope: root });

  return (
    <div ref={root}>
      <b ref={num} className="block text-[56px] font-medium leading-none tracking-[-0.05em]">0</b>
      <span className="text-sm text-mu">{label}</span>
    </div>
  );
}
