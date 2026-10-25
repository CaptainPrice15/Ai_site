import Link from "next/link";
import { articles, getArticleSummaries, topics, topicSlug } from "@/lib/content";
import { ArticleCard } from "@/components/article-card";
import { SearchableLibrary } from "@/components/searchable-library";

export default function HomePage() {
  const featuredArticles = articles.filter((article) => article.featured);
  const articleSummaries = getArticleSummaries();

  return (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A field guide for the AI curious</span>
          <h1>Less hype.<br />More <span className="scribble-word">aha.</span></h1>
          <p className="hero-description">Good ideas for working with AI, choosing tools, and making your terminal feel a little more like home.</p>
          <div className="hero-actions"><Link href="#library" className="button button-dark">Explore the field notes <span aria-hidden="true">↘</span></Link><span className="hero-aside">Practical by nature.<br />Curious by default.</span></div>
          <div className="hero-footnote"><span className="footnote-line" /> SMALL IDEAS, REAL MOMENTUM <span className="footnote-star">✳</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="A friendly terminal window with a small spark">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="art-spark spark-left">✳</div><div className="art-spark spark-right">✴</div>
          <div className="terminal-card">
            <div className="terminal-bar"><span /><span /><span /><small>good-ideas.sh</small><b>•••</b></div>
            <div className="terminal-content"><div className="terminal-prompt"><span className="terminal-chevron">›</span><span className="terminal-command">make<br /><i>something-useful</i></span><span className="cursor" /></div><div className="terminal-output"><span>✳</span> done!<br /><small>curiosity compiled successfully</small></div></div>
          </div>
          <div className="art-caption"><span>FIG. 01</span> YOUR NEXT LITTLE BREAKTHROUGH</div>
          <div className="art-sticker">stay<br />curious<span>↗</span></div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>START HERE</span></div>
      </section>

      <section className="topics-section" id="topics">
        <div className="wrap topics-wrap">
          <div className="section-heading topics-heading"><div><span className="eyebrow">Pick your rabbit hole</span><h2>Three ways to get curious.</h2></div><span className="section-number">( 01 — 03 )</span></div>
          <div className="topic-grid">{topics.map((topic, index) => (
            <Link className={`topic-card topic-${topic.color}`} href={`/topics/${topicSlug(topic.name)}`} key={topic.name}>
              <div className="topic-card-top"><span className="topic-index">0{index + 1} /</span><span className="topic-icon" aria-hidden="true">{topic.icon}</span></div>
              <span className="topic-eyebrow">{topic.eyebrow}</span><h3>{topic.name}</h3><p>{topic.description}</p><span className="topic-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}</div>
        </div>
      </section>

      <section className="featured-section wrap">
        <div className="featured-topline"><span>THE SHORTLIST</span><span>HAND-PICKED TO GET YOU GOING <span aria-hidden="true">✳</span></span></div>
        <div className="featured-intro"><div><span className="eyebrow">Good places to begin</span><h2>Start with a<br /><span>good question.</span></h2></div><p>Three quick reads to help you find your footing, make a better prompt, and discover what your terminal can do.</p></div>
        <div className="featured-grid">{featuredArticles.map((article, index) => <div className="featured-item" key={article.slug}><span className="featured-count">0{index + 1}</span><ArticleCard article={article} featured /></div>)}</div>
      </section>

      <section className="library-wrap wrap"><SearchableLibrary articles={articleSummaries} /></section>
      <section className="closing-note wrap"><span className="closing-icon" aria-hidden="true">✳</span><p>Tools change. <em>Curiosity compounds.</em></p><Link href="#library">Find your next idea <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
