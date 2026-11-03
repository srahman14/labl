import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60vw_50vh_at_85%_0%,#2a5cff33,transparent_70%),radial-gradient(50vw_40vh_at_0%_45%,#7a3cff14,transparent_70%)]" />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
