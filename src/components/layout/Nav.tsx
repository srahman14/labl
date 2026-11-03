import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-bg/90 to-transparent px-[5vw] py-4">
      <Logo />
      <nav className="hidden gap-7 text-sm text-mu md:flex">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="transition hover:text-white">{l.label}</Link>
        ))}
      </nav>
      <div className="flex gap-3">
        <Button href="/dashboard" variant="ghost" className="hidden sm:inline-block">Open dashboard</Button>
        <Button href="/dashboard">Start scanning</Button>
      </div>
    </header>
  );
}
