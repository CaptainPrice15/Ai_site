import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getTopic, topics, topicSlug } from "@/lib/content";
import { ArticleCard } from "@/components/article-card";

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topicSlug(topic.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.name, description: topic.description };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const topicArticles = articles.filter((article) => article.topic === topic.name);

  return (
    <main className="topic-page wrap">
      <Link className="back-link" href="/#topics"><span aria-hidden="true">←</span> All topics</Link>
      <header className={`topic-page-header topic-${topic.color}`}>
        <span className="topic-icon" aria-hidden="true">{topic.icon}</span>
        <span className="eyebrow">{topic.eyebrow}</span>
        <h1>{topic.name}</h1>
        <p>{topic.description}</p>
      </header>
      <div className="topic-page-listing">
        <div className="section-heading"><div><span className="eyebrow">The collection</span><h2>Notes for your next step.</h2></div><span className="section-number">{String(topicArticles.length).padStart(2, "0")} FIELD NOTES</span></div>
        <div className="article-grid">{topicArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
        <Link className="back-to-library" href="/#library">Browse all field notes <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
