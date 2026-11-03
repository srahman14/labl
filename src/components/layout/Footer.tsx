"use client";
import { footerLinks } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { useRef } from "react";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from("[data-word]", { yPercent: 45, opacity: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 60%" } });
    gsap.to(root.current, { backgroundPosition: "0% 40%", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
  }, { scope: root });

  return (
    <footer
      ref={root}
      className="relative min-h-[92vh] overflow-hidden bg-[radial-gradient(130%_100%_at_100%_0%,#5b92ff_0%,#2a5cff_18%,#12266e_45%,#0e0f0d_78%)] bg-[length:150%_150%] bg-[position:100%_0] px-[5vw] pt-8"
    >
      <nav className="mb-8 mt-[18vh] flex flex-wrap gap-[clamp(24px,5vw,80px)] text-[clamp(20px,2.4vw,32px)] font-semibold tracking-[-0.03em]">
        {footerLinks.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
      </nav>
      <div className="flex flex-wrap gap-8 text-[13px] text-[#cdd6f3]">
        <span>© 2026 labl. Built for the Qodo 30 Day Hackathon.</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
      <p className="mt-2.5 max-w-[560px] text-xs text-[#9aa6cf]">Verdicts cover ingredients, not certification. Allergy results never claim cross-contamination safety.</p>
      <div data-word className="-mb-[4vw] mt-[6vh] whitespace-nowrap bg-[linear-gradient(#f1f0e8_25%,#f1f0e800_100%)] bg-clip-text text-[34vw] font-extrabold leading-[.8] tracking-[-0.07em] text-transparent">
        labl.
      </div>
    </footer>
  );
}
