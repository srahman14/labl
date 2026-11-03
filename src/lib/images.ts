// Drop files in /public/images and set `src` (e.g. "/images/hero.jpg"). Until then a gradient placeholder renders.
export type ImageSlot =
  | "hero" | "phoneRules" | "phoneTell" | "phoneAvoid"
  | "food" | "beauty" | "household" | "supplements" | "guest"
  | "trust1" | "trust2" | "trust3" | "cta";

type Slot = { src?: string; alt: string; hue: number };

const imageCycle = [
  "/images/explosion.avif",
  "/images/grey.avif",
  "/images/hero.avif",
  "/images/landing-1.avif",
] as const;

const imageAt = (index: number, alt: string, hue: number): Slot => ({
  src: imageCycle[index % imageCycle.length],
  alt,
  hue,
});

export const images: Record<ImageSlot, Slot> = {
  hero: imageAt(0, "Market stall at golden hour", 20),
  phoneRules: imageAt(1, "", 190),
  phoneTell: imageAt(2, "", 45),
  phoneAvoid: imageAt(3, "", 5),
  food: imageAt(4, "Fresh food", 110),
  beauty: imageAt(5, "Botanicals and glass bottles", 330),
  household: imageAt(6, "Plant-filled home", 200),
  supplements: imageAt(7, "Herbs still life", 150),
  guest: imageAt(8, "Shared dinner table", 270),
  trust1: imageAt(9, "", 160),
  trust2: imageAt(10, "", 15),
  trust3: imageAt(11, "", 175),
  cta: imageAt(12, "", 225),
};
