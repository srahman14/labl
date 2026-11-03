import type { Verdict } from "@/components/ui/Chip";
import type { ImageSlot } from "./images";

export const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#domains", label: "Domains" },
  { href: "#trust", label: "Trust" },
];

export const footerLinks = [
  { label: "Discussion", href: "https://github.com/orgs/qodo-hackathon/discussions/4" },
  { label: "GitHub", href: "https://github.com/srahman14/labl" },
  { label: "Qodo Hackathon", href: "https://hackathon.qodo.ai/" },
];

export const valueStrip = [
  { label: "Halal", slot: "phoneRules" },
  { label: "Vegan", slot: "food" },
  { label: "Kosher", slot: "guest" },
  { label: "Allergies", slot: "phoneAvoid" },
  { label: "Your own rules", slot: "phoneTell" },
] satisfies { label: string; slot: ImageSlot }[];

export const steps = [
  { eyebrow: "Profile", title: "Say it your way.", body: "Pick halal, vegan, kosher or allergies, then add anything personal. Type “no palm oil” and labl compiles it into a rule once." },
  { eyebrow: "Scan", title: "Point at the barcode.", body: "Open Food Facts answers in a blink. No match? Snap the label and vision extracts the ingredients for you to confirm." },
  { eyebrow: "Can’t tell", title: "Honest about doubt.", body: "E471 can be plant or animal. labl says so, and tells you exactly what would settle it." },
  { eyebrow: "Avoid", title: "Flagged, with proof.", body: "The triggering ingredient is highlighted, with source and confidence. Rules decide. The model only reads." },
];

export const rules: { label: string; tag: string; verdict?: Verdict }[] = [
  { label: "Halal", tag: "Strict" },
  { label: "No palm oil", tag: "Compiled" },
  { label: "No artificial colours", tag: "Ingredient" },
  { label: "Peanut allergy", tag: "Safety-critical", verdict: "no" },
];

export type Part = string | { flag: string };
export type ResultData = {
  verdict: Verdict;
  name: string;
  slot: ImageSlot;
  parts: Part[];
  callout?: { label: string; text: string };
  rows?: string[];
  meta: string;
};

export const results: Record<"tell" | "no", ResultData> = {
  tell: {
    verdict: "tell", name: "Choc Hazelnut Wafer", slot: "phoneTell",
    parts: ["Sugar, wheat flour, hazelnuts, cocoa butter, ", { flag: "E471" }, ", sunflower oil, salt."],
    callout: { label: "What would settle it:", text: "look for “vegetable” beside E471, or ask the maker." },
    meta: "Source: barcode DB · confidence 82%",
  },
  no: {
    verdict: "no", name: "Crunchy Caramel Bites", slot: "phoneAvoid",
    parts: ["Glucose syrup, wheat flour, ", { flag: "palm oil" }, ", skimmed milk, salt, flavouring."],
    rows: ["Breaks rule: No palm oil", "Swap → Oat & Honey Bites"],
    meta: "Source: barcode DB · confidence 96%",
  },
};

export const domains: { title: string; label: string; verdict: Verdict; slot: ImageSlot }[] = [
  { title: "Food & Drink", label: "Live", verdict: "ok", slot: "food" },
  { title: "Skin & Beauty", label: "Next", verdict: "tell", slot: "beauty" },
  { title: "Household", label: "Later", verdict: "no", slot: "household" },
  { title: "Supplements", label: "Later", verdict: "no", slot: "supplements" },
  { title: "Scan as a guest", label: "Profiles", verdict: "ok", slot: "guest" },
];

export const principles: { title: string; body: string; slot: ImageSlot }[] = [
  { title: "Three honest answers", body: "Safe, Avoid, or Can’t tell. Never a guess dressed as certainty.", slot: "trust1" },
  { title: "Evidence on every verdict", body: "The ingredient, the source and the confidence, always on screen.", slot: "trust2" },
  { title: "Measured, not hoped", body: "A golden-label test suite runs in CI, reviewed by Qodo.", slot: "trust3" },
];

export const stats = [
  { value: 94, label: "% golden-label accuracy (target)" },
  { value: 3, label: "verdict states" },
  { value: 1, label: "second to answer" },
];
