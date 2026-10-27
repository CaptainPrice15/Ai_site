import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main id="main-content" className="article-page wrap">
      <Link className="back-link" href="/#library"><span aria-hidden="true">←</span> Back to all field notes</Link>
      <article className="article-content">
        <header className="article-header">
          <div className="article-kicker"><span>{article.topic}</span><span className="kicker-dot">✳</span><span>{article.readTime} min read</span></div>
          <h1>{article.title}</h1><p className="article-deck">{article.excerpt}</p>
          <div className="article-meta"><span className="article-author-mark">s<span>.</span></span><span>Signal & Syntax</span><span className="meta-divider">·</span><time dateTime={article.date}>{new Date(`${article.date}T12:00:00`).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</time></div>
        </header>
        <div className="article-body">{article.blocks.map((block, index) => {
          if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
          if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
          return <figure className="code-figure" key={index}><figcaption><span className="code-dots"><i /><i /><i /></span>{block.label}</figcaption><pre><code>{block.code}</code></pre></figure>;
        })}</div>
        <footer className="article-bottom"><div><span className="eyebrow">Filed under</span><div className="tag-list">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><Link className="button button-dark" href="/#library">More field notes <span aria-hidden="true">↗</span></Link></footer>
      </article>
    </main>
  );
}
