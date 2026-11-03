import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Media } from "@/components/ui/Media";

export function Cta() {
  return (
    <section className="relative mx-[5vw] mb-10 flex h-[420px] items-center justify-center overflow-hidden rounded-md border border-line text-center">
      <Media slot="cta" absolute />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a1a5acc,#000a_70%)]" />
      <div className="relative p-5">
        <Heading className="mb-6 text-[clamp(34px,5.6vw,80px)]">Stop reading labels.</Heading>
        <Button href="/dashboard">Open the dashboard</Button>
      </div>
    </section>
  );
}
