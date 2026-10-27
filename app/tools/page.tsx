import type { Metadata } from "next";
import Link from "next/link";
import { ToolsPlayground } from "@/components/tools-playground";

export const metadata: Metadata = {
  title: "Tools",
  description: "Play with a simulated terminal and build a clearer prompt in your browser.",
};

export default function ToolsPage() {
  return (
    <main id="main-content" className="tools-page wrap">
      <Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to the field guide</Link>
      <header className="tools-header">
        <span className="eyebrow">The little playground</span>
        <h1>Try an idea.<br /><span>See what happens.</span></h1>
        <p>Two low-stakes ways to get hands-on: explore a pretend terminal and turn a rough request into a useful prompt.</p>
      </header>
      <ToolsPlayground />
    </main>
  );
}
