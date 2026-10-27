"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileNav() {
  const menu = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }

  return (
    <details className="mobile-nav" ref={menu}>
      <summary>Menu <span aria-hidden="true">＋</span></summary>
      <nav className="mobile-nav-panel" aria-label="Mobile navigation">
        <Link href="/#library" onClick={closeMenu}>Explore the library</Link>
        <Link href="/#topics" onClick={closeMenu}>Browse topics</Link>
        <Link href="/tools" onClick={closeMenu}>Play with tools</Link>
        <Link href="/#library" onClick={closeMenu}>Find a field note</Link>
      </nav>
    </details>
  );
}
