"use client";

import { useEffect, useRef, useState } from "react";
import type { ArticleSummary, Topic } from "@/lib/content";
import { ArticleCard } from "@/components/article-card";

const filters: (Topic | "All")[] = ["All", "AI Tips", "AI Tools", "CLI Tools"];

export function SearchableLibrary({ articles }: { articles: ArticleSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<(typeof filters)[number]>("All");
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchInput.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesTopic = activeTopic === "All" || article.topic === activeTopic;
    const searchableText = [article.title, article.excerpt, article.topic, ...article.tags].join(" ").toLowerCase();
    return matchesTopic && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return (
    <section className="library-section" id="library" aria-labelledby="library-title">
      <div className="section-heading library-heading">
        <div><span className="eyebrow">The good stuff</span><h2 id="library-title">A little smarter, every day.</h2></div>
        <p>Field notes for making AI useful<br className="desktop-break" /> in the work you already do.</p>
      </div>
      <div className="library-controls">
        <div className="filter-list" role="group" aria-label="Filter articles by topic">
          {filters.map((filter) => (
            <button key={filter} type="button" className={`filter-button${activeTopic === filter ? " is-active" : ""}`} aria-pressed={activeTopic === filter} onClick={() => setActiveTopic(filter)}>{filter}</button>
          ))}
        </div>
        <label className="search-field">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span className="sr-only">Search articles</span>
          <input ref={searchInput} type="search" placeholder="Search tips, tools..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <kbd>/</kbd>
        </label>
      </div>
      <p className="result-count" aria-live="polite">{filteredArticles.length} {filteredArticles.length === 1 ? "field note" : "field notes"}</p>
      {filteredArticles.length > 0 ? (
        <div className="article-grid">{filteredArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      ) : (
        <div className="empty-state"><span aria-hidden="true">✳</span><h3>No notes found just yet.</h3><p>Try another search, or pick a different topic.</p><button type="button" className="text-button" onClick={() => { setQuery(""); setActiveTopic("All"); }}>Clear filters ↗</button></div>
      )}
    </section>
  );
}
