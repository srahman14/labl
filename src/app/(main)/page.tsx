import { Cta } from "@/components/landing/Cta";
import { Gallery } from "@/components/landing/Gallery";
import { Hero } from "@/components/landing/Hero";
import { Principles } from "@/components/landing/Principles";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { ValueStrip } from "@/components/landing/ValueStrip";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ScrollStory />
      <Gallery />
      <Principles />
      <Cta />
    </>
  );
}
