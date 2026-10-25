import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: ArticleSummary; featured?: boolean }) {
  return (
    <article className={`article-card${featured ? " article-card-featured" : ""}`}>
      <div className="card-topline">
        <span className="card-icon" aria-hidden="true">{article.icon}</span>
        <span className="topic-label">{article.topic}</span>
        <span className="read-time">{article.readTime} min read</span>
      </div>
      <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <div className="card-footer">
        <div className="tag-list">{article.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <Link className="arrow-link" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>↗</Link>
      </div>
    </article>
  );
}
