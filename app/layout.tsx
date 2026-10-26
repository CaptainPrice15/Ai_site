import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Signal & Syntax — Practical notes for the AI curious", template: "%s | Signal & Syntax" },
  description: "Thoughtful tips, useful AI tools, and friendlier ways to work from the command line.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var theme='light';try{var saved=localStorage.getItem('signal-syntax-theme');theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}catch(e){theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=theme;})();` }} />
      </head>
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link className="wordmark" href="/" aria-label="Signal and Syntax home"><span className="wordmark-mark" aria-hidden="true">s<span>.</span></span><span>signal <em>&</em> syntax</span></Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/#library">Explore</Link>
              <Link href="/#topics">Topics</Link>
              <Link className="nav-cta" href="/#library">Find a field note <span aria-hidden="true">↗</span></Link>
            </nav>
            <ThemeToggle />
            <details className="mobile-nav">
              <summary>Menu <span aria-hidden="true">＋</span></summary>
              <nav className="mobile-nav-panel" aria-label="Mobile navigation">
                <Link href="/#library">Explore the library</Link>
                <Link href="/#topics">Browse topics</Link>
                <Link href="/#library">Find a field note</Link>
              </nav>
            </details>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner"><Link className="wordmark footer-wordmark" href="/"><span className="wordmark-mark" aria-hidden="true">s<span>.</span></span><span>signal <em>&</em> syntax</span></Link><p>Curiosity, with a command line.</p><span className="footer-note">Made for the AI curious · 2026</span></div>
        </footer>
      </body>
    </html>
  );
}
