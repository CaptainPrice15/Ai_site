import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page wrap">
      <span className="eyebrow">404 / No field note here</span>
      <h1>We lost that page.</h1>
      <p>The link may have moved, but the field guide is still here.</p>
      <Link className="button button-dark" href="/">Back to the field guide <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
